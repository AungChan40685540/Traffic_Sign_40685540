# from flask import Flask, render_template, request, redirect, url_for
# import numpy as np
# import cv2
# from tensorflow.keras.models import load_model
# import os

# app = Flask(__name__)
# app.config["UPLOAD_FOLDER"] = "static/uploads"

# # Load the trained model from the .h5 file
# model = load_model("Traffic_Sign_Model.h5")

# # Class Names for Traffic Signs
# class_names = {
#     0: "Speed limit (20km/h)", 1: "Speed limit (30km/h)", 2: "Speed limit (50km/h)", 
#     3: "Speed limit (60km/h)", 4: "Speed limit (70km/h)", 5: "Speed limit (80km/h)", 
#     6: "End of speed limit (80km/h)", 7: "Speed limit (100km/h)", 8: "Speed limit (120km/h)", 
#     9: "No passing", 10: "No passing for vehicles over 3.5 metric tons", 
#     11: "Right-of-way at the next intersection", 12: "Priority road", 13: "Yield", 
#     14: "Stop", 15: "No vehicles", 16: "Vehicles over 3.5 metric tons prohibited", 
#     17: "No entry", 18: "General caution", 19: "Dangerous curve to the left", 
#     20: "Dangerous curve to the right", 21: "Double curve", 22: "Bumpy road", 
#     23: "Slippery road", 24: "Road narrows on the right", 25: "Road work", 
#     26: "Traffic signals", 27: "Pedestrians", 28: "Children crossing", 
#     29: "Bicycles crossing", 30: "Beware of ice/snow", 31: "Wild animals crossing", 
#     32: "End of all speed and passing limits", 33: "Turn right ahead", 34: "Turn left ahead", 
#     35: "Ahead only", 36: "Go straight or right", 37: "Go straight or left", 
#     38: "Keep right", 39: "Keep left", 40: "Roundabout mandatory", 
#     41: "End of no passing", 42: "End of no passing by vehicles over 3.5 metric tons"
# }

# # Preprocessing function for the image
# def preprocess_image(img_path):
#     img = cv2.imread(img_path)
#     img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)   # Convert to grayscale
#     img = cv2.resize(img, (32, 32))               # Resize to model's input size
#     img = img / 255.0                             # Normalize pixel values
#     img = img.reshape(1, 32, 32, 1)               # Reshape for model input
#     return img

# @app.route("/", methods=["GET", "POST"])
# def index():
#     if request.method == "POST":
#         if "file" not in request.files:
#             return redirect(request.url)
        
#         file = request.files["file"]
#         if file.filename == "":
#             return redirect(request.url)
        
#         if file:
#             # Ensure the upload folder exists
#             if not os.path.exists(app.config["UPLOAD_FOLDER"]):
#                 os.makedirs(app.config["UPLOAD_FOLDER"])

#             # Save uploaded file to the uploads folder
#             file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
#             file.save(file_path)
            
#             # Preprocess image and make prediction
#             img = preprocess_image(file_path)
#             predictions = model.predict(img)
#             class_index = np.argmax(predictions)
#             class_name = class_names.get(class_index, "Unknown")
#             probability = np.max(predictions) * 100  # Convert to percentage
            
#             image_path = f"uploads/{file.filename}"
#             return render_template("index.html", class_name=class_name, probability=round(probability, 2), image_path=image_path)
    
#     return render_template("index.html")

# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, render_template, Response
import cv2
import numpy as np
from tensorflow.keras.models import load_model

app = Flask(__name__)

# Load model
model = load_model("Traffic_Sign_Model.h5")

# Traffic Sign Class Names
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

# Preprocessing function
def preprocess_image(img):
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    img = cv2.resize(img, (32, 32))
    img = img / 255.0
    img = img.reshape(1, 32, 32, 1)
    return img

# Get class name from class index
def get_class_name(class_no):
    return class_names.get(class_no, "Unknown")

# Video feed generator
def video_feed():
    cap = cv2.VideoCapture(0)
    while True:
        success, frame = cap.read()
        if not success:
            break
        
        # Preprocess and predict
        img = preprocess_image(frame)
        predictions = model.predict(img)
        class_index = np.argmax(predictions)
        probability = np.max(predictions)

        # Display prediction on frame
        if probability > 0.6:
            cv2.putText(frame, f"CLASS: {get_class_name(class_index)}", (20, 35),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0, 0, 255), 2)
            cv2.putText(frame, f"PROBABILITY: {round(probability * 100, 2)}%", (20, 75),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0, 0, 255), 2)

        # Encode frame to JPEG
        _, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        # Yield frame for streaming
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    cap.release()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed_route():
    return Response(video_feed(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(debug=True)

