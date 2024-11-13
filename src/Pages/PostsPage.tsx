import LoadingSpinner from "../components/LoadingSpinner";
import { PostList } from "../dataTypes";
import { useFetchData } from "../Hooks/useFetchData";
import Post from "../components/Post";

export default function PostsPage() {
  const { fetchedData, error } = useFetchData<PostList[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const postList = fetchedData?.map((post) => (
    <Post key={post.id} id={post.id} title={post.title} body={post.body} />
  ));
  console.log(postList);

  return (
    <div className="posts-container">
      <h1>Posts</h1>
      {!fetchedData && !error && <LoadingSpinner />}
      {fetchedData && <div className="all-posts">{postList}</div>}
    </div>
  );
}
