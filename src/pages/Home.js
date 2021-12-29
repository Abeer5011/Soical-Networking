import { useContext } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import NavbarItem from "../components/NavbarItem"
import PopularPost from "../components/PopularPost"
import Posts from "../components/Posts"
import PostContext from "../utils/PostContext"

function Home() {
  const { posts, profile } = useContext(PostContext)
  const navigate = useNavigate()
  if (!profile) return <h1>Lodaing...</h1>
  if (!profile.interests.length) {
    navigate("/greeting")
    return null
  }
  // const popularPost = posts.sort((a, b) => b.favorites - a.favorites)
  // posts = posts.filter(post => post.interests.find(interest => profile.interests.find(int => int._id == int._id)))

  return (
    <>
      <Container>
        {/* <NavbarItem inHome={true} /> */}
        <Row md={3} className="g-0" style={{ backgroundColor: "#e5e5e5" }}>
          {posts.map(post => (
            <Posts key={post._id} post={post} />
          ))}
          {/* <Col
          style={{
            width: 350,
            marginLeft: 95,
            borderRadius: "10px",
            height: 900,
            backgroundColor: "#ffffff",
          }}
        > */}
          {/* <div>
            <aside style={{ textAlign: "left", marginTop: 30, marginLeft: 20, fontSize: 30, fontWeight: "bold" }}>
              Popular Post
            </aside>
            <Link to="/tops" style={{ marginLeft: 300, textDecoration: "none" }}>
              More
            </Link>
            {popularPost.map(popularOne => (
              <PopularPost popularOne={popularOne} />
            ))}
          </div> */}
          {/* </Col> */}
        </Row>
      </Container>
    </>
  )
}

export default Home
