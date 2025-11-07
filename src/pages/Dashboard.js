import  { useEffect, useState} from "react";
import { getAllTasks, deleteTask } from "../services/taskService";
 
import { useNavigate } from "react-router-dom";
import {
  List, stItem,Pagination,Stack,Box,Button,Typography,Select,MenuItem,Grid,Alert,InputLabel,FormControl,Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from "@mui/material";
 

  export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [page,setPage] = useState(1);
  const [totalPages,setTotalPages] = useState(1);
  const navigate = useNavigate();
  const limit = 10;
    
  const handlePrev = () => {
  
  if (page > 1) setPage(page - 1);

};

const handleNext = () => {
if (page < totalPages) {
  setPage(prev => prev + 1);
  setPage((prev) => {return prev + 1});
  console.log(page);
}
  
};

  const loadTasks = async () => {
    try {
     const res = category ? await getAllTasks(page,limit,category) : await getAllTasks(page,limit);

      
      setTasks(res.data.tasks);
      setTotalPages(res.data.totalPages);
  
    } catch (err) {
      setError(err?.response?.data?.error || "Could not fetch tasks");
    }
  };

  useEffect(() => {
    loadTasks(); 
  }, [category,page]); 

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    await deleteTask(id);
    loadTasks();
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Your Tasks
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Filter"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Personal">Personal</MenuItem>
              <MenuItem value="Office">Office</MenuItem>
            </Select>
          </FormControl>
          

          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/task/new")}
          >
            New Task
          </Button>
        </Box>
      </Box>

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

  {/* Task List */}
{tasks.length === 0 ? (
  <Typography>No tasks yet.</Typography>
) : (
  <>
   <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2 }}>
  <Table>
    <TableHead>
      <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
        <TableCell><strong>Title</strong></TableCell>
        <TableCell><strong>Description</strong></TableCell>
        <TableCell><strong>Category</strong></TableCell>
        <TableCell><strong>Deadline</strong></TableCell>
        <TableCell align="center"><strong>Actions</strong></TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {tasks.map((task) => (
        <TableRow key={task._id} hover>
          <TableCell>{task.title}</TableCell>
          <TableCell>{task.description || "No description"}</TableCell>
          <TableCell>{task.category}</TableCell>
          <TableCell>{task.deadline ? task.deadline.slice(0, 10) : "N/A"}</TableCell>
          <TableCell align="center">
            <Button
              variant="outlined"
              size="small"
              sx={{ mr: 1 }}
              onClick={() => navigate(`/task/${task._id}`)}
            >
              View
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => handleDelete(task._id)}
            >
              Delete
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>


   
    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
      <Button variant="outlined" onClick={handlePrev} disabled={page === 1}>Previous</Button>
      <Typography variant="body2" sx={{ alignSelf: "center" }}>Page {page} of {totalPages}</Typography>
      <Button variant="outlined" onClick={handleNext} disabled={page === totalPages}>Next</Button>
    </Box>
  </>
)}
</Box>
)};
