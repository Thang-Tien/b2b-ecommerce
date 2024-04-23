const Input = ({ handleChange, value, title, name, color }) => {
    return (
      <label className="mt-1">
        <input onChange={handleChange} type="radio" value={value} name={name} />
        <span className="checkmark ml-2" style={{ backgroundColor: color }}></span>
        {title}
      </label>
    );
  };
  
  export default Input;