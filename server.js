const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const SECRET_KEY = "weaksecret"; 

mongoose.connect("mongodb://127.0.0.1:27017/ctf", { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({ username: String, password: String, role: String });
const FileSchema = new mongoose.Schema({ id: Number, owner: String, filename: String, url: String });

const User = mongoose.model("User", UserSchema);
const File = mongoose.model("File", FileSchema);

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY); 
    res.json({ token });
});


app.get("/files/:id", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const file = await File.findOne({ id: req.params.id });

        if (!file) return res.status(404).json({ error: "File not found" });

        res.json({ file });
    } catch {
        res.status(401).json({ error: "Invalid token" });
    }
});

app.get("/fetch-url", async (req, res) => {
    const target = req.query.url;
    if (!target) return res.status(400).json({ error: "No URL provided" });

    try {
        const response = await axios.get(target); 
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: "Request failed" });
    }
});

app.get("/admin/flag", (req, res) => {
    res.send("CTF{ssrf_pwns_internal_admins}");
});

app.listen(5000, () => console.log("CTF Challenge running on port 5000!"));
