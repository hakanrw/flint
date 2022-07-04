import { useEffect, useState } from "react";
import Announcement from "../../Components/Announcement";
import Post from "../../Components/Post";
import Write from "../../Components/Write";
import { supabase } from "../../supabaseClient";

function Feed() {
  const [posts, setPosts] = useState(null);
  const [load, setLoad] = useState(false);

  const fetchPosts = () => supabase.rpc("get_posts_v2").then(data => {setPosts(data.data); setLoad(false)});
  
  const onWritePost = (finished = false) => {
    setLoad(true);
    if (finished) fetchPosts();
  }
  // fetch posts on initialize
  useEffect(() => {
    fetchPosts();
  }, []);

  if (posts === null) {
    return (
      <div>  
        <Post loading />
        <Post loading />
      </div>
    );
  }

  return (
    <div>
      <Write onPost={onWritePost} />
      { !load && posts.length === 0 && <Announcement message="Your feed is empty :(" /> }
      { load && <Post loading noImage /> }
      {
        posts.map(post => 
          <Post key={post.id} author={post.author} content={post.content} created_at={post.created_at} username={post.username} />
        )
      }
    </div>
  )
}

export default Feed;