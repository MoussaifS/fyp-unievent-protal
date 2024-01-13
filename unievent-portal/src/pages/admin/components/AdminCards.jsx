import Card from "@mui/material/Card";
import "@material/web/divider/divider.js";
import "@material/web/chips/chip-set.js";
import "@material/web/chips/assist-chip.js";
import "@material/web/chips/filter-chip.js";
import "@material/web/chips/input-chip.js";
import "@material/web/chips/suggestion-chip.js";
import "@material/web/icon/icon.js";
import "@material/web/button/outlined-button.js";
import "@material/web/iconbutton/outlined-icon-button.js";
import "@material/web/iconbutton/filled-tonal-icon-button.js";
import DeleteIcon from "../../../../src/assets/delete_icon.svg";
import {
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { useState, useEffect } from "react";

import { format } from "date-fns";
import ShowMoreText from "react-show-more-text";
import { db } from "../../../FireBase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

import { ref, deleteObject, getStorage } from "firebase/storage";
import ShareWhatsappBtn from "../../../components/buttons/ShareWhatsappBtn";

const AdminCards = (props) => {
  const [expanded, setExpanded] = useState(false);
  const event = props.event
  console.log(event)
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClearPrams = () => {
    searchParams.delete("tag");
  };

  const deleteEvent = function () {
    const storage = getStorage();
    console.log("in func");
    const imageStorageRef = ref(
      storage,
      `events/${props.event.title}:${props.event.docId}`
    );

    deleteObject(imageStorageRef)
      .then(async () => {
        await deleteDoc(doc(db, "events", props.event.docId));
        window.location.reload();
        console.log("Event and image deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting image or event:", error);
      });
  };


  // firebase v8

// //firebase v9




const handleApprovel = () =>{
  try {
    const updateEvent = async () => {
      await updateDoc(doc(db, "events", `${event.docId}` ), { approved: true });
      await updateDoc(doc(db, `organizer/${event.adminID}/events`, `${event.docId}` ), { approved: true });
      await updateDoc(doc(db, `university/${event.adminUniID}/events`, `${event.docId}` ), { approved: true });
    };
      updateEvent();
  } catch (error) {
    console.log(error)
  }
}

console.log(event)



  return (
    <Card variant="outlined" sx={{ maxWidth: 700 }}>
      <div className="fd-r">
        <img src={props.event.image} width="150" height="150" />
        <div>
          <h2 className="m-10">{props.event.title}</h2>
          <div className="m-5">
            <md-suggestion-chip
              label={props.event.audience}
            ></md-suggestion-chip>
          </div>

          <div className="m-10">
            <span id="span-card-date">
              {format(new Date(props.event.startDate), "iii , LLL d")} •{" "}
              {props.event.startTime}
            </span>
          </div>
        </div>
      </div>

      
      <div id="card-btns">

        <md-filter-chip
                label={event.approved ?"Approved" : "Approve" }
                elevated
                selected={event.approved} 
                onClick={(e) => {
                  handleApprovel(e);
        }}




        ></md-filter-chip>
            


        <md-outlined-icon-button onClick={() => deleteEvent()}>
          <md-icon>
            <img src={DeleteIcon} alt="delete" />
          </md-icon>
        </md-outlined-icon-button>

        <ShareWhatsappBtn {...props} />
      </div>
      <div>











        <Accordion
          className="ddddd"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography level="h4" noWrap={false} variant="soft">
              Details
            </Typography>
          </AccordionSummary>

          <div className="m-10">
            <ShowMoreText
              /* Default options */
              lines={2}
              more="Show more"
              less="Show less"
              className="content-css"
              anchorClass="show-more-less-clickable"
              expanded={false}
              truncatedEndingComponent={"... "}
            >
              <p id="filter-secondary-span">{props.event.description}</p>
            </ShowMoreText>
          </div>

          <div className="df-c">
            <div className="m-10">
              <h4 className="filter-secondary-span">Event Tags:</h4>
              <md-chip-set>
                {props.event.tags.map((tag, index) => (
                  <md-suggestion-chip
                    key={index}
                    label={tag}
                  ></md-suggestion-chip>
                ))}
              </md-chip-set>
            </div>
          </div>

          <AccordionDetails>
            <div id="filter-secondary-span">Tags:</div>
            <div id="card-horzintal-scroll">ererrererre</div>
          </AccordionDetails>
          
        </Accordion>
      </div>
      <div>
        <Accordion
          className="ddddd"
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography level="h4" noWrap={false} variant="soft">
              Event analytics
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <div id="filter-secondary-span">Attendance Metrics:</div>
              <div id="filter-Upcoming">dfdfdfdfdfdfdfdf</div>
            </div>
          </AccordionDetails>

          <AccordionDetails>
            <div id="filter-secondary-span">Tags:</div>
            <div id="card-horzintal-scroll">ererrererre</div>
          </AccordionDetails>
          <div>
            <span id="filter-btn">Download CSV Sheet</span>
          </div>
        </Accordion>
      </div>
    </Card>
  );
};

export default AdminCards;
