import  { useState, useEffect } from 'react';
import { getTask, updateTask } from '../services/taskService';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container, Card, CardContent, TextField, Typography, Button, Select, MenuItem, FormControl, InputLabel, Box,Table,TableBody,TableCell,TableContainer,TableRow, Paper
} from '@mui/material';

export default function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  // Load single task details
  useEffect(() => {
    (async () => {
      try {
        const res = await getTask(id);
        setTask(res.data);
        setForm({
          title: res.data.title,
          description: res.data.description,
          category: res.data.category,
          deadline: res.data.deadline?.slice(0, 10),
        });
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  // Update task
  const save = async () => {
    try {
      await updateTask(id, form);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  if (!task) return <Typography>Loading...</Typography>;

return (
  <Container maxWidth="md" sx={{ mt: 8 }}>
    <Card
      sx={{
        p: 4,
        borderRadius: 3,
        boxShadow: 5,
        backgroundColor: "#fafafa",
      }}
    >
      <CardContent>
        {!editMode ? (
          <>
            <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
              Task Details
            </Typography>

            <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2, mb: 3 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", width: "30%" }}>Title</TableCell>
                    <TableCell>{task.title}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                    <TableCell>{task.description || "No description provided."}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                    <TableCell>{task.category}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Deadline</TableCell>
                    <TableCell>{task.deadline ? task.deadline.slice(0, 10) : "No deadline"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button variant="contained" color="primary" onClick={() => setEditMode(true)}>
                Edit Task
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => navigate("/dashboard")}>
                Back
              </Button>
            </Box>
          </>
        ) : (
          <>
            {/* ===== EDIT MODE FORM ===== */}
            <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
              Edit Task
            </Typography>

            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              margin="normal"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              margin="normal"
              multiline
              minRows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                value={form.category}
                label="Category"
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <MenuItem value="Personal">Personal</MenuItem>
                <MenuItem value="Office">Office</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Deadline"
              type="date"
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            />

            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
              <Button variant="contained" color="primary" onClick={save}>
                Save Changes
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  </Container>
);

}
