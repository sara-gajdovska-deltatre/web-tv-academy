import { useState } from "react";
import { Focusable } from "react-js-spatial-navigation";

const FocusableButton = ({ text, onClick }) => {
  const [isButtonActive, setIsButtonActive] = useState(false);

  return (
    <Focusable
      onClickEnter={onClick}
      active="active"
      onFocus={() => setIsButtonActive(true)}
      onUnfocus={() => setIsButtonActive(false)}
    >
      <button
        style={{
          backgroundColor: isButtonActive ? "red" : "",
          color: isButtonActive ? "white" : "",
        }}
      >
        {text}
      </button>
    </Focusable>
  );
};

export default FocusableButton;
