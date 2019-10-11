import React from "react";
import PropTypes from "prop-types";

const Input = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = React.useState("");

  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          className="mb-2 mx-sm-3"
          data-test="input-box"
          type="text"
          placeholder="enter guess"
          value={currentGuess}
          onChange={e => setCurrentGuess(e.target.value)}
        />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setCurrentGuess("");
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired
};

export default Input;
