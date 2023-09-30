import { useState } from "react";

const containerStyle = {
  display: "flex",
  gap: "4px",
  alignItems: "center",
};

const starContainerStyle = {
  display: "flex",
  alignItems: "center",
  lineHeight: "1",
  margin: "0",
};

export default function StarRating({
  StarSize = 5,
  color = "#fcc419",
  size = 20,
  className = "",
  defaultRate = 0,
  setRate,
}) {
  const textStyle = {
    fontSize: `${(size / 1.5) * 1.1}px`,
    color,
    marginLeft: "5px",
  };
  const [rating, setRating] = useState(defaultRate);
  const [tempRating, setTempRating] = useState(0);
  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: StarSize }, (_, i) => (
          <Star
            color={color}
            size={size}
            onHit={() => {
              setRating(i + 1);
              setRate(i + 1);
            }}
            key={i}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onMouseHover={() => setTempRating(i + 1)}
            onMOuseLeave={() => setTempRating(0)}
          />
        ))}
      </div>
      <p style={textStyle}>{tempRating || rating || ""}</p>
    </div>
  );
}

function Star({ onHit, full, onMouseHover, onMOuseLeave, size, color }) {
  const textStyle = {
    height: `${size}px`,
    cursor: "pointer",
  };

  return (
    <span
      onClick={onHit}
      onMouseLeave={onMOuseLeave}
      onMouseEnter={onMouseHover}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
          style={textStyle}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
          style={textStyle}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
