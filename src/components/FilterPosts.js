import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

function FilterPosts(props) {
  const { filterPost } = props
  return (
    <>
      <Col style={{ width: 300 }}>
        <Card className="border-0" style={{ width: "18rem", marginTop: 20, marginLeft: 70 }}>
          <Link to={`/post/${filterPost._id}`}>
            {filterPost.photo ? (
              <Card.Img
                variant="top"
                src={filterPost.photo}
                height={200}
                style={{ borderRadius: "10px", objectFit: "cover" }}
              />
            ) : null}
            {filterPost.video ? (
              <video autoPlay muted loop style={{ height: 200, objectFit: "cover", borderRadius: 10, width: 290 }}>
                <source src={filterPost.video} type="video/mp4" />
              </video>
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

export default FilterPosts
