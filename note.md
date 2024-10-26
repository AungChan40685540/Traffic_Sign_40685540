# Traffic Sign Classification

## Procedure of Building model(reference on literature review)

**Steps by Step**
- Imports various libraries
- Parameters Setup
- Data Loading and Processing
- CSV File for Labels
- Visualizing the Data
- Preprocessing the Images
- Data Augmentation
- One-Hot Encoding
- CNN Model Definition (myModel)
- Training
- Training Visualization
- Evaluation
- Saving the Model


## Necessary libraries

**List**
- OpenCv
- Numpy
- sklearn
- keras
- matplotlib
- tensorflow

**Code**
`pip install tensorflow opencv-python pandas matplotlib scikit-learn
`

---

### Coding

**Get the list of folders in the path**
`path = location of the folder`
`myList = os.listdir(path)`

**Number of classes**
`numberOfClasses = len(myList)`

**1) Load all the images & put them in list**

- iterate them
`for x in range (0, numberOfClasses):`

- get the names of each images inside the folders
- after getting the each of images names inside folders, use the Iamread function to read the images one by one then store that in a list

`images= np.array(images)`
- (10111, 32, 32, 3) means 10111 is number of images, 32 by 32 images, 3 channel mean color RBG

**CurrentImage will contain a NumPy array representing the image. This array has a shape of (height, width, channels), where channels can be 3 (for RGB images) or 1 (for grayscale images).**

```python
for x in range(0, lengthOfClasses): # x is folder
    imagesList = os.listdir(os.path.join(folder_path, str(x))) # each (x) folder in trafficSignData 
    for img in imagesList:
        currentImage = cv2.imread(folder_path + "/" + str(x) + "/" + img) # trafficSignData --> x folder --> img = images
        if currentImage is not None:  # Check if the image was loaded successfully
            currentImage = cv2.resize(currentImage, imageDimesions) # Resize to the dimensions tp 32 X 32 pixels
            images.append(currentImage)
            classNumber.append(x)
        else:
            print(f"It is wrong folder path {folder_path}")
    print(x, end=" ")
print(" ")
```
**Convert list to numpy array**
```python
images = np.array(images)
classNumber = np.array(classNumber)
```

---

**2) Split the data**

- we have to create set of training, testing, and validation
- we need to import the *sklearn* library
`from sklearn.model_selection import train_test_split`

`X_train, X_test, y_train, y_test = train_test_split(images, classNo, test_size=testRatio)`
- this function will split the images and also it split the class number too, then write out the test ration
- test_size = 0.2 means that training will be 0.8 percent and test will be 0.2, so 20% testing and 80% training

Check whether it is split or not (train)
`print(X_train.shape)`

Check whether it is split or not (test)
`print(X_test.shape)`

Why do we need that ?
- we need to shuffle all the classes

`X_train, X_validation, y_train, y_validation = train_test_split(X_train, y_train, test_size=validationRatio)`
- the function will split the 80% of X-train data and 20 percent for X validation

**Np function**
- we use np function to check the how many images that the each class have ?
- X_train contain = actual images, Y_train contain = the ids of each image
- The below code tell us all index of where 0 class is present
- For example stop sign is in class number 0
`np.where(y_train==0)`
- Find the total length of class 0
`len(np.where(y_train==0)[0])`

### Switch to Macbook
- checking code are working
- working successsful!
