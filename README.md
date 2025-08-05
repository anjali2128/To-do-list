# 📝 To-Do App

A sleek and responsive To-Do List application built with **React** and styled using **Bootstrap 5**. This app helps you manage your daily tasks efficiently with a modern UI and intuitive UX.


---


## 🧩 Features

- ✅ Add, edit, and delete tasks
- 📌 Mark tasks as complete/incomplete
- 📁 Task filtering (All, Completed, Pending)
- 🗃️ Stores tasks in localStorage (persistent after refresh)
- 🎨 Responsive Bootstrap layout
- 🔎 Optional: Search functionality
- 🌓 Optional: Light/Dark theme switch

---

## 🛠️ Tech Stack

### Frontend:
- ⚛️ [React.js](https://reactjs.org/)
- 🎨 [Bootstrap 5](https://getbootstrap.com/)
- 💅 Custom CSS 

### Tooling:
- 🔧 [Vite](https://vitejs.dev/) (for fast builds and hot reload)
- 🧩 npm for package management

---

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anjali2128/To-do-list.git
   cd To-Do List

2. npm install

3.npm run dev


---


> This project is purely frontend-based. All data is stored in the browser using `localStorage`. No backend or database is used.



## 📁 Project Structure

   To-do-list/
├── public/                        # Static assets
│   └── index.html
├── src/                           # Source code
│   ├── components/                # All React components & styles
│   │   ├── Login.jsx
│   │   ├── Login.css
│   │   ├── Register.jsx
│   │   ├── Register.css
│   │   ├── Todo.jsx
│   │   └── Todo.css
│   ├── App.jsx                    # Root component
│   ├── index.js                   # App entry point
│   └── main.css (if any)          # Global styles (optional)
├── package.json                   # Project metadata and dependencies
├── vite.config.js                 # Vite configuration
└── README.md                      # Project documentation


1. ## 🔐 Authentication Flow (If Login/Register are functional)

- 👤 New users can register via the **Register** form.
- 🔐 Existing users can log in using their credentials.
- 🚫 Invalid users are shown error messages.
- 🔄 Once logged in, users are redirected to the **To-Do Dashboard**.
- 🔓 Auth is client-side only (no backend). You can extend it with Firebase or your own server.


2. ## 💡 Component Overview

- **App.jsx** – Main layout and routing logic
- **Login.jsx** – Handles user login interface and logic
- **Register.jsx** – Handles new user registration
- **Todo.jsx** – Core to-do list logic: add/edit/delete/filter tasks
- ***.css** – Styles for each component

3. ## 📚 Learning Goals (Especially helpful for portfolio/GitHub readers)

This project helped reinforce concepts like:
- React functional components and hooks
- Form handling and validation
- Client-side routing (React Router)
- LocalStorage usage for persistence
- Responsive UI with Bootstrap 5
