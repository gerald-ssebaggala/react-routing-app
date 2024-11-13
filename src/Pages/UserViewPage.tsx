import { useParams } from "react-router-dom";
import { PostList, User, UserTodo } from "../dataTypes";
import { useFetchData } from "../Hooks/useFetchData";
import Post from "../components/Post";
import LoadingSpinner from "../components/LoadingSpinner";
import Todo from "../components/Todo";

export default function UserViewPage() {
  const { userId } = useParams(); //extracting the userId from the route parameters

  const { fetchedData: user, error } = useFetchData<User>(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  const { fetchedData: userPosts } = useFetchData<PostList[]>(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );

  const { fetchedData: userTodos } = useFetchData<UserTodo[]>(
    `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
  );

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
        </div>
      )}

      {userTodos && (
        <div className="post-todos">
          <h2 className="title">Todos</h2>
          {usertodoList}
        </div>
      )}
    </div>
  );
}