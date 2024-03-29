import { useContext, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { BsSearch } from "react-icons/bs"
import { Link } from "react-router-dom"
import ExploreCard from "../components/ExploreCard"
import NavbarItem from "../components/NavbarItem"
import PopularPost from "../components/PopularPost"
import PostContext from "../utils/PostContext"

function ExplorePage() {
  const { posts } = useContext(PostContext)
  const [search, setSearch] = useState("")
  posts.sort(() => 0.5 - Math.random())

  const searchPosts = posts.filter(post =>
    post.interests.find(interest =>
      post.interests.find(interest => interest.interest.toLowerCase().includes(search.toString().toLowerCase()))
    )
  )
  return (
    <>
      <NavbarItem inProfile={true} />
      <Form
        style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: 100, marginBottom: 50 }}
      >
        <Form.Control
          style={{ borderRadius: "10px", width: 400 }}
          type="text"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={search}
          onChange={event => setSearch(event.target.value)}
        />

        {/* <Button variant="none">
          <BsSearch type="submit" />
        </Button> */}
      </Form>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          alignItems: "center",
          gap: 0,
        }}
      >
        {searchPosts.map(post => (
          <ExploreCard key={post._id} post={post} />
        ))}
      </div>
    </>
  )
}

export default ExplorePage
