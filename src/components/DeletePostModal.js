import { useContext } from "react"
import { Button, Modal } from "react-bootstrap"
import PostContext from "../utils/PostContext"

function DeletePostModal(props) {
  const { show, setShow, myPost } = props
  const { deletePost } = useContext(PostContext)
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            no
          </Button>
          <Button variant="primary" onClick={() => setShow(false)} onClick={() => deletePost(myPost._id)}>
            yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeletePostModal
