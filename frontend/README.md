
# `AirBnB`

# Table of Contents

* [Overview](#overview)
* [Project Screen Shot(s)](#Project-Screen-Shot(s))
* [How to run the project](#How-to-run-the-project)
* [App Functionality](#app-functionality)


### Overview

In my AirBnB project, I created an AirBnB clone that allows the user to signup, login, create a AirBnb spot, and add a review to other AirBnBs. This project emphasizes using React and Redux to build out the frontend of the application. This project also includes a backend that utilitzes express, sequelize, PostgresSql for the Api Server. I use the backend to perist data sent from the frontend.


### Project Screen Shot(s)

* A screenshot of the home page:
![Screenshot1](../Home%20Page.JPG "Screenshoot")



### How to run the project

To run the project, download or clone the repository in your computer:

 $ git clone https://github.com/FenneAustin/AirBnB.git

 and follow the instruction below.

 in the backend folder
    1. run npm install
    2. create a .env file inside the backend folder with the following
    PORT= whatever you want (suggestion : 8000)
    DB_FILE = name a path to a database (suggestion : db/dev.db or *any db name*)

    3. Make sure you have the sequelize-cli installed and run
     - dotenv npx sequelize db:migrate
     - dotenv npx sequelize db:seed:all

    4. Run npm start in the backend folder

in the frontend folder
    1. run npm install
    2. run npm start


### App Functionality

In this application, the main page display a list of "spots", that the frontend retreives from an api call to our backend. If you click on one of the spots it will bring you to that spots page. Here if you are the owner of the spot  you can make changes to the spot information. Users who visit a spot page can also leave a review.
