# 📝 To-Do Web App

A simple and responsive To-Do Web App built to manage daily tasks in an organized way. Users can add, edit, complete, and delete tasks while keeping their tasks saved in the browser using Local Storage.

## 🚀 Features

* ➕ Add new tasks
* ✏️ Edit existing tasks
* 🗑️ Delete tasks
* ✅ Mark tasks as completed
* 📋 View all tasks
* ✔️ View completed tasks
* ⏳ View pending tasks
* 💾 Save tasks using Local Storage
* 📅 Display task creation date
* ⌨️ Add tasks using the Enter key
* 📱 Responsive design for different screen sizes
* 🧹 Clear all tasks

## 🛠️ Technologies Used

* **HTML5** — Structure of the application
* **CSS3** — Styling, layout, and responsive design
* **JavaScript** — Task management and interactivity
* **Local Storage** — Persistent task data in the browser
* **Font Awesome** — Edit and delete icons

## 📂 Project Structure

```text
To-Do-WebApp/
│
├── Assets/
│   └── no tasks.png
│
├── index.html
├── style.css
└── script.js
```

## ⚙️ How It Works

Tasks are stored as JavaScript objects containing the task name, completion status, and creation date.

Example:

```javascript
{
    taskname: "Complete JavaScript practice",
    completed: false,
    date: "8/31/2026"
}
```

The tasks are stored in the browser's **Local Storage**, so they remain available even after refreshing or reopening the page.

## 💾 Local Storage

The application stores tasks using:

```javascript
localStorage.setItem(
    "savedTasks",
    JSON.stringify(savedTasks)
);
```

When the application loads, the saved tasks are retrieved using:

```javascript
JSON.parse(
    localStorage.getItem("savedTasks")
);
```

## 🎯 Task Categories

The application uses the task's `completed` property to determine its category:

* **All Tasks** → Displays every task
* **Completed** → Displays tasks where `completed` is `true`
* **Pending** → Displays tasks where `completed` is `false`

## 📱 Responsive Design

The interface is designed to work across:

* 💻 Desktop
* 📱 Mobile
* 📟 Tablet

The layout automatically adjusts the task input, buttons, task list, and navigation links according to the screen size.

## ▶️ How to Run

1. Download or clone this repository.
2. Open the project folder.
3. Open `index.html` in your browser.
4. Start adding tasks.

No backend or installation is required.

## 📚 What I Practiced

This project helped me practice:

* DOM manipulation
* JavaScript event listeners
* Arrays and objects
* `for...of` loops
* Array `.entries()`
* Conditional rendering
* Event delegation
* Local Storage
* JSON `stringify()` and `parse()`
* Responsive CSS
* Basic CRUD operations

## 👨‍💻 Project

Built as part of my frontend development internship practice to strengthen my HTML, CSS, and JavaScript skills.
