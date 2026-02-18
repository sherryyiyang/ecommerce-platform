// Mock data for the e-commerce platform (used until backend is implemented)

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
}

export interface Order {
  id: string;
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
  };
  date: string;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
    price: 199.99,
    category: 'Electronics',
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Feature-packed smartwatch with fitness tracking, heart rate monitor, and GPS.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop',
    price: 299.99,
    category: 'Electronics',
  },
  {
    id: '3',
    name: 'Laptop Stand',
    description: 'Ergonomic aluminum laptop stand with adjustable height and angle.',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop',
    price: 49.99,
    category: 'Accessories',
  },
  {
    id: '4',
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with blue switches and customizable backlighting.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=200&fit=crop',
    price: 129.99,
    category: 'Electronics',
  },
  {
    id: '5',
    name: 'USB-C Hub',
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader.',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=300&h=200&fit=crop',
    price: 39.99,
    category: 'Accessories',
  },
  {
    id: '6',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking and long battery life.',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=200&fit=crop',
    price: 59.99,
    category: 'Electronics',
  },
  {
    id: '7',
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness and color temperature.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=200&fit=crop',
    price: 45.99,
    category: 'Home',
  },
  {
    id: '8',
    name: 'Phone Case',
    description: 'Slim protective phone case with shock absorption and wireless charging support.',
    image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=300&h=200&fit=crop',
    price: 24.99,
    category: 'Accessories',
  },
];

export const mockOrders: Order[] = [
  {
    id: 'ord-1',
    product: {
      id: '2',
      name: 'Smart Watch',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop',
      price: 299.99,
    },
    date: '2026-01-25T10:30:00Z',
  },
  {
    id: 'ord-2',
    product: {
      id: '4',
      name: 'Mechanical Keyboard',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=200&fit=crop',
      price: 129.99,
    },
    date: '2026-01-20T14:15:00Z',
  },
  {
    id: 'ord-3',
    product: {
      id: '1',
      name: 'Wireless Headphones',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
      price: 199.99,
    },
    date: '2026-01-15T09:00:00Z',
  },
];

// Simulate async API calls
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
