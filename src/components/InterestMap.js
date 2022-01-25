import { useState } from "react"
import { Col, Form } from "react-bootstrap"

function InterestMap(props) {
  const { interest } = props
  const [opacity, setOpacity] = useState(1)
  return (
    <>
      <Col>
        <Form.Label>
          <Form.Group>
            <img
              src={interest.photo}
              height={150}
              width={200}
              onClick={() => setOpacity(0.5)}
              style={{ opacity: opacity, borderRadius: 4, objectFit: "cover", cursor: "pointer" }}
            />
            <span style={{ marginLeft: 70 }}>{interest.interest}</span>
            <Form.Check type="checkbox" style={{ display: "none" }} name="interests" value={interest._id} />
          </Form.Group>
        </Form.Label>
      </Col>
    </>
  )
}

export default InterestMap
