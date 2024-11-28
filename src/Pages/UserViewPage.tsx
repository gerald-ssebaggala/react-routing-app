import { useParams } from "react-router-dom";
import { PostList, User, UserTodo } from "../dataTypes";
import Post from "../components/Post";
import LoadingSpinner from "../components/LoadingSpinner";
import Todo from "../components/Todo";
import { useDataFetch } from "../Hooks/useDataFetch";
import Buttons from "../components/Buttons";


export default function UserViewPage() {
  const { userId } = useParams(); //extracting the userId from the route parameters

  const parseduserId = userId ? parseInt(userId, 10) : undefined;

  // const { fetchedData: user, error } = useFetchData<User>(
  //   `https://jsonplaceholder.typicode.com/users/${userId}`
  // );

    // const { fetchedData: userTodos } = useFetchData<UserTodo[]>(
  //   `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
  // );

  const { fetchedData: user, error} = useDataFetch<User>(
    "users",
    undefined,
    parseduserId
  );

  // const { fetchedData: userPosts } = useFetchData<PostList[]>(
  //   `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  // );

  const { fetchedData: userPosts, hasNextPage, hasPrevPage } = useDataFetch<PostList[]>(
    "posts",
    6,
    parseduserId
  );



  const {
    fetchedData: userTodos,
    handleNextPage,
    handlePrevPage,

  } = useDataFetch<UserTodo[]>("todos", 6, parseduserId);

  const usertodoList = userTodos?.map((todo) => (
    <Todo key={todo.id} title={todo.title} completed={todo.completed} />
  ));

  const userPostsList = userPosts?.map((post) => (
    <Post key={post.id} id={post.id} title={post.title} body={post.body} />
  ));

  console.log(user, userPosts);

  return (
    <div className="user-view-container">
      {!error && !user && !userPosts && !userTodos && <LoadingSpinner />}
      {user && (
        <div className="user-info">
          <h2 className="username">{user.name}</h2>
          <p className="user-email">{user.email}</p>
          <div className="user-address">
            <p className="company">
              <strong>Company:</strong>
              {user.company.name}
            </p>
            <p className="website">
              <strong>Website:</strong>
              {user.website}
            </p>
            <div className="address">
              <strong>Address:</strong>
              <span className="street">{user.address.street},</span>
              <span className="suite">{user.address.suite},</span>
              <span className="city">{user.address.city},</span>
              <span className="zipcode">{user.address.zipcode}</span>
            </div>
          </div>
        </div>
      )}

      {userPosts && (
        <div className="user_posts">
          <h2 className="user_posts-title">Posts</h2>
          <div className="all_user-posts">{userPostsList}</div>
          <div className="user-posts-btns">
            <Buttons
              onNext={handleNextPage}
              onPrev={handlePrevPage}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
            />
          </div>
        </div>
      )}

      {userTodos && (
        <div className="post-todos">
          <h2 className="title">Todos</h2>
          {usertodoList}
          <div className="users-view-btns">
            <button onClick={handleNextPage} className="btn btn-more">
              More Todos
            </button>
            <button onClick={handlePrevPage} className="btn btn-back">
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
