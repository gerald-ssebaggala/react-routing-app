import LoadingSpinner from "../components/LoadingSpinner";
import { PostList } from "../dataTypes";
import { useFetchData } from "../Hooks/useFetchData";
import Post from "../components/Post";
import Buttons from "../components/Buttons";

export default function PostsPage() {
  // const postsPerPage = 12;
  // let currentPage = 1;

  // const skip = postsPerPage * (currentPage - 1);

  // const allPosts = "https://jsonplaceholder.typicode.com/posts";

  // const paginatedPosts = `https://jsonplaceholder.typicode.com/posts?_limit=${postsPerPage}&skip=${skip}`;

  const {
    paginatedData,
    error,
    handleNextPage,
    handlePrevPage,
    hasNextPage,
    hasPrevPage,
  } = useFetchData<PostList>("https://jsonplaceholder.typicode.com/posts");

  const postList = paginatedData?.map((post) => (
    <Post key={post.id} id={post.id} title={post.title} body={post.body} />
  ));
  console.log(postList);

  return (
    <div className="posts-container">
      <h1>Posts</h1>
      {!paginatedData && !error && <LoadingSpinner />}
      {paginatedData && <div className="all-posts">{postList}</div>}
      {paginatedData && (
        <Buttons
          onNext={handleNextPage}
          onPrev={handlePrevPage}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
        />
      )}
    </div>
  );
}
