import React from "react";
import { BsPlay } from "react-icons/bs";
function TopBar(){
    return(
        <div>
            <div className={"title"}>
                CodeStream
                <button className = {"runButton"}>
                    <div className = {"runButtonContent"}>
                        Run <BsPlay></BsPlay>
                    </div>
               </button> 
            </div>
            <div>
                
            </div>
        </div>
    );
}
export default TopBar;
