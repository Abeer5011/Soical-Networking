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
            <Modal.Title>Post</Modal.Title>
          </Modal.Header>
          <Form.Group className="mb-3">
            <Form.Label>photo</Form.Label>
            <Form.Control type="file" name="photo" accept="image/png/jpg" />
          </Form.Group>
          <Form.Label>caption</Form.Label>
          <Form.Group className="mb-3">
            <Form.Control type="text" name="caption" defaultValue={myPost?.caption} />
          </Form.Group>
          <Form.Label>Interests</Form.Label>
          <Row>
            {interests?.map(interest => (
              <>
                <Col>
                  <Form.Group className="mb-3">
                    <p>{interest.interest}</p>
                    <Form.Check type="checkbox" name="interests" key={interest._id} value={interest._id} />
                  </Form.Group>
                </Col>
              </>
            ))}
          </Row>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>

            <Button variant="primary" type="submit" onClick={() => setShow(false)}>
              Done
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default EditPostModal
