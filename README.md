# Taskify - To Do List

A simple Todo List web app built with React.  
This project demonstrates basic **CRUD operations** (Create, Read, Update, Delete) with a UI.

## Features
- Add new tasks
- Edit existing tasks
- Mark tasks as complete
- Delete tasks

## Tech Stack
- **Frontend:** React
- **Styling:** CSS
- **Backend:** Nest.js, MySQL, XAMPP

## Installation

Clone the repository:
```bash
git clone https://github.com/slricta/act1-todolist
```

## Install backend dependencies
```
cd todo-backend
npm install
```

## Install frontend dependencies
```
cd ../todo-frontend
npm install
```

## Database Setup

This project uses **MySQL** as the database.  
Make sure MySQL is installed and running (you can use **phpMyAdmin** to manage it).

### Create a Database
In phpMyAdmin, create a new database: **todo_db**

## Run the backend
```
cd todo-backend
npm run start:dev
```

## Run the frontend
```
cd ../todo-frontend
npm start
```

## API Documentation (Postman)

We provided a Postman collection so you can easily test all API endpoints.

1. Install [Postman](https://www.postman.com/downloads/).
2. Import the collection file:
   - Go to **File → Import** in Postman.
   - Choose `docs/To Do List.postman_collection.json`.
3. Run the requests (make sure your backend is running at `http://localhost:3000`).

The collection includes:
- `GET /tasks` → Fetch all tasks
- `POST /tasks` → Create a new task
- `PATCH /tasks/:id` → Update a task
- `DELETE /tasks/:id` → Delete a task






