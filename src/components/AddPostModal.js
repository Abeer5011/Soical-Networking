import { faMusic, faPhotoVideo, faUpload, faVideo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { Button, Col, Form, Modal, Row, InputGroup } from "react-bootstrap"
import PostContext from "../utils/PostContext"

function AddPostModal(props) {
  const { interests, puplishPost } = useContext(PostContext)
  const [videoShow, setVideoShow] = useState(false)
  const { show, setShow } = props
  console.log(interests)

  return (
    <>
      <Modal show={show} style={{ backgroundColor: "#7ca28a", textAlign: "center" }} onHide={() => setShow(false)}>
        <Form onSubmit={puplishPost} style={{ margin: 50 }}>
          <Modal.Header closeButton>
            <Modal.Title style={{ marginLeft: 130 }}>New Post</Modal.Title>
          </Modal.Header>

          <Form.Group className="mb-3">
            <Form.Label style={{ display: "flex", justifyContent: "center", marginTop: 10, cursor: "pointer" }}>
              <FontAwesomeIcon icon={faPhotoVideo} onClick={() => setVideoShow("photoPost")} className="me-3" />
              <FontAwesomeIcon icon={faVideo} onClick={() => setVideoShow("videoPost")} />
            </Form.Label>

            {videoShow === "photoPost" ? (
              <>
                <Form.Label>Photo</Form.Label>
                <Form.Control type="file" accept="image/png/jpg" name="photo" />
              </>
            ) : (
              videoShow === false
            )}
            {videoShow === "videoPost" ? (
              <>
                <Form.Label>Video</Form.Label>
                <Form.Control type="file" accept="video/mp4" name="video" />
              </>
            ) : (
              videoShow === false
            )}
          </Form.Group>
          <Form.Label>Caption</Form.Label>
          <Form.Group className="mb-3">
            <Form.Control as="textarea" name="caption" placeholder="your caption..." />
          </Form.Group>
          <Form.Label>Tags</Form.Label>
          <Row className="mb-3" md={4}>
            {interests.map(interest => (
              <>
                <Col>
                  <Form.Check type="checkbox" name="interests" key={interest._id} value={interest._id} />

                  <span>#{interest.interest}</span>
                </Col>
              </>
            ))}
          </Row>

          <Modal.Footer>
            <Button variant="none" onClick={() => setShow(false)}>
              Close
            </Button>

            <Button variant="none" type="submit" onClick={() => setShow(false)}>
              <FontAwesomeIcon icon={faUpload} />
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default AddPostModal
