import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Alert } from '@mui/material';

const TEST_EMAIL = 'example@gmail.com';
const TEST_PASSWORD = '123456789';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === TEST_EMAIL && password === TEST_PASSWORD) {
      setError('');
      onLogin();
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <Card sx={{ minWidth: 350, p: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Login</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
              autoComplete="username"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
              autoComplete="current-password"
            />
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </form>
          <Box mt={3} fontSize={12} color="text.secondary">
            <Typography variant="body2">
              <strong>Test Account:</strong><br />
              Email: <code>example@gmail.com</code><br />
              Password: <code>123456789</code>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login; 