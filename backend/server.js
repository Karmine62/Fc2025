import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { writeFile, readFile } from 'node:fs/promises';
import dotenv from 'dotenv';
dotenv.config();

// Google Sheets and OpenAI setup
import { google } from 'googleapis';
import OpenAI from 'openai';
import Replicate from 'replicate';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const sheets = google.sheets({ version: 'v4', auth: process.env.GOOGLE_SHEETS_API_KEY });
const SHEET_ID = process.env.GOOGLE_SHEET_ID;

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

// --- TEST ENDPOINTS ---
// Test Google Sheets API
app.get('/test-google-sheets', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'A1:B2', // test range
    });
    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Test OpenAI API
app.get('/test-openai', async (req, res) => {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say hello!" }],
    });
    res.json({ success: true, data: chatCompletion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- GOOGLE SHEETS INTEGRATION ---
// Function to fetch prompt from Google Sheets
async function fetchPromptFromSheet(range) {
  try {
    console.log(`Fetching prompt from range: ${range}`);
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: range,
    });

    if (!response.data.values || response.data.values.length === 0) {
      throw new Error(`No data found in range: ${range}`);
    }

    // Get the first value from the range (assuming it's the prompt)
    const prompt = response.data.values[0][0];
    console.log(`Fetched prompt: ${prompt}`);
    
    return prompt;
  } catch (error) {
    console.error('Error fetching prompt from sheet:', error);
    throw error;
  }
}

// Function to parse sheet coordinates from scene description
function parseSheetCoordinates(description) {
  // Look for patterns like "A2,D2" or "A3,D3" in the description
  const coordinatePattern = /([A-Z]\d+),([A-Z]\d+)/;
  const match = description.match(coordinatePattern);
  
  if (match) {
    return {
      start: match[1], // e.g., "A2"
      end: match[2]    // e.g., "D2"
    };
  }
  
  return null;
}

// Endpoint to get prompt for a specific scene
app.post('/api/get-prompt', async (req, res) => {
  try {
    const { sceneName, sceneDescription } = req.body;
    
    console.log(`Getting prompt for scene: ${sceneName}`);
    console.log(`Scene description: ${sceneDescription}`);
    
    // Parse coordinates from description
    const coordinates = parseSheetCoordinates(sceneDescription);
    
    if (!coordinates) {
      return res.status(400).json({ 
        success: false, 
        error: 'No valid sheet coordinates found in scene description' 
      });
    }
    
    // Create range string (e.g., "A2:D2")
    const range = `${coordinates.start}:${coordinates.end}`;
    
    // Fetch prompt from sheet
    const prompt = await fetchPromptFromSheet(range);
    
    res.json({ 
      success: true, 
      prompt: prompt,
      sceneName: sceneName,
      range: range
    });
    
  } catch (error) {
    console.error('Error in get-prompt endpoint:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Test endpoint to get all available ranges from sheet
app.get('/api/test-sheet-ranges', async (req, res) => {
  try {
    // Test a few common ranges to see what's available
    const testRanges = ['A1:D1', 'A2:D2', 'A3:D3', 'A4:D4'];
    const results = {};
    
    for (const range of testRanges) {
      try {
        const prompt = await fetchPromptFromSheet(range);
        results[range] = prompt;
      } catch (error) {
        results[range] = `Error: ${error.message}`;
      }
    }
    
    res.json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- OPENAI IMAGE GENERATION ---
// Function to generate image using GPT-IMAGE-1
async function generateImageWithGPTImage1(prompt, userImageData) {
  try {
    console.log('Generating image with GPT-IMAGE-1...');
    console.log('Prompt:', prompt);
    
    // Create the vision message with the user's image
    const visionMessage = {
      role: "user",
      content: [
        {
          type: "text",
          text: prompt
        },
        {
          type: "image_url",
          image_url: {
            url: userImageData // This should be a data URL or accessible URL
          }
        }
      ]
    };

    const response = await openai.chat.completions.create({
      model: "gpt-image-1",
      messages: [visionMessage],
      max_tokens: 1000,
      temperature: 0.7
    });

    console.log('GPT-IMAGE-1 response received');
    return response.choices[0].message.content;
    
  } catch (error) {
    console.error('Error generating image with GPT-IMAGE-1:', error);
    throw error;
  }
}

// Function to generate image using GPT-IMAGE-1 (for actual image generation)
async function generateImageWithGPTImage1Direct(prompt) {
  try {
    console.log('🎨 Generating image with GPT-Image-1 model for prompt:', prompt);
    
    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "high"
    });

    console.log('📡 GPT-IMAGE-1 response received');
    console.log('✅ OpenAI API Response:', JSON.stringify(response, null, 2));
    
    if (response.data && response.data[0] && response.data[0].b64_json) {
      console.log('🖼️ Base64 image data received, converting to data URL...');
      const base64Data = response.data[0].b64_json;
      const dataUrl = `data:image/png;base64,${base64Data}`;
      return dataUrl;
    } else if (response.data && response.data[0] && response.data[0].url) {
      console.log('🖼️ Image URL generated:', response.data[0].url.substring(0, 100) + '...');
      return response.data[0].url;
    } else {
      console.error('❌ No image data in OpenAI response:', response);
      throw new Error('No image data in OpenAI response');
    }
    
  } catch (error) {
    console.error('❌ Error calling OpenAI API:', error);
    throw error;
  }
}

// Combined function to generate image from prompt and user image
async function generateImageFromPromptAndUserImage(prompt, userImageData) {
  try {
    console.log('Starting image generation process with GPT-IMAGE-1...');
    
    // Use GPT-IMAGE-1 to generate image directly from prompt
    // Note: GPT-IMAGE-1 doesn't accept image input, so we use the prompt directly
    const imageUrl = await generateImageWithGPTImage1Direct(prompt);
    console.log('Generated image URL from GPT-IMAGE-1:', imageUrl);
    
    return {
      success: true,
      originalPrompt: prompt,
      imageUrl: imageUrl
    };
    
  } catch (error) {
    console.error('Error in image generation process:', error);
    throw error;
  }
}

// Endpoint to generate image
app.post('/api/generate-image', async (req, res) => {
  try {
    const { sceneName, sceneDescription, userImageData } = req.body;
    
    console.log(`Generating image for scene: ${sceneName}`);
    console.log(`User image data length: ${userImageData ? userImageData.length : 0}`);

    // Fetch the prompt from Google Sheets
    // If sceneDescription is provided and contains coordinates, use it; otherwise, search for the row by sceneName
    let prompt = null;
    if (sceneDescription) {
      const coordinates = parseSheetCoordinates(sceneDescription);
      if (coordinates) {
        const range = `${coordinates.start}:${coordinates.end}`;
        prompt = await fetchPromptFromSheet(range);
      }
    }
    // If prompt is still null, fallback to searching for the sceneName in the sheet
    if (!prompt) {
      // Fetch all rows and find the one matching sceneName
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'A1:E100', // Include header row
      });
      const rows = response.data.values;
      const header = rows[0];
      const sceneIdx = header.findIndex(h => h.trim().toLowerCase() === 'scene');
      const promptIdx = header.findIndex(h => h.trim().toLowerCase() === 'prompt');
      const foundRow = rows.find((row, idx) => idx > 0 && row[sceneIdx]?.trim().toLowerCase() === sceneName?.trim().toLowerCase());
      if (foundRow && promptIdx !== -1) {
        prompt = foundRow[promptIdx];
      }
    }
    if (!prompt) {
      return res.status(400).json({ 
        success: false, 
        error: 'No prompt found for this scene.' 
      });
    }
    // Generate the image
    const result = await generateImageFromPromptAndUserImage(prompt, userImageData);
    res.json({
      success: true,
      ...result,
      sceneName: sceneName,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in generate-image endpoint:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Face swap endpoint
app.post('/api/face-swap', async (req, res) => {
  try {
    const { generatedImageBase64, userFaceImageBase64 } = req.body;
    
    console.log('🔄 Face swap request received');
    console.log('Generated image length:', generatedImageBase64 ? generatedImageBase64.length : 0);
    console.log('User face image length:', userFaceImageBase64 ? userFaceImageBase64.length : 0);
    
    if (!generatedImageBase64 || !userFaceImageBase64) {
      return res.status(400).json({
        success: false,
        error: 'Both generated image and user face image are required'
      });
    }
    
    // Perform face swap
    const faceSwappedResult = await performFaceSwap(generatedImageBase64, userFaceImageBase64);
    
    res.json({
      success: true,
      faceSwappedImage: faceSwappedResult,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error in face-swap endpoint:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Test endpoint for face swap
app.post('/api/test-face-swap', async (req, res) => {
  try {
    const { generatedImageBase64, userFaceImageBase64 } = req.body;
    
    console.log('🧪 Testing face swap functionality...');
    
    if (!generatedImageBase64 || !userFaceImageBase64) {
      return res.status(400).json({
        success: false,
        error: 'Both generated image and user face image are required for testing'
      });
    }
    
    // Test the face swap function
    const result = await performFaceSwap(generatedImageBase64, userFaceImageBase64);
    
    res.json({
      success: true,
      message: 'Face swap test completed successfully',
      result: result,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error in test-face-swap endpoint:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Test endpoint for image generation
app.post('/api/test-image-generation', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing prompt' 
      });
    }
    
    // Test with a simple prompt first
    const imageUrl = await generateImageWithGPTImage1Direct(prompt);
    
    res.json({
      success: true,
      imageUrl: imageUrl,
      prompt: prompt
    });
    
  } catch (error) {
    console.error('Error in test-image-generation endpoint:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// --- REPLICATE FACE SWAP INTEGRATION ---
// Function to convert base64 to local file
async function base64ToLocalFile(base64Data, filename) {
  try {
    // Remove data URL prefix if present
    const base64String = base64Data.replace(/^data:image\/[a-z]+;base64,/, '');
    
    // Convert base64 to buffer
    const buffer = Buffer.from(base64String, 'base64');
    
    // Write to temp directory
    const tempPath = path.join(__dirname, 'temp', filename);
    await writeFile(tempPath, buffer);
    
    console.log(`✅ File saved to: ${tempPath}`);
    return tempPath;
  } catch (error) {
    console.error('❌ Error converting base64 to file:', error);
    throw error;
  }
}

// Function to perform face swap using Replicate
async function performFaceSwap(generatedImageBase64, userFaceImageBase64) {
  try {
    console.log('🔄 Starting face swap process...');
    
    // Convert base64 images to local files
    const generatedImagePath = await base64ToLocalFile(generatedImageBase64, `generated_${Date.now()}.png`);
    const userFaceImagePath = await base64ToLocalFile(userFaceImageBase64, `user_${Date.now()}.png`);
    
    console.log('📁 Local files created:', { generatedImagePath, userFaceImagePath });
    
    // Read files for Replicate
    const inputImage = await readFile(generatedImagePath);
    const swapImage = await readFile(userFaceImagePath);
    
    console.log('📤 Sending to Replicate for face swap...');
    
    // Call Replicate face swap model
    const output = await replicate.run(
      "codeplugtech/face-swap:278a81e7ebb22db98bcba54de985d22cc1abeead2754eb1f2af717247be69b34",
      {
        input: {
          input_image: inputImage,
          swap_image: swapImage
        }
      }
    );
    
    console.log('✅ Face swap completed:', output);
    
    // Clean up temp files
    try {
      await writeFile(generatedImagePath, ''); // Clear file
      await writeFile(userFaceImagePath, ''); // Clear file
    } catch (cleanupError) {
      console.warn('⚠️ Could not clean up temp files:', cleanupError);
    }
    
    return output;
  } catch (error) {
    console.error('❌ Error in face swap:', error);
    throw error;
  }
}

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

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 FinstaCam Backend Server running on port ${PORT}`);
  console.log(`📱 Mobile interface: http://localhost:${PORT}/mobile`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
}); 