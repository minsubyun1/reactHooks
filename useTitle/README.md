useEffect 훅은 componentWillUnmount와 componentDidMount, componenentWillUpdate와
비슷하다. component가 mount 되자마자 function을 실행시키고 싶으면, 두번째 인자에 빈 배열을
넣으면 됨. useEffect는 componentDidmount의 역할을 해서 새로고침을 하면 첫번째 인자에 지정한 함수를 실행한다. 하지만 componentDidUpdate의 역할도 하기 때문에 내가 클릭하면 sayHello(지정한 함수)를 실행한다.
useEffect는 두개의 인자를 받는데, 첫번째 인자는 function으로서의 effect이다. 그리고 두번째 인자는 dependency이다. 만약 deps가 있다면 effect는 (deps) 리스트에 있는 값일 때만 값이 변하도록 활성화 될 것이다.
예를 들어 useEffect(sayHello, [number]); 이런 식으로 작성한다면, useEffect는 sayHello를 component가 mount 되었을 때 한번 실행시키고, 그 이후에는 number가 바뀔 때만 실행하게 된다. 또한 sayHello는 useEffect로부터 리턴되는 function인데,이것은 componentWillUnmount로 볼 수 있다.
useEffect를 사용한 첫번째 hooks를 작성해보자. 문서의 제목을 업데이트 시켜주는걸 담당하는 hooks를 작성해보자.
보통 해당 작업을 위해 helmet을 사용하는데, 문서 제목을 업데이트하는 functional hooks의 방식으로 만들어보자. 
const useTitle = (initialTitle) => {
    const [title, setTitle] = useState(initialTitle)
    return setTitle;
  }
setTitle을 리턴해서 제목을 업데이트 할 수 있게 짜준다. 그리고 App 컴포넌트안에 초기값을 지정하여 넣어준다.
const App = () => {
  const titleUpdate = useTitle("Loading...")

  return (
    <div className="App">
      <div>Hi</div>
    </div>
  );
};
이제 타이틀을 변경해줄 함수와 useEffect를 넣어주자. 먼저 변경해줄 함수는 이와 같이 짰다. 
const updateTitle = () => {
  const htmlTitle = document.querySelector("title")
  htmlTitle.innerText = title;
}
여기서 useEffect를 component가 mount될 때 updateTitle을 부르도록 짠다. 그리고 title이 업데이트 되면 updateTitle을 다시 부른다.
useEffect(updateTitle, [title])
처음에 useEffect가 mount되면 htmlTitle은 'Loading...'이 될 것이다. 그런데 만약 내가 titleUpdater를 어딘가에서 부르게 되면 updateTitle이 다시 불러지게 되고, title이 바뀌게 된다. 시간지연을 한번 응용해보자. 
setTimeout(() => titleUpdater("Home"), 5000);
5초 후에 title을 변경해주자. 
확인해보면, 다음과 같이 5초 뒤에 title이 변경된다.(useTitle 1, useTitle2) dependency를 활용하기에 좋은 훅을 만들어보았다. 하나의 value가 바뀌면 setTitle을 이용하고 이 트리거를 통해 모든 것들이 작동하게 만드는 훅으로 활용할 수 있었다. useEffect의 componentDidmount, componentWillupdate 역할을 잘 살펴보았다. 