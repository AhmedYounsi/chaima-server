const express = require("express");
const connectDB = require("./config/mongoConnection");
var userRouter = require("./src/routes/users");
var eventRouter = require("./src/routes/EventRoute");
var departementRouter = require("./src/routes/DepartementRoute");
var postRouter = require("./src/routes/PostTitleRoute");
var teamRouter = require("./src/routes/TeamRoute");
var officeRouter = require("./src/routes/OfficeRoute");
var timeOffTypeRouter = require("./src/routes/TimeOffTypeRoute");
var folderTypeRouter = require("./src/routes/FolderTypeRoute");
var contractTypeRouter = require("./src/routes/ContractTypeRoute");
const app = express();
const server = require("http").createServer(app);
options = {
  cors: true,
};
const io = require("socket.io")(server, options);
const cors = require("cors");
const Conversation = require("./src/models/Conversation");

// Connect Database
connectDB();
// Init Middleware
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());
// Define Routes
app.use("/users", userRouter);
app.use("/events", eventRouter);
app.use("/departements", departementRouter);
app.use("/posts", postRouter);
app.use("/teams", teamRouter);
app.use("/offices", officeRouter);
app.use("/timeOff", timeOffTypeRouter);
app.use("/folderType", folderTypeRouter);
app.use("/contractType", contractTypeRouter);

app.get("/delete_conv", async (req, res) => {
  const remove = await Conversation.deleteMany({});
  return res.send(remove);
});

app.post("/get_conv", async (req, res) => {
  // users: { $all: [req.body.id] },
  const conversation = await Conversation.find({
    users: { $all: [req.body.id] },
    "messages.0": { $exists: true },
  }).sort({time: -1});
  return res.send(conversation);
});

app.use(express.static(__dirname + "/build/"));
app.get(/.*/, (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
  });

io.on("connection", (socket) => {
  let roomID = null;
  socket.on("JoinRoom", async (data) => {

    const MyID = data.Me._id;
    const res = await Conversation.findOne({
      users: { $all: [MyID, data.user_id] },
    });

    if (res) {
      roomID = res._id;
      // console.log("conversation exist");
      socket.emit("joining_room", res);
    } else {
      //  console.log("create conversation");
      const conversation = new Conversation({
        users: [MyID, data.user_id],
      });
      const res = await conversation.save();
      socket.emit("joining_room", res);
      roomID = res._id;
    }
    socket.join(roomID.toString());

  });

socket.emit("To_another",(data)=>{
  io.to(data.RoomID).emit("To_another", data.arr);
})

  socket.on("SendMessage", async (data) => {
    socket.emit("addmessage");
    const res = await Conversation.findByIdAndUpdate(
      data.RoomID,
      {
        $push: { messages: data.msg },
        time: new Date().getTime(),
        lastsender: data.msg.user_id,
        usernames: [data.msg.username, data.UserToSend],
        seen:false
      },
      { new: true }
    );
     

    io.to(data.RoomID).emit("ResendMessage", res.messages);
     
    const conversation_sender = await Conversation.find({
      users: { $all: [data.msg.user_id] },
      "messages.0": { $exists: true },
    }).sort({time: -1});

    const conversation_receiver = await Conversation.find({
        users: { $all: [data.MessageTo] },
        "messages.0": { $exists: true },
      }).sort({time: -1});
      // io.to(data.RoomID).emit("addmessage");

  io.emit(`message${data.msg.user_id}`, conversation_sender);
  io.emit(`message${data.MessageTo}`, conversation_receiver);
  });
});

// INIT PORT
const PORT = process.env.PORT || 5000;

// RUNNIG THE SERVER
server.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});
