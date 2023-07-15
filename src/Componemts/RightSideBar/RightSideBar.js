import React from "react";
import './RightSideBar.css'
import Wedget from "./Wedget";
import WedgetTag from "./WedgetTag";

const RightSideBar=()=>
{
    return(
        <aside className="right-sidebar">
            <Wedget/>
            <WedgetTag/>
        </aside>
    )
}
export default RightSideBar;