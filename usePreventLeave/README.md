
# usePreventLeave
preventLeave는 보통 웹 사이트에서 볼 수 있는데, 예를 들어 내가 윈도우 창을 닫을 때 '아직 정보를 저장하지 않았습니다.'라고 말할 수 있는 것이다.
usePreventLeave에는 두개의 function을 만들어 줄 것이다. enablePrevent, disablePrevent 각각의 함수를 통해 예를 들어 API에 뭔가를 보냈고, 정확한 응답이 없을 때 사람들이 닫지 않기를 바란다면 보호할 수 있게 하고 API가 만약 응답을 되어 괜찮은 상태라면, 사람들이 닫는걸 신경쓰지 않아도 되게 만들 수 있다.

const usePreventLeave = () => {
  const listener = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };
  const enablePrevent = () => window.addEventListener("beforeunload", listener);
  const disablePrevent = () =>
    window.removeEventListener("beforeunload", listener);
  return { enablePrevent, disablePrevent };
};

const App = () => {
  const { enablePrevent, disablePrevent } = usePreventLeave();
  return (
    <div className="App">
      <button onClick={enablePrevent}>Protect</button>
      <button onClick={disablePrevent}>Unprotect</button>
    </div>
  );
};

새로고침하여 확인해보면 protect를 누르면 window는 beforeunload라는 이벤트를 갖게 되고, (beforeunload는 window가 닫히기 전에 function이 실행되는 것을 허락해준다.) lister 함수의 prevent를 통해 사이트를 떠나시겠습니까? 창을 띄울 수 있는 것을 확인할 수 있다. (usepreventdefault 1)

반대로 Unprotect를 누르고 확인해보면 beforeunload를 삭제하여 경고창 없이 곧 바로 창이 닫혀지는 것을 확인할 수 있다.