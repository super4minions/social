# Small Facebook
[![Code Climate](https://codeclimate.com/github/super4minions/social/badges/gpa.svg)](https://codeclimate.com/github/super4minions/social)
[![Test Coverage](https://codeclimate.com/github/super4minions/social/badges/coverage.svg)](https://codeclimate.com/github/super4minions/social/coverage)
[![Build Status](https://travis-ci.org/super4minions/social.svg?branch=master)](https://travis-ci.org/super4minions/social)


## Facebook is a small website for registration (sign up and login), display profile for user, store and retrieve data from database

#### our project allows the user to create a new account , and check by email if the user already exist or not, if the user already registered, the website will display a message telling him (you have an account in website) , if he a new user, it will store user data in  the database

#### When user login, it will check if a user name and password are identical, it will direct user to the profile page

#### inside profile page will display all posts that added by the user, and add a new post 

#### also, our project allows adding posts from another users .. and display all posts that added by these users


![alt text] (https://scontent-fra3-1.xx.fbcdn.net/v/t34.0-12/17198999_10208537274368954_1414410858_n.jpg?oh=3f77febb29c59da488d1449443b1ed02&oe=58C2C8E3)



### We used postgres data base to insert, select and delete data

### We used TDD for testing functions in code



### Setup and install 
##### For anyone wants to use the website locally :
- [ ] You should install this library 
- [ ] You should download the data base on your device like postgres data base
- [ ] You should add data base config (username, database name, and password)
- [ ] Then you should Execute the code by ( npm start ) command

##### If you want to use the website globally, you need to create global database like create data base on heroku website, then add the data base config ( username, data base name, password, host ,port ..) in the code

###### The website on Heroku : https://social-project.herokuapp.com/
