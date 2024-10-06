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
- The below code tell us index of where 0 class is present
- For example stop sign is in class number 0
`np.where(y_train==0)`
