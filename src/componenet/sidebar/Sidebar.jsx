import React, { useContext ,useState } from "react";
import { assets } from "../../assets/assets";
import "./Sidebar.css";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);

  const { onSent, prevprompts = [], setRecentprompt , newChat ,deletePrompt } = useContext(Context);
  const handleDelete = (e, index) => {
    e.stopPropagation(); 
    deletePrompt(index);
  }

  const loadPrompt = async (prompt) => {
    try{
    setRecentprompt(prompt);
    await onSent (prompt);
  } catch (error){
    console.error("Error loading prompt:", error);
  }
};

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended && <p>New Chat</p>}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevprompts.map((item,index) => {
              return (
                <div onClick={()=> loadPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0,14)}...</p>
                  <img onClick={(e) => handleDelete(e, index)} className="delete" src={assets.delete_icon} alt="" />
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
