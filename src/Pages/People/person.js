import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Announcement from "../../Components/Announcement";
import Person from "../../Components/Person";
import Post from "../../Components/Post";
import { supabase } from "../../supabaseClient";

function PersonProfile(props) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    setError(null);
    setLoading(true);
    const fetchUserAndPosts = async () => {
      const response = await supabase.from("profiles").select("*").filter('username', 'eq', username);
      if (response.data.length === 0) {
        setError("No such user.");
        return;
      }
      const data = response.data[0];
      setUser(data);
      supabase.from("posts").select("*").filter('author', 'eq', data.id)
      .then(data => {
        setLoading(false);
        setPosts(data.data);
      });
    }
    fetchUserAndPosts();
  }, [username]);

  if (error) return (
    <Announcement message={error} />
  )

  if (loading) return (
    <div>
      <Person loading />
      <Post loading />
      <Post loading />
    </div>
  );

  return (
    <div>
      <Person {...user} onPage />
      {
        posts && posts.map(post => <Post key={post.id} {...post} username={user.username} avatar_url={user.avatar_url} />)
      }
    </div>
  );
}

export default PersonProfile;