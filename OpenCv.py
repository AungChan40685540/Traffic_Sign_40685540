import cv2
cap = cv2.VideoCapture(0)

while True:
    returnValue, frame = cap.read()
    if not returnValue:
        break
    
    # Flip the frame horizontally for mirror effect
    mirror = cv2.flip(frame, 1)
    
    # Display the mirrored frame
    cv2.imshow('Webcam - Mirror Mode', mirror)
    
    # Break loop on 'q' key press
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the capture and close the window
cap.release()
cv2.destroyAllWindows()
