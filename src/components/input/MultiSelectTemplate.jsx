import classNames from 'classnames';
import React from 'react';
import { Multiselect } from 'react-widgets';
import { FormFeedback, FormGroup, Label } from 'reactstrap';

export const renderMultiSelect = ({
  label,
  input,
  placeholder,
  required,
  dotNotShowRequiredChar,
  type,
  hidden,
  defaultValue,
  onBlur,
  data,
  allowCreate,
  onCreate,
  meta: {
    error,
    touched
  },
  name,
  ...rest
}) => {
  const classes = classNames({
    'is-valid': !error && touched,
    'is-invalid': error && touched,
  });
  
  return (
    <FormGroup>
      <Label className={classNames({ 'd-none': hidden })} for={input.name}>{label} {required && !dotNotShowRequiredChar && <strong className="text-danger">*</strong>}</Label>
      <Multiselect
        {...input}
        {...rest}
        data={data}
        allowCreate={allowCreate}
        onCreate={onCreate}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={classes}
        id={input.name}
        name={input.name}
        value={input.value}
        required={required} 
        onBlur={e => {
          //Nada acontece aqui, para que o valor não seja resetado
        }}
      />
      {error && touched && !hidden && <FormFeedback valid={false}>{error}</FormFeedback>}
    </FormGroup>
  );

}