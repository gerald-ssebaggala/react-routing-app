import { useParams } from "react-router-dom";
import Post from "../components/Post";
import LoadingSpinner from "../components/LoadingSpinner";
import Todo from "../components/Todo";
import Buttons from "../components/Buttons";
import { useFetchUser } from "../Hooks/useFetchUser";
import { useFetchUserTodos } from "../Hooks/useFetchUserTodos";
import { useFetchUserPosts } from "../Hooks/useFetchUserPosts";

export default function UserViewPage() {
  const { userId } = useParams(); //extracting the userId from the route parameters

  const parseduserId = userId ? parseInt(userId, 10) : undefined;

  const { user, error } = useFetchUser(parseduserId);

  const { userPosts, hasNextPage, hasPrevPage } = useFetchUserPosts(
    6,
    parseduserId
  );

  const { userTodos, handleNextPage, handlePrevPage } = useFetchUserTodos(
    6,
    parseduserId
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
