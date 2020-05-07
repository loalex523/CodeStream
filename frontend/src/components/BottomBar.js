
import React from "react";

function BottomBar() {
  var users = ["person 1", "person 2", "person 3"];
  return (
    <div className={"textColor"}>
        <div className={"users"}>
          {users.map((user) => <div key={user}>{user}</div>)}
        </div>

        <div className={"settings"}>
          <div>Settings</div>
        </div>
    </div>
  );
}

export default BottomBar;

