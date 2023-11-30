import { Box, Container, Paper } from "@mui/material";
import Login from "../../components/auth/Login";
import SignUp from "../../components/auth/SignUp";
import Nav from "../../components/Nav";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/divider/divider.js";
import { Typewriter } from "react-simple-typewriter";
import { useState, useEffect } from "react";

const AdminLanding = () => {
  const luck = ["Sharing", "Managing", "Elevating", "Hosting", "Promoting"];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBannerText(luck[Math.floor(Math.random() * 5)]);
    }, 3000);

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []); 

  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle((t) => !t);
  };

  return (
    <div id="landingPage">
      
        <Nav admin={true}/>
      

      <Container maxWidth="lg" id="main-container" sx={{ height: "100%" }}>
        <Container maxWidth="lg" sx={{ height: "100px", margin: "10px" }}>
          <div className="banerText-admin">

          <Typewriter
              words={[
                "Sharing",
                "Managing",
                "Elevating",
                "Hosting",
                "Promoting",
              ]}
              cursor
              loop={Infinity}
              cursorColor="#6750a4"
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={70}
              delaySpeed={2000}
            />


            <h1 className="purple">University Events</h1>
            
            <span> for</span> <span className="purple"> FREE </span>
          </div>
          <p id="landing-desc-desktop">
            <b> Create, Manage, Share, and Promote </b>
            events with our <span>UniEvent</span> platform. And explore more
            events
          </p>
        </Container>

        <Paper
          elevation={0}
          variant="outlined"
          className="paper-landing"
          sx={{
            marginBottom: "20px",
            paddingBottom: "0px",
            border: "0px",
            padding: "0px 15px 0px 15px",
          }}
        >
          {toggle == false ? <Login /> : <SignUp />}
          <md-divider></md-divider>
          <md-filled-tonal-button onClick={handleToggle} id="button">
            {" "}
            {toggle == false ? "Create new account" : "I have account"}{" "}
          </md-filled-tonal-button>
        </Paper>

        <p id="landing-desc-mobile">
          <b> Create, Manage, Share, and Promote </b>
          events with our <span>UniEvent</span> platform. And explore more
          events
        </p>
      </Container>
    </div>
  );
};

export default AdminLanding;
