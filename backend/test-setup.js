import dotenv from 'dotenv';
import OpenAI from 'openai';
import { google } from 'googleapis';

// Load environment variables
dotenv.config();

console.log('🔍 Testing FinstaCam Backend Setup...\n');

// Check environment variables
console.log('📋 Environment Variables Check:');
console.log(`OPENAI_API_KEY: ${process.env.OPENAI_API_KEY ? '✅ Set' : '❌ Missing'}`);
console.log(`GOOGLE_SHEETS_API_KEY: ${process.env.GOOGLE_SHEETS_API_KEY ? '✅ Set' : '❌ Missing'}`);
console.log(`GOOGLE_SHEET_ID: ${process.env.GOOGLE_SHEET_ID ? '✅ Set' : '❌ Missing'}`);
console.log(`PORT: ${process.env.PORT || '3001 (default)'}\n`);

// Test OpenAI API
async function testOpenAI() {
  if (!process.env.OPENAI_API_KEY) {
    console.log('❌ OpenAI API Key not set - skipping OpenAI test');
    return;
  }

  try {
    console.log('🧪 Testing OpenAI API...');
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say hello!" }],
      max_tokens: 10
    });
    
    console.log('✅ OpenAI API test successful');
    console.log(`Response: ${response.choices[0].message.content}\n`);
  } catch (error) {
    console.log('❌ OpenAI API test failed:', error.message);
  }
}

// Test Google Sheets API
async function testGoogleSheets() {
  if (!process.env.GOOGLE_SHEETS_API_KEY || !process.env.GOOGLE_SHEET_ID) {
    console.log('❌ Google Sheets credentials not set - skipping Google Sheets test');
    return;
  }

  try {
    console.log('🧪 Testing Google Sheets API...');
    const sheets = google.sheets({ version: 'v4', auth: process.env.GOOGLE_SHEETS_API_KEY });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A1:B2',
    });
    
    console.log('✅ Google Sheets API test successful');
    console.log(`Found ${response.data.values?.length || 0} rows\n`);
  } catch (error) {
    console.log('❌ Google Sheets API test failed:', error.message);
  }
}

// Run tests
async function runTests() {
  await testOpenAI();
  await testGoogleSheets();
  
  console.log('🎯 Setup Summary:');
  if (process.env.OPENAI_API_KEY && process.env.GOOGLE_SHEETS_API_KEY && process.env.GOOGLE_SHEET_ID) {
    console.log('✅ All required environment variables are set');
    console.log('✅ You can now run: npm run dev');
  } else {
    console.log('❌ Missing required environment variables');
    console.log('📝 Please create a .env file with the required variables');
  }
}

runTests(); 