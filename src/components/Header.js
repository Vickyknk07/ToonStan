import React, { useState, useEffect } from "react";

function Header() {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const textToType = "Welcome to ToonStan!";
    const typingSpeed = 150;
    const eraseDelay = 100;

    const typeAndErase = async () => {
      for (let i = 0; i <= textToType.length; i++) {
        setTypedText(textToType.substring(0, i));
        await new Promise(resolve => setTimeout(resolve, typingSpeed));
      }

      await new Promise(resolve => setTimeout(resolve, eraseDelay));

      for (let i = textToType.length - 1; i >= 0; i--) {
        setTypedText(textToType.substring(0, i));
        await new Promise(resolve => setTimeout(resolve, typingSpeed));
      }

      typeAndErase();
    };

    typeAndErase();
  }, []);

  return (
    <div className="header">
      <div id="headtxt">{typedText}</div>
    </div>
  );
}

export default Header;
