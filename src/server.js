import express from "express";
import cors from "cors";
import ContactRoutes from "./routes/contact.route.js"

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/contacts', ContactRoutes);

app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
});
