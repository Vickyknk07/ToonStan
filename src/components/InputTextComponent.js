import React, { useEffect } from "react";
import Button from "./Button";

function InputTextComponent({ value, onChange, onSubmit }) {
    useEffect(() => {
        var input = document.getElementById("text-area")
        input.addEventListener("keypress", function (event) {
          if (event.key === "Enter") {
            event.preventDefault()
            document.getElementById("btn-ref").click()
          }
        })
      }, []);

  return (
    <div className="container-form">
        <div className="text-content">
            <textarea
                id="text-area"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Describe what you want to see"
                rows={3}
            />
        </div>
        <Button onClick={onSubmit}>Generate</Button>
    </div>
  );
}

export default InputTextComponent;
