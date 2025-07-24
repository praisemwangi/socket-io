# 🚀 Socket.IO with Express - Real-Time Communication Setup  

A simple Node.js server using **Express** and **Socket.IO** for real-time bidirectional communication.  

---

## 📋 Prerequisites  
- Node.js (v14+)  
- npm (or yarn)  

---

## 🛠️ Setup  

### 1. **Install Dependencies**  
```bash
mkdir socket-io-app
cd socket-io-app
npm init -y
npm install express socket.io dotenv cors
```  

### 2. **Project Structure**  
```
socket-io-app/
├── server.js       # Main server setup
├── .env            # Environment variables
├── package.json
└── README.md
```  

### 3. **Configure the Server**  
#### **`server.js`**  
```javascript
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.IO setup with CORS
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins (customize in production)
  },
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```  

#### **`.env`**  
```env
PORT=5000
```  

### 4. **Run the Server**  
```bash
node server.js
```  
**Output:**  
```
Server running on port 5000
```  

---

## 🌟 Key Features  
✅ **Real-time events** with Socket.IO  
✅ **CORS support** for cross-origin requests  
✅ **Environment variables** via `dotenv`  
✅ **Automatic WebSocket fallback** to HTTP Long Polling  

---

## 📡 Testing Socket.IO  
### **Client-Side Example (HTML/JS)**  
```html
<script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
<script>
  const socket = io('http://localhost:5000');

  socket.on('connect', () => {
    console.log('Connected to server!');
  });
</script>
```  

---

## 🔧 Extending Functionality  
- **Broadcast messages** to all clients:  
  ```javascript
  socket.on('chatMessage', (msg) => {
    io.emit('newMessage', msg); // Send to everyone
  });
  ```  
- **Room-based communication**:  
  ```javascript
  socket.join('room1');
  io.to('room1').emit('roomMessage', 'Hello room!');
  ```  

---

## 📜 License  
MIT  

---

**🎉 Happy Coding!**  
Replace `origin: '*'` with your frontend URL (e.g., `http://localhost:3000`) in production for security.
