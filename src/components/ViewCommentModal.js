import { faEllipsisH } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { Button, Card, Col, Modal, Row } from "react-bootstrap"
import PostContext from "../utils/PostContext"

function ViewCommentModal(props) {
  const { show, setShow, comment, post } = props
  const [deleteComments, setDeleteComments] = useState(false)
  const { deleteComment } = useContext(PostContext)

  console.log(comment)
  return (
    <>
      <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <Card style={{ margin: 20, maxWidth: 1100, borderRadius: "10px" }}>
              <Row>
                <Row style={{ display: "flex", alignItems: "center" }}>
                  <Col>
                    <img src={comment?.owner?.avatar} class="rounded-circle" style={{ width: 50 }} />

                    <h6 className="text-muted" style={{ display: "inline" }}>
                      @{comment?.owner?.firstName}
                    </h6>
                  </Col>
                </Row>

                <Row style={{ marginLeft: 150 }}>{comment?.comment}</Row>
              </Row>
              <FontAwesomeIcon
                icon={faEllipsisH}
                onClick={() => setDeleteComments(!deleteComments)}
                style={{ display: "flex", cursor: "pointer" }}
              />
            </Card>
            {deleteComments && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "white",
                }}
              >
                <span onClick={() => deleteComment(comment._id, post._id)}>
                  {/* <FontAwesomeIcon icon={faTrash} /> */}
                  delete
                </span>
              </div>
            )}
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ViewCommentModal
