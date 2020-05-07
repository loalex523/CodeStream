import React from "react";
import { BsPlay} from "react-icons/bs";
function TopBar(){
    return(
        
        <div>
            <div className={"title"}>
                CodeStream
            </div>
            <div>
               <button className = {"runButton"}>
                 Run <BsPlay></BsPlay>
               </button>  
            </div>
        </div>
    );
}
export default TopBar;
