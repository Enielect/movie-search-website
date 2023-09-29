//text expander project

import { useState } from "react";

export default function App() {
  return (
    <div>
      <TextExpander>
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds .It's the stuff of dreams and science fiction,
        but believe it or not, space travel is a real thing. Humans and robots
        are constantly venturing out into the cosmos to uncover its secrets and
        push the boundaries of what's possible.
      </TextExpander>

      <TextExpander
        collapsedNumword={20}
        expandButtonText="Show text"
        collapsedButtonText="Collapse text"
        buttonColor="#ff6632"
      >
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds .It's the stuff of dreams and science fiction,
        but believe it or not, space travel is a real thing. Humans and robots
        are constantly venturing out into the cosmos to uncover its secrets and
        push the boundaries of what's possible.
      </TextExpander>
      <TextExpander buttonInline={false} className="box">
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what we'll
        discover next!
      </TextExpander>
    </div>
  );
}

function TextExpander({
  children,
  collapsedNumword = 10,
  expandButtonText = "Show more",
  buttonColor = "blue",
  collapsedButtonText = "Show less",
  buttonInline = true,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(buttonInline);
  function handleClick() {
    setIsOpen((s) => !s);
  }
  const arr = children.split(" ");
  const openText = arr.slice(0, collapsedNumword + 1).join(" ");
  return (
    <div className={className}>
      {isOpen ? openText : children}
      <button
        onClick={handleClick}
        style={{
          color: buttonColor,
          backgroundColor: "none",
          border: "none",
          paddingLeft: "4px",
          cursor: "pointer",
        }}
      >
        {isOpen ? expandButtonText : collapsedButtonText}
      </button>
    </div>
  );
}
