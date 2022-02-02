# useConfirm & usePreventLeave
이번에는 useConfirm & usePreventLeave 두개의 훅을 만들어보자.
이 두개의 hooks는 엄밀히 따지자면, useEffect와 useState를 사용하지 않기 때문에 hooks는 아니다. 대신 nice한 함수형 프로그래밍 연습을 할 수 있는 좋은 hooks이니 만들어보장.
useConfirm을 먼저 살펴보자. 보통 use Confirm 사용자가 무언가를 하기 전에 확인을 하는 건데, 사용자가 버튼을 클릭하는 작업을 하면(이벤트를 실행하기 전에) 메세지를 보여주고 싶은 거다. ("정말 클릭하시겠습니까? 처럼")
이런 상황은 내가 어떤걸 저장하거나 삭제할 때 필요한 기능일 수 있다. 
browser는 일단 실행되는걸 막고서 confirm을 한 후에 확인을 하면 function이 계속되게 하는 것이다.
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const useConfirm = (message = "", callback) => {
  if (typeof callback !== "function") {
    return;
  }
  const confirmAction = () => {
    if (confirm(message)) {
      callback();
    }
  };
  return confirmAction;
};

const App = () => {
  const deleteWorld = () => console.log("Deleting the world");
  const confirmDelete = useConfirm("Are you sure?", deleteWorld);
  return (
    <div className="App">
      <button onClick={confirmDelete}>Delete the world</button>
    </div>
  );
};
여기서 버튼을 클릭하게 되면 confirmDelete 함수를 호출하게 되고, confirmDelete는 confirmAction을 호출하여 confirm 창에 지정한 메세지를 띄워서 true라면 callback()을 호출하고(deleteWorld), false라면 실행하지 않는다. 상당히 간단한 코드로 구현 가능했지만 유용한 기능이라는 생각이 든다.. 이번에는 취소 기능을 만들어보자.

const useConfirm = (message = "", callback, rejection) => {
  if (typeof callback !== "function") {
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
이렇게 코드를 수정해주면 확인을 누르면 Deleting the world 가 출력되고, 취소를 누르면 false니까 else에 해당된 rejection이 실행되어 Aborted가 출력된다.