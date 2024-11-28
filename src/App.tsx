import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostsPage from "./Pages/PostsPage";
import UsersPage from "./Pages/UsersPage";
import TodosPage from "./Pages/TodosPage";
import NavLayout from "./Layout/NavLayout";
import NotFoundPage from "./Pages/NotFoundPage";
import PostViewPage from "./Pages/PostViewPage";
import UserViewPage from "./Pages/UserViewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<NavLayout />}
          errorElement={
            <>
              <NavLayout />
              <NotFoundPage />
            </>
          }
        >
          <Route path="posts" element={<PostsPage />} />
          <Route path="posts/:postId" element={<PostViewPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="users/:userId" element={<UserViewPage />} />
          <Route path="todos" element={<TodosPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
