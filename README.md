# My Project

## Overview

Welcome to My Project! This application is built using Node.js and provides a robust foundation for building web applications. Follow the instructions below to set up your local development environment.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (v14.x or later recommended)
- npm (v6.x or later recommended)

### Installation

1. **Clone the Repository**

```
git clone https://github.com/yunx3arch/usc_take_home
cd usc_take_home
```


2. **Set Up Environment Variables**

This project requires database credentials to be set in the `.env` file. Create a new `.env` file in the root of the project (if it doesn't already exist) and add your local database username and password.

```
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password

```

Replace `your_db_username` and `your_db_password` with your actual local database username and password. You can also adjust the `DB_HOST`, `DB_PORT`, and `DB_NAME` as necessary.

3. **Install Dependencies**

Run the following command to install all necessary dependencies:
```
npm install
```

4. **Start the Application**

Once the dependencies are installed, start the application using:

```
npm start
```

The application should now be running on http://localhost:4200.