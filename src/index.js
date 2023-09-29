// import React, { useState } from "react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App2";
// import "./index.css";
import "./index.css";

// function Test() {
//   const [rate, setRate] = useState(0)
//   return <div>
//     <App setRate={setRate}color="green"/>
//     <p>The rating of this movie is {rate}</p>
//   </div>
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App StarSize={10}  size={20}/>
    <Test /> */}
    <App />
  </React.StrictMode>
);
