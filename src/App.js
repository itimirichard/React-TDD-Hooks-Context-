import React, { Component } from "react";
import Congrats from "./Congrats/Congrats";
import GuessWords from "./GuessWords/GuessWords";
import hookActions from "./actions/hookActions";

import "./App.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

const App = props => {
  const [state, dispatch] = React.useReducer(reducer, { secretWord: null });
  const setSecretWord = secretWord =>
    dispatch({ type: "setSecretWord", payload: secretWord });

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);

  return (
    <div className="container" data-test="component-app">
      <h1>Jotto</h1>
      <Congrats success={true} />
      <GuessWords
        guessedWords={[
          {
            guessedWord: "train",
            letterMatchCount: 3
          }
        ]}
      />
    </div>
  );
};

export default App;
