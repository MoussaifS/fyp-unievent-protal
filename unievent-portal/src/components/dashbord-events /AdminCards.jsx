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
import DeleteIcon from "../../assets/delete_icon.svg"

import { format } from "date-fns";
import ShowMoreText from "react-show-more-text";
import { db } from "../../FireBase";
import { doc, deleteDoc } from "firebase/firestore";

import { ref, deleteObject, getStorage } from "firebase/storage";
import ShareWhatsappBtn from "../buttons/ShareWhatsappBtn";

const Cards = (props) => {
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

  return (
    <Card sx={{ maxWidth: 700 }}>
      <div className="fd-r">
        <span id="span-card-date">
          {format(new Date(props.event.startDate), "iii , LLL d")} •{" "}
          {props.event.startTime}
        </span>
      </div>

      <div className="fd-r">
        <img src={props.event.image} width="150" height="150" />
        <div>
          <h2 className="m-10">{props.event.title}</h2>
          <div className="m-5">
            <md-suggestion-chip
              label={props.event.audience}
            ></md-suggestion-chip>
          </div>
        </div>
      </div>

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
          <p id="card-description">{props.event.description}</p>
        </ShowMoreText>
      </div>
      <md-divider inset></md-divider>

      <div className="df-c">
        <div className="m-10">
          <h4 className="m-5">Event Tags:</h4>
          <md-chip-set>
            {props.event.tags.map((tag, index) => (
              <md-suggestion-chip key={index} label={tag}></md-suggestion-chip>
            ))}
          </md-chip-set>
        </div>
      </div>
      <md-divider inset></md-divider>
      <div id="card-btns">
        <md-outlined-icon-button onClick={() => deleteEvent()}>
          <md-icon>
            <img src={DeleteIcon} alt="delete" />
          </md-icon>
        </md-outlined-icon-button>

        <ShareWhatsappBtn {...props} />
      </div>
    </Card>
  );
};

export default Cards;
