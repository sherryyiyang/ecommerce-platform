import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { Card, CardContent, CardMedia, Typography, Button, Snackbar, Box } from '@mui/material';
import { mockProducts, delay } from '../mockData';
import type { Product } from '../mockData';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({ open: false, message: '' });
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Using mock data instead of API call
    delay(300).then(() => {
      const foundProduct = mockProducts.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setError('Product not found.');
      }
      setLoading(false);
    });
  }, [id]);

  const handleBuy = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    // Mock purchase - simulate successful purchase
    delay(500).then(() => {
      setSnackbar({ open: true, message: 'Purchase successful!' });
    });
  };

  if (loading) return <Typography>Loading product...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!product) return <Typography>Product not found.</Typography>;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <Card sx={{ maxWidth: 500, width: '100%' }}>
        <CardMedia
          component="img"
          height="250"
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary">Category: {product.category}</Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>Price: ${product.price.toFixed(2)}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>{product.description}</Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handleBuy}
            disabled={!isAuthenticated}
          >
            Buy
          </Button>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: '' })}
        message={snackbar.message}
      />
    </Box>
  );
};

export default ProductDetails; 