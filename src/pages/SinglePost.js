import { faComment, faPaperPlane, faSmileBeam, faEllipsisH, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { Button, Card, Col, Dropdown, FloatingLabel, Form, InputGroup, Row, SplitButton } from "react-bootstrap"
import { FcLike, FcLikePlaceholder } from "react-icons/fc"
import { ImBubble2 } from "react-icons/im"
import { useParams } from "react-router-dom"
import FilterPosts from "../components/FilterPosts"
import UserProfile from "../components/UserProfile"
import ViewCommentModal from "../components/ViewCommentModal"
import PostContext from "../utils/PostContext"
import firebase from "../utils/firebase"
import CommentsMap from "../components/CommentsMap"

function SinglePost() {
  const { postId } = useParams()
  const { posts, likePost, profile, applyComment, deleteComment } = useContext(PostContext)
  const [viewComments, setViewComments] = useState(false)
  const [deleteComments, setDeleteComments] = useState(false)
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

  const upload = async () => {
    const storageRef = firebase.ref(`/images/${post.photo.name}`)

    // [START storage_download_full_example]
    // Create a reference to the file we want to download
    var starsRef = storageRef.child(post.photo.name)

    // Get the download URL
    starsRef.getDownloadURL()
    await (url => {
      setUrl(url)
    }).catch(error => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/object-not-found":
          // File doesn't exist
          break
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break
        case "storage/canceled":
          // User canceled the upload
          break

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect the server response
          break
      }
    })
  }

  // Sending File to Firebase Storage
  // const storageRef = storage.ref(`/images/${post.photo.name}`)
  // const starsRef = storageRef.child(post.photo.name)
  // starsRef.getDownloadURL().then(url => {
  //   setUrl(url)
  // })

  // storage
  //   .ref(`/images/${post.photo.name}`)
  //   .put(post.photo)
  //   .on("state_changed", alert("success"), alert, () => {
  //     // Getting Download Link
  //     storage
  //       .ref("images")
  //       .child(post.photo.name)
  //       .getDownloadURL()
  //       .then(url => {
  //         setUrl(url)
  //       })
  //   })

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
                  // show={show}
                  style={{
                    position: "absolute",

                    right: 0,
                    backgroundColor: "white",
                  }}
                >
                  <p>
                    <a href={Url} onClick={upload}>
                      {Url}
                    </a>
                  </p>
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
