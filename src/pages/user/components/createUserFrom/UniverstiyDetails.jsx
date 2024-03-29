import { useState, useEffect, useRef } from "react";
import { majorList } from "../../../../lists/MajorList";
import { institutionsList } from "../../../../lists/InstitutionList";
import "@material/web/select/select-option.js";
import "@material/web/select/outlined-select.js";
import { db } from "../../../../FireBase";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const UniversityDetails = (props) => {
  const [major, setMajor] = useState(null);
  const [uniID, setUniID] = useState(null);

  const [university, setUniversity] = useState(null);
  const [errors, setErrors] = useState({});
  const formRef = useRef();

  function back() {
    props.setCurrentStepIndex(props.currentStepIndex - 1);
  }

  const fetchUniID = async () => {
    console.log(university)

    try {
      const eventDataQuery = query(
        collection(db, "university"),
        where("uniName", "==", university)
      );
      const eventInfoSnapshot = await getDocs(eventDataQuery);
      eventInfoSnapshot.docs.map((doc) => setUniID(doc.id));
      console.log(uniID)
    } catch (error) {
      console.log("eat a fat dick and fix it:", error);
    }
  };

  useEffect(()=> {
    fetchUniID()
  } , [university])

  const handleValidation = async () => {
    let errors = {};
    if (university == null) {
      errors.university = "University field cant be Empty";
    }

    if (major == null) {
      errors.major = "Major field cant be Empty";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      props.setCurrentStepIndex(props.currentStepIndex + 1);
      await fetchUniID();
      props.setResponse({
        ...props.response,
        university: university,
        major: major,
        universityID: uniID,
      });
      console.log(props.response);
    } else {
      console.log("Validation errors:", errors);
    }
  };

  return (
    <div id="details-forms" ref={formRef}>
      <p className="signup-helper-text">Select your University:</p>
      {errors.university ? (
        <span className="form-helper-text-error">{errors.university}</span>
      ) : null}
      <md-outlined-select
        id="text-field-credentials"
        required
        selectIndex="1"
        label="University"
        onInput={(e) => setUniversity(e.target.value)}
      >
        {institutionsList.map((institution, index) => (
          <md-select-option
            key={index}
            value={institution.name}
            aria-label={institution.name}
          >
            <div slot="headline">{institution.name}</div>
          </md-select-option>
        ))}
      </md-outlined-select>

      <p className="signup-helper-text">Select your Major:</p>
      {errors.major ? (
        <span className="form-helper-text-error">{errors.major}</span>
      ) : (
        <span id="form-helper-text">Choose the closest major</span>
      )}
      <md-outlined-select
        id="text-field-credentials"
        required
        selectIndex="1"
        label="Major"
        onInput={(e) => setMajor(e.target.value)}
      >
        {majorList.map((e, index) => (
          <md-select-option key={index} value={e.major} aria-label={e.major}>
            <div slot="headline">{e.major}</div>
          </md-select-option>
        ))}
      </md-outlined-select>

      <div id="form-btns-navigation">
        <span id="form-btn-next" onClick={handleValidation}>
          Next
        </span>
        <span id="form-btn-back" onClick={back}>
          Back
        </span>
      </div>
    </div>
  );
};

export default UniversityDetails;
