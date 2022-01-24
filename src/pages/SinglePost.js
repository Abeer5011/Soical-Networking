import { faEllipsisH } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { Button, Card, Col, FloatingLabel, Form, InputGroup, Row, SplitButton } from "react-bootstrap"
import { FcLike, FcLikePlaceholder } from "react-icons/fc"
import { ImBubble2 } from "react-icons/im"
import { useParams } from "react-router-dom"
import FilterPosts from "../components/FilterPosts"
import UserProfile from "../components/UserProfile"
import { saveAs } from "file-saver"
import PostContext from "../utils/PostContext"
import firebase from "../utils/firebase"
import CommentsMap from "../components/CommentsMap"

function SinglePost() {
  const { postId } = useParams()
  const { posts, likePost, profile, applyComment } = useContext(PostContext)
  const [viewComments, setViewComments] = useState(false)
  const [show, setShow] = useState(false)
  const [showUser, setShowUser] = useState(false)
  const [Url, setUrl] = useState("")

  if (posts.length === 0) return <h1>Loading...</h1>

  const post = posts.find(post => post._id === postId)

  let liked = false
  if (profile) liked = post.favorites.includes(profile._id)

  const filterPosts = posts.filter(postA =>
    postA.interests.find(interest => post.interests.find(postI => postI._id == interest._id))
  )

  // if (post.comments.length > 2) {
  //   post.comments.splice(0, 1)
  // }
  const saveFile = () => {
    const storageRef = firebase.storage().ref()
    console.log(storageRef)
    // [START storage_download_via_url]
    storageRef
      .child(`/images/${post.photo}`)
      .getDownloadURL()
      .then(url => {
        // `url` is the download URL for 'images/stars.jpg'

        saveAs(url)
      })
  }

  return (
    <>
      <Card style={{ width: 500, marginLeft: 300, position: "relative" }}>
        {post.photo ? <Card.Img variant="top" src={post.photo} /> : null}
        {post.video ? (
          <Card>
            <video autoPlay muted loop>
              <source src={post.video} type="video/mp4" />
            </video>
          </Card>
        ) : null}

        <Card.Body>
          <Card.Text>
            <section>
              <img
                src={post.owner.avatar}
                class="rounded-circle"
                style={{ objectFit: "cover" }}
                height={30}
                width={30}
                onClick={() => setShowUser(true)}
              />
              <p style={{ display: "inline" }} className="ms-2 text-muted">
                @{post.owner.firstName}
              </p>

              <FontAwesomeIcon
                icon={faEllipsisH}
                onClick={() => setShow(!show)}
                style={{ position: "absolute", right: 10, cursor: "pointer" }}
              />
              {show && (
                <div
                  style={{
                    position: "absolute",

                    right: 0,
                    backgroundColor: "white",
                  }}
                >
                  <Button onClick={saveFile}>Click to Download</Button>
                </div>
              )}
              <Card className="mt-3">
                <p>{post.caption}</p>
              </Card>
              <Row>
                <Col style={{ display: "flex" }}>
                  <Button variant="none" onClick={() => likePost(post._id)}>
                    {liked ? <FcLike /> : <FcLikePlaceholder />}
                  </Button>

                  <p className="mt-3">{post.favorites.length}</p>

                  <Button variant="none">
                    <ImBubble2 />
                  </Button>

                  <p className="mt-3">{post.comments.length}</p>
                </Col>
              </Row>
              <Row>
                <Form onSubmit={e => applyComment(e, post._id)}>
                  <FloatingLabel>
                    <InputGroup className="mb-3">
                      <SplitButton
                        type="submit"
                        variant="outline-secondary"
                        title="send"
                        id="segmented-button-dropdown-1"
                      ></SplitButton>
                      <Form.Control
                        aria-label="Text input with dropdown button"
                        name="comment"
                        placeholder="write a comment..."
                      />
                    </InputGroup>
                  </FloatingLabel>
                </Form>
              </Row>

              <Row className="me-4">
                <h6 onClick={() => setViewComments(true)}>Comments</h6>
                {post.comments.map(comment => (
                  <>
                    <Card style={{ margin: 20, maxWidth: 1100, borderRadius: "10px" }}>
                      <Row>
                        <Row style={{ display: "flex", alignItems: "center" }}>
                          <Col>
                            <img src={comment.owner.avatar} class="rounded-circle" style={{ width: 50 }} />

                            <h6 className="text-muted" style={{ display: "inline" }}>
                              @{comment.owner.firstName}
                            </h6>
                          </Col>
                        </Row>

                        <Row style={{ marginLeft: 150 }}>{comment.comment}</Row>
                      </Row>
                    </Card>
                  </>
                ))}
              </Row>
            </section>
          </Card.Text>
        </Card.Body>
      </Card>

      <Row md={3} className="g-0" style={{ backgroundColor: "#e5e5e5" }}>
        {filterPosts.map(filterPost => (
          <FilterPosts key={filterPost._id} filterPost={filterPost} />
        ))}
      </Row>

      <CommentsMap setShow={setViewComments} show={viewComments} post={post} />
      <UserProfile setShow={setShowUser} show={showUser} post={post} />
      {/* <ViewCommentModal post={post} /> */}
    </>
  )
}

export default SinglePost
