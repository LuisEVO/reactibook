import React, {Component} from "react";
import classes from './Post.css'
import moment from 'moment';

const post = (props) => {
  const post = props.post;

  return (
    <div className={classes.Card} onClick={()=>props.onSelected(post.id)}>
      <div className={classes.Options}>
        <button onClick={props.onEdit}>Edit</button>
        <button onClick={props.onRemove}>Delete</button>
      </div>
      <div className={classes.Created}>{moment(post.created.seconds*1000).format('DD/MM/YYYY HH:mm')} </div>
      <div className={classes.Text}>{post.text}</div>
      {post.file ? <img src={post.file} className={classes.Img}/>:null}
    </div>
  )
};

export default post