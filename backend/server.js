var express = require("express")
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var wandbox = require("wandbox-api");

http.listen(process.env.PORT || 8000, function() {
  console.log("Listening on port " +  process.env.PORT);
});

var compilers = {
  "python": "cpython-3.8.0",
  "java": "openjdk-head"
};

/*
  Keep track of the users and code in each room
  roomID: {users: ["user1", "user2", ...], language: "python", code: "def main(): ..."}
*/
var rooms = {};

io.on("connection", function(socket) {
  socket.on("join room", function(data) {
    console.log("Joining room");

    if (!rooms.hasOwnProperty(data.roomID)) {
      rooms[data.roomID] = {
        users: [data.name],
        language: data.language,
        code: ""
      };
    } else {
      rooms[data.roomID].users.push(data.name);
    }

    socket.join(data.roomID);
    console.log(rooms);

    // Update the new connection on the room data
    socket.emit("welcome", rooms[data.roomID]);
    socket.broadcast.to(data.roomID).emit("user joined", {
      user: data.name
    });
  });

  socket.on("leave room", function(data) {
    console.log("Leaving room");

    rooms[data.roomID].users = rooms[data.roomID].users.filter(user => user !== data.name);

    if (rooms[data.roomID].users.length == 0)
      delete rooms[data.roomID];

    console.log(data);
    console.log(rooms);

    // Send the updated user list back
    socket.broadcast.to(data.roomID).emit("user left", {
      user: data.name
    });
    socket.leave(data.roomID);
  });

  socket.on("code change", function(data) {
    // Send the changed code to the room
    rooms[data.roomID].code = data.code;

    socket.broadcast.to(data.roomID).emit("code update", {
      code: data.code
    });
  });

  socket.on("change language", function(data) {
    console.log("Changing language");
    console.log(data);

    rooms[data.roomID].language = data.language;
    console.log(rooms);

    socket.broadcast.to(data.roomID).emit("language changed", {
      user: data.name,
      newLanguage: data.language
    });
  });

  socket.on("compile", function(data) {
    console.log("Compiling");
    console.log(data);
    var code = rooms[data.roomID].code;
    var language = rooms[data.roomID].language;
    var output = {
      program_message: "helo wold",
      status: "0"
    };

    // socket.broadcast.to(data.roomID).emit("compiling code", {
    //   user: data.name
    // });

    // wandbox.fromString(code, {"compiler": compilers[language]}, function(error, results) {
    //   output = results;
    // });

    console.log("Submitted code:");
    console.log(code);
    console.log("Output: ");
    console.log(output);

    var status = (output.status === "0") ? "normal" : "error";

    socket.broadcast.to(data.roomID).emit("compile done", {
      results: output.program_message,
      status: status,
      code: code
    });
  });
});
