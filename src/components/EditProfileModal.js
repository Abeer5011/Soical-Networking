import { useContext } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import PostContext from "../utils/PostContext"

function EditProfileModal(props) {
  const { profile, show, setShow } = props
  const { editProfile } = useContext(PostContext)
  console.log(profile)
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Form onSubmit={editProfile} style={{ margin: 50 }}>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Form.Group className="mb-3">
          <Form.Label>firstName</Form.Label>
          <Form.Control type="text" name="firstName" defaultValue={profile.firstName} />
        </Form.Group>
        <Form.Label>lastName</Form.Label>
        <Form.Group className="mb-3">
          <Form.Control type="text" name="lastName" defaultValue={profile.lastName} />
        </Form.Group>
        <Form.Label>email</Form.Label>
        <Form.Group className="mb-3">
          <Form.Control type="email" name="email" defaultValue={profile.email} />
        </Form.Group>
        <Form.Group controlId="formGridCity">
          <Form.Label>Birth Date</Form.Label>
          <Form.Control type="date" name="birthDate" defaultValue={profile.birthDate} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>avatar</Form.Label>
          <Form.Control type="file" accept="image/png/jpg" name="avatar" defaultValue={profile.avatar} />
        </Form.Group>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>

          <Button variant="primary" type="submit">
            Done
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default EditProfileModal
