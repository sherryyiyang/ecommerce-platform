import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, TextField, Box, Snackbar } from '@mui/material';
import { mockProducts, delay } from '../mockData';
import type { Product } from '../mockData';

const emptyProduct: Product = {
  id: '',
  name: '',
  description: '',
  image: '',
  price: 0,
  category: '',
};

const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<Product>(emptyProduct);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({ open: false, message: '' });

  useEffect(() => {
    // Using mock data instead of API call
    delay(300).then(() => {
      setProducts([...mockProducts]);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (product: Product) => {
    setEditing(product);
    setForm(product);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    setSnackbar({ open: true, message: 'Product deleted (UI only, not persisted).' });
    // In real app, call backend
    // fetch(`/api/products/${id}`, { method: 'DELETE' }) ...
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setProducts(products.map(p => (p.id === editing.id ? { ...form, id: editing.id } : p)));
      setEditing(null);
      setSnackbar({ open: true, message: 'Product updated (UI only, not persisted).' });
    } else {
      setProducts([...products, { ...form, id: Math.random().toString(36).substr(2, 9) }]);
      setSnackbar({ open: true, message: 'Product added (UI only, not persisted).' });
    }
    setForm(emptyProduct);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Admin - Product Management</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <TextField name="name" label="Name" value={form.name} onChange={handleChange} required sx={{ flex: 1 }} />
        <TextField name="category" label="Category" value={form.category} onChange={handleChange} required sx={{ flex: 1 }} />
        <TextField name="price" label="Price" type="number" value={form.price} onChange={handleChange} required sx={{ flex: 1 }} />
        <TextField name="image" label="Image URL" value={form.image} onChange={handleChange} required sx={{ flex: 2 }} />
        <TextField name="description" label="Description" value={form.description} onChange={handleChange} required sx={{ flex: 2 }} />
        <Button type="submit" variant="contained" color="primary">{editing ? 'Update' : 'Add'} Product</Button>
        {editing && <Button type="button" variant="outlined" color="secondary" onClick={() => { setEditing(null); setForm(emptyProduct); }}>Cancel</Button>}
      </Box>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {products.map(product => (
          <div key={product.id} style={{ flex: '1 1 250px', maxWidth: 320, minWidth: 250 }}>
            <Card>
              <CardMedia
                component="img"
                height="120"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">Category: {product.category}</Typography>
                <Typography variant="body2" color="text.secondary">Price: ${product.price.toFixed(2)}</Typography>
                <Button onClick={() => handleEdit(product)} sx={{ mt: 1, mr: 1 }} size="small" variant="outlined">Edit</Button>
                <Button onClick={() => handleDelete(product.id)} sx={{ mt: 1 }} size="small" color="error" variant="contained">Delete</Button>
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

export default AdminPage; 