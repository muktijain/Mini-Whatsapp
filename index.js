const mongoose = require('mongoose');
const express = require("express");
const app = express();
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


main().then((res) => {
  console.log("connection sucessful!");
})
.catch(err => console.log(err));


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/miniWhatsapp');
}

//INDEX ROUTE
app.get("/chats", async(req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
  // console.log(chats);
});

//NEW ROUTE
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

//CREATE ROUTE
app.post("/chats", (req, res) => {
  let { from, msg, to } = req.body;
  let newChat = new Chat({
    from: from,
    msg: msg,
    to: to,
    created_at: new Date()
  });
  newChat.save().then((res) => {
    console.log("chat is saved.");
  }).catch((err) => console.log(err));
  res.redirect("/chats");
});

//EDIT ROUTE
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs",{ chat });
});

//UPDATE ROUTE
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true, new: true }
  );
  console.log("updated");
  res.redirect("/chats");
});

//DESTROY ROUTE
app.get("/chats/:id/delete", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("delete.ejs",{ chat });
  console.log("delete.ejs loading/....")
})

//DESTROY ROUTE CONFIRM WINDOW
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log("chat deleted");
  res.redirect("/chats");
});

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.listen(8080, () => {
  console.log("app is listening");
});


