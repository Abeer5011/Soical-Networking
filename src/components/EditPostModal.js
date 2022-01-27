import { useContext } from "react"
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import PostContext from "../utils/PostContext"

function EditPostModal(props) {
  const { myPost, show, setShow } = props
  const { editPost, interests } = useContext(PostContext)
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Form onSubmit={e => editPost(e, myPost._id)} style={{ margin: 50 }}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Post</Modal.Title>
          </Modal.Header>
          <Form.Group className="mb-3">
            <Form.Label>Photo</Form.Label>
            <Form.Control type="file" accept="image/png/jpg" name="photo" />
            <Form.Label>Video</Form.Label>
            <Form.Control type="file" accept="video/mp4" name="video" />
          </Form.Group>
          <Form.Label>caption</Form.Label>
          <Form.Group className="mb-3">
            <Form.Control type="text" name="caption" defaultValue={myPost?.caption} />
          </Form.Group>
          <Form.Label>Interests</Form.Label>
          <Row className="mb-3" md={4}>
            {interests?.map(interest => (
              <>
                <Col>
                  <p>#{interest.interest}</p>
                  <Form.Check type="checkbox" name="interests" key={interest._id} value={interest._id} />
                </Col>
              </>
            ))}
          </Row>

          <Modal.Footer>
            <Button variant="none" onClick={() => setShow(false)}>
              Close
            </Button>

            <Button variant="none" type="submit" onClick={() => setShow(false)}>
              Done
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default EditPostModal
