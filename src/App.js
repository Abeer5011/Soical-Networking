import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import firebase from "./utils/firebase"
import Signup from "./pages/Signup"
import PostContext from "./utils/PostContext"
import axios from "axios"
import Login from "./pages/Login"
import NavbarItem from "./components/NavbarItem"
import Greeting from "./pages/Greeting"
import { useEffect, useState } from "react"
import Profile from "./pages/Profile"
import Home from "./pages/Home"
import EmailVerified from "./pages/EmailVerified"
import SinglePost from "./pages/SinglePost"
import MyOnePost from "./pages/MyOnePost"
import { ToastContainer, toast } from "react-toastify"
import ExplorePage from "./pages/ExplorePage"

function App() {
  const [profile, setProfile] = useState(null)
  const [interests, setinterests] = useState([])
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  const [users, setUsers] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    getPosts()
    getUsers()
    if (localStorage.token) {
      getComments()
      getInterests()
      getProfile()
    }
  }, [])
  const signup = async e => {
    e.preventDefault()
    const form = e.target
    try {
      const avatar = form.elements.avatar.files[0]
      let avatarUrl
      if (avatar) {
        const avatarRef = firebase.storage().ref("avatars").child(`${avatar.lastModified}-${avatar.name}`)
        await avatarRef.put(avatar)
        avatarUrl = await avatarRef.getDownloadURL()
      }

      const signupBody = {
        firstName: form.elements.firstName.value,
        lastName: form.elements.lastName.value,
        avatar: avatarUrl,
        gender: form.elements.gender.value,
        password: form.elements.password.value,
        birthDate: form.elements.birthDate.value,
        email: form.elements.email.value,
      }
      await axios.post("http://localhost:5000/api/auth/signup", signupBody)

      navigate("/login")
      toast.success("verification link is sent to your email, go check your email")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const login = async e => {
    e.preventDefault()
    try {
      const form = e.target

      const loginBody = {
        password: form.elements.password.value,
        email: form.elements.email.value,
      }
      const response = await axios.post("http://localhost:5000/api/auth/login", loginBody)
      const token = response.data
      localStorage.token = token

      getProfile()
      getInterests()
      toast.success("login is success")
      navigate("/")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const logout = async () => {
    localStorage.removeItem("token")
  }

  const getProfile = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/profile", {
        headers: {
          Authorization: localStorage.token,
        },
      })
      console.log(response.data)
      setProfile(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getInterests = async () => {
    const response = await axios.get("http://localhost:5000/api/interests")
    setinterests(response.data)
    console.log(response.data)
  }

  const getPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts")

      setPosts(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const puplishPost = async e => {
    e.preventDefault()
    const form = e.target
    try {
      const video = form.elements.video.files[0]
      let videoUrl
      if (video) {
        const videoRef = firebase.storage().ref("videos").child(`${video.lastModified}-${video.name}`)
        await videoRef.put(video)
        videoUrl = await videoRef.getDownloadURL()
      }

      const photo = form.elements.photo.files[0]
      let imageUrl
      if (photo) {
        const imageRef = firebase.storage().ref("images").child(`${photo.lastModified}-${photo.name}`)
        await imageRef.put(photo)
        imageUrl = await imageRef.getDownloadURL()
      }

      const interests = []

      form.elements.interests.forEach(interest => {
        if (interest.checked) {
          interests.push(interest.value)
        }
      })

      const postBody = {
        photo: imageUrl,
        video: videoUrl,
        interests: interests,
        caption: form.elements.caption.value,
      }
      await axios.post("http://localhost:5000/api/posts", postBody, {
        headers: {
          Authorization: localStorage.token,
        },
      })

      console.log("success")
      getPosts()
      getProfile()
      toast.success(" post is added successfuly")
    } catch (error) {
      console.log(error)
    }
  }

  const likePost = async postId => {
    try {
      await axios.get(`http://localhost:5000/api/posts/${postId}/favorites`, {
        headers: {
          Authorization: localStorage.token,
        },
      })

      getPosts()
      getProfile()
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const interestPicked = async e => {
    e.preventDefault()
    try {
      const form = e.target
      const interests = []

      form.elements.interests.forEach(interest => {
        if (interest.checked) {
          interests.push(interest.value)
        }
      })

      const interestBody = {
        interests: interests,
      }
      await axios.post("http://localhost:5000/api/auth/interests", interestBody, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      getProfile()
      navigate("/")
      console.log("added")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const editProfile = async e => {
    e.preventDefault()
    const form = e.target
    try {
      const avatar = form.elements.avatar.files[0]
      const avatarRef = firebase.storage().ref("avatars").child(`${avatar.lastModified}-${avatar.name}`)
      await avatarRef.put(avatar)
      const avatarUrl = await avatarRef.getDownloadURL()
      const profileBody = {
        firstName: form.elements.firstName.value,
        lastName: form.elements.lastName.value,
        avatar: avatarUrl,
        birthDate: form.elements.birthDate.value,
        email: form.elements.email.value,
      }
      await axios.put("http://localhost:5000/api/auth/profile", profileBody, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      getProfile()
      toast.success("edit is success")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const getComments = async postId => {
    try {
      const response = await axios.get(`http://localhost:5000/api/posts/${postId}/comments`)
      setComments(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const applyComment = async (e, postId) => {
    e.preventDefault()
    try {
      const form = e.target

      const commentBody = {
        comment: form.elements.comment.value,
      }
      form.reset()
      await axios.post(`http://localhost:5000/api/posts/${postId}/comments`, commentBody, {
        headers: {
          Authorization: localStorage.token,
        },
      })

      getPosts()
    } catch (error) {
      console.log(error)
    }
  }

  const editPost = async (e, postId) => {
    e.preventDefault()
    const form = e.target
    try {
      const photo = form.elements.photo.files[0]
      const photoRef = firebase.storage().ref("images").child(`${photo.lastModified}-${photo.name}`)
      await photoRef.put(photo)
      const photoUrl = await photoRef.getDownloadURL()

      const interests = []

      form.elements.interests.forEach(interest => {
        if (interest.checked) {
          interests.push(interest.value)
        }
      })
      const postBody = {
        photo: photoUrl,
        caption: form.elements.caption.value,
        interests: interests,
      }
      await axios.put(`http://localhost:5000/api/posts/${postId}`, postBody, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      getPosts()
      getProfile()
      toast.success("edit is success")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const deletePost = async postId => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: {
          Authorization: localStorage.token,
        },
      })

      getProfile()
      getPosts()
      navigate("/profile")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const deleteComment = async (commentId, postId) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}/comments/${commentId}`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      getPosts()
      getComments()
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }
  // const searchIcon = e => {
  //   e.preventDefault()
  //   const form = e.target
  //   const searchPosts = form.elements.searchPosts.value
  //   posts.filter(post =>
  //     post.interests.find(interest =>
  //       post.interests.find(interest => interest.interest.toLowerCase().includes(searchPosts.toLowerCase()))
  //     )
  //   )
  //   console.log(searchPosts)
  //   toast.error("not found")
  // }

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/users")
      console.log(response.data)
      setUsers(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const store = {
    signup,
    login,
    logout,
    profile,
    interests,
    posts,
    puplishPost,
    likePost,
    interestPicked,
    editProfile,
    applyComment,
    editPost,
    deletePost,
    comments,
    deleteComment,
    users,
  }

  return (
    <PostContext.Provider value={store}>
      <NavbarItem />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:postId" element={<SinglePost />} />
        <Route path="/greeting" element={<Greeting />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/myPost/:mypostId" element={<MyOnePost />} />
        <Route path="/email_verified/:token" element={<EmailVerified />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </PostContext.Provider>
  )
}

export default App
