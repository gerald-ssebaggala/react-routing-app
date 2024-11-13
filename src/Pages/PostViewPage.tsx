import { Link, useParams } from "react-router-dom";
import { useFetchData } from "../Hooks/useFetchData";
import { Post, User, UserComment, UserTodo } from "../dataTypes";
import LoadingSpinner from "../components/LoadingSpinner";
import Todo from "../components/Todo";
import Comment from "../components/Comment";

export default function PostViewPage() {
  const { postId } = useParams();

  const parsedPostId = postId ? parseInt(postId, 10) : undefined;

  const { status, fetchedData: post } = useFetchData<Post>(
    `https://jsonplaceholder.typicode.com/posts/${parsedPostId}`
  );

  const { fetchedData: user } = useFetchData<User>(
    `https://jsonplaceholder.typicode.com/users/${parsedPostId}`
  );

  const { fetchedData: comments } = useFetchData<UserComment[]>(
    `https://jsonplaceholder.typicode.com/comments?postId=${parsedPostId}`
  );

  const { fetchedData: todos } = useFetchData<UserTodo[]>(
    `https://jsonplaceholder.typicode.com/todos?userId=${parsedPostId}`
  );

  const postCommentsList = comments?.map((comment) => (
    <Comment key={comment.id} email={comment.email} body={comment.body} />
  ));

  const posttodosList = todos?.map((todo) => (
    <Todo key={todo.id} title={todo.title} completed={todo.completed} />
  ));

  return (
    <div className="post-view-container">
      {status === "loading" && <LoadingSpinner />}

      {post && user && (
        <div className="post-view-details">
          <h2 className="post-veiw-title">{post.title}</h2>
          <div>
            <div className="author">
              <span>By:</span>
              <Link to={`/users/${post.id.toString()}`}>{user.name}</Link>
            </div>
            <p className="post-body post-content">{post.body}</p>
          </div>
        </div>
      )}

      {comments && (
        <div className="post-comment">
          <h3 className="title">Comments</h3>
          {postCommentsList}
        </div>
      )}

      {todos && (
        <div className="post-todos">
          <h3 className="title">Todos</h3>
          {posttodosList}
        </div>
      )}
    </div>
  );
}
