import { Link, useParams } from "react-router-dom";
// import { useFetchData } from "../Hooks/useFetchData";
import { Post, User, UserComment, UserTodo } from "../dataTypes";
import LoadingSpinner from "../components/LoadingSpinner";
import Todo from "../components/Todo";
import Comment from "../components/Comment";
import { useDataFetch } from "../Hooks/useDataFetch";
import Buttons from "../components/Buttons";

export default function PostViewPage() {
  const { postId } = useParams();

  const parsedPostId = postId ? parseInt(postId, 10) : undefined;

  const { status, fetchedData: post } = useDataFetch<Post>(
    "posts",
    undefined,
    parsedPostId
  );

  const { fetchedData: user } = useDataFetch<User>(
    "users",
    undefined,
    parsedPostId
  );

  const {
    fetchedData: comments,
    handleNextPage,
    handlePrevPage,
    hasNextPage,
    hasPrevPage,
  } = useDataFetch<UserComment[]>("comments", 3, parsedPostId);

  const { fetchedData: todos } = useDataFetch<UserTodo[]>(
    "todos",
    6,
    parsedPostId
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
              <Link to={`/users/${post.id?.toString()}`}>{user.name}</Link>
            </div>
            <p className="post-body post-content">{post.body}</p>
          </div>
        </div>
      )}

      {comments && (
        <div className="post-comment">
          <h3 className="title">Comments</h3>
          <div className="user-comments">{postCommentsList}</div>
          <div className="post-view-btns">
            <button onClick={handleNextPage} className="btn btn-more">
              More Comments
            </button>
            <button onClick={handlePrevPage} className="btn btn-back">
              Back
            </button>
          </div>
        </div>
      )}

      {todos && (
        <div className="post-todos">
          <h3 className="title">Todos</h3>
          <p className="todo">{posttodosList}</p>
          <div className="post-todo-btns">
            <Buttons
              onNext={handleNextPage}
              onPrev={handlePrevPage}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}

//Before updates today

// const { status, fetchedData: post } = useFetchData<Post>(
//   `https://jsonplaceholder.typicode.com/posts/${parsedPostId}`
// );

// const { status, fetchedData: post } = useDataFetch<Post>('posts', parsedPostId);

// const { fetchedData: user } = useFetchData<User>(
//   `https://jsonplaceholder.typicode.com/users/${parsedPostId}`
// );

// const { fetchedData: comments } = useFetchData<UserComment[]>(
//   `https://jsonplaceholder.typicode.com/comments?postId=${parsedPostId}`
// );

// const { fetchedData: todos } = useFetchData<UserTodo[]>(
//   `https://jsonplaceholder.typicode.com/todos?userId=${parsedPostId}`
// );
