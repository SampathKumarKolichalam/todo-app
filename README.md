# To-Do Application with Django, React, and MySQL

A **Full-Stack To-Do Application** built with **Django** (backend), **React.js** (frontend), and **MySQL** database. Designed to support task management with user authentication, overdue task tracking, and automated email reminders.

---

## Key Features

* **User Authentication:** JWT-based login and registration (bonus API for user signup).
* **Task Management:** Add, update, delete tasks with title, description, due date, priority, and completion status.
* **Overdue Task Detection:** Backend logic to retrieve overdue tasks for the authenticated user.
* **Automated Email Notifications:** Email reminder when a task is due within the next 1 hour using Django signals.
* **Frontend Interface:**

  * Task input, progress tracking, filtering by completion status.
  * Priority highlighting (High/Medium/Low).
  * Visual cue for overdue tasks.
  * Mobile responsive UI/UX.
  * Sorting by due date and priority (Bonus enhancement).

---

## High-Level Architecture

```
+-------------------+        +-----------------+        +---------------------+
|   React Frontend  | <----> |  Django Backend | <----> |    MySQL Database    |
+-------------------+        +-----------------+        +---------------------+
        |                            |                            |
        |--- JWT Authentication ---> |                            |
        |<-- Task APIs (CRUD) ------> |                            |
        |<-- Overdue Tasks API ------|                            |
        |                            |--- ORM Queries ----------> |
        |                            |                            |
        |                            |--- Email Notification ----|
```

* **Frontend (React.js):** User interactions, API communication, UI rendering.
* **Backend (Django + DRF):** API exposure, business logic, signals for emails.
* **Database (MySQL):** Persistent storage for users and tasks.

---

## Tech Stack Used

| Layer          | Technology                                    |
| -------------- | --------------------------------------------- |
| Frontend       | React.js + Vite                               |
| Backend        | Django 5.x, Django REST Framework             |
| Database       | MySQL                                         |
| Authentication | JWT (via Simple JWT package)                  |
| Email          | Django's Email Backend (console-based in dev) |

---

## API Endpoints List

| Method | Endpoint              | Purpose                   |
| ------ | --------------------- | ------------------------- |
| POST   | `/api/auth/register/` | Register new user (Bonus) |
| POST   | `/api/auth/login/`    | Obtain JWT tokens         |
| POST   | `/api/auth/refresh/`  | Refresh JWT tokens        |
| GET    | `/api/tasks/`         | List all tasks            |
| POST   | `/api/tasks/`         | Create new task           |
| PATCH  | `/api/tasks/{id}/`    | Update a task             |
| DELETE | `/api/tasks/{id}/`    | Delete a task             |
| GET    | `/api/tasks/overdue/` | Retrieve overdue tasks    |

---

## Setup Instructions

### 1. Backend (Django)

```bash
git clone https://github.com/youruser/todo-app.git
cd todo-app/backend
```

* **Setup virtual environment**

```bash
python -m venv .venv
.\.venv\Scripts\activate
```

* **Install dependencies**

```bash
pip install -r requirements.txt
```

* **Configure Database in `.env`** (Please Change credentials accordingly)

```
MYSQL_DB_NAME=todo_db
MYSQL_USER=root
MYSQL_PASSWORD=yourpassword
MYSQL_HOST=localhost
MYSQL_PORT=3306
DJANGO_SECRET_KEY=your_secret_key
```

* **Run migrations**

```bash
python manage.py migrate
```

* **Create superuser**

```bash
python manage.py createsuperuser
```

* **Run server**

```bash
python manage.py runserver
```

---

### 2. Frontend (React)

```bash
cd ../frontend
npm install
npm run dev
```

* The React frontend will be served on `http://localhost:5173/`.
* Ensure React proxies API requests to Django running on port 8000.

---

## Testing APIs via Thunder Client / Postman

* **Register:** POST `/api/auth/register/`
* **Login:** POST `/api/auth/login/`
* **Create Task:** POST `/api/tasks/`
* **List Tasks:** GET `/api/tasks/`
* **Update Task:** PATCH `/api/tasks/{id}/`
* **Delete Task:** DELETE `/api/tasks/{id}/`
* **Fetch Overdue Tasks:** GET `/api/tasks/overdue/`

Each request requires **Bearer Token** in headers.

---

## Email Reminder Logic

* When a task is created/updated with a due date within **1 hour from current time**, a signal triggers an **email reminder** to the user (For now visible in the console in development).
* Easily configurable for production SMTP services, future enhancement.

---

## UI/UX Highlights

* Progress bar reflecting completed tasks.
* Overdue tasks are visually highlighted in red.
* Priority badges:

  * Red for High
  * Orange for Medium
  * Blue for Low
* Filter by:

  * All Tasks
  * To-Do
  * Completed
* Sort by Due Date and Priority (Extra feature).
* Fully responsive design for mobile and desktop.

---

## 📸 Project Screenshots

### 1. Folder Structure

  ![Backend Folder Structure](screenshots/Folder%20Structure-1.PNG)

  ![Frontend Folder Structure](screenshots/Folder%20Structure-2.PNG)

### 2. MySQL Database Tables

* **DataBase Schema**
 ![DataBase Schema](screenshots/db-1.PNG)

* **Tasks Table**
  ![Tasks Table](screenshots/db-6.PNG)

* **Auth User Table**
  ![Auth User Table](screenshots/db-2.PNG)



### 3. Backend & Frontend Servers

* **Django Backend Running**
  ![Backend Server](screenshots/backend%20server.PNG)

* **React Frontend Running**
  ![Frontend Server](screenshots/frontend%20server.PNG)

### 4. API Testing via Thunder Client / Postman

* **Login API**
  ![Login API](screenshots/Login%20\(Token%20Generation\).PNG)

* **Register API**
  ![Register API](screenshots/register%20user.PNG)

* **Refresh Token API**
  ![Refresh Token](screenshots/Refresh%20Token.PNG)

* **Create Task API**
  ![Create Task API](screenshots/Create%20Task.PNG)

* **Get All Tasks API**
  ![Get All Tasks API](screenshots/Get%20All%20Tasks.PNG)

* **Update Task API**
  ![Update Task API](screenshots/Update%20Task.PNG)

* **Delete Task API**
  ![Delete Task API](screenshots/Delete%20Task.PNG)

### 5. Over Due Email Reminder Console Output

![Over due Email Reminder Console](screenshots/overdue%20email-terminal.PNG)

### 6. Frontend UI Screens

#### Login Page
![Login Page](screenshots/loginpage.PNG)

#### Register Page
![Register Page](screenshots/registerpage.PNG)

* **Dashboard View**
  ![Dashboard 1](screenshots/dashboard-1.PNG)
  ![Dashboard 2](screenshots/dashboard-2.PNG)
  ![Dashboard 3](screenshots/dashboard-3.PNG)
  ![Dashboard 4](screenshots/dashboard-4.PNG)
  ![Dashboard 5](screenshots/dashboard-5.PNG)

---

## Deployment Guide (Optional for now, Future UseCases)

* Backend can be deployed on **Render / Railway**.
* Frontend can be deployed on **Vercel**.
* For production:

  * Enable CORS for deployed frontend domain.
  * Configure database and static files.
  * Use production-grade email backend.

---

## Developer

**Sampath Kumar Kolichalam-Full Stack Developer**

---

## License

MIT License.

---
