import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://your-finstacam-domain.vercel.app"],
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Store connected devices
const connectedDevices = new Map();
const desktopClients = new Set();

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Handle desktop client connection
  socket.on('desktop-connect', () => {
    desktopClients.add(socket.id);
    console.log(`Desktop client connected: ${socket.id}`);
    
    // Send current connection status
    socket.emit('connection-status', {
      mobileConnected: connectedDevices.size > 0,
      connectedDevices: Array.from(connectedDevices.keys())
    });
  });

  // Handle mobile device connection
  socket.on('mobile-connect', (deviceInfo) => {
    const deviceId = socket.id;
    connectedDevices.set(deviceId, {
      id: deviceId,
      info: deviceInfo,
      connectedAt: new Date()
    });
    
    console.log(`Mobile device connected: ${deviceId}`);
    
    // Notify all desktop clients about new mobile connection
    desktopClients.forEach(clientId => {
      io.to(clientId).emit('mobile-connected', {
        deviceId,
        deviceInfo,
        connectedAt: new Date()
      });
    });
  });

  // Handle selfie capture from mobile
  socket.on('selfie-captured', (imageData) => {
    console.log(`Selfie captured from device: ${socket.id}`);
    
    // Broadcast to all desktop clients
    desktopClients.forEach(clientId => {
      io.to(clientId).emit('new-selfie', {
        deviceId: socket.id,
        imageData,
        timestamp: new Date(),
        id: Date.now() + Math.random()
      });
    });
  });

  // Handle mobile device disconnect
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
    
    // Remove from desktop clients
    if (desktopClients.has(socket.id)) {
      desktopClients.delete(socket.id);
      console.log(`Desktop client disconnected: ${socket.id}`);
    }
    
    // Remove from mobile devices
    if (connectedDevices.has(socket.id)) {
      connectedDevices.delete(socket.id);
      console.log(`Mobile device disconnected: ${socket.id}`);
      
      // Notify desktop clients about mobile disconnect
      desktopClients.forEach(clientId => {
        io.to(clientId).emit('mobile-disconnected', {
          deviceId: socket.id
        });
      });
    }
  });

  // Handle connection status request
  socket.on('get-connection-status', () => {
    socket.emit('connection-status', {
      mobileConnected: connectedDevices.size > 0,
      connectedDevices: Array.from(connectedDevices.keys())
    });
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    connectedDevices: connectedDevices.size,
    desktopClients: desktopClients.size
  });
});

// Serve mobile interface
app.get('/mobile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'mobile.html'));
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 FinstaCam Backend Server running on port ${PORT}`);
  console.log(`📱 Mobile interface: http://localhost:${PORT}/mobile`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
}); 