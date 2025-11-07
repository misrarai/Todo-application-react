import axios from "axios";

//  Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend base URL ya api request k agy lag jata hai,
});

//  Add JWT token to every request
api.interceptors.request.use((config) => {  //interceptors  
  const token = localStorage.getItem("token");

  if (token) {
    
    config.headers.Authorization = `Bearer ${token}`;
      
  }
  return config;
});

//  Handle expired token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirect if token expired
    }
    return Promise.reject(error);
  }
);
export { api };
//  Get all tasks

//export const getAllTasks = (page, itemsPerPage, category) => api.get(`/tasks/all?page=${page}&itemsPerPage=${itemsPerPage} &category=${category}`);
export const getAllTasks = (page, limit, category = "") =>api.get(`/tasks/all?page=${page}&limit=${limit}&category=${category}`);



//  Get tasks filtered by category
// export const filterTasks = (category) => api.get(`/tasks/filter?category=${category}`);
 


//  Get single task by ID
export const getTask = (id) => api.get(`/tasks/${id}`);

//  Create new task
export const createTask = (data) => api.post("/tasks/create", data);

//  Update existing task
export const updateTask = (id, data) => api.post(`/tasks/update/${id}`, data);

//  Delete task
export const deleteTask = (id) => api.post(`/tasks/delete/${id}`);
