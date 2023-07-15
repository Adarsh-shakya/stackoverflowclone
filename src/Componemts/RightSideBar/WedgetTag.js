import React from "react";
const tags=['c','css','express','firebase','html','java','javascript','mern','mongodb','next.js','node.js','php','python','reactjs'];
const WedgetTag=()=>{
    return(
        <div className="widget-tags">
            <h3>Watch tags</h3>
            <div className="widget-tags-div">
                {
                    tags.map((tag)=>(<p key={tag}>{tag}</p>))
                }
            </div>
        </div>
    )
}
export default WedgetTag;