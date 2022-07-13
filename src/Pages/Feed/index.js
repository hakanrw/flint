import { useCallback, useEffect, useState } from "react";
import Announcement from "../../Components/Announcement";
import Post from "../../Components/Post";
import Write from "../../Components/Write";
import { supabase } from "../../supabaseClient";

let _dev_loading = false;

function Feed() {
  const [posts, setPosts] = useState(null);
  const [load, setLoad] = useState(false);

  const fetchPosts = useCallback(() => {
    if (_dev_loading) return;
    _dev_loading = true;
    supabase.rpc("get_posts_v3").then(data => {
      _dev_loading = false;
      setPosts(data.data); 
      setLoad(false);
    });
  }, []); 
  
  const onWritePost = (finished = false) => {
    setLoad(true);
    if (finished) fetchPosts();
  }

  // fetch posts on initialize
  useEffect(() => {
    fetchPosts();

    const intervalId = setInterval(() => {
      fetchPosts();
    }, 5000);

    return function clearEffect() {
      clearInterval(intervalId);
    }
  }, [fetchPosts]);

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
          <Post key={post.id} {...post} onDelete={fetchPosts} />
        )
      }
    </div>
  )
}

export default Feed;