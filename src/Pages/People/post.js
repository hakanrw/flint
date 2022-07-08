import { Paper, Typography } from "@mui/material";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Announcement from "../../Components/Announcement";
import Person from "../../Components/Person";
import Post from "../../Components/Post";
import Write from "../../Components/Write";
import { supabase } from "../../supabaseClient";

function PostView() {
  const [error, setError] = useState(null);
  const [postData, setPostData] = useState(null);
  const [load, setLoad] = useState(false);
  const { postid } = useParams();

  const fetchPostAndComments = useCallback(async () => {
    setError(null);
    const post = await supabase.from("posts").select("*").filter("id", "eq", postid);
    if (post.error || post.data.length === 0) {
      setError("No such post.");
      return;
    }
    const data = await Promise.all(
      [
        supabase.from("profiles").select("*").filter("id", "eq", post.data[0].author),
        supabase.rpc("get_comments", { post: post.data[0].id })
      ]
    );
    setLoad(false);
    setPostData({profile: data[0].data[0], comments: data[1].data, post: post.data[0]});
  }, [postid]);

  useEffect(() => {
    setPostData(null);
    fetchPostAndComments();
  }, [fetchPostAndComments]);

  const onWritePost = useCallback((finished = false) => {
    if (finished) fetchPostAndComments();
    else setLoad(true);
  }, [fetchPostAndComments]);

  if (error) {
    return (
      <Announcement message={error} />
    )
  }

  return (
    <div>
      { postData ? <Person {...postData.profile} />: <Person loading /> }
      { postData ? <Post {...postData.profile} {...postData.post} /> : <Post loading /> }
      <Paper sx={{my : 1, p: 1}}>
        <Typography color="primary" variant="h6">
          Comments
        </Typography>
      </Paper>
      { postData ? 
        <Fragment> 
          <Write comment postId={postData.post.id} onPost={onWritePost} />
          { load && <Post loading author="user" /> }
          { postData.comments.map(comment => <Post key={comment.id} onDelete={fetchPostAndComments} comment {...comment} />) }
        </Fragment>
        :
        <Post loading noImage />
      }
    </div>
  );
}

export default PostView;