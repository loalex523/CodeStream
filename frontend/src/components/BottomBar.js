import React, { useEffect, useState } from "react";

const BottomBar = (props) => {
  var [users, setState] = useState(props.userList);

  useEffect(() => {
    setState(props.userList);
  }, [props.userList]);
  
  return (
    <div className={"textColor"}>
        <div className={"users"}>
          {users.map((user) => <div key={user}>{user}</div>)}
        </div>

        {/* TODO: Allow change in settings (Font) */}
        {/* <div className={"settings"}>
          <div>Settings</div>
        </div> */}
    </div>
  );
}

export default BottomBar;

