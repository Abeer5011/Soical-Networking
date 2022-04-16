import { useContext } from "react"
import { Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import NavbarItem from "../components/NavbarItem"
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

  const postA = posts.filter(post =>
    post.interests.find(onePost => profile.interests.find(profilrI => profilrI._id == onePost._id))
  )

  postA.sort(() => 0.5 - Math.random())

  return (
    <>
      <NavbarItem inProfile={true} />
      <Container style={{ marginTop: 100 }}>
        <Row md={3} className="g-0">
          {postA.map(post => (
            <Posts key={post._id} post={post} />
          ))}
        </Row>
      </Container>
    </>
  )
}

export default Home
