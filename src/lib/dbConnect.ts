import mongoose from "mongoose";

// Use the MONGODB_URI environment variable for the connection string
const connectionString = process.env.MONGODB_URI;

if (!connectionString) {
  throw new Error('Please define the MONGODB_URI environment variable inside.env.local');
}

export const dbConnection = mongoose.connect(connectionString);

console.log(`mongodb connection established`);