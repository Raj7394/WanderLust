require('dotenv').config();
const mongoose = require('mongoose');
const Listing = require('../models/listing.js');
const initData = require('./data.js');

const DB_URL = process.env.ATLASDB_URL || "mongodb+srv://vermaraj7394:S2i3.T456@cluster0.ahlvc.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";

console.log("DB_URL:", DB_URL);  // Add this line to verify the connection string

async function main() {
    try {
        await mongoose.connect(DB_URL);
        console.log("Connected to the database.");
        await initDB();
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);  // Exit the process if there is a connection error
    }
}
let categoryAll = [
	"Beachfront",
	"Cabins",
	"Omg",
	"Lake",
	"Design",
	"Amazing Pools",
	"Farms",
	"Amazing Views",
	"Rooms",
	"Lakefront",
	"Tiny Homes",
	"Countryside",
	"Treehouse",
	"Trending",
	"Tropical",
	"National Parks",
	"Casties",
	"Camping",
	"Top Of The World",
	"Luxe",
	"Iconic Cities",
	"Earth Homes",
];

async function initDB() {
    try {
        await Listing.deleteMany({});
        console.log("Previous listings deleted.");

        initData.data = initData.data.map(obj => ({
            ...obj,
            owner: "66d85b04f22bbab6ada0daef",  // Example owner ID
            price: obj.price * 25,
            category: [
                categoryAll[Math.floor(Math.random() * categoryAll.length)],
                categoryAll[Math.floor(Math.random() * categoryAll.length)],
            ],
        }));

        await Listing.insertMany(initData.data);
        console.log("Data was initialized successfully.");
    } catch (err) {
        console.error("Error initializing data:", err);
    }
}

main();
