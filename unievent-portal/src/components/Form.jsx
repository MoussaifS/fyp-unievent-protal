import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { db, auth, storage } from "../FireBase";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { collection, addDoc ,setDoc , doc } from "firebase/firestore";
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/button/outlined-button.js";
import "@material/web/button/filled-button.js";
import "@material/web/icon/icon.js";
import "@material/web/chips/chip-set.js";
import "@material/web/chips/filter-chip.js";
import "@material/web/radio/radio.js";
import "@material/web/divider/divider.js";
import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { v4 as uuidv4 } from 'uuid';

const Form = () => {
  const { handleSubmit, register } = useForm();
  const [tags, setTags] = useState([]);
  const [date, setDate] = useState(null);
  const [errorDate, setErrorDate] = useState(false);
  const [audienceType, setAudienceType] = useState("");

  const handleAudience = async (e) => {
    console.log("now", e);
    const currentAudienceSelect = e;
    await setAudienceType(currentAudienceSelect);
  };

  useEffect(() => {
    setAudienceType(audienceType);
  }, [audienceType]);

  const checkDateValue = function (e) {
    const currentDate = format(new Date(), "yyyy-MM-dd");
    const eventPotentialDate = format(parseISO(date), "yyyy-MM-dd");
    currentDate >= eventPotentialDate
      ? setErrorDate(true)
      : setDate(e.target.value);
  };

  const [selectedTags, setSelectedTags] = useState([]);

  const handleTags = (tag) => {
    if (selectedTags.includes(tag)) {
      // If the tag is already selected, remove it
      const updatedTags = selectedTags.filter(
        (selectedTag) => selectedTag !== tag
      );
      setSelectedTags(updatedTags);
    } else {
      // If the tag is not selected, add it
      const updatedTags = [...selectedTags, tag];
      setSelectedTags(updatedTags);
    }
  };

  useEffect(() => {
    setSelectedTags(selectedTags);
  }, [selectedTags]);



  const eventTags = [
    { tag: "Academic Events" },
    { tag: "Career Development" },
    { tag: "Sports and activity" },
    { tag: "Social Impact" },
    { tag: "Guest Speakers" },
    { tag: "Festivals" },
    { tag: "Workshops" },
    { tag: "Hackathons" },
    { tag: "Meetups" },
  ];

  const eventType = [
    { audience: "My Uni Students Only" },
    { audience: "Open to Everyone" },
  ];


  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl , setImageUrl] = useState("");


  const getImageUrl = (destination) => {
    const storage = getStorage();
    let imgUrl
    getDownloadURL(ref(storage, destination)).then( (url) => {
      imgUrl = url
      console.log('url' , destination)
      console.log(url)
    })
    return imgUrl
  }


  const uploadImage = async (data , docId) => {
    const folderDestination = `events/${data}:${docId}`
    const imageRef = ref(storage, folderDestination );
    let url
    await uploadBytes(imageRef, imageUpload).then(async () => {
      url = getImageUrl(folderDestination)
      console.log('upload' , folderDestination)
    });
    return url
  };
      
  const onSubmit = async (data) => {
    if (errorDate) {
      console.log("Error: Invalid Date");
    } else {
      try {
        const docId  = uuidv4()
        const imageUrl = await uploadImage(data.title , docId );
        console.log('sub', docId);
        data.email = auth.currentUser.email;
        data.image = imageUrl;
        data.tags = selectedTags;
        data.docId = docId
        data.audience = audienceType.audience;
        await setDoc(doc(db, "events", docId ), data);
        console.log("Document set");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  
  
  
  
  
  

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} method="dialog">
        {/* title */}
        <div>
          <h3 id="form-title-text">Event Title</h3>
          <md-outlined-text-field
            maxlength="50"
            minlength="2"
            id="text-field-form"
            {...register("title")}
            required
            placeholder="Enter Event Name"
          ></md-outlined-text-field>
        </div>

        {/* Description */}
        <div>
          <h3 id="form-title-text">Event Description</h3>
          <md-outlined-text-field
            id="text-field-form"
            {...register("description")}
            required
            minlength="2"
            rows="3"
            type="textarea"
            placeholder="Write the best description for your event"
          ></md-outlined-text-field>
        </div>

        <div>
          <h3 id="form-title-text">Add Promotonal Image</h3>
          <input
            id="button"
            type="file"
            required
            accept="image/*"
            onChange={(e) => {
              setImageUpload(e.target.files[0]);
            }}
          />
        </div>

        <md-divider></md-divider>
        {/* Tags */}
        <div>
          {/* target audience*/}
          <h3 id="form-title-text">Type of Event</h3>
          <span id="mini-text">Pick the tags work best for your event</span>
          <md-chip-set id="margin-top" aria-labelledby="dates-label" supporting-text="Which club do you with Represent">
            {eventTags.map((tag, index) => (
              <md-filter-chip
                key={index}
                onClick={() => handleTags(tag.tag)}
                label={tag.tag}
                required
                elevated // Add elevated class if selected
                aria-label={tag.tag}
                supporting-text="Which club do you with Represent"
              ></md-filter-chip>
            ))}
          </md-chip-set>
          <br />

          <h4 className="mt-0">Target Event Audience</h4>
          {eventType.map((e) => (
            <div key={e.id} id="ducl">
              <md-radio
                name="audience"
                value={e.audience}
                aria-label={e.audience}
                {...register("audience")}
                onClick={() => handleAudience(e)}
              ></md-radio>
              <label
                className="margin-left"
                name="audience"
                htmlFor={e.audience}
              >
                {e.audience}
              </label>
            </div>
          ))}
        </div>

        <md-divider></md-divider>
        {/*start date and time */}
        <div>
          <h3 id="form-title-text">Event Date & time</h3>
          <div id="form-date-div">
            <TextField
              {...register("startDate", { required: true })}
              label="Start Date"
              required
              type="date"
              variant="filled"
              fullWidth
              id="form-date-input"
              onChange={(e) => checkDateValue(e)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              {...register("startTime", { required: true })}
              label="Start Time"
              required
              type="time"
              variant="filled"
              fullWidth
              id="form-time-input"
              InputLabelProps={{ shrink: true }}
            />
          </div>
          {errorDate ? (
            <span id="error-span">Date should be equal to or after today</span>
          ) : null}
        </div>

        <md-divider></md-divider>

        <div className="fc">
          <md-filled-button className="p-0" type="submit" id="button">
            Publish Event
          </md-filled-button>
        </div>
      </form>
    </div>
  );
};
export default Form;
