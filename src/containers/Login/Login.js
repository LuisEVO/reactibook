import React, { Component } from 'react' ;
import classes from './Login.css'
import Input from "../../components/UI/Input/Input";
import {updateObject} from "../../shared/utility";
import {connect} from "react-redux";
import * as actionCreators from "../../store/actions";
import Header from "../../components/UI/Header/Header";
import Aux from "../../hoc/Aux/Aux";
import Loading from "../../components/UI/Loading/Loading";

class LoginContainer extends Component {
  state = {
    controls: {
      email: {
        config: {
          type: 'email',
          placeholder: 'Email'
        },
        value: 'tester01@reactibook.com',
        validation: {
          required: true,
          isEmail: true
        },
        valid: true,
        errors: [],
        touched: false
      },
      password: {
        config: {
          type: 'password',
          placeholder: 'Password'
        },
        value: 'tester012018',
        validation: {
          required: true,
          minLength: 6
        },
        valid: true,
        errors: [],
        touched: false
      }
    },
    isSignup: true
  };

  inputChangedHandler = (updateControl, controlName) => {
    const updateControls = updateObject(this.state.controls,{[controlName]:updateControl});
    this.setState({ controls: updateControls});
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onSignIn(this.state.controls.email.value, this.state.controls.password.value)
  };

  formValid = () => {
    let isValid = true;
    for (let controlName in this.state.controls){
      const control = this.state.controls[controlName];
      isValid = control.valid && control.value && isValid
    }
    return isValid
  };

  render(){

    let form = Object.keys(this.state.controls).map(controlName=>(
      <Input
        key={controlName}
        {...this.state.controls[controlName]}
        changed={( updateControls ) => this.inputChangedHandler( updateControls, controlName)}
      />
    ));

    return (
      <Aux>
        <Header/>
        <div className={classes.Login}>
          <form onSubmit={this.submitHandler} className={classes.Form}>
            {form}
            <button type="submit" disabled={!this.formValid()}>Sign In</button>

            <br/><br/>
            {this.props.loading ? <Loading/> : null}
            {this.props.error ? this.props.error : null}
          </form>

        </div>
      </Aux>

    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onSignIn: (email, password) => dispatch(actionCreators.signIn(email,password))
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(LoginContainer);

