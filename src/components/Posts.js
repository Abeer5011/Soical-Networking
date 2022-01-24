import { FcLike, FcLikePlaceholder } from "react-icons/fc"
import { useContext } from "react"
import { Button, Card, Col, Row } from "react-bootstrap"
import PostContext from "../utils/PostContext"
import { ImBubble2 } from "react-icons/im"
import { Link } from "react-router-dom"
function Posts(props) {
  const { post } = props
  const { likePost, profile } = useContext(PostContext)
  let liked = false
  if (profile) liked = post.favorites.includes(profile._id)

  return (
    <>
      <Col style={{ width: 300 }}>
        <Card className="border-0" style={{ width: "18rem", marginTop: 20, marginLeft: 70 }}>
          <Link to={`/post/${post._id}`}>
            {post.photo ? (
              <Card.Img
                variant="top"
                src={post.photo}
                height={200}
                style={{ borderRadius: "10px", objectFit: "cover" }}
              />
            ) : null}
            {post.video ? (
              <Card style={{ borderRadius: "10px", objectFit: "cover" }}>
                <video autoPlay muted loop>
                  <source src={post.video} type="video/mp4" />
                </video>
              </Card>
            ) : null}

            <Card.ImgOverlay>
              {/* <Card.Title>
              <img src={post.owner.avatar} class="rounded-circle" height={30} />
            </Card.Title> */}

              <Card.Text>
                {/* <section style={{ display: "flex", marginTop: 190 }}>
                  <img src={post.owner.avatar} class="rounded-circle" height={30} />

                  <Button
                    variant="none"
                    className="mb-5"
                    style={{ marginLeft: 130 }}
                    onClick={() => likePost(post._id)}
                  >
                    {liked ? <FcLike /> : <FcLikePlaceholder />}
                  </Button>
                  <p className="mt-2">{post.favorites.length}</p>

                  <span className="ms-3 mt-2">
                    <ImBubble2 />
                  </span>
                  <p className="ms-2 mt-2">{post.comments.length}</p>
                </section> */}
              </Card.Text>
            </Card.ImgOverlay>
          </Link>
        </Card>
      </Col>
    </>
  )
}

export default Posts
