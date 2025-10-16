
import "dotenv/config.js";

import authRoutes from "./routes/auth.js";
import './routes/booking.js'
import { connectDB } from "./config/db.js";

import app from './config/app.js';
const {PORT} = process.env;

// Routes
app.use("/api/auth", authRoutes);

//check server
app.get('/', (req, res) => res.status(200).send('server are ready!!'))

// Start
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
