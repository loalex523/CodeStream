import React from "react";

function randomRoom() {
  let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let str = "";
  for (var i = 0; i < 8; i++)
    str += chars[Math.floor(Math.random() * chars.length)];
    
  return window.location.origin+"/"+str;
}

const Homepage = () => {
  return (
    <div>
      <button><a href={randomRoom()}>Start room</a></button>
    </div>
  );
}

export default Homepage;
