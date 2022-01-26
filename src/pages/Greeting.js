import { useContext, useState } from "react"
import { Card, Col, Form, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import InterestMap from "../components/InterestMap"
import NavbarItem from "../components/NavbarItem"
import PostContext from "../utils/PostContext"
import pic from "../images/pic1.png"
import styles from "../style/beforeHome.css"
function Greeting() {
  const { interests, interestPicked, profile } = useContext(PostContext)

  if (!profile) {
    return <h1>Loading...</h1>
  }

  let currentDate = new Date()
  currentDate = currentDate.getHours()

  let greeting = ""

  if (currentDate >= 1 && currentDate < 12) {
    greeting = "Good Morning"
  } else if (currentDate >= 12 && currentDate < 19) {
    greeting = "Good afternoon"
  } else {
    greeting = "Good Evening"
  }

  return (
    <>
      <NavbarItem inProfile={false} />
      <div
        style={{
          marginTop: 40,
          textAlign: "center",
          fontSize: 30,
          color: "black",
          padding: "200px 500px 50px 0px",
        }}
      >
        <h1 class="text">
          {greeting} {profile.firstName}!, <br />
        </h1>
        <p className="text-muted">Tell us What is your interests?</p>
      </div>

      <img
        src={pic}
        alt=""
        width="500"
        height="500"
        style={{ objectFit: "cover", position: "absolute", right: 150, top: 50 }}
      />
      <span class="arrow arrow-down"></span>
      <Form onSubmit={interestPicked}>
        <Row md={5} style={{ marginTop: 300 }}>
          {interests.map(interest => (
            <>
              <InterestMap interest={interest} key={interest._id} />
            </>
          ))}
        </Row>
        <button class="nextButton" type="submit">
          <span>Next</span>
        </button>
      </Form>
    </>
  )
}

export default Greeting
