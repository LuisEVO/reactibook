import React, {Component} from 'react';
import classes from './EditPost.css'
import Loading from "../../UI/Loading/Loading";

class EditPost extends Component {
  state = {
    id:null,
    text:'',
    isPublic:true,
    file:null,
    newFile:null,
    imagePreview:null
  };

  componentDidMount(){
    const post = this.props.post;
    this.setState({
      id:post.id,
      text:post.text,
      isPublic:post.isPublic,
      file:post.file,
      imagePreview:post.file
    })
  }

  componentWillReceiveProps = (next_props) => {
    if (next_props.status === 'SUCCESS') {
      this.props.onCancel()
    }
  };

  onInputHandler = (event, name) => {
    this.setState({[name]:event.target.value})
  };

  onFileChange = (event) => {
    const file =event.target.files[0];
    this.setState({newFile:file});
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => this.setState({imagePreview:reader.result})
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    const {id, text, isPublic, file, newFile} = this.state;
    this.props.onEdit({id, text, isPublic, file, newFile})
  };

  render(){

    return(
      <div className={classes.NewPost}>
        <form onSubmit={this.onSubmitHandler}>

          <div className={classes.Box}>
            <textarea
              className={classes.Textarea}
              onChange={(e)=>this.onInputHandler(e,'text')}
              value={this.state.text}
              rows={4}
              placeholder="What are you thinking?"/>

            {this.state.imagePreview ?
              <img className={classes.PreviewImg} src={this.state.imagePreview} /> :
              null}
          </div>

          <input
            type="file"
            onChange={this.onFileChange}/>

          <div className={classes.Right}>
            <select onChange={(e)=>this.onInputHandler(e,'isPublic')} value={this.state.isPublic}>
              <option value={false} >Friends</option>
              <option value={true} >Public</option>
            </select>
            <button type="button" onClick={this.props.onCancel}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>

        {(this.props.status === 'LOADING') ? <Loading/> : null }
      </div>
    )
  }
}

export default EditPost