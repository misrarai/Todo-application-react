 import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,

} from '@mui/material';

export default function TaskCard({ task, onDelete }) {
  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        p: 1,
        borderRadius: 2,
        boxShadow: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}
    >
      {/* Left Side - Task Details */}
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {task.description}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Category: <b>{task.category}</b> <br />
          Deadline: {task.deadline?.slice(0, 10)}
        </Typography>
      </CardContent>

      {/* Right Side - Buttons */}
      <CardActions sx={{ flexDirection: 'column', alignItems: 'flex-end' }}>
        <Button
          component={Link}
          to={`/task/${task._id}`}
          variant="outlined"
          color="primary"
          size="small"
          sx={{ mb: 1 }}
        >
          View
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
