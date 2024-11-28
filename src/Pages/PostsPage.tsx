import LoadingSpinner from "../components/LoadingSpinner";
import { PostList } from "../dataTypes";
import Post from "../components/Post";
import Buttons from "../components/Buttons";
import { useDataFetch } from "../Hooks/useDataFetch";
import { useEffect, useState } from "react";

export default function PostsPage() {
  // const {
  //   paginatedData,
  //   error,
  //   handleNextPage,
  //   handlePrevPage,
  //   hasNextPage,
  //   hasPrevPage,
  // } = useFetchData<PostList>("https://jsonplaceholder.typicode.com/posts");

  const {
    fetchedData: posts,
    error,
    handleNextPage,
    handlePrevPage,
    hasNextPage,
    hasPrevPage,
  } = useDataFetch<PostList[]>("posts", 6);

  const [allPosts, setAllPosts] = useState<PostList[]>([]);

  useEffect(() => {
    setAllPosts((perv) => {
      const result: PostList[] = [];

      perv.forEach((x) => {
        if (!result.find((y) => x.id == y.id)) 
          result.push(x);
      });

      if (posts) {
        posts.forEach((x) => {
          if (!result.find((y) => x.id == y.id)) 
            result.push(x);
        });
      }

      return result;
    });
  }, [posts]);

  const postList = allPosts?.map((post) => (
    <Post key={post.id} id={post.id} title={post.title} body={post.body} />
  ));
  console.log(postList);

  return (
    <div className="posts-container">
      <h1>Posts</h1>
      {!posts && !error && <LoadingSpinner />}
      {posts && <div className="all-posts">{postList}</div>}
      {posts && (
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
