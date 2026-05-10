# API Documentation - Grocery Store

Base URL: `http://localhost:8080/api`

---

## 👤 User Endpoints

### Register User
**POST** `/users`

Request:
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123",
  "role": "user"
}
```

Response (201):
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "role": "user",
  "active": true,
  "cart": []
}
```

---

### Get User by Email
**GET** `/users/{email}`

Response (200):
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "role": "user",
  "active": true,
  "cart": []
}
```

---

### Get All Users
**GET** `/users`

Response (200):
```json
[
  {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "active": true,
    "cart": []
  }
]
```

---

### Update User
**PUT** `/users/{id}`

Request:
```json
{
  "email": "newemail@example.com",
  "name": "Jane Doe",
  "password": "newpassword",
  "role": "user"
}
```

Response (200):
```json
{
  "id": 1,
  "email": "newemail@example.com",
  "name": "Jane Doe",
  "role": "user",
  "active": true,
  "cart": []
}
```

---

### Delete User
**DELETE** `/users/{id}`

Response (200):
```json
{
  "message": "User deleted successfully"
}
```

---

## 📦 Category Endpoints

### Get All Categories
**GET** `/categories`

Response (200):
```json
[
  {
    "id": 1,
    "name": "Fruits",
    "products": []
  },
  {
    "id": 2,
    "name": "Vegetables",
    "products": []
  }
]
```

---

### Get Category by ID
**GET** `/categories/{id}`

Response (200):
```json
{
  "id": 1,
  "name": "Fruits",
  "products": []
}
```

---

### Create Category
**POST** `/categories`

Request:
```json
{
  "name": "Fruits"
}
```

Response (201):
```json
{
  "id": 1,
  "name": "Fruits",
  "products": []
}
```

---

### Update Category
**PUT** `/categories/{id}`

Request:
```json
{
  "name": "Fresh Fruits"
}
```

Response (200):
```json
{
  "id": 1,
  "name": "Fresh Fruits",
  "products": []
}
```

---

### Delete Category
**DELETE** `/categories/{id}`

Response (200):
```json
{
  "message": "Category deleted successfully"
}
```

---

## 🥕 Product Endpoints

### Get All Products
**GET** `/products`

Response (200):
```json
[
  {
    "id": 1,
    "name": "Apple",
    "price": 50,
    "unit": "kg",
    "expiry": "2024-12-31",
    "availability": 100,
    "categoryId": 1
  }
]
```

---

### Get Product by ID
**GET** `/products/{id}`

Response (200):
```json
{
  "id": 1,
  "name": "Apple",
  "price": 50,
  "unit": "kg",
  "expiry": "2024-12-31",
  "availability": 100,
  "categoryId": 1
}
```

---

### Get Products by Category
**GET** `/products/category/{categoryId}`

Response (200):
```json
[
  {
    "id": 1,
    "name": "Apple",
    "price": 50,
    "unit": "kg",
    "expiry": "2024-12-31",
    "availability": 100,
    "categoryId": 1
  }
]
```

---

### Create Product
**POST** `/products`

Request:
```json
{
  "name": "Apple",
  "price": 50,
  "unit": "kg",
  "expiry": "2024-12-31",
  "availability": 100,
  "categoryId": 1
}
```

Response (201):
```json
{
  "id": 1,
  "name": "Apple",
  "price": 50,
  "unit": "kg",
  "expiry": "2024-12-31",
  "availability": 100,
  "categoryId": 1
}
```

---

### Update Product
**PUT** `/products/{id}`

Request:
```json
{
  "name": "Fresh Apple",
  "price": 60,
  "unit": "kg",
  "expiry": "2024-12-31",
  "availability": 80,
  "categoryId": 1
}
```

Response (200):
```json
{
  "id": 1,
  "name": "Fresh Apple",
  "price": 60,
  "unit": "kg",
  "expiry": "2024-12-31",
  "availability": 80,
  "categoryId": 1
}
```

---

### Delete Product
**DELETE** `/products/{id}`

Response (200):
```json
{
  "message": "Product deleted successfully"
}
```

---

## 🛒 Cart Endpoints

### Get Cart by User ID
**GET** `/cart/{userId}`

Response (200):
```json
[
  {
    "id": 1,
    "userId": 1,
    "productId": 1,
    "quantity": 5
  }
]
```

---

### Add Item to Cart
**POST** `/cart`

Request:
```json
{
  "userId": 1,
  "productId": 1,
  "quantity": 5
}
```

Response (201):
```json
{
  "id": 1,
  "userId": 1,
  "productId": 1,
  "quantity": 5
}
```

---

### Update Cart Item
**PUT** `/cart/{id}`

Request:
```json
{
  "userId": 1,
  "productId": 1,
  "quantity": 10
}
```

Response (200):
```json
{
  "id": 1,
  "userId": 1,
  "productId": 1,
  "quantity": 10
}
```

---

### Remove from Cart
**DELETE** `/cart/{id}`

Response (200):
```json
{
  "message": "Cart item deleted successfully"
}
```

---

## 💳 Purchase Endpoints

### Purchase Item (BuyNow)
**POST** `/purchases`

Request:
```json
{
  "userId": 1,
  "productId": 1
}
```

Response (200):
```json
{
  "message": "Order successful",
  "purchase": {
    "id": 1,
    "userId": 1,
    "productId": 1
  }
}
```

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "message": "One or more fields are empty"
}
```

### 404 Not Found
```json
{
  "message": "User not found"
}
```

### 409 Conflict
```json
{
  "message": "User account already exists"
}
```

---

## 📋 Request Headers

All requests should include:
```
Content-Type: application/json
```

---

## 🔄 Data Types

| Type | Format | Example |
|------|--------|---------|
| ID | Long | 1, 45, 1000 |
| Email | String | user@example.com |
| Name | String | John Doe |
| Price | Integer | 50 (in rupees) |
| Unit | String | kg, liter, piece |
| Availability | Integer | 100 |
| Role | String | user, manager, admin |

---

## 🧪 cURL Examples

### Register User
```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@test.com",
    "name": "Test User",
    "password": "password123",
    "role": "user"
  }'
```

### Create Category
```bash
curl -X POST http://localhost:8080/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Fruits"}'
```

### Get All Products
```bash
curl -X GET http://localhost:8080/api/products
```

### Add to Cart
```bash
curl -X POST http://localhost:8080/api/cart \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "productId": 1,
    "quantity": 5
  }'
```

---

**API Documentation Complete! 📚**
