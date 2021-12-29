import { useContext } from "react"
import { Card, Col, Form, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import PostContext from "../utils/PostContext"
import Styles from "../style/Greeting.module.css"

function Greeting() {
  const { interests, interestPicked } = useContext(PostContext)

  console.log(interests)

  return (
    <>
      <Form onSubmit={interestPicked}>
        <Row md={6} style={{ marginTop: 200 }}>
          {interests.map(interest => (
            <>
              <Col>
                {/* <h2>{interest.interest}</h2> */}
                <div class="container">
                  <Form.Label class="option_item">
                    {/* <label class="option_item"> */}
                    {/* <input type="checkbox" class="checkbox" /> */}
                    <div class="option_inner interest">
                      <div class="tickmark"></div>
                      <Form.Group class="icon">
                        <img src={interest.photo} height={200} width={200} />
                        <span class="name">{interest.interest}</span>
                        <Form.Check type="checkbox" name="interests" key={interest._id} value={interest._id} />
                      </Form.Group>
                      {/* <div class="icon">
                      </div> */}

                      {/* <Form.Check type="checkbox" name="interests" value={interest._id} /> */}
                    </div>

                    {/* </label> */}
                  </Form.Label>
                </div>
              </Col>
            </>
          ))}
        </Row>
        <button style={{ marginLeft: 650, marginTop: 50 }} type="submit">
          Done
        </button>
      </Form>
    </>
  )
}

export default Greeting
