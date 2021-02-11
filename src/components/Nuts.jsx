import React, { useState } from "react";

const nutsData2 = [
  { id: "9", name: "test One" },
  { id: "10", name: "test ten" },
  { id: "11", name: "test Eleven" },
  { id: "12", name: "test Twelve" },
  { id: "13", name: "test Thrirteen" },
  { id: "14", name: "test FourTeen" },
  { id: "15", name: "test Fiveteen" },
];

const Nuts = () => {
  const [nutsData, setNutsData] = useState([
    { id: "1", name: "test One" },
    { id: "2", name: "test Two" },
    { id: "3", name: "test Three" },
    { id: "4", name: "test Four" },
    { id: "5", name: "test Five" },
    { id: "6", name: "test Six" },
    { id: "7", name: "test Seven" },
    { id: "8", name: "test Eight" },
  ]);

  const getNuts = () => {
    const nuts = nutsData ? nutsData : [];
    return nuts && nuts.length > 0
      ? nuts.map((nut, i) => (
          <div key={nut.id} nut={nut}>
            {nut.name}
          </div>
        ))
      : "";
  };

  const addMoreNuts = () => {
    setNutsData([...nutsData, ...nutsData2]);
  };

  return (
    <>
      {getNuts()}
      <button type="button" onClick={() => addMoreNuts()}>
        AddMore
      </button>
    </>
  );
};

export default Nuts;
