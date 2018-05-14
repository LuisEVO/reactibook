import React, {Component} from 'react';
import classes from './NewPost.css'
import Loading from "../../UI/Loading/Loading";

class NewPost extends Component {
  state = {
    text:'',
    isPublic:true,
    file:null,
    imagePreview:null
  };

  onTextHandler = (event) => {
    this.setState({text:event.target.value})
  };

  onIsPublicHandler = (event) => {
    let isPublic = false;
    if (event.target.value === "true") isPublic = true;
    this.setState({isPublic})
  };

  onFileChange = (event) => {
    const file =event.target.files[0];
    this.setState({file});
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => this.setState({imagePreview:reader.result})
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    const {text, isPublic, file} = this.state;
    this.props.onSubmit(text, isPublic, file)
  };

  componentWillReceiveProps = (next_props) => {
    if (next_props.status === 'SUCCESS') {
      this.setState({
        text:'',
        isPublic:true,
        file:null,
        imagePreview:null
      })
    }
  };

  render(){

    return(
      <div className={classes.NewPost}>
        <form onSubmit={this.onSubmitHandler}>

          <div className={classes.Box}>
            <textarea
              className={classes.Textarea}
              onChange={this.onTextHandler}
              value={this.state.text}
              rows={4}
              placeholder="What are you thinking?"
              required/>

            {this.state.imagePreview ?
              <img className={classes.PreviewImg} src={this.state.imagePreview} /> :
              null}
          </div>


          <input
            type="file"
            onChange={this.onFileChange}/>

          <div className={classes.Right}>
            <select onChange={this.onIsPublicHandler} value={this.state.isPublic}>
              <option value={false} >Friends</option>
              <option value={true} >Public</option>
            </select>
            <button type="submit">Publish</button>
          </div>
        </form>

        {(this.props.status === 'LOADING') ? <Loading/> : null }
      </div>
    )
  }
}

export default NewPost