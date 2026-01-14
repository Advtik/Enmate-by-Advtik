import React, { useState } from "react";
import "./rightbar.scss";
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import Opportunities from "../opportunities/Opportunities";
const Rightbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle Button (Visible only on mobile) */}
      <button
        className={`rightbar-toggle ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        {open ? <ArrowRightOutlinedIcon /> : <ArrowLeftOutlinedIcon />}
      </button>

      {/* Sidebar */}
      <div className={`rightbar ${open ? "visible" : ""}`}>
        <div className="container">
          <h3>Latest Opportunities</h3>
            <div className="list">
              <Opportunities></Opportunities>
            </div>
        </div>
      </div>
    </>
  );
};

export default Rightbar;
