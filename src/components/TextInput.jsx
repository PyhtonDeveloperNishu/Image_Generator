// TextInput.js

import style from  './TextInput.module.css';

// eslint-disable-next-line react/prop-types
const TextInput = ({ value, onChange, onGen }) => {

    return (
      <div className={style.container}>
        <h1 className="heading">Image Generator App</h1>
        <input
          type="text"
          placeholder="Enter text..."
          value={value}
          onChange={onChange}
        />
        <button className="btn" onClick={onGen}>
          Generate
        </button>
      </div>
    );
  };
  
  export default TextInput;
  