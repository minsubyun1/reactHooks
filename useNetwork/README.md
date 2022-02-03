# useNetwork

useNetwork 훅은 navigator가 online 또는 offline 되는 것을 막아주는 기능을 한다. (개발 도구에서 Network 항목으로 들어가서 Offline 누르면, 자동적으로 경고 메세지를 보여주는데 그것을 이 훅으로 구현할 수 있다.) 이벤트리스너의 online, handleChange와 offline, handled을 통해 online일 경우에는 navigator의 online이 offline으로 바뀌게 하고, offline일 경우에는 online으로 바뀌게 하였다.
