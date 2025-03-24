# 📝 Full-Stack To-Do List App

A simple, responsive full-stack To-Do List application built with **HTML, CSS, JavaScript (frontend)** and **Node.js, Express, PostgreSQL (backend)**. It includes **user authentication** (Sign Up / Sign In) and **CRUD operations** for managing personal tasks.

---

## 🚀 Features
✅ User Registration (Sign Up)  
✅ User Authentication (Sign In)  
✅ Create, Read, Delete To-Dos  
✅ PostgreSQL database integration  
✅ Fully responsive UI  
✅ Secure password handling (basic - can be improved with hashing)  
✅ RESTful API design  
✅ Clean project structure

---

## 🛠️ Tech Stack

| Frontend      | Backend           | Database    |
|---------------|-------------------|-------------|
| HTML, CSS, JS | Node.js, Express  | PostgreSQL  |

---

## 📁 Folder Structure
```
project-root/
├── server/
│   └── server.js
├── public/
│   ├── index.html
│   ├── signin.html
│   ├── signup.html
│   ├── todo.html
│   └── styles.css
├── node_modules/
├── package.json
└── README.md
```

---

## ⚙️ Prerequisites
- Node.js & npm
- PostgreSQL installed & running locally
- Basic knowledge of JavaScript and SQL

---

## 🔧 Installation & Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/Achintxv/fullstack-todo-app.git
   cd fullstack-todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**
   - Open `psql` or use `pgAdmin`
   - Create the database:
     ```sql
     CREATE DATABASE todo_app;
     ```
   - Create the `users` and `todos` tables:
     ```sql
     CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       username TEXT UNIQUE NOT NULL,
       password TEXT NOT NULL
     );

     CREATE TABLE todos (
       id SERIAL PRIMARY KEY,
       user_id INT REFERENCES users(id),
       task TEXT NOT NULL
     );
     ```

4. **Configure database connection**
   - In `server/server.js`, update the pool:
     ```javascript
     const pool = new Pool({
       user: 'your_pg_username',
       host: 'localhost',
       database: 'todo_app',
       password: 'your_pg_password',
       port: 5432,
     });
     ```

5. **Run the server**
   ```bash
   node server/server.js
   ```
   Or if using nodemon:
   ```bash
   npx nodemon server/server.js
   ```

6. **Access the app**
   - Visit: [http://localhost:3000](http://localhost:3000)
   - You'll be redirected to the **Sign In** page.
   
---

## ✨ How It Works

1. **Sign Up / Sign In**
   - Registers the user in the database (`users` table).
   - Validates credentials and starts the session (basic using `localStorage`).

2. **CRUD on Todos**
   - Create: Adds a new task to the `todos` table.
   - Read: Fetches all tasks for the logged-in user.
   - Delete: Deletes a task by ID.

---

## 📜 API Endpoints

| Method | Route        | Description            |
|--------|--------------|------------------------|
| POST   | `/signup`    | Registers a new user   |
| POST   | `/signin`    | Logs in an existing user |
| GET    | `/todos`     | Retrieves user todos   |
| POST   | `/todos`     | Adds a new todo task   |
| DELETE | `/todos/:id` | Deletes a todo by ID   |

---

## 🐞 Common Issues & Fixes

- **Port already in use**
  ```bash
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  ```

- **PostgreSQL connection errors**
  - Check if Postgres server is running
  - Verify DB name, user, password, port in `server.js`

- **"Failed to fetch" in frontend**
  - Ensure backend server is running
  - Verify correct `fetch()` URLs in frontend JS

---

## ✅ Future Enhancements
- Use `bcrypt` for password hashing  
- Add `express-session` or JWT authentication  
- Implement task update/edit functionality  
- Add due dates and task priorities  
- Deploy the app on Vercel/Render/Heroku with a remote PostgreSQL instance

---

## 🤝 Contributing
Pull requests are welcome!  
For major changes, please open an issue first to discuss what you would like to change.

---

## 🙌 Acknowledgements
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [MDN Web Docs](https://developer.mozilla.org/)
