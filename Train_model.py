import numpy as np
import cv2
import os

# Declare parameters
folder_path = "trafficSignData"
label_file = 'labels.csv'
imageDimesions = (32,32)


images = []
classNumber = []

# get the path of the traffic data
myList = os.listdir(folder_path)
print(myList)

# get the number of classes (number of folder)
lengthOfClasses = len(myList)
print(lengthOfClasses)


# iterate 0 to length of classes (58)
for x in range(0, lengthOfClasses): # x is folder
    imagesList = os.listdir(os.path.join(folder_path, str(x))) # each (x) folder in trafficSignData 
    for img in imagesList:
        # currentImage will contain a NumPy array representing the image. This array has a shape of 
        # (height, width, channels), where channels can be 3 (for RGB images) or 1 (for grayscale images)
        currentImage = cv2.imread(folder_path + "/" + str(x) + "/" + img) # trafficSignData --> x folder --> img = images
        if currentImage is not None:  # Check if the image was loaded successfully
            currentImage = cv2.resize(currentImage, imageDimesions) # Resize to the dimensions tp 32 X 32 pixels
            images.append(currentImage)
            classNumber.append(x)
        else:
            print(f"It is wrong folder path {folder_path}")
    print(x, end=" ")
print(" ")


# Convert list to numpy array
images = np.array(images)
classNumber = np.array(classNumber)
print(images)
print(classNumber)