import React from 'react';
import PropTypes from 'prop-types';
import './DesktopPositionInput.scss';
import {Labelled, Stack, TextStyle} from '@shopify/polaris';
import {
  POSITION_BOTTOM_LEFT,
  POSITION_BOTTOM_LEFT_lABEL,
  POSITION_BOTTOM_RIGHT,
  POSITION_BOTTOM_RIGHT_lABEL,
  POSITION_TOP_LEFT,
  POSITION_TOP_LEFT_lABEL,
  POSITION_TOP_RIGHT,
  POSITION_TOP_RIGHT_lABEL
} from "../../const/const";

const defaultOptions = [
  {label: POSITION_BOTTOM_LEFT_lABEL, value: POSITION_BOTTOM_LEFT},
  {label: POSITION_BOTTOM_RIGHT_lABEL, value: POSITION_BOTTOM_RIGHT},
  {label: POSITION_TOP_LEFT_lABEL, value: POSITION_TOP_LEFT},
  {label: POSITION_TOP_RIGHT_lABEL, value: POSITION_TOP_RIGHT}
]

const DesktopPositionInput = ({label, value, onChange, helpText, options = defaultOptions,}) => {
  return (
    <Labelled label={label}>
      <Stack>
        {options.map((option, key) => (
          <div
            key={key}
            className={`Avada-DesktopPosition ${
              value === option.value ? 'Avada-DesktopPosition--selected' : ''
            }`}
            onClick={() => onChange(option.value)}
          >
            <div
              className={`Avada-DesktopPosition__Input Avada-DesktopPosition__Input--${option.value}`}
            ></div>
          </div>
        ))}
      </Stack>
      <TextStyle variation="subdued">{helpText}</TextStyle>
    </Labelled>
  );
};

DesktopPositionInput.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
  helpText: PropTypes.string
};

export default DesktopPositionInput;
