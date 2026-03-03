# Product Requirements Document (PRD)

## 1. Overview

Build a simple e-commerce web application that allows users to browse, purchase, and manage physical products (e.g., shoes, toys, books). The platform uses a basic email/password authentication system with a hardcoded test account (example@gmail.com, password 123456789). The backend is a Node.js server that handles product data and order processing. The entire system is executable locally, with no reliance on third-party services.

---

## 2. User Stories

### 2.1. As a Visitor
- I can browse a list of products.
- I can view product details.

### 2.2. As a User (with test account)
- I can log in using the test account (example@gmail.com, password 123456789).
- I can purchase a product (simulated checkout).
- I can view my order history.

### 2.3. As an Admin (optional, for demo)
- I can add/edit/delete products via a simple admin interface or via a script.

---

## 3. Functional Requirements

### 3.1. Authentication
- Only a hardcoded test account is supported: example@gmail.com / 123456789.
- Users must log in to make purchases or view their orders.

### 3.2. Product Catalog
- Products have: name, description, image, price, and category.
- Product data is stored in a local JSON file or in-memory database.

### 3.3. Purchasing
- Simulate checkout (no real payment processing).
- After purchase, the product is added to the user's order history.

### 3.4. Order History
- Users can view a list of all their purchases.

### 3.5. Backend API
- Node.js/Express server exposes REST endpoints for:
  - Product listing and details
  - User order history
  - Purchase endpoint
  - (Optional) Admin endpoints for product management

### 3.6. Frontend
- React app with the following pages:
  - Home/Product Catalog
  - Product Details
  - Order History
  - Login Page
  - (Optional) Admin/Product Management

### 3.7. No External Services
- All data is stored locally (JSON or in-memory).
- No real payment or external authentication; everything is simulated for demo purposes.

---

## 4. Non-Functional Requirements

- The app must run locally with minimal setup (npm install, npm start).
- Clear instructions in README for running both frontend and backend.
- Clean, simple UI (no need for advanced styling).

---

## 5. Technical Stack

- Frontend: React
- Backend: Node.js with Express
- Data Storage: Local JSON files or in-memory (for demo)
- No database or external APIs required

---

## 6. Example User Flow

1. User opens the app and sees the product catalog.
2. User logs in with the test account (example@gmail.com / 123456789).
3. User selects a product and clicks "Buy".
   - Simulated checkout, order added to history.
4. User can view "Order History" page.

---

## 7. Out of Scope

- Real payment processing (Stripe, PayPal, etc.)
- User registration (only the test account is supported)
- Shipping/fulfillment for physical products

---

## 8. Deliverables

- React frontend
- Node.js backend (with REST API)
- Local data storage (JSON/in-memory)
- README with setup and run instructions 