# Fun-Memories App

## About
The application allows kids to remember the details about their favorite book series and toys collection such as when they started/finished reading the book, gifted by,author of the book series, toy brand, add comments along with the ability to save the image of their book or toy.

## Technology
* The application has two folders, a README.md file and a demo
    * backend/
    * frontend/
* The application is build using*  **Node, Express, React, React-bootstrap,React-router-dom, JavaScript,HTML, CSS**. 
* **MongoDB** is the database and the password encryption algorithm used is **Bcrypt** and **JSON web token** *for authentication*.

## Requirements
Following  installations are required  to run this application locally
### Backend
    * download nodejs
    * npm install express --save
    * npm install cors
    * npm install body-parser
    * npm install dotenv
    * npm install -g nodemon
    * npm install bcrypt
    * npm install jsonwebtoken
    * npm install mongoose
### Frontend
    * npx create-react-app my-app
    * npm install --save react-router-dom
    * npm install react-bootstrap bootstrap
    * npm install --save react-card-flip
    * npm install react-datepicker --save
    * npm install react-multi-carousel --save

### Tips
    * With all the required installations complete, open two terminal tabs and cd into the main project folder in this case, NodeReactProject
    * In first terminal tab cd into backend folder and then `run node index.js`. Server will start running on port 5000
    * In second terminal tab cd into frontend folder and then cd into the react-app and `run npm start`. Once, compiled successfully, Application will start running on  http://localhost:3000.
    * To query the database once the mongodb is up, in a separate terminal tab  `run mongo` to start the mongo shell and  now run the queries as needed.

### DEMO 
<img src="demo/demo.gif" />

