import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { Card, CardContent, CardMedia, Typography, Button, Snackbar, Box } from '@mui/material';
import { mockProducts, delay } from '../mockData';
import type { Product } from '../mockData';

const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({ open: false, message: '' });
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Using mock data instead of API call
    delay(300).then(() => {
      setProducts(mockProducts);
    });
  }, []);

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

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Product Catalog</Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {products.map(product => (
          <div key={product.id} style={{ flex: '1 1 250px', maxWidth: 320, minWidth: 250 }}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="180"
                image={product.image}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">Category: {product.category}</Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>Price: ${product.price.toFixed(2)}</Typography>
                <Button
                  component={Link}
                  to={`/product/${product.id}`}
                  size="small"
                  sx={{ mt: 1, mr: 1 }}
                >
                  View Details
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ mt: 1 }}
                  onClick={() => handleBuy()}
                  disabled={!isAuthenticated}
                >
                  Buy
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: '' })}
        message={snackbar.message}
      />
    </Box>
  );
};

export default ProductCatalog; 