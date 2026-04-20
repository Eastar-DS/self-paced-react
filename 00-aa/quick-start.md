---
title: Quick Start (한국어 학습 노트)
---

## 들어가며

React 공식 문서의 Quick Start 페이지를 한국어 학습자 관점에서 풀어 쓴 노트입니다.
이 문서 한 편으로 **실무에서 매일 쓰는 React 개념의 약 80%** 를 훑어볼 수 있습니다.

### 이 문서에서 배우는 것

- component 를 만들고 중첩(nest)하는 방법
- markup 과 style 을 추가하는 방법
- 데이터를 화면에 표시하는 방법
- 조건(conditional rendering)과 목록(list rendering)을 그리는 방법
- event 에 반응하고 화면을 업데이트하는 방법
- component 사이에 데이터를 공유하는 방법

---

## 1. Component 만들고 중첩하기

React 앱은 **component** 들의 조합입니다.
component 는 _UI(user interface) 한 조각_ 으로, 자기만의 로직과 외형을 가집니다.
버튼처럼 작을 수도 있고, 페이지 전체처럼 클 수도 있습니다.

React 에서 component 는 **markup 을 `return` 하는 JavaScript 함수** 입니다.

```js
function MyButton() {
  return <button>I'm a button</button>;
}
```

위에서 `MyButton` 을 선언했으니, 이제 다른 component 안에 넣어서(nest) 쓸 수 있습니다.

```js {5}
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```

> 📌 **대문자 규칙**: `<MyButton />` 처럼 component 는 항상 **대문자로 시작** 해야 합니다.
> HTML tag 는 반드시 소문자(`<button>`, `<div>`)이고, 내가 만든 React component 는 대문자(`<MyButton>`).
> React 는 이 첫 글자를 보고 "이건 내장 HTML tag 인가, 사용자가 만든 component 인가" 를 구분합니다.

`export default` 키워드는 이 파일의 **메인 component** 가 무엇인지 지정합니다.
JavaScript 의 `import` / `export` 문법이 낯설다면 [MDN](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export) 또는 [javascript.info](https://javascript.info/import-export) 를 참고하세요.

---

## 2. JSX 로 markup 작성하기

위에서 본 HTML 같아 보이는 문법이 바로 **JSX** 입니다.
JSX 는 선택사항이지만 편하기 때문에 대부분의 React 프로젝트가 사용합니다.
추천 로컬 개발 도구들(Vite, Create React App 등)은 기본적으로 JSX 를 지원합니다.

JSX 는 HTML 보다 **더 엄격한 규칙** 을 가집니다.

- tag 를 반드시 닫아야 합니다. 예: `<br />` 처럼 self-closing.
- component 는 여러 JSX tag 를 한꺼번에 `return` 할 수 없습니다. 하나의 부모로 감싸야 합니다.
  - `<div>...</div>` 로 감싸거나,
  - 빈 wrapper `<>...</>` (이걸 **Fragment** 라고 부릅니다) 로 감쌉니다.

```js {3,6}
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>
        Hello there.
        <br />
        How do you do?
      </p>
    </>
  );
}
```

> 💡 기존 HTML 을 JSX 로 옮길 일이 많다면 [온라인 변환기](https://transform.tools/html-to-jsx) 를 활용할 수 있습니다.

---

## 3. Style 추가하기

React 에서는 CSS class 를 지정할 때 `class` 대신 **`className`** 을 씁니다.
동작은 HTML 의 `class` 속성과 똑같습니다.

```js
<img className="avatar" />
```

그 뒤에 CSS 규칙은 별도의 CSS 파일에 작성합니다.

```css
/* CSS 파일 쪽 */
.avatar {
  border-radius: 50%;
}
```

> 💡 React 자체는 "CSS 파일을 어떻게 붙여야 한다" 를 강제하지 않습니다.
> 가장 단순하게는 HTML 에 `<link>` tag 를 추가하면 되고,
> Vite 같은 build tool 이나 framework 를 쓴다면 해당 도구의 문서에서 CSS 추가 방법을 확인하세요.

---

## 4. 데이터 표시하기

JSX 안에서 JavaScript 값을 쓰고 싶을 땐 **중괄호 `{ }`** 로 감쌉니다.
중괄호는 "여기서부터 다시 JavaScript 로 돌아갈게" 라는 탈출구 역할을 합니다.

```js {3}
return <h1>{user.name}</h1>;
```

JSX **attribute** 값에도 JavaScript 표현식을 넣을 수 있습니다.
단, 이때는 **따옴표 대신** 중괄호를 씁니다.

- `className="avatar"` → 문자열 `"avatar"` 를 그대로 넘김
- `src={user.imageUrl}` → JavaScript 변수 `user.imageUrl` 의 값을 읽어서 넘김

```js {3,4}
return <img className="avatar" src={user.imageUrl} />;
```

중괄호 안에는 문자열 이어붙이기(`+`) 같은 **더 복잡한 표현식** 도 넣을 수 있습니다.

```js
const user = {
  name: "Hedy Lamarr",
  imageUrl: "https://react.dev/images/docs/scientists/yXOvdOSs.jpg",
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={"Photo of " + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize,
        }}
      />
    </>
  );
}
```

> 📌 **중괄호가 두 겹인 이유**: 위에서 `style={{ ... }}` 처럼 중괄호가 두 개 있는 건 특별 문법이 아닙니다.
> 바깥쪽 `{ }` 은 "JSX 안에서 JavaScript 를 쓰겠다" 는 뜻이고,
> 안쪽 `{ }` 은 그냥 일반적인 JavaScript **object** 리터럴입니다.
> `style` attribute 는 값이 JavaScript 변수에 의존할 때 유용합니다.

---

## 5. 조건부 rendering (conditional rendering)

React 에는 조건을 위한 특별한 문법이 **없습니다**.
평범한 JavaScript 문법을 그대로 씁니다.

#### (1) `if` 문으로 분기

```js
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return <div>{content}</div>;
```

#### (2) 삼항 연산자 `? :` — JSX 안에서도 쓸 수 있음

```js
<div>{isLoggedIn ? <AdminPanel /> : <LoginForm />}</div>
```

#### (3) `&&` 단축 — `else` 가 필요 없을 때

```js
<div>{isLoggedIn && <AdminPanel />}</div>
```

> 💡 세 방식은 attribute 를 조건부로 지정할 때도 모두 쓸 수 있습니다.
> JavaScript 문법에 자신이 없다면 처음엔 `if...else` 만 써도 괜찮습니다.

---

## 6. 목록 rendering (list rendering)

목록을 그릴 때는 JavaScript 의 `for` 문이나 **array 의 `map()`** 함수를 활용합니다.

예를 들어 product 배열이 있다고 합시다.

```js
const products = [
  { title: "Cabbage", id: 1 },
  { title: "Garlic", id: 2 },
  { title: "Apple", id: 3 },
];
```

component 안에서 `map()` 을 써서 product 배열을 `<li>` 배열로 변환합니다.

```js
const listItems = products.map((product) => (
  <li key={product.id}>{product.title}</li>
));

return <ul>{listItems}</ul>;
```

> 📌 **`key` attribute** 에 주목하세요.
> list 의 각 item 에는 **형제들 사이에서 유일하게 식별되는 값** (string 또는 number)을 `key` 로 넘겨야 합니다.
> 보통 데이터의 database ID 같은 값을 씁니다.
> React 는 나중에 item 이 추가/삭제/순서 변경될 때 이 key 로 "무엇이 바뀌었는지" 를 판단합니다.

```js
const products = [
  { title: "Cabbage", isFruit: false, id: 1 },
  { title: "Garlic", isFruit: false, id: 2 },
  { title: "Apple", isFruit: true, id: 3 },
];

export default function ShoppingList() {
  const listItems = products.map((product) => (
    <li
      key={product.id}
      style={{
        color: product.isFruit ? "magenta" : "darkgreen",
      }}
    >
      {product.title}
    </li>
  ));

  return <ul>{listItems}</ul>;
}
```

---

## 7. Event 에 반응하기

component 안에 **event handler** 함수를 선언해서 event 에 반응시킵니다.

```js {2-4,7}
function MyButton() {
  function handleClick() {
    alert("You clicked me!");
  }

  return <button onClick={handleClick}>Click me</button>;
}
```

> 📌 **괄호 없이 넘긴다**: `onClick={handleClick}` 에서 `handleClick` 뒤에 괄호 `()` 가 없음에 주목하세요.
> event handler 는 **호출(call) 하는 게 아니라, React 에 "전달(pass)" 하는 것** 입니다.
> 사용자가 버튼을 클릭하면 그때 React 가 대신 호출해 줍니다.
> 만약 `onClick={handleClick()}` 처럼 괄호를 붙이면, render 하는 순간에 즉시 실행되어 버립니다.

---

## 8. 화면 업데이트하기 (state)

component 가 어떤 정보를 **"기억" 하고** 그걸 화면에 표시하고 싶을 때가 많습니다.
예를 들어 버튼이 몇 번 눌렸는지 세고 싶다고 해봅시다.
이럴 때 component 에 **state** 를 추가합니다.

먼저 React 에서 `useState` 를 `import` 합니다.

```js
import { useState } from "react";
```

이제 component 안에서 **state variable** 을 선언할 수 있습니다.

```js
function MyButton() {
  const [count, setCount] = useState(0);
  // ...
}
```

`useState` 는 두 가지를 돌려줍니다.

1. **현재 state 값** (`count`)
2. **state 를 업데이트하는 함수** (`setCount`)

이름은 자유롭게 지어도 되지만, 관례상 `[something, setSomething]` 형태로 씁니다.

버튼이 처음 그려질 때 `count` 는 `0` 입니다. `useState(0)` 으로 초깃값을 `0` 으로 줬기 때문이죠.
state 를 바꾸고 싶을 땐 `setCount()` 를 호출하며 새 값을 넘기면 됩니다.

```js {5}
function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>Clicked {count} times</button>;
}
```

`setCount` 가 호출되면 React 는 이 component 함수를 **다시 호출(re-render)** 합니다.
이때 `count` 는 `1`, 그다음엔 `2` … 이런 식으로 증가합니다.

같은 component 를 여러 번 render 하면, **각자 독립적인 state** 를 가집니다.

```js
import { useState } from "react";

export default function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>Clicked {count} times</button>;
}
```

각 버튼이 자기만의 `count` 를 "기억" 하며, 서로에게 영향을 주지 않습니다.

---

## 9. Hook 사용하기

`use` 로 시작하는 함수를 **Hook** 이라고 부릅니다.
`useState` 는 React 가 기본 제공하는(built-in) Hook 입니다.
다른 내장 Hook 들은 [API reference](https://react.dev/reference/react) 에서 확인할 수 있고,
기존 Hook 들을 조합해서 직접 **custom Hook** 을 만들 수도 있습니다.

> ⚠️ **Hook 규칙**: Hook 은 일반 함수보다 제약이 더 많습니다.
> component(또는 다른 Hook)의 **최상단에서만** 호출할 수 있습니다.
> `if` 문이나 `for` 문 안에서 `useState` 를 쓰고 싶다면,
> 해당 로직을 별도의 component 로 추출해서 그 안에서 사용해야 합니다.

---

## 10. Component 간에 데이터 공유하기 (lifting state up)

이전 예제에서 각 `MyButton` 은 **자기만의 독립된 `count`** 를 가졌습니다.
버튼을 클릭하면 해당 버튼의 `count` 만 바뀌었죠.

```
초기 상태:
   MyApp
   /    \
MyButton  MyButton
count=0    count=0

첫 번째 버튼 클릭 후:
   MyApp
   /    \
MyButton  MyButton
count=1    count=0   ← 서로 영향 없음
```

하지만 종종 component 들이 **같은 데이터를 공유하며 항상 함께 업데이트** 되어야 할 때가 있습니다.

두 `MyButton` 이 같은 `count` 를 표시하고 함께 업데이트되게 하려면,
state 를 **각 버튼에서 "위로" 올려서**, 두 버튼을 모두 포함하는 가장 가까운 공통 component 로 옮겨야 합니다.

이 예제에서는 그 공통 component 가 `MyApp` 입니다.

```
초기 상태:
      MyApp  ← count=0 가 여기로 올라옴
      /    \
  MyButton  MyButton
   (count 을 prop 으로 받음)

버튼 클릭 후:
      MyApp  ← count=1
      /    \
  MyButton  MyButton
  count=1    count=1   ← 둘 다 함께 업데이트
```

이제 어느 버튼을 클릭하든 `MyApp` 의 `count` 가 바뀌고,
그 값이 두 `MyButton` 모두에게 전달됩니다.

### 단계별로 코드에 옮기기

**Step 1.** `MyButton` 에 있던 state 를 **위로(up)** `MyApp` 으로 옮깁니다.

```js {2-6,18}
export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}

function MyButton() {
  // ... 여기 있던 state 관련 코드는 위로 옮깁니다 ...
}
```

**Step 2.** `MyApp` 에서 각 `MyButton` 으로 **state 값과 click handler 를 내려보냅니다(pass down)**.
내장 tag 인 `<img src={...}>` 에서 썼던 것처럼, JSX 중괄호로 정보를 넘깁니다.

```js {11-12}
export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}
```

이렇게 위에서 아래로 넘기는 정보를 **props** 라고 부릅니다.
이제 `MyApp` 은 `count` state 와 `handleClick` event handler 를 가지고 있고,
**둘 다 props 로** 각 버튼에 내려보냅니다.

**Step 3.** `MyButton` 이 부모로부터 받은 props 를 **읽도록** 수정합니다.

```js {1,3}
function MyButton({ count, onClick }) {
  return <button onClick={onClick}>Clicked {count} times</button>;
}
```

### 동작 흐름 정리

1. 버튼을 클릭하면 `onClick` handler 가 실행됩니다.
2. 각 버튼의 `onClick` prop 은 `MyApp` 의 `handleClick` 함수로 연결되어 있으므로, 그 코드가 실행됩니다.
3. `handleClick` 안에서 `setCount(count + 1)` 이 호출되어 `count` state 가 증가합니다.
4. 새로운 `count` 값이 다시 props 로 두 버튼 모두에게 전달되므로, 둘 다 같은 새 값을 표시합니다.

이렇게 state 를 위로 올려서 component 사이에 공유하는 패턴을 **"lifting state up"** 이라고 부릅니다.

### 완성된 코드

```js
import { useState } from "react";

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

function MyButton({ count, onClick }) {
  return <button onClick={onClick}>Clicked {count} times</button>;
}
```

---

## 다음 단계

여기까지 했다면 이제 **React 코드를 작성하는 기본기** 를 갖춘 셈입니다.

더 실습해보고 싶다면 공식 [Tutorial: Tic-Tac-Toe](https://react.dev/learn/tutorial-tic-tac-toe) 로 작은 앱을 직접 만들어보세요.

> 📎 원문: <https://react.dev/learn>
