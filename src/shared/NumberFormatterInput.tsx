/* eslint-disable no-unused-vars */
import React from 'react';
import NumberFormat from 'react-number-format';

type NumberFormatInputProps = {
    inputRef: (instance: NumberFormat | null) => void,
    onChange: (event: { target: { name: string; value: string } }) => void,
    name: string,
}

function NumberFormatterInput(props: NumberFormatInputProps) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
}

export default NumberFormatterInput;
