import path from "path";

import express from "express";
import "dotenv/config";

import { auth } from "./auth.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(import.meta.dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(import.meta.dirname, "index.html"));
})

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await auth.api.signUpEmail({
            body: {
                email: email,
                password: password,
                name: name,
            }
        });
        res.status(200).json({ message: "Success!", user: user.name });
    } catch (error) {
        res.status(400).json({ error: "Failed." });
    }
});

app.listen(port, () => console.log("Server up on port 3000"));