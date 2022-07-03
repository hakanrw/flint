import { useEffect, useState } from "react";
import Announcement from "../../Components/Announcement";
import Post from "../../Components/Post";
import Write from "../../Components/Write";
import { supabase } from "../../supabaseClient";

function Feed() {
  const [posts, setPosts] = useState(null);

  // fetch posts
  useEffect(() => {
    supabase.rpc("get_posts_v2").then(data => setPosts(data.data));
  }, []);

  if (posts === null) {
    return (
      <div>  
        <Post loading />
        <Post loading />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <Announcement message="Your feed is empty :(" />
    );
  }

  return (
    <div>
      <Write />
      {
        posts.map(post => 
          <Post key={post.id} author={post.author} content={post.content} created_at={post.created_at} username={post.username} />
        )
      }
    </div>
  )
}

export default Feed;