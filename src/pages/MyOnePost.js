import { faEllipsisH, faEllipsisV } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useContext } from "react"
import {
  Button,
  Card,
  Col,
  Dropdown,
  FloatingLabel,
  Form,
  FormControl,
  InputGroup,
  Row,
  SplitButton,
} from "react-bootstrap"
import { FcLike, FcLikePlaceholder } from "react-icons/fc"
import { ImBubble2 } from "react-icons/im"
import { useParams } from "react-router-dom"
import DeletePostModal from "../components/DeletePostModal"
import EditPostModal from "../components/EditPostModal"
import NavbarItem from "../components/NavbarItem"
import PostContext from "../utils/PostContext"

function MyOnePost() {
  const { mypostId } = useParams()
  const { profile, likePost, applyComment } = useContext(PostContext)
  const [show, setShow] = useState(false)
  const [editPost, setEditPost] = useState(false)
  const [deletePostShow, setDeletePostShow] = useState(false)

  if (!profile) return <h1>Loading...</h1>

  const myPost = profile.myPosts.find(post => post._id === mypostId)
  let liked = false
  if (profile) liked = profile.favorites.includes(profile._id)
  return (
    <>
      <NavbarItem inProfile={true} />
      <Card style={{ width: 500, marginLeft: 300 }}>
        <Card.Img variant="top" src={myPost?.photo} />
        <div>
          <FontAwesomeIcon
            icon={faEllipsisH}
            onClick={() => setShow(!show)}
            style={{ display: "flex", position: "absolute", right: 10, cursor: "pointer" }}
          />
          {show && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                top: 534,
                right: 0,
                backgroundColor: "white",
              }}
            >
              <ul>
                <li onClick={() => setEditPost(true)}>Edit</li>
                <li href="#">Download</li>
                <li onClick={() => setDeletePostShow(true)}>Delete</li>
              </ul>
            </div>
          )}
        </div>
        <Card.Body>
          <Card.Text>
            <section>
              <img src={myPost?.owner?.avatar} class="rounded-circle" height={30} />
              <p style={{ display: "inline" }} className="ms-2 text-muted">
                @{myPost?.owner?.firstName}
              </p>

              <Card className="mt-3">
                <p>{myPost?.caption}</p>
              </Card>
              <Row>
                <Col style={{ display: "flex" }}>
                  <Button variant="none" onClick={() => likePost(myPost._id)}>
                    {liked ? <FcLike /> : <FcLikePlaceholder />}
                  </Button>

                  <p className="mt-3">{myPost?.favorites?.length}</p>

                  <Button variant="none">
                    <ImBubble2 />
                  </Button>

                  <p className="mt-3">{myPost?.comments?.length}</p>
                </Col>
              </Row>
              <Row>
                <Form onSubmit={e => applyComment(e, myPost._id)}>
                  <FloatingLabel>
                    <InputGroup className="mb-3">
                      <SplitButton
                        type="submit"
                        variant="outline-secondary"
                        title="send"
                        id="segmented-button-dropdown-1"
                      >
                        <Dropdown.Item href="#">
                          <div style={{ display: "flex" }}>
                            <h6>&#128526;</h6>
                            <h6>&#128578;</h6>
                            <h6>&#128525;</h6>
                            <h6>&#128524;</h6>
                            <h6>&#128514;</h6>
                            <h6>&#128520;</h6>
                            <h6>&#129313;</h6>
                            <h6>&#128564;</h6>
                            <h6>&#129297;</h6>
                          </div>
                        </Dropdown.Item>
                      </SplitButton>
                      <FormControl
                        aria-label="Text input with dropdown button"
                        name="comment"
                        placeholder="write a comment..."
                      />
                    </InputGroup>

                    {/* <Button variant="none">
                  <FontAwesomeIcon icon={faSmileBeam} />
                </Button> */}
                    {/* <Button variant="none" type="submit">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </Button> */}
                  </FloatingLabel>
                </Form>
              </Row>

              {/* <button onClick={() => setViewComments(true)}>
              <FontAwesomeIcon icon={faComment} />
            </button> */}

              <Row className="me-4">
                <h6>Comments</h6>
                {myPost?.comments?.map(comment => (
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
                    </Card>
                  </>
                ))}
              </Row>
            </section>
          </Card.Text>
        </Card.Body>
      </Card>
      <EditPostModal show={editPost} setShow={setEditPost} myPost={myPost} />
      <DeletePostModal show={deletePostShow} setShow={setDeletePostShow} myPost={myPost} />
    </>
  )
}

export default MyOnePost
