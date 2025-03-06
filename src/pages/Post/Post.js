// CSS
import styles from "./Post.module.css";

// hooks
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);

  return (
    <div className={styles.post_container}>
      {loading &&
        <>
          <p>carregando post...</p>
        </>
      }
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />

          <h3>Este post trata sobre:</h3>
          <p>{post.body}</p>
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;