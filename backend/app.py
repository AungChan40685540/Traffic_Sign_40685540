import cv2
import os
import numpy as np
from flask import Flask, render_template, Response, request, jsonify
from tensorflow.keras.models import load_model
from flask_cors import CORS
from werkzeug.utils import secure_filename

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app)  # Allows requests from all domains (for development)

CORS(app, origins=["http://localhost:5173"])

# Configure upload folder
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load the pre-trained Keras model
model = load_model('Traffic_Sign_Model.h5')

# Define the class names
class_names = {
    0: "Speed limit (20km/h)", 1: "Speed limit (30km/h)", 2: "Speed limit (50km/h)", 
    3: "Speed limit (60km/h)", 4: "Speed limit (70km/h)", 5: "Speed limit (80km/h)", 
    6: "End of speed limit (80km/h)", 7: "Speed limit (100km/h)", 8: "Speed limit (120km/h)", 
    9: "No passing", 10: "No passing for vehicles over 3.5 metric tons", 
    11: "Right-of-way at the next intersection", 12: "Priority road", 13: "Yield", 
    14: "Stop", 15: "No vehicles", 16: "Vehicles over 3.5 metric tons prohibited", 
    17: "No entry", 18: "General caution", 19: "Dangerous curve to the left", 
    20: "Dangerous curve to the right", 21: "Double curve", 22: "Bumpy road", 
    23: "Slippery road", 24: "Road narrows on the right", 25: "Road work", 
    26: "Traffic signals", 27: "Pedestrians", 28: "Children crossing", 
    29: "Bicycles crossing", 30: "Beware of ice/snow", 31: "Wild animals crossing", 
    32: "End of all speed and passing limits", 33: "Turn right ahead", 34: "Turn left ahead", 
    35: "Ahead only", 36: "Go straight or right", 37: "Go straight or left", 
    38: "Keep right", 39: "Keep left", 40: "Roundabout mandatory", 
    41: "End of no passing", 42: "End of no passing by vehicles over 3.5 metric tons"
}

# Preprocessing function to resize and normalize images
def preprocess_image(img):
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    img = cv2.resize(img, (32, 32))
    img = img / 255.0
    img = img.reshape(1, 32, 32, 1)  # Reshape to match model input
    return img

# Function to get the class name based on the class index
def get_class_name(class_no):
    return class_names.get(class_no, "Unknown")

# Video feed generator that sends frames to React in real-time
def video_feed():
    cap = cv2.VideoCapture(0)  # Use the default webcam
    while True:
        success, frame = cap.read()
        if not success:
            break

        # Preprocess the frame for prediction
        img = preprocess_image(frame)
        predictions = model.predict(img)
        class_index = np.argmax(predictions)
        probability = np.max(predictions)

        if probability > 0.6:
            # Text color set to green (in BGR format: (0, 255, 0) for green)
            color = (0, 255, 0)
            
            # Font size set to 24 and thickness to 3 for better visibility
            cv2.putText(frame, f"Type Of Class: {get_class_name(class_index)}", (20, 35),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.6, color, 3)
            cv2.putText(frame, f"Accuracy of the image: {round(probability * 100, 2)}%", (20, 75),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.6, color, 3)

        # Encode the frame as JPEG and send to React frontend
        _, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    cap.release()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_feed')
def real_time_classification():
    return Response(video_feed(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/classify_image', methods=['POST'])
def imag_classification():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        # Preprocess and make a prediction on the uploaded image
        img = preprocess_image(cv2.imread(file_path))
        predictions = model.predict(img)
        class_index = np.argmax(predictions)
        class_name = get_class_name(class_index)
        probability = np.max(predictions) * 100  # Convert to percentage

        # Return JSON response with prediction result
        return jsonify({
            "class_name": class_name,
            "probability": round(probability, 2),
            "image_path": file_path
        })

if __name__ == '__main__':
    app.run(debug=True)
