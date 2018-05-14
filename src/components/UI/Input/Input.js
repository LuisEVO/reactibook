import React, { Component } from 'react';

import classes from './Input.css';
import {checkValidity, updateObject} from "../../../shared/utility";

class Input extends Component {

  inputChangedHandler = ( event ) => {
    const errors = checkValidity( event.target.value, this.props.validation );
    const updatedControls = updateObject({
      ...this.props},{
      value: event.target.value,
      valid: !errors.length,
      errors,
      touched: true
    });
    this.props.changed(updatedControls)
  };

  render() {
    const inputClasses = [classes.InputElement];

    if (!this.props.valid && this.props.validation && this.props.touched) {
      inputClasses.push(classes.Invalid);
    }

    return (
      <div className={classes.Input}>
        <label className={classes.Label}>{this.props.label}</label>
        <input
          className={inputClasses.join(' ')}
          {...this.props.config}
          value={this.props.value}
          onChange={event=>this.inputChangedHandler(event)}/>
        {!this.props.valid ?
          <ul>
            {this.props.errors.map((error, index)=>(<li key={index}>{error}</li>))}
          </ul>
        :null}
      </div>
    );
  }
}
  
export default Input;