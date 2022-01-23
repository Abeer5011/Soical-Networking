import { useContext } from "react"
import { Card } from "react-bootstrap"
import { Button, ListGroup, Modal, Row } from "react-bootstrap"
import PostContext from "../utils/PostContext"
import InterestsView from "./InterestsView"
import MyPosts from "./MyPosts"

function UserProfile(props) {
  const { show, setShow, post } = props
  const { users } = useContext(PostContext)
  if (!users) return <p> loding...</p>

  const a = users.find(user => user._id == post.owner._id)

  return (
    <>
      <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
          <img src={a.avatar} class="rounded-circle" height={100} width={100} />
          <h6>{a.firstName}</h6>
          <Card style={{ width: "18rem" }}>
            <Card.Header>interests</Card.Header>
            <ListGroup variant="flush">
              <Row md={1} className="g-0" style={{ backgroundColor: "#e5e5e5" }}>
                {a.interestView.map(interestViewA => (
                  <InterestsView key={interestViewA._id} interestViewA={interestViewA} />
                ))}
              </Row>
            </ListGroup>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default UserProfile
