import React, { useState } from "react";


const content = [
  {
    tab: "Section 1",
    content: "I'm in the content of the Section 1"
  },
  {
    tab: "Section 2",
    content: "I'm in the content of the Section 2"
  }
];

export const useTabs = (initialTab, allTabs) => {
  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }
  const [currentIndex, setCurrentIndex] = useState(initialTab);
  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex
  };
};

const App = () =>{
    const tabs = useTabs(0, content);
    return(
        <div className="App">
            {content.map(section =>{
                <button>{section.tab}</button>
            })}
        </div>
    )
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);