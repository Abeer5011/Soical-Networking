import { faEllipsisH } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { Card, Col, Row } from "react-bootstrap"
import PostContext from "../utils/PostContext"

function CommentsMap(props) {
  const { comment, post } = props
  const [deleteComments, setDeleteComments] = useState(false)
  const { deleteComment } = useContext(PostContext)
  return (
    <>
      <Card style={{ margin: 10, maxWidth: 1100, borderRadius: "10px", backgroundColor: "#f7fff7" }}>
        <Row>
          <Col>
            <img src={comment?.owner?.avatar} class="rounded-circle" style={{ width: 30, height: 30 }} />

            <h6 className="text-muted" style={{ marginLeft: 30, marginTop: -20 }}>
              @{comment?.owner?.firstName}
            </h6>
          </Col>
        </Row>

        <Row style={{ marginLeft: 150 }}>{comment?.comment}</Row>

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "end" }}>
          <FontAwesomeIcon
            icon={faEllipsisH}
            onClick={() => setDeleteComments(!deleteComments)}
            style={{ cursor: "pointer" }}
          />
          {deleteComments && (
            <span
              style={{ position: "absolute", top: 30, right: 0 }}
              onClick={() => deleteComment(comment._id, post._id)}
            >
              delete
            </span>
          )}
        </div>
      </Card>
    </>
  )
}

export default CommentsMap
