import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { mockOrders, delay } from '../mockData';
import type { Order } from '../mockData';

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Using mock data instead of API call
    delay(300).then(() => {
      setOrders(mockOrders);
    });
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Order History</Typography>
      {orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          {orders.map(order => (
            <div key={order.id} style={{ flex: '1 1 250px', maxWidth: 320, minWidth: 250 }}>
              <Card>
                <CardMedia
                  component="img"
                  height="120"
                  image={order.product.image}
                  alt={order.product.name}
                />
                <CardContent>
                  <Typography variant="h6">{order.product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">Price: ${order.product.price.toFixed(2)}</Typography>
                  <Typography variant="body2" color="text.secondary">Date: {new Date(order.date).toLocaleString()}</Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </Box>
  );
};

export default OrderHistory; 