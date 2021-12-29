import { useContext, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { ImPlus } from "react-icons/im"
import PostContext from "../utils/PostContext"
import AddPostModal from "./AddPostModal"

function AddPost() {
  const [show, setShow] = useState(false)

  return (
    <>
      <Button variant="none" onClick={() => setShow(true)}>
        <ImPlus />
      </Button>
      <AddPostModal show={show} setShow={setShow} />
    </>
  )
}

export default AddPost
