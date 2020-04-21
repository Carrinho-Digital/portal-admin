import classNames from 'classnames';
import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { Multiselect } from 'react-widgets';

export class renderMultiSelect extends React.PureComponent {
  render()
}

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
  meta: {
    error,
    touched
  },
  name,
  ...rest
}) => {
  {
    const classes = classNames({
      'is-valid': !error && touched,
      'is-invalid': error && touched,
    });

    return (
      <FormGroup>
        <Label className={classNames({ 'd-none': hidden })} for={input.name}>{label} {required && !dotNotShowRequiredChar && <strong className="text-danger">*</strong>}</Label>
        <Multiselect
          {...rest}
          {...input}
          data={data}
          onBlur={onBlur}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={classes}
          id={input.name}
          name={input.name}
          required={required} hidden={hidden}
        />
        {error && touched && !hidden && <FormFeedback valid={false}>{error}</FormFeedback>}
      </FormGroup>
    );
  }
}