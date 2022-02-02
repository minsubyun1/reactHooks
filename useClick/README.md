이번에는 useClick hooks를 만들어보자.
useClick은 매우 간단한 훅이지만 references가 뭔지 설명해보기 위해 살펴보자. reference란 무엇일까?
reference는 기본적으로 우리의 component의 특정 부분을 선택할 수 있는 방법인데(document.getElementById()를 사용하는 것처럼..), react에 있는 모든 component는 reference element를 가지고 있다. 이를 활용하면 input을 선택했을 때 그걸 가지고 내가 원하는 모든 것을 할 수 있다. 예를 들어  
setTimeout(() => potato.current.focus(), 5000); 처럼
이제 html element(input)에 ref를 통해 접근할 수 있다. getElementById로 요소에 접근하는 것과 같은 기능을 한다고 볼 수 있당. 이제 이를 기반으로 useClick에 대해 알아보자.
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const useClick = (onClick) =>{
  const element = useRef()
  useEffect(() =>{
    if(element.current){
      element.current.addEventListener('click', onClick)
    }
  })
  return element;
}

const App = () => {
  const sayHello = () => console.log("say hello");
  const title = useClick(sayHello);
  return (
    <div className="App">
      <h1 ref={title}>Hi</h1>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

코드를 정리해보면, useClick을 사용해서 useRef()를 만들었고, 해당 reference를 리턴하여 title에 지정해주었다. 그리고 useEffect를 통해 reference 안에 element.current가 있는지 확인하고, 있다면 Click 이벤트를 부여하도록 구성하였다. 클릭하면 console에 say hello를 보여준다. reference를 통해 작동시켜 본 것이다. 그러나 이 이론에서 중요한 것 중 하나는 어느 정도 코드를 clean up(정리) 해줘야 한다는 것이다. -> componentWillUnMount가 될 때 addEventListener를 지워주어야 한다. 
이를 위해서는 function을 return할 필요가 있다. 
const useClick = (onClick) =>{
  const element = useRef()
  useEffect(() =>{
    if(element.current){
      element.current.addEventListener('click', onClick)
    }
    return () => {
      if(element.current){
        element.current.removeEventListener("click", onClick)
      }
      
    }
  }, [])
이렇게 수정하면, 원래 그랬던 것처럼 sayHello를 가진 useClick이 mount 되었을 때 click 이벤트가 추가될 것이고,
두번째 인자에 dependency가 존재하지 않는다면, useEffect에 function을 넣으면 componentDidMount, componentDidUpdate가 호출될 것이다. 여기서 두번째 인자에 빈 배열을 넣었기 때문에 return 위에 있는 function은 componenetDidMount일 때만 호출될 것이다. componentWillUnMount는 이때 return을 하게 된다. 만약 function을 리턴하게 되면 useEffect를 return 받은 그 함수는 componentWillUnMount 때 호출이 될 것이다. 정리하자면 내가 function을 리턴하면! 그 function은 componentWillUnMount로부터 호출된 것이다. 이렇게 코드를 짜는 이유는 component가 mount 되지 않았을 때 eventListener가 배치되게 하고 싶지 않기 때문이다.  