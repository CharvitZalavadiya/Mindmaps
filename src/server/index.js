// import express from "express"
// // import mongoose from "mongoose"
// import cors from "cors"
// // import Note from "../models/Note"
// // import User from "../models/User"

// // const db = 'mongodb+srv://cz:cz@cluster0.uvhgvjz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// // mongoose
// //   .connect(db)
// //   .then(() => console.log('MongoDB connected...'))
// //   .catch(err => console.log(err));

// import { MongoClient } from "mongodb";

// const uri = "mongodb+srv://cz:cz@cluster0.uvhgvjz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// const client = new MongoClient(uri)

// async function connectToDatabase() {
//   try {
//     await client.connect();
//     const db = client.db("MindMaps");
//     const collection = db.collection("Note");
//     console.log("MongoDB Connected...")
//     return collection;
//   } catch (err) {
//     console.error("Error connecting to database:", err);
//     throw err;
//   }
// }


// const app = express();
// app.use(express.json());
// app.use(cors());

// app.listen(6000, () => {
//   console.log(`server is running on port 6000`);
// });

// app.get("/hw", async (req, res) => {

//   try {

//     const collection = await connectToDatabase();
//     const data = await collection.find({}).toArray();
//     res.status(200).json(data);

//     // const notes = await Note.find({})
//     // res.json(notes)
    
//     // const users = await User.find({})
//     // res.json(users)


//   } catch (err) {
//     console.log(err)
//   }

//   // res.send("Hello World!");
// });






import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://cz:cz@cluster0.uvhgvjz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db("MindMaps"); // Replace with your database name
    console.log("MongoDB Connected ....");
  } catch (err) {
    console.error("Error connecting to database:", err);
    throw err;
  }
}

const app = express();
app.use(express.json());
app.use(cors());

app.listen(8080, async () => {
  console.log(`server is running on port 8080`);
  await connectToDatabase();
});

app.get("/notes", async (req, res) => {
  try {
    const collection = db.collection("Note"); // Replace with your collection name
    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving data");
  }
});

process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await client.close();
  process.exit();
});

process.on("SIGTERM", async () => {
  console.log("Shutting down server...");
  await client.close();
  process.exit();
});
