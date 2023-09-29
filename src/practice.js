//first challenge

// import { useState } from "react";

// import { useState } from "react";
// import "./styles.css";

// export default function App() {
//   const date = new Date();
//   const [step, setStep] = useState(1);
//   const [count, setCount] = useState(0);

//   date.setDate(count + date.getDate());

//   function handleSlder(e) {
//     console.log(e.target.value);
//     setStep(Number(e.target.value));
//   }

//   function handleReset() {
//     setCount(0);
//     setStep(1);
//   }

//   return (
//     <div className="main">
//       <div>
//         <input
//           type="range"
//           value={step}
//           onChange={handleSlder}
//           min={0}
//           max={10}
//         />{" "}
//         Step: {step}
//         {/* <button onClick={() => setStep((s) => s - 1)}>-</button>
//         Step: {step}
//         <button onClick={() => setStep((s) => s + 1)}>+</button> */}
//       </div>
//       <div>
//         <button onClick={() => setCount((s) => s - step)}>-</button>
//         <input
//           type="text"
//           value={count}
//           onChange={(e) => setCount(Number(e.target.value))}
//         />
//         <button onClick={() => setCount((s) => s + step)}>+</button>
//       </div>
//       <p>
//         {count === 0
//           ? "Today is "
//           : count > 0
//           ? `${count} days from Today is `
//           : `${count} days before Today was `}
//         {date.toDateString()}
//       </p>
//       <button
//         onClick={handleReset}
//         style={count === 0 && step === 1 ? { display: "none" } : {}}
//       >
//         Reset
//       </button>
//     </div>
//   );
// }

//second challenge

// import React, { useState } from "react";

// export default function App() {
//   const [billCost, setBillCost] = useState("");
//   const [firstTip, setFirstTip] = useState(0);
//   const [secondTip, setSecondTip] = useState(0);

//   const finalTip = (billCost * (firstTip + secondTip)) / 2;
// console.log(typeof billCost)
// console.log(typeof firstTip)
// console.log(typwof)

//   function handleReset() {
//     setBillCost("");
//     setSecondTip(0);
//     setFirstTip(0);
//   }

//   return (
//     <div>
//       <Bill cost={billCost} onBillChange={setBillCost} />
//       <Tip tip={firstTip} onTipChange={setFirstTip}>
//         How did you like the service
//       </Tip>
//       <Tip tip={secondTip} onTipChange={setSecondTip}>
//         How did your friend like the service?
//       </Tip>
//       <Calc onHandleReset={handleReset} bill={billCost} finalTip={finalTip} />
//     </div>
//   );
// }

// function Bill({ cost, onBillChange }) {
//   return (
//     <div>
//       <span>How much was the bill?</span>
//       <input
//         type="text"
//         onChange={(e) => onBillChange(Number(e.target.value))}
//         value={cost}
//       />
//     </div>
//   );
// }
// function Tip({ tip, onTipChange, children }) {
//   return (
//     <div>
//       <span>{children}</span>
//       <select value={tip} onChange={(e) => onTipChange(Number(e.target.value))}>
//         <option value={0}>Dissatisfied (0%)</option>
//         <option value={0.05}>It was okay (5%) </option>
//         <option value={0.1}>It was good (10%)</option>
//         <option value={0.2}> Absolutely amazing!(20%)</option>
//       </select>
//     </div>
//   );
// }
// function Calc({ onHandleReset, bill, finalTip }) {
//   return (
//     <div>
//       {finalTip + bill > 0 ? (
//         <div>
//           <h1>{`You pay ${finalTip + bill} (${bill} + ${finalTip} tip)`}</h1>

//           <button onClick={onHandleReset}>Reset</button>
//         </div>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// }

//second exercise

// const people = [
//   {
//     id: 118836,
//     name: "Clark",
//     image: "https://i.pravatar.cc/48?u=118836",
//     statement: [
//       `i weent to my house and found a young guy outside my house that got my blushing, I think i should propose 
//     to him`,
//       `I watched football today and i feel so proud of my self for that`,
//       `I am a finder`,
//     ],
//   },
//   {
//     id: 933372,
//     name: "Sarah",
//     image: "https://i.pravatar.cc/48?u=933372",
//     statement: [
//       `i was bitten by a dog and taken to the hospital today`,
//       `MY sister is the first female to get the 5.0 cgpa in unilag`,
//     ],
//   },
//   {
//     id: 499476,
//     name: "Anthony",
//     image: "https://i.pravatar.cc/48?u=499476",
//     statement: [
//       `i weent to my house and found a young guy outside my house that got my blushing, I think i should propose 
//     to him`,
//       `I watched football today and i feel so proud of my self for that`,
//     ],
//   },
// ];

// export default function App() {
//   // choose the active user
//   const [complainant, setComplainant] = useState(null);
//   const [list, setList] = useState(people);

//   function handleSelect(p) {
//     //setComplainant(p);
//     //complainant.id === p.id ? setComplainant(null) : setComplainant(p)
//     if(p.id === complainant?.id) p = complainant;
//     setComplainant((cur) => (cur?.id === p.id ? null : p));
//   }

//   function handleSubmit(value) {
//     setList((ele) =>
//       ele.map((person) =>
//         complainant?.id === person.id
//           ? { ...person, statement: [...person.statement, value] }
//           : person
//       )
      
//     );
//   }

//   function onClick() {}

//   return (
//     <div className="app">
//       <div className="sidebar">
//         <PeopleList
//           people={list}
//           onSelect={handleSelect}
//           complainant={complainant}
          
//         />
//         <InputStatement onSubmit={handleSubmit} complainant={complainant} />
//       </div>
//       {complainant && <Statements people={list} complainant={complainant} />}
//     </div>
//   );
// }

// function PeopleList({ people, onSelect, complainant}) {
//   return (
//     <ul>
//       {people.map((person) => (
//         <Person
//           person={person}
//           onSelect={onSelect}
//           complainant={complainant}
//           key={person.id}
//         />
//       ))}
//     </ul>
//   );
// }

// function Person({ person, onSelect, complainant }) {
//   const isSelected = person.id === complainant?.id;
//   return (
//     <li className={isSelected ? 'selected': ''}>
//       <img src={person.image} alt={person.name}></img>
//       <h2>{person.name}</h2>
//       <Button onClick={() => onSelect(person)}>
//         {isSelected ? "Close" : "Select"}
//       </Button>
//     </li>
//   );
// }

// function Button({ children, onClick }) {
//   return (
//     <button className="button" onClick={onClick}>
//       {children}
//     </button>
//   );
// }

// function InputStatement({ onSubmit, complainant }) {
//   const [statement, setStatement] = useState("");
//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!statement) return;
//     onSubmit(statement);
//     console.log(statement)

//     setStatement("");
//   }
//   return (
//     <form className="form-add-friend">
//       <label>Input statement here</label>
//       <textarea
//         value={statement}
//         onChange={(e) => setStatement(e.target.value)}
//       ></textarea>
//       <Button onClick={handleSubmit}>Submit</Button>
//     </form>
//   );
// }

// // my problem
// function Statements({ people, complainant }) {
//   const isSelected = people.find(
//     (ele) => ele.id === complainant?.id /*?? ele.id*/
//   );
//   const s = isSelected.statement;
//   return (
//     <div className="statements">
//       <ol>
//         {s.map((ele) => (
//           <li key={crypto.randomUUID()}>{ele}</li>
//         ))}
//       </ol>
//     </div>
//   );
// }
