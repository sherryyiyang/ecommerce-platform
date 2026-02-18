import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Link as RouterLink } from 'react-router-dom';
import Login from './pages/Login';
import ProductCatalog from './pages/ProductCatalog';
import ProductDetails from './pages/ProductDetails';
import OrderHistory from './pages/OrderHistory';
import AdminPage from './pages/AdminPage';
import { AppBar, Toolbar, Typography, Button, Box, CssBaseline, ThemeProvider, createTheme, Container } from '@mui/material';

// Auth context
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});
export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected route
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const theme = createTheme();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppLayout />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

const AppLayout: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
            E-commerce Platform
          </Typography>
          <Button color="inherit" component={RouterLink} to="/">Catalog</Button>
          {isAuthenticated && <Button color="inherit" component={RouterLink} to="/orders">Orders</Button>}
          {isAuthenticated && <Button color="inherit" component={RouterLink} to="/admin">Admin</Button>}
          {isAuthenticated ? (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          ) : (
            <Button color="inherit" component={RouterLink} to="/login">Login</Button>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ minHeight: 'calc(100vh - 64px)', bgcolor: '#f5f5f5', py: 4 }}>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/login" element={<LoginPageWrapper />} />
            <Route path="/" element={<ProductCatalog />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route
              path="/orders"
              element={
                <RequireAuth>
                  <OrderHistory />
                </RequireAuth>
              }
            />
            <Route
              path="/admin"
              element={
                <RequireAuth>
                  <AdminPage />
                </RequireAuth>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>
      </Box>
    </>
  );
};

// Wrapper to handle login and redirect
const LoginPageWrapper: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  if (isAuthenticated) {
    navigate('/');
    return null;
  }
  return <Login onLogin={() => { login(); navigate('/'); }} />;
};

export default App;
