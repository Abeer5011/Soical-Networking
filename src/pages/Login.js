import { useContext } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import PostContext from "../utils/PostContext"
import pic from "../images/pic5.png"

function Login() {
  const { login } = useContext(PostContext)

  return (
    <>
      <Row style={{ marginTop: 100 }}>
        <Col style={{ marginTop: 100 }}>
          <Form onSubmit={login}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" />
            </Form.Group>
            <Button variant="none" type="submit" style={{ backgroundColor: "#8d99ae" }}>
              Submit
            </Button>
          </Form>
        </Col>
        <Col>
          <img src={pic} alt="" width="500" height="500" style={{ objectFit: "cover" }} />
        </Col>
      </Row>
    </>
  )
}

export default Login
