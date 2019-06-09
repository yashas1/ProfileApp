import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({ name, value, error, info, onChange, options }) => {
  // const y=[]
  // const selectOptions = options.forEach(function (x,key){
  
    
  //   y.push(<option key={x.lable} value={x.value}>
  //     {x.lable}
  //   </option>)

  //   console.log(y) 
    
  // }
   


  // );


  const selectOptions = options.map(option => (
    <option key={option.lable} value={option.value}>
      {option.lable}
    </option>
  ));
  console.log(selectOptions)
  return (
    <div className="form-group">
      <select
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
