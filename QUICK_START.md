# 🚀 Quick Start - Grocery Store Java/React

## Prerequisites
- Java 17+ with Maven
- Node.js 16+ with npm

## Backend Setup (Java)

```bash
# Navigate to backend
cd java-backend

# Install dependencies
mvn clean install

# Run the application
mvn spring-boot:run

# Access H2 Console (optional)
# http://localhost:8080/h2-console
```

✅ Backend runs on: **http://localhost:8080**

### API Base URL
```
http://localhost:8080/api
```

---

## Frontend Setup (React)

```bash
# Navigate to frontend
cd react-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend runs on: **http://localhost:3000**

---

## Access Application

### 1. Open Browser
```
http://localhost:3000/login
```

### 2. Create Account
- Click "Sign Up"
- Fill form with:
  - Full Name
  - Email
  - Password
  - Role (User/Manager/Admin)
- Click "Sign Up"

### 3. Login
- Enter your email
- Enter your password
- Click "Login"

---

## Test Accounts

Register your own or use the signup form!

---

## Features by Role

### 👤 User Role
- Browse all products
- Filter by category
- Add to cart
- Buy now
- View product details

### 👨‍💼 Manager Role
- Create products
- Edit products
- Delete products
- Manage inventory

### 🔐 Admin Role
- Create categories
- Edit categories
- Delete categories

---

## Available Endpoints

### Users
```
POST   /api/users                    (Register)
GET    /api/users/{email}            (Get user)
```

### Categories
```
GET    /api/categories               (List all)
POST   /api/categories               (Create)
PUT    /api/categories/{id}          (Update)
DELETE /api/categories/{id}          (Delete)
```

### Products
```
GET    /api/products                 (List all)
GET    /api/products/category/{id}   (By category)
POST   /api/products                 (Create)
PUT    /api/products/{id}            (Update)
DELETE /api/products/{id}            (Delete)
```

### Cart
```
GET    /api/cart/{userId}            (Get cart)
POST   /api/cart                     (Add item)
PUT    /api/cart/{id}                (Update)
DELETE /api/cart/{id}                (Remove)
```

### Purchases
```
POST   /api/purchases                (Buy now)
```

---

## Troubleshooting

### Backend won't start
```bash
# Check if port 8080 is in use
# Or change port in: java-backend/src/main/resources/application.properties
# Find: server.port=8080
# Change to: server.port=8081 (or any free port)
```

### Frontend won't start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev

# If port 3000 is in use
npm run dev -- --port 3001
```

### API connection error
```bash
# Ensure backend is running
# Check: http://localhost:8080/api/categories
# Should return empty list or JSON data
```

### Database issues
```bash
# Backend uses H2 in-memory by default
# No setup needed!
# To use MySQL instead, update application.properties
```

---

## Build for Production

### Backend
```bash
cd java-backend
mvn clean package
java -jar target/grocerystore-1.0.0.jar
```

### Frontend
```bash
cd react-frontend
npm run build
# Deploy dist/ folder to web server
```

---

## Documentation Files

- **MIGRATION_README.md** - Complete technical documentation
- **CONVERSION_SUMMARY.md** - What was converted and how
- **QUICK_START.md** - This file!

---

**Ready to use! Open http://localhost:3000 🎉**
