
# Tour Package Management System project


simple Database Management project with mysql + nodejs
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MYSQL_HOST = 'localhost'
MYSQL_USER = 'your_username'
MYSQL_PASSWORD = 'your_password'
MYSQL_DATABASE = 'your_database-name'
PORT = port_number`



## MYSQL Commands
Create database and tables using mysql Command Line
```mysql
// create database 
CREATE DATABASE tourpackagedb;

//use database
use tourpackagedb;

// create customer table
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phone_number VARCHAR(15),
    address TEXT
);

//create tour package table
CREATE TABLE tourpackages (
    package_id INT AUTO_INCREMENT PRIMARY KEY,
    package_name VARCHAR(100),
    destination VARCHAR(100),
    description TEXT,
    price DECIMAL(10, 2),
    duration INT,
    start_date DATE,
    end_date DATE,
);

```


## Run Locally

Clone the project

```bash
  git clone https://github.com/N1nadLad/Tour_Package_Management_System
```

Go to the project directory

```bash
  cd Tour_Package_Management_System
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node app.js
```


## Authors

- [@N1nadLad](https://github.com/N1nadLad)


