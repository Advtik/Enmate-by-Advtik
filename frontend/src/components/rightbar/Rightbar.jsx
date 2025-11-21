import React, { useState } from "react";
import "./rightbar.scss";
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
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
          <h3>Best Opportunities</h3>

          <div className="list">
            <div className="item">
              <span className="title">ICPC 2025 Teammate</span>
              <p>Need ICPC Teammate for prelims from UIT RGPV Bhopal</p>
            </div>
            <div className="item">
              <span className="title">Meow Hackathon 2025</span>
              <p>Need a teammate for Meow Hackathon 2025 from Delhi</p>
            </div>
            <div className="item">
              <span className="title">IICPC Teammate</span>
              <p>We want a person for IICPC Mumbai Regionals</p>
            </div>
            <div className="item">
              <span className="title">ZUIZUI Hackathon</span>
              <p>Assistant required for ZUIZUI</p>
            </div>
            <div className="item">
              <span className="title">ZUIZUI Hackathon</span>
              <p>Assistant required for ZUIZUI</p>
            </div>
            <div className="item">
              <span className="title">ZUIZUI Hackathon</span>
              <p>Assistant required for ZUIZUI</p>
            </div>
            <div className="item">
              <span className="title">ZUIZUI Hackathon</span>
              <p>Assistant required for ZUIZUI</p>
            </div>
            <div className="item">
              <span className="title">ZUIZUI Hackathon</span>
              <p>Assistant required for ZUIZUI</p>
            </div>
            <div className="item">
              <span className="title">ZUIZUI Hackathon</span>
              <p>Assistant required for ZUIZUI</p>
            </div>
            <div className="item">
              <span className="title">ZUIZUI Hackathon</span>
              <p>Assistant required for ZUIZUI</p>
            </div>
          </div>

          <button>Create Opportunity</button>
        </div>
      </div>
    </>
  );
};

export default Rightbar;
