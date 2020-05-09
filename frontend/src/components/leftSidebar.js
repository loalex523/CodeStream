import React from "react";
import { BsPlay } from "react-icons/bs";

function leftSidebar() {
  return (
    <>
        <div className={"leftSidebar"}>
               <a className = {"runButtonSide"}>
                  <BsPlay></BsPlay>
               </a> 
        </div>
    </>
  );
}

export default leftSidebar;