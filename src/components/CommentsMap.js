import ViewCommentModal from "./ViewCommentModal"

function CommentsMap(props) {
  const { show, setShow, post } = props

  return (
    <>
      {post.comments.map(comment => (
        <ViewCommentModal key={comment._id} comment={comment} setShow={setShow} show={show} post={post} />
      ))}
    </>
  )
}

export default CommentsMap
