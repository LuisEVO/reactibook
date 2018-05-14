export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const checkValidity = ( value, rules ) => {
  let errors = [];
  if ( !rules ) {
    return true;
  }

  if ( rules.required ) {
    if (!(value.trim() !== '')) errors.push('This field is required');
  }

  if ( rules.minLength ) {
    if (!(value.length >= rules.minLength)) errors.push(`Enter at least ${rules.minLength} characters`)
  }

  if ( rules.maxLength ) {
    if (!(value.length <= rules.maxLength)) errors.push(`Enter a maximun of ${rules.maxLength} characteres`)
  }

  if ( rules.isEmail ) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!pattern.test(value)) errors.push('Enter a valid email address')
  }

  if ( rules.isNumeric ) {
    const pattern = /^\d+$/;
    if (!pattern.test(value)) errors.push('Enter a valid email number')
  }

  return errors;
}
