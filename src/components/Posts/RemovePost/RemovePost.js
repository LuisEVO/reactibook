import React from "react"
import classes from "./RemovePost.css";
import moment from 'moment';

const removePost = (props) => {
  const post = props.post;

  return(
    <div className={classes.Card}>
      <div className={classes.Options}>
        <button onClick={()=>{props.onRemove(post.id)}}>Remove</button>
        <button onClick={props.onCancel}>Cancel</button>
      </div>
      <div className={classes.Message}>Do you want to delete this post?</div>
      <div className={classes.Created}>{moment(post.created.seconds*1000).format('DD/MM/YYYY HH:mm')} </div>
      <div className={classes.Text}>{post.text}</div>
      {post.file ? <img src={post.file} className={classes.Img}/>:null}
    </div>
  );
};

export default removePost