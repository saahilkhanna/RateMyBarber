import React from 'react';
import PropTypes from 'prop-types';


const Input = ({ type, name, value, onChange, ...otherProps }) => (
    <input className="input" type={type} name={name} value={value} onChange={onChange} {...otherProps} />
);

Input.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Input;
