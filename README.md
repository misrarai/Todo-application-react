 # 📝 To-Do Application (React Frontend)

![React](https://img.shields.io/badge/React-17.0.2-blue) ![Material-UI](https://img.shields.io/badge/Material--UI-5.15.7-orange) ![License](https://img.shields.io/badge/License-MIT-green)

A modern, responsive **To-Do application** built with **React.js** and **Material-UI**, enabling users to manage tasks efficiently with **CRUD operations**, **category filtering**, and **pagination**.  

---

## 🚀 Features

- Create, Read, Update, and Delete tasks.  
- Categorize tasks: **Personal** or **Office**.  
- Set and track task **deadlines**.  
- **Pagination**: 10 tasks per page with Previous/Next navigation.  
- **Filter tasks** by category.  
- **Responsive design**: works on desktop and mobile.  
- JWT token-based API authentication.  

---

## 🛠 Technology Stack

- **Frontend:** React.js, React Router DOM  
- **UI Library:** Material-UI (MUI)  
- **HTTP Client:** Axios  
- **State Management:** React Hooks (`useState`, `useEffect`)  
- **API:** RESTful API integration  

---

## 📂 Project Structure

src/
├─ components/ # Reusable UI components (Buttons, Forms, Table)
├─ pages/ # Pages (Dashboard, TaskDetails, Login)
├─ services/ # Axios API calls
├─ App.js # Main App component
├─ index.js # Entry point
└─ styles/ # Custom styles (optional)

yaml
Copy code

---

## ⚡ Installation & Setup

1. Clone the repository:  
```bash
git clone https://github.com/your-username/todo-react-frontend.git
cd todo-react-frontend
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
Open your browser at: http://localhost:3000

Make sure the backend API is running for full functionality.

🖥 Usage
Dashboard displays tasks in a table view with columns: Title, Description, Category, Deadline, Actions.

Add Task: Click "New Task" to create.

Edit/View: Click respective buttons in the Actions column.

Delete: Remove tasks with confirmation.

Filter by Category: Use dropdown to view specific categories.

Pagination: Navigate through pages using Previous and Next buttons.

🔗 API Endpoints
Method	Endpoint	Description
GET	/tasks/all	Get all tasks with pagination
POST	/tasks	Create a new task
PUT	/tasks/:id	Update a task by ID
DELETE	/tasks/:id	Delete a task by ID
GET	/tasks/filter?category=Personal	Filter tasks by category

📊 Pagination & Filtering
Pagination: 10 tasks per page.

Next/Previous Buttons: Navigate between pages.

Category Filter: Displays tasks by selected category.

Table Layout: Shows task details in clean columns.
