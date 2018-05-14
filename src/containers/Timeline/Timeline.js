import React, { Component } from 'react' ;
import {connect} from "react-redux"
import * as actionCreators from "../../store/actions"
import classes from './Timeline.css'
import NewPost from "../../components/Posts/NewPost/NewPost";
import Posts from "../../components/Posts/Posts";
import Header from "../../components/UI/Header/Header";
import Aux from "../../hoc/Aux/Aux";
class TimelineContainer extends Component {

  componentDidMount(){
    this.props.listenPosts()
  }

  componentWillUnmount(){
    this.props.stopListenPosts()
  }

  render(){
    return (
      <Aux>
        <Header>
          <button onClick={this.props.onLogout}>Logout</button>
        </Header>
        <div className={classes.Timeline}>
          <div className={classes.Posts}>
            <NewPost
              onSubmit={this.props.onSendNewPost}
              status={this.props.newPostStatus}
            />
            <Posts
              loading={this.props.loading}
              posts={this.props.posts}
              onRemovePost={this.props.onRemovePost}
              onEditPost={this.props.onSendEditPost}
              editStatus={this.props.editPostStatus}
            />
          </div>
        </div>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.post.loading,
    posts: state.post.records,
    newPostStatus: state.post.newPostStatus,
    editPostStatus: state.post.editPostStatus,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actionCreators.logout()),
    listenPosts: () => dispatch(actionCreators.listenPosts()),
    stopListenPosts: () => dispatch(actionCreators.stopListenPosts()),
    onSendNewPost: (text, isPublic, file) => dispatch(actionCreators.sendNewPost({text, isPublic, file})),
    onSendEditPost: (data) => dispatch(actionCreators.sendEditPost(data)),
    onRemovePost: (id) => dispatch(actionCreators.removePost(id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TimelineContainer);

