import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import  { useEffect } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Alert,
} from '@mui/material';

export default function Login() {
  
  const [form, setForm] = useState({ name: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  console.log(error)
  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(form.name, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.error || 'Login failed');
    }
  };
  useEffect(() => {
    const token = localStoragelocalStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Card sx={{ p: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
              Login
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={submit}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
