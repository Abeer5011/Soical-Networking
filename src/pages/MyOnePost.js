import { faArrowCircleDown, faEllipsisH, faEllipsisV } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useContext } from "react"
import { saveAs } from "file-saver"
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
import ViewCommentModal from "../components/ViewCommentModal"
import PostContext from "../utils/PostContext"

function MyOnePost() {
  const { mypostId } = useParams()
  const { profile, likePost, applyComment } = useContext(PostContext)
  const [show, setShow] = useState(false)
  const [editPost, setEditPost] = useState(false)
  const [deletePostShow, setDeletePostShow] = useState(false)
  const [viewComments, setViewComments] = useState(false)

  if (!profile) return <h1>Loading...</h1>

  const myPost = profile.myPosts.find(post => post._id === mypostId)
  let liked = false
  if (profile) liked = profile.favorites.includes(profile._id)

  const saveFile = () => {
    if (myPost.photo) {
      saveAs(myPost.photo)
    }

    if (myPost.video) {
      saveAs(myPost.video)
    }
  }
  return (
    <>
      <NavbarItem inProfile={true} />
      <Card className="text-white" style={{ marginLeft: 300, marginTop: 50, width: 500, borderRadius: 10 }}>
        {myPost.photo ? (
          <Card.Img variant="top" src={myPost.photo} style={{ height: 400, objectFit: "cover", borderRadius: 10 }} />
        ) : null}
        {myPost.video ? (
          <video autoPlay muted loop style={{ height: 400, objectFit: "cover", borderRadius: 10 }}>
            <source src={myPost.video} type="video/mp4" />
          </video>
        ) : null}
        <Card.ImgOverlay>
          <Card.Title>
            <img
              src={myPost.owner.avatar}
              class="rounded-circle"
              style={{ objectFit: "cover" }}
              height={30}
              width={30}
            />
            <h6 style={{ display: "inline", color: "white" }} className="ms-2 ">
              @{myPost.owner.firstName}
            </h6>
          </Card.Title>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 200,
              borderRadius: 15,
              gap: 5,
            }}
          >
            <h6>{myPost.caption}</h6>
            {myPost.interests.map(interest => (
              <h6> #{interest.interest}</h6>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "start", marginTop: 50, gap: 15 }}>
            <Button variant="none" onClick={() => likePost(myPost._id)} style={{ borderRadius: 15, color: "white" }}>
              {liked ? <FcLike /> : <FcLikePlaceholder />}
              <span className="ms-2"> {myPost.favorites.length}</span>
            </Button>

            <Button variant="none" style={{ borderRadius: 15, color: "white" }}>
              <ImBubble2 />
              <span className="ms-2">{myPost.comments.length}</span>
            </Button>
          </div>
          <div style={{ display: "flex", justifyContent: "end", cursor: "pointer" }}>
            <FontAwesomeIcon icon={faEllipsisH} onClick={() => setShow(!show)} />
          </div>
        </Card.ImgOverlay>
      </Card>

      {show && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: 500,
            right: 400,
            backgroundColor: "white",
            cursor: "pointer",
          }}
        >
          <ul style={{ listStyle: "none" }}>
            <li onClick={() => setEditPost(true)}>Edit</li>
            <li onClick={saveFile}>Download</li>
            <li onClick={() => setDeletePostShow(true)}>Delete</li>
          </ul>
        </div>
      )}

      <EditPostModal show={editPost} setShow={setEditPost} myPost={myPost} />
      <DeletePostModal show={deletePostShow} setShow={setDeletePostShow} myPost={myPost} />
    </>
  )
}

export default MyOnePost
