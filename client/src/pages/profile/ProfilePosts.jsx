import React from "react"
import { CardActionArea, CardMedia, CardContent, Card } from "@mui/material"
import { Link } from "react-router-dom"
import { useBackpackerContext } from "../../context/BackpackerContext"

const styles = {
  container: `container my-6 flex flex-wrap justify-center`,
  card: `max-w-sm m-3 rounded-lg`,
  img: `h-64`,
  postTitle: `font-medium font-pally`,
}

const ProfileGears = () => {
  const { backpacker } = useBackpackerContext()
  const { posts } = backpacker

  console.log(posts)
  const postsRender = posts.map((post) => {
    return (
      <Link to={`/post/${post._id}`} key={post._id} className="no-underline">
        <Card className={styles.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              className={styles.img}
              image={post.image}
              alt={post.title}
            />
            <CardContent>
              <h3>{post.title}</h3>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    )
  })

  return <div className={styles.container}>{postsRender}</div>
}

export default ProfileGears
