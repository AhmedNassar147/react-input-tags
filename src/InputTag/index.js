import React from "react";
import styles from "./styles";

const { useState } = React;

const InputTags = () => {
  const [state, updateHandler] = useState({
    items: [],
    focused: false,
    input: ""
  });

  const handleInputChange = ({ target: { value } }) => {
    updateHandler({
      ...state,
      input: value
    });
  };

  const handleInputKeyDown = ({ keyCode, target: { value } }) => {
    const { items, input } = state;
    if (keyCode === 13) {
      updateHandler({
        ...state,
        items: [...items, value],
        input: ""
      });
    }

    if (items.length && keyCode === 8 && !input.length) {
      updateHandler({
        ...state,
        items: items.slice(0, state.items.length - 1)
      });
    }
  };

  const handleRemoveItem = index => () => {
    updateHandler({
      ...state,
      items: state.items.filter((item, i) => i !== index)
    });
  };

  return (
    <label>
      <ul style={styles.container}>
        {state.items.map((item, i) => (
          <li key={i} style={styles.items} onClick={handleRemoveItem(i)}>
            {item}
            <span>(x)</span>
          </li>
        ))}
        <input
          style={styles.input}
          value={state.input}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
      </ul>
    </label>
  );
};

export default InputTags;
