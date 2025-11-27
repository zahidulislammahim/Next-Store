# 🏬 Next Store

A modern eCommerce web application built with **Next.js**, **MongoDB**, and **Clerk Authentication**. This project includes full user and admin features, product management, cart system, secure authentication, and a fully responsive UI.

---

## ⭐ Overview

Next Store is a full‑stack eCommerce application where users can browse products, add them to the cart, manage orders, and check out. Admins can add, edit, and manage products with a dedicated backend.

---

## 📦 Tech Stack

### **Frontend:**

* Next.js (App Router)
* React
* Tailwind CSS
* ShadCN UI
* Clerk Authentication

### **Backend:**

* Node.js
* Express.js
* MongoDB (Driver & Atlas)

### **Utilities:**

* Axios
* JWT (Clerk provides session)
* Vercel Deployment

---

## 🛠️ Project Structure

```
Next-Store/
├── app/
│   ├── (routes)
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── styles/
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── db/
│   └── server.js
├── public/
├── package.json
└── README.md
```

---

## 🔐 Authentication (Clerk)

* User login/signup with Clerk
* Google & Email authentication
* Clerk ProtectRoute & Webhooks
* Role-based access for the admin panel

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/zahidulislammahim/Next-Store.git
cd Next-Store
```

---

## ⚙️ Frontend Setup

Install dependencies:

```bash
npm install
```

### Create `.env.local` file

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

---

## ⚙️ Backend Setup

Go to the backend folder:

```bash
cd backend
npm install
```

### Create `.env` file

```
PORT=5000
DB_USER=your_user
DB_PASS=your_password
```

Start backend:

```bash
node server.js
```

---

## 🧩 Main Features

## 🌟 User Side

* User login/signup
* Browse products
* Product filtering & search
* Add to cart
* Cart management
* Checkout flow
* Order saved in the database

---

## 🛠️ Developer Side

* Product CRUD (Admin)
* Order management
* Image upload handling
* Protected routes

---

## 🖥️ Backend API Endpoints

```
POST   /product            → Add product
GET    /products           → Get all products
GET    /products/:id       → Get single product
DELETE /products/:id       → Delete product
PUT    /products/:id       → Update product
```

---

## 📜 Scripts

### Frontend

```bash
npm run dev
npm run build
npm start
```

### Backend

```bash
node server.js
```

---

## 👨‍💻 Author

**Zahidul Islam Mahim**
MERN Stack Developer

If you like this project, don't forget to ⭐ the repository!
