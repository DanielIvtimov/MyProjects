require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Could not connect to MongoDB", err));

const User = require("./models/user.model");
const Note = require("./models/note.model");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.get("/", (request, response) => {
    response.json({ data: "Hello" });
});

// Create Account 
app.post("/create-account", async (request, response) => {
    const {fullName, email, password } = request.body;
    if(!fullName){
        return response.status(400).json({error: true, message: "Full Name is required."})
    } 
    if(!email){
        return response.status(400).json({error: true, message: "Email is required."});
    }
    if(!password){
        return response.status(400).json({error: true, messsage: "Password is required."});
    }

    const isUser = await User.findOne({email: email})
    if(isUser){
        return response.json({
            error: true,
            message: "User already exist"
        });
    }
    const user = new User({
        fullName,
        email,
        password
    });
    await user.save();
    const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1000000000"})
    return response.json({
        error: false,
        user,
        accessToken,
        messsage: "Registration Successful",
    })
});

// Login Route
app.post("/login", async (request, response) => {
    const {email, password} = request.body;
    if(!email){
        return response.status(400).json({message: "Email is required"});
    }
    if(!password){
        return response.status(400).json({message: "Password is required"});
    }
    const userInfo = await User.findOne({email: email});
    if(!userInfo){
        return response.status(400).json({message: "User not found"})
    }
    if(userInfo.email == email  && userInfo.password == password){
        const user = {user: userInfo};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "86400"});
        return response.json({
            error: false,
            message: "Login Successful",
            email,
            accessToken 
        });
    }else{
        return response.status(400).json({
            error: true,
            message: "Invalid Credentials", 
        });
    }
})

// Get User
app.get("/get-user", authenticateToken, async (request, response) => {
    const {user} = request.user;
    const isUser = await User.findOne({_id: user._id});
    if(!isUser){
        return response.sendStatus(401)
    }
    return response.json({
        user: {
            fullname: isUser.fullName,
            email: isUser.email,
            _id: isUser._id,
            createdOn: isUser.createdOn
        },
        message: ""
    });
})

// Add Note 
app.post("/add-note", authenticateToken, async (request, response) => {    
    const {title, content, tags} = request.body; 
    const user = request.user;
    
    if (!title) {
        return response.status(400).json({error: true, message: "Title is required"});
    }
    if (!content) {
        return response.status(400).json({error: true, message: "Content is required"});
    }
    
    try {
       const note = new Note({
        title,
        content,
        tags: tags || [],
        userId: user.user._id 
       });
       await note.save();
       return response.json({
        error: false,
        note,
        message: "Note added successfully"
       });
    } catch(error) {
        return response.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
});

// Edit Note
app.put("/edit-note/:noteId", authenticateToken, async (request, response) => {
    const noteId = request.params.noteId;
    const { title, content, tags, isPinned } = request.body;
    const userId = request.user.user._id; 
    if(!title && !content && !tags){
        return response.status(400).json({ error: true, message: "No changes provided" });
    }
    try{
        const note = await Note.findOne({ _id: noteId, userId: userId });
        if(!note){
            console.log("Note not found. Possible mismatch with noteId or userId.");
            return response.status(404).json({ error: true, message: "Note not found" });
        }
        if(title){
            note.title = title;
        }
        if(content){
            note.content = content;
        }
        if(tags){
            note.tags = tags;
        }
        if(typeof isPinned === "boolean"){
            note.isPinned = isPinned;
        }
        await note.save();
        return response.json({
            error: false,
            note,
            message: "Note updated successfully"
        });
    }catch(error){
        console.error("Error updating note:", error);
        return response.status(500).json({ error: true, message: "Internal Server Error" });
    }
}); 

// Get All Notes
app.get("/get-all-notes", authenticateToken, async (request, response) => {
    const { user } = request.user;
    try{
       const notes = await Note.find({userId: user._id}).sort({isPinned: -1});
       return response.json({error: false, notes, message: "All notes retrieved successfully"}); 
    }catch(error){
        return response.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
});

// Delete Note
app.delete("/delete-note/:noteId", authenticateToken, async (request, response) => {
    const noteId = request.params.noteId;
    const userId = request.user.user._id;
    try{
        const note = await Note.findOne({ _id: noteId, userId: userId });
        if(!note){
            return response.status(404).json({ error: true, message: "Note not found" });
        }
        await Note.deleteOne({ _id: noteId, userId: userId });
        return response.json({ error: false, message: "Note deleted successfully" });
    }catch(error){
        return response.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

// Update isPinned Value
app.put("/update-note-pinned/:noteId", authenticateToken, async (request, response) => {
    const noteId = request.params.noteId;
    const { isPinned } = request.body;
    const userId = request.user.user._id; 
    try{
        const note = await Note.findOne({ _id: noteId, userId: userId });
        if(!note){
            console.log("Note not found. Possible mismatch with noteId or userId.");
            return response.status(404).json({ error: true, message: "Note not found" });
        }
        if(typeof isPinned === "boolean"){
            note.isPinned = isPinned || false;
        }
        await note.save();
        return response.json({
            error: false,
            note,
            message: "Note updated successfully"
        });
    }catch(error){
        console.error("Error updating note:", error);
        return response.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

// Search Bar
app.get("/search-notes/", authenticateToken, async (request, response) => { 
    const { user } = request.user;
    const { query } = request.query;
    if(!query){
        return response.status(400).json({error: true, message: "Search query is required"});
    }
    try{
        const matchingNotes = await Note.find({
            userId: user._id,
            $or: [
                {title: {$regex: new RegExp(query, "i")}},
                {content: {$regex: new RegExp(query, "i")}}
            ]
        });
        return response.json({error: false, notes: matchingNotes, message: "Notes matching the search query retrieved successfully"})
    }catch(error){
        return response.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
})

app.listen(3000);

module.exports = app;
