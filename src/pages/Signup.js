import { useContext } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import PostContext from "../utils/PostContext"
import pic from "../images/pic2.png"
import { Link } from "react-router-dom"

function Signup() {
  const { signup } = useContext(PostContext)
  return (
    <>
      <Row style={{ marginTop: 100 }}>
        <Col style={{ marginTop: 100 }}>
          <Form onSubmit={signup}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your first name" name="firstName" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your first name" name="lastName" />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="password" name="password" />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Birth Date</Form.Label>
                <Form.Control type="date" name="birthDate" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Gender</Form.Label>
                <Form.Select name="gender">
                  <option value={"female"}>Female</option>
                  <option value={"male"}>Male</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Avatar</Form.Label>
                <Form.Control type="file" accept="image/png/jpg" name="avatar" />
              </Form.Group>
            </Row>

            <Button variant="none" type="submit" style={{ backgroundColor: "#8d99ae" }}>
              SignUp
            </Button>
            <Link to="/login">
              <Button variant="none" style={{ backgroundColor: "#8d99ae", margin: 10 }}>
                Login
              </Button>
            </Link>
          </Form>
        </Col>
        <Col>
          <img src={pic} width="500" height="500" style={{ objectFit: "cover" }} />
        </Col>
      </Row>
    </>
  )
}

export default Signup
