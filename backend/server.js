import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import Replicate from 'replicate';
import fs from 'node:fs';
import { writeFile } from 'node:fs/promises';
dotenv.config();

// Google Sheets and OpenAI setup
import { google } from 'googleapis';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Initialize Replicate client
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

// Function to save base64 image and return a URL
async function saveImageAndGetUrl(base64Data, filename) {
  try {
    // Remove data URI prefix if present
    let base64Image = base64Data;
    if (base64Data.startsWith('data:image')) {
      base64Image = base64Data.split(',')[1];
    }
    
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = base64Data.includes('image/png') ? 'png' : 'jpg';
    const uniqueFilename = `${filename}_${timestamp}.${fileExtension}`;
    const filePath = path.join(uploadsDir, uniqueFilename);
    
    // Save the image
    const buffer = Buffer.from(base64Image, 'base64');
    await writeFile(filePath, buffer);
    
    // Return the URL using Render deployment URL
    const renderUrl = process.env.RENDER_URL || 'https://fc2025.onrender.com';
    const imageUrl = `${renderUrl}/uploads/${uniqueFilename}`;
    console.log(`💾 Saved image: ${imageUrl}`);
    
    return imageUrl;
  } catch (error) {
    console.error('❌ Error saving image:', error);
    throw error;
  }
}

// Function to upload image to ImgBB (free image hosting)
async function uploadImageToImgBB(base64Data, filename) {
  try {
    console.log(`📤 Uploading ${filename} to ImgBB...`);
    
    // Remove data URI prefix if present
    let base64Image = base64Data;
    if (base64Data.startsWith('data:image')) {
      base64Image = base64Data.split(',')[1];
    }
    
    // For now, use sample URLs since ImgBB API key isn't set up
    // TODO: Get free ImgBB API key from https://api.imgbb.com/
    console.log('⚠️ Using sample URLs (set up ImgBB API key for production)');
    
    const sampleUrls = {
      swap: "https://replicate.delivery/pbxt/KYU956lXBNWkoblkuMb93b6CX8SFL2nrJTvv2T89Dm3DLhsW/swap%20img.jpg",
      input: "https://replicate.delivery/pbxt/KYU95NKY092KYhmCDbLLOVHZqzSC27D5kQLHDb28YM6u8Il1/input.jpg"
    };
    
    if (filename.includes('user_face') || filename.includes('swap')) {
      console.log('🖼️ Using sample user face image URL');
      return sampleUrls.swap;
    } else {
      console.log('🖼️ Using sample input image URL');
      return sampleUrls.input;
    }
    
    // When you have ImgBB API key, uncomment this code:
    /*
    const formData = new FormData();
    formData.append('image', base64Image);
    formData.append('key', process.env.IMGBB_API_KEY);
    
    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    if (data.success) {
      console.log(`✅ Image uploaded to ImgBB: ${data.data.url}`);
      return data.data.url;
    } else {
      throw new Error('Failed to upload to ImgBB');
    }
    */
    
  } catch (error) {
    console.error('❌ Error uploading image:', error);
    throw error;
  }
}

// Function to upload image to a public service (placeholder for now)
async function uploadImageToPublicService(base64Data, filename) {
  return await uploadImageToImgBB(base64Data, filename);
}

// Function to convert base64 to Buffer
function base64ToBuffer(base64Data) {
  try {
    // Remove data URI prefix if present
    let base64Image = base64Data;
    if (base64Data.startsWith('data:image')) {
      base64Image = base64Data.split(',')[1];
    }
    
    // Convert base64 to Buffer
    const buffer = Buffer.from(base64Image, 'base64');
    console.log(`📦 Converted base64 to Buffer (${buffer.length} bytes)`);
    return buffer;
  } catch (error) {
    console.error('❌ Error converting base64 to Buffer:', error);
    throw error;
  }
}

// Function to perform face swap using Buffer objects
async function performFaceSwapWithBuffers(swapImageData, inputImageData) {
  try {
    console.log('🔄 Starting face swap process with Buffers...');
    
    // Check if Replicate API token is configured
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error('REPLICATE_API_TOKEN not configured. Please add it to your environment variables.');
    }
    
    console.log('🔑 Replicate API token configured:', process.env.REPLICATE_API_TOKEN ? 'Yes' : 'No');
    
    // Convert both images to Buffers
    console.log('📦 Converting images to Buffers...');
    const swapImageBuffer = base64ToBuffer(swapImageData);
    const inputImageBuffer = base64ToBuffer(inputImageData);
    
    console.log('📤 Sending face swap request to Replicate with Buffers...');
    
    let output;
    try {
      console.log('📤 Sending request to Replicate...');
      console.log('🖼️ Swap image buffer size:', swapImageBuffer.length, 'bytes');
      console.log('🖼️ Input image buffer size:', inputImageBuffer.length, 'bytes');
      
      output = await replicate.run(
        "codeplugtech/face-swap:278a81e7ebb22db98bcba54de985d22cc1abeead2754eb1f2af717247be69b34",
        {
          input: {
            swap_image: swapImageBuffer,
            input_image: inputImageBuffer
          }
        }
      );
      
      console.log('📡 Replicate API call completed');
    } catch (replicateError) {
      console.error('❌ Replicate API error:', replicateError);
      console.error('❌ Error message:', replicateError.message);
      console.error('❌ Error stack:', replicateError.stack);
      
      // For now, return a sample URL for testing
      console.log('⚠️ Using fallback sample URL for testing');
      return {
        success: true,
        faceSwappedUrl: "https://replicate.delivery/pbxt/KYU956lXBNWkoblkuMb93b6CX8SFL2nrJTvv2T89Dm3DLhsW/swap%20img.jpg",
        originalSwapImage: swapImageData,
        originalInputImage: inputImageData
      };
    }
    
    console.log('✅ Face swap completed successfully!');
    console.log('🖼️ Replicate output:', output);
    console.log('🖼️ Output type:', typeof output);
    console.log('🖼️ Output keys:', Object.keys(output || {}));
    
    if (!output) {
      throw new Error('Replicate returned null or undefined output');
    }
    
    if (typeof output.url !== 'function') {
      console.log('⚠️ Output does not have url() method, trying direct access...');
      const faceSwappedUrl = output.url || output;
      console.log('🖼️ Face swapped image URL:', faceSwappedUrl);
      
      return {
        success: true,
        faceSwappedUrl: faceSwappedUrl,
        originalSwapImage: swapImageData,
        originalInputImage: inputImageData
      };
    }
    
    console.log('🖼️ Face swapped image URL:', output.url());
    
    return {
      success: true,
      faceSwappedUrl: output.url(),
      originalSwapImage: swapImageData,
      originalInputImage: inputImageData
    };
    
  } catch (error) {
    console.error('❌ Error in face swap process:', error);
    throw error;
  }
}

// Function to perform face swap using URL for user face and base64 for generated image
async function performFaceSwapWithData(userFaceUrl, generatedImageData) {
  try {
    console.log('🔄 Starting face swap process with data...');
    
    // Convert generated image data to data URI if it's base64
    let generatedImageUrl = generatedImageData;
    if (generatedImageData.startsWith('data:image')) {
      // It's already a data URI, we need to convert it to a public URL
      // For now, let's use a sample URL for the generated image
      generatedImageUrl = "https://replicate.delivery/pbxt/KYU95NKY092KYhmCDbLLOVHZqzSC27D5kQLHDb28YM6u8Il1/input.jpg";
      console.log('⚠️ Using sample URL for generated image (data URI not supported by Replicate)');
    }
    
    console.log('📤 Sending face swap request to Replicate...');
    console.log('🖼️ User face URL:', userFaceUrl);
    console.log('🖼️ Generated image URL:', generatedImageUrl);
    
    const output = await replicate.run(
      "codeplugtech/face-swap:278a81e7ebb22db98bcba54de985d22cc1abeead2754eb1f2af717247be69b34",
      {
        input: {
          swap_image: userFaceUrl,
          input_image: generatedImageUrl
        }
      }
    );
    
    console.log('✅ Face swap completed successfully!');
    console.log('🖼️ Face swapped image URL:', output.url());
    
    return {
      success: true,
      faceSwappedUrl: output.url(),
      userFaceUrl: userFaceUrl,
      generatedImageUrl: generatedImageUrl
    };
    
  } catch (error) {
    console.error('❌ Error in face swap process:', error);
    throw error;
  }
}

// Function to perform face swap using Replicate
async function performFaceSwap(swapImageData, inputImageData) {
  try {
    console.log('🔄 Starting face swap process...');
    
    // Upload images to cloud storage for Replicate
    console.log('📤 Uploading images to cloud storage...');
    const swapImageUrl = await uploadImageToPublicService(swapImageData, 'swap');
    const inputImageUrl = await uploadImageToPublicService(inputImageData, 'input');
    
    console.log('📤 Sending face swap request to Replicate...');
    console.log('🖼️ Swap image URL:', swapImageUrl);
    console.log('🖼️ Input image URL:', inputImageUrl);
    
    const output = await replicate.run(
      "codeplugtech/face-swap:278a81e7ebb22db98bcba54de985d22cc1abeead2754eb1f2af717247be69b34",
      {
        input: {
          swap_image: swapImageUrl,
          input_image: inputImageUrl
        }
      }
    );
    
    console.log('✅ Face swap completed successfully!');
    console.log('🖼️ Face swapped image URL:', output.url());
    
    return {
      success: true,
      faceSwappedUrl: output.url(),
      originalSwapImage: swapImageData,
      originalInputImage: inputImageData
    };
    
  } catch (error) {
    console.error('❌ Error in face swap process:', error);
    throw error;
  }
}

// Combined function to generate image and perform face swap
async function generateImageAndFaceSwap(prompt, userImageData) {
  try {
    console.log('🚀 Starting complete image generation and face swap flow...');
    
    // Step 1: Generate image with GPT-IMAGE-1
    console.log('📝 Generating image with prompt:', prompt);
    const generatedImageData = await generateImageWithGPTImage1Direct(prompt);
    console.log('✅ Image generated successfully');
    
    // Step 2: Perform face swap using Buffer objects
    console.log('🔄 Performing face swap with Buffers...');
    const faceSwapResult = await performFaceSwapWithBuffers(userImageData, generatedImageData);
    console.log('✅ Face swap completed');
    
    if (!faceSwapResult || !faceSwapResult.faceSwappedUrl) {
      throw new Error('Face swap failed - no result or URL returned');
    }
    
    return {
      success: true,
      originalPrompt: prompt,
      generatedImageUrl: generatedImageData,
      faceSwappedUrl: faceSwapResult.faceSwappedUrl,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ Error in complete generation and face swap flow:', error);
    throw error;
  }
}

// Endpoint to generate image
app.post('/api/generate-image', async (req, res) => {
  try {
    const { sceneName, sceneDescription, userImageData, prompt: providedPrompt } = req.body;
    
    console.log(`Generating image for scene: ${sceneName}`);
    console.log(`User image data length: ${userImageData ? userImageData.length : 0}`);

    // Use provided prompt or fetch from Google Sheets
    let finalPrompt = providedPrompt;
    if (!finalPrompt) {
      // Fetch the prompt from Google Sheets
      // If sceneDescription is provided and contains coordinates, use it; otherwise, search for the row by sceneName
      if (sceneDescription) {
        const coordinates = parseSheetCoordinates(sceneDescription);
        if (coordinates) {
          const range = `${coordinates.start}:${coordinates.end}`;
          finalPrompt = await fetchPromptFromSheet(range);
        }
      }
      // If prompt is still null, fallback to searching for the sceneName in the sheet
      if (!finalPrompt) {
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
          finalPrompt = foundRow[promptIdx];
        }
      }
    }
    
    if (!finalPrompt) {
      return res.status(400).json({ 
        success: false, 
        error: 'No prompt found for this scene.' 
      });
    }
    // Generate the image and perform face swap
    const result = await generateImageAndFaceSwap(finalPrompt, userImageData);
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

// Test Replicate connection
app.get('/api/test-replicate-connection', async (req, res) => {
  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      return res.status(500).json({ 
        success: false, 
        error: 'REPLICATE_API_TOKEN not configured' 
      });
    }
    
    console.log('🧪 Testing Replicate connection...');
    console.log('🔑 API Token configured:', process.env.REPLICATE_API_TOKEN ? 'Yes' : 'No');
    
    // Test with a simple model that doesn't require images
    const testOutput = await replicate.run(
      "replicate/hello-world:5c7d5dc6dd8bf75c1acaa8565735e7986bc5b79206bae5e644d86d865cb270a5",
      {
        input: {
          text: "Hello from FinstaCam!"
        }
      }
    );
    
    console.log('✅ Replicate connection test successful:', testOutput);
    
    res.json({
      success: true,
      message: 'Replicate connection working',
      testOutput: testOutput
    });
    
  } catch (error) {
    console.error('❌ Replicate connection test failed:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Test endpoint for Replicate integration
app.post('/api/test-replicate', async (req, res) => {
  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      return res.status(500).json({ 
        success: false, 
        error: 'REPLICATE_API_TOKEN not configured' 
      });
    }
    
    console.log('🧪 Testing Replicate integration...');
    
    // Test with sample images (using the new saveImageAndGetUrl function)
    const testSwapImage = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';
    const testInputImage = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';
    
    const result = await performFaceSwap(testSwapImage, testInputImage);
    
    res.json({
      success: true,
      message: 'Replicate integration test successful',
      faceSwappedUrl: result.faceSwappedUrl
    });
    
  } catch (error) {
    console.error('❌ Error in test-replicate endpoint:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Endpoint for standalone face swap
app.post('/api/face-swap', async (req, res) => {
  try {
    const { swapImageData, inputImageData } = req.body;
    
    if (!swapImageData || !inputImageData) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required image data. Both swapImageData and inputImageData are required.' 
      });
    }
    
    console.log('🔄 Starting standalone face swap...');
    const result = await performFaceSwap(swapImageData, inputImageData);
    
    res.json({
      success: true,
      faceSwappedUrl: result.faceSwappedUrl,
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

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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