import numpy as np
import cv2
import os

# Declare parameters
folder_path = "trafficSignData"
label_file = 'labels.csv'
imageDimesions = (32,32)


"""
Import images data to images list
Import the number of class to classNumber
Iterate the folders to get each images 
Resize to the dimensions 32 X 32 pixels
Convert list to numpy array
"""

images = []
classNumber = []

# get the path of the traffic data
myList = os.listdir(folder_path)
print("View each classes in traffic folder :", myList, "\n")

# get the number of classes (number of folder)
lengthOfClasses = len(myList)
print("Total length of classes :", lengthOfClasses, "\n")


print("Iterating to load images & classes\n")
# iterate 0 to length of classes (58)
for x in range(0, lengthOfClasses): # x is folder
    imagesList = os.listdir(os.path.join(folder_path, str(x))) # each (x) folder in trafficSignData 
    for img in imagesList:
        currentImage = cv2.imread(folder_path + "/" + str(x) + "/" + img) # trafficSignData --> x folder --> img = images
        if currentImage is not None:  # Check image is read
            currentImage = cv2.resize(currentImage, imageDimesions) # Resize to the dimensions tp 32 X 32 pixels
            images.append(currentImage)
            classNumber.append(x)
        else:
            print(f"It is wrong folder path {folder_path}")
    print(x, end=" ")
# print(" ")


# Convert list to numpy array
images = np.array(images)
classNumber = np.array(classNumber)
# print(images)
# print(classNumber)

###########################################################################