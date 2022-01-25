import { faEllipsisH } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { Button, Card, Col, FloatingLabel, Form, InputGroup, Modal, Row, SplitButton } from "react-bootstrap"
import PostContext from "../utils/PostContext"
import CommentsMap from "./CommentsMap"

function ViewCommentModal(props) {
  const { show, setShow, comment, post } = props

  const { applyComment } = useContext(PostContext)

  console.log(comment)
  return (
    <>
      <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
          <Row>
            <Form onSubmit={e => applyComment(e, post._id)}>
              <FloatingLabel>
                <InputGroup className="mb-3">
                  <SplitButton type="submit" variant="outline-secondary" title="send"></SplitButton>
                  <Form.Control
                    aria-label="Text input with dropdown button"
                    name="comment"
                    placeholder="write a comment..."
                  />
                </InputGroup>
              </FloatingLabel>
            </Form>
          </Row>
        </Modal.Header>
        <Modal.Body>
          {post.comments.map(comment => (
            <CommentsMap key={comment._id} comment={comment} post={post} />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="none" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ViewCommentModal
