import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { db } from "../../FireBase";

import Cookies from "universal-cookie";
import Cards from "./Cards";
import Filter from "../../components/Filter";

const CardContainer = (props) => {
  const [events, setEvents] = useState([]);
  const [uni, setUni] = useState("");
  const [user, setUser] = useState();
  const cookies = new Cookies();
  const userEmail = cookies.get("email");
  const [state, setState] = useState(false);
  const [fetch, setFetch] = useState(false);

  const fetchEventData = async () => {
    try {
      const eventDataQuery = await query(
        collection(db, "events"), 
        where("audience", "==", "Open to Everyone"),
        orderBy("startDate", "asc") // Add this line to order events by startDate in ascending order.
      );
      const eventInfoSnapshot = await getDocs(eventDataQuery);

      await setEvents(eventInfoSnapshot.docs.map((doc) => doc.data()));
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const userInfoQuery = await query(
        collection(db, "organizers"),
        where("email", "==", userEmail)
      );
      const userInfoSnapshot = await getDocs(userInfoQuery);
      const userDataArray = await userInfoSnapshot.docs[0].data();
      await setUser(userDataArray);
      await setUni(userDataArray.institution);
      setState(true);
    } catch (error) {
      setState(false);
      console.log("eat a dick and have this", error);
    }
  };

  useEffect(() => {
    fetchEventData();
    fetchUserInfo();
    return () => {
      setState({});
    };
  }, []);

  return (
    <div id="cards-container">
      <Filter />
      {state ? (
        <div id="card-container">
          {events.length == 0 ? (
            <div id="noEvent">
              <span id="noEvent-span">No events found in the moment 😕</span>
              <p>Sign in to be updated 🚀.</p>
            </div>
          ) : (
            events.map((event, index) => (
              <Cards key={index} user={user} uni={uni} event={event} />
            ))
          )}
        </div>
      ) : null}
    </div>
  );
};

export default CardContainer;
