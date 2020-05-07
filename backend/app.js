var express = require("express")
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

http.listen(process.env.PORT || 8000, function() {
	console.log("Listening on port " +  process.env.PORT);
});

// TODO: Socket.IO rooms to broadcast code editor changes
// TODO: Run untrusted code