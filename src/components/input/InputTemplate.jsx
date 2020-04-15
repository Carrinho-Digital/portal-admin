import classNames from 'classnames';
import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { createNumberMask, createTextMask } from 'redux-form-input-masks';

/**
 * type NumberMasks =
  | "decimal"
  | "moedaBRL"
  | "moedaUSD"
  | "kg"
  | "number"
  | "percentual";

type DocumentMasks =
  | "telefone"
  | "celular"
  | "cnpj"
  | "cpf"
  | "placa"
  | "renavam"
  | "antt"
  | "ncm"
  | "notaFiscal"
  | "cep";

type AdressMasks = "uf" | "cep";

export type MaskTypes = NumberMasks | DocumentMasks | AdressMasks;
* @param {string} mask 
 * @param {number} decimalPlaces 
 */
export function getFieldMask(mask, decimalPlaces = 0) {
  if (!mask) {
    return null;
  }

  switch (mask) {
    case "cep":
      return createTextMask({
        pattern: "99999-999"
      });
    case "uf":
      return createTextMask({
        pattern: "AA"
      });
    case "cpf":
      return createTextMask({
        pattern: "999.999.999-99"
      });
    case "cnpj":
      return createTextMask({
        pattern: "99.999.999.9999-99"
      });
    case "decimal":
      return createNumberMask({
        decimalPlaces
      });
    case "kg":
      return createNumberMask({
        suffix: " Kg",
        decimalPlaces
      });
    case "moedaBRL":
      return createNumberMask({
        suffix: " R$",
        decimalPlaces
      });
    case "moedaUSD":
      return createNumberMask({
        suffix: " USD",
        decimalPlaces
      });
    case "percentual":
      return createNumberMask({
        suffix: " %",
        decimalPlaces
      });
    case "placa":
      return createTextMask({
        pattern: "AAA-9999"
      });
    case "ncm":
      return createTextMask({
        pattern: "9999.99.99"
      });
    case "telefone":
      return createTextMask({
        pattern: "(99) 9 9999-9999"
      });
    case "notaFiscal":
      return createTextMask({
        pattern: "9".repeat(44)
      });
    case "number":
      return createTextMask({
        pattern: "9".repeat(decimalPlaces)
      });
    default:
      return null;
  }
}

export class renderInput extends React.PureComponent {
  render() {
    const {
      label,
      input,
      placeholder,
      required,
      dotNotShowRequiredChar,
      type,
      hidden,
      meta: {
        error,
        touched
      },
      name,
      ...rest
    } = this.props;

    const classes = classNames({
      'is-valid': !error && touched,
      'is-invalid': error && touched,
    });

    return (
      <FormGroup>
        <Label className={classNames({ 'd-none': hidden, 'mr-5': type === "checkbox" })} for={input.name}>{label} {required && !dotNotShowRequiredChar && <strong className="text-danger">*</strong>}</Label>
        <Input {...rest} {...input} type={type} placeholder={placeholder} className={classes} id={input.name} name={input.name} required={required} hidden={hidden} />
        {error && touched && !hidden && <FormFeedback valid={false}>{error}</FormFeedback>}
      </FormGroup>
    );
  }
}