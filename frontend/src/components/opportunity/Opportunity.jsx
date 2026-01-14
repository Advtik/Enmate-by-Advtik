import "./opportunity.scss";
import moment from "moment";
import { Link } from "react-router-dom";
import { useState } from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

const Opportunity = ({opportunity}) => {
  const [open,setOpen] = useState(false);

  return (
    <>
      {/* Right-bar opportunity card */}
      <div className="bar" onClick={()=>setOpen(true)}>
        <span className="title">{opportunity.title}</span>
        <p>{opportunity.desc}</p>
      </div>

      {/* Modal */}
      {open && (
        <div className="opportunityModal">

          <div className="modalBox">

            {/* Header */}
            <div className="modalHeader">
              <h3>Opportunity</h3>
              <button className="closing" onClick={()=>setOpen(false)}>×</button>
            </div>

            {/* Body */}
            <div className="modalBody">
              <div className="opportunity">
                <div className="insider">

                  <div className="user">
                    <div className="userinfo">
                      <img src={opportunity.profilepic} alt="" />
                      <div className="details">
                        <Link to={`/profile/${opportunity.userid}`}>
                          <span className="name">{opportunity.name}</span>
                        </Link>
                        <span className="date">
                          {moment(opportunity.createdAt).fromNow()}
                        </span>
                      </div>
                    </div>
                    <MoreHorizOutlinedIcon />
                  </div>

                  <div className="content">
                    <p>{opportunity.content}</p>
                    {<img src={opportunity.img} alt="" />}
                  </div>

                  <div className="info">
                    <div className="share">
                      <ShareOutlinedIcon />
                      Share
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default Opportunity;
