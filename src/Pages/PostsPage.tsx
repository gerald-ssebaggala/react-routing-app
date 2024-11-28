import LoadingSpinner from "../components/LoadingSpinner";
import Post from "../components/Post";
import Buttons from "../components/Buttons";
import { useFetchPosts } from "../Hooks/useFetchPosts";

export default function PostsPage() {
  const {
    posts,
    error,
    handleNextPage,
    handlePrevPage,
    hasNextPage,
    hasPrevPage,
  } = useFetchPosts(6);

  const postList = posts?.map((post) => (
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

/*

  FOR JUST VIEW MORE POSTS ON PAGE SCROLL DOWN 


  const [allPosts, setAllPosts] = useState<PostList[]>([]);

  useEffect(() => {
    setAllPosts((perv) => {
      const result: PostList[] = [];

      perv.forEach((x) => {
        if (!result.find((y) => x.id == y.id)) result.push(x);
      });

      if (posts) {
        posts.forEach((x) => {
          if (!result.find((y) => x.id == y.id)) result.push(x);
        });
      }

      return result;
    });
  }, [posts]);
*/
