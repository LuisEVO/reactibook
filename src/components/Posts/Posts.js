import React, {Component} from "react";
import classes from './Posts.css'
import Post from "./Post/Post";
import Loading from "../UI/Loading/Loading";
import EditPost from "./EditPost/EditPost";
import RemovePost from "./RemovePost/RemovePost";

const MODES = {
  NORMAL:'NORMAL',
  EDIT:'EDIT',
  REMOVE:'REMOVE',
};

const Filter = (props) => (
  <a className={classes.Filter} href="javascript:void(0)" onClick={props.clicked}>{props.label}</a>
);

class Posts extends Component {
  state = {
    filter: null,
    selected: null,
    mode:MODES.NORMAL
  };

  setModeHandler = (mode) => {
    this.setState({mode})
  };

  onFilterHandler = (filter) => {
    this.setState({filter})
  };

  filtered = () => {
    if(this.state.filter !== null) return this.props.posts.filter(post=>post.isPublic === this.state.filter)
    return this.props.posts
  };

  renderPost(post){
    let content = (
      <Post key={post.id}
            post={post}
            onSelected={(selected)=>this.setState({selected})}
            onEdit={()=>this.setModeHandler(MODES.EDIT)}
            onRemove={()=>this.setModeHandler(MODES.REMOVE)}
      />
    );
    if (this.state.selected === post.id) {
      switch (this.state.mode){
        case MODES.EDIT:
          return content = (
            <EditPost
              key={post.id}
              post={post}
              onCancel={()=>this.setModeHandler(MODES.NORMAL)}
              onEdit={this.props.onEditPost}
              status={this.props.editStatus}
            />
          );
        case MODES.REMOVE:
          return content = (
            <RemovePost
              key={post.id}
              post={post}
              onCancel={()=>this.setModeHandler(MODES.NORMAL)}
              onRemove={this.props.onRemovePost}
            />
          );
      }
    }
    return content
  }

  render(){
    return(
      <div className={classes.Posts}>
        <div className={classes.Filters}>
          <Filter clicked={()=>this.onFilterHandler(null)} label="All"/>
          <Filter clicked={()=>this.onFilterHandler(true)} label="Public"/>
          <Filter clicked={()=>this.onFilterHandler(false)} label="Friends"/>
        </div>
        {this.props.loading ? <Loading/>:null}
        {this.filtered().map(post=>this.renderPost(post))}
      </div>
    )
  }
}

export default Posts