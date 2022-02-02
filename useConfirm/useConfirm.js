import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

export const useConfirm = (message = "", callback, rejection) => {
  if (!callback && typeof callback !== "function") {
    return;
  }
  if(rejection && typeof rejection !=="function"){
    return;
  }
  const confirmAction = () => {
    if (confirm(message)) {
      callback();
    } else {
      rejection();
    }
  };
  return confirmAction;
};

const App = () => {
  const deleteWorld = () => console.log("Deleting the world");
  const abort = () => {
    console.log("Aborted");
  };
  const confirmDelete = useConfirm("Are you sure?", deleteWorld, abort);
  return (
    <div className="App">
      <button onClick={confirmDelete}>Delete the world</button>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
