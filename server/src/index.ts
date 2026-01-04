import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import formRoutes from "./routes/forms";

dotenv.config({ path: ".env.local" });

const app = express();
const port = 3002;

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));


// BetterAuth handler - MUST be before express.json() for some requests
app.use("/api/auth", toNodeHandler(auth));

app.use(express.json());
app.use("/api/forms", formRoutes);

app.get("/health", (req, res) => {
    res.send("ok");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
