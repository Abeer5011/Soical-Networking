import { useContext } from "react"
import { Button, Form } from "react-bootstrap"
import PostContext from "../utils/PostContext"

function Login() {
  const { login } = useContext(PostContext)

  return (
    <>
      <Form onSubmit={login} style={{ margin: 50, marginLeft: 500 }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" />
          <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" />
        </Form.Group>
        <Button variant="none" type="submit" style={{ backgroundColor: "#8d99ae" }}>
          Submit
        </Button>
      </Form>
    </>
  )
}

export default Login
