# Immutability (불변성)

React 에서 state 로 배열이나 객체를 다룰 때, **원본을 직접 고치지 말고 새 것을 만들어서 교체해야 한다** 는 원칙.

---

## 왜 이게 필요한가

### React 가 "바뀌었는지" 판단하는 방식

React 는 state 가 바뀌면 리렌더링한다. 그런데 "바뀌었는지" 를 어떻게 판단할까?

깊이 비교(deep equality) 하지 않는다. **이전 값과 새 값의 참조(reference)** 만 본다. 정확히는 `Object.is(prev, next)`.

```js
Object.is(1, 1)                    // true  — 원시값
Object.is("hello", "hello")        // true  — 원시값
Object.is([1, 2], [1, 2])          // false — 서로 다른 배열 객체
Object.is({a: 1}, {a: 1})          // false — 서로 다른 객체
```

배열/객체는 **내용이 같아도 참조가 다르면 다른 값**. 반대로 **참조가 같으면 내용이 달라도 같은 값** 으로 본다.

### 그래서 이런 일이 생긴다

```jsx
const [restaurants, setRestaurants] = useState([
  { id: "a01", name: "피양콩할마니" }
]);

// ❌ 원본을 직접 고치고 setter 호출
const handleAdd = () => {
  restaurants.push({ id: "a02", name: "친친" }); // 원본 수정
  setRestaurants(restaurants);                    // 같은 참조를 그대로 넘김
};
```

`push` 는 원본 배열을 바꾼다. 하지만 `setRestaurants` 에 넘긴 건 **이전과 똑같은 참조**. React 는 `Object.is(prev, next) === true` 로 보고 "안 바뀌었네" 라고 판단 → **리렌더링 안 함** → 화면은 그대로, 데이터만 조용히 바뀐 상태.

디버깅하기 정말 어려운 버그가 여기서 생긴다.

### 올바른 방법

```jsx
const handleAdd = () => {
  setRestaurants([...restaurants, { id: "a02", name: "친친" }]);
  // 스프레드로 새 배열을 만들어서 전달 → 새로운 참조 → React가 변경 감지
};
```

`[...restaurants, new]` 는 **새 배열**. 참조가 다르니 React 가 "바뀌었네" 로 판단 → 리렌더링.

---

## 배열을 불변하게 다루는 레시피

### 추가 — 끝에 붙이기

```jsx
// ❌ 원본 수정
arr.push(newItem);

// ✅ 새 배열
setArr([...arr, newItem]);
```

### 추가 — 앞에 붙이기

```jsx
// ❌ 원본 수정
arr.unshift(newItem);

// ✅ 새 배열
setArr([newItem, ...arr]);
```

### 제거 — 조건으로 걸러내기

```jsx
// ❌ 원본 수정
const index = arr.findIndex(x => x.id === targetId);
arr.splice(index, 1);

// ✅ 새 배열
setArr(arr.filter(x => x.id !== targetId));
```

### 수정 — 특정 항목만 바꾸기

```jsx
// ❌ 원본 수정
const item = arr.find(x => x.id === targetId);
item.name = "새 이름";

// ✅ 새 배열 + 새 객체
setArr(arr.map(x =>
  x.id === targetId ? { ...x, name: "새 이름" } : x
));
```

주의: `map` 안에서도 `{ ...x, name: "새 이름" }` 처럼 **새 객체** 를 만들어야 한다. `x.name = ...` 으로 원본 객체를 수정하면 배열은 새로 만들어졌어도 그 안의 객체는 여전히 같은 참조라 또 버그가 난다.

### 정렬/뒤집기 — 원본이 바뀜을 조심

```jsx
// ❌ sort, reverse 는 원본을 수정함
arr.sort((a, b) => a.name.localeCompare(b.name));
setArr(arr);

// ✅ 먼저 복사하고 정렬
setArr([...arr].sort((a, b) => a.name.localeCompare(b.name)));
```

### 어느 메서드가 원본을 바꾸나

| 원본 수정 (❌ 그대로 쓰면 안 됨) | 새 값을 반환 (✅ 안전) |
|---|---|
| `push`, `pop` | `map`, `filter` |
| `shift`, `unshift` | `slice` (⚠ `splice` 와 다름) |
| `splice` | `concat` |
| `sort`, `reverse` | `[...arr]` 스프레드 |
| `fill`, `copyWithin` | `flatMap`, `flat` |

✅ 쪽 메서드만 써도 충분하다. 기억 안 나면 "스프레드(`...`)로 새 배열을 만들고 거기 연산을 이어붙인다" 를 기본으로.

---

## 객체를 불변하게 다루기

### 필드 수정

```jsx
// ❌ 원본 수정
user.name = "새 이름";
setUser(user);

// ✅ 새 객체
setUser({ ...user, name: "새 이름" });
```

### 필드 삭제

```jsx
// ❌ 원본 수정
delete user.email;
setUser(user);

// ✅ 구조 분해로 뽑아내고 나머지만 남기기
const { email, ...rest } = user;
setUser(rest);
```

### 중첩 객체 — 각 단계마다 새 객체

```jsx
const state = {
  user: {
    name: "행성이",
    address: { city: "서울", zip: "04524" }
  }
};

// ❌ 원본 수정
state.user.address.city = "부산";

// ❌ 얕게만 복사 — user.address 는 여전히 같은 참조
setState({ ...state, user: { ...state.user, address: { city: "부산" } } });
// ↑ 이건 "맞긴 하지만" zip 이 사라짐

// ✅ 각 단계마다 스프레드로 새 객체
setState({
  ...state,
  user: {
    ...state.user,
    address: {
      ...state.user.address,
      city: "부산"
    }
  }
});
```

중첩이 깊어지면 코드가 금방 피라미드처럼 커진다. 이때 `useReducer` 나 **Immer** 같은 라이브러리가 답이 된다. (아래 "더 읽어볼 자료" 참고.)

---

## Updater function 패턴 — 왜 `prev =>` 를 쓰나

같은 턴에서 state 를 여러 번 바꾸는 경우:

```jsx
// ❌ 의도: count 를 2 증가
setCount(count + 1);
setCount(count + 1);
// 실제 결과: 1 증가. 두 번째 setCount 에서도 count 는 여전히 "이전 렌더링 당시의 값"
```

React 는 이벤트 핸들러 안에서 `setState` 호출들을 **일괄 처리(batching)** 한다. 위 코드에서 `count` 는 렌더 시점에 스냅샷된 값이라 두 번 다 같은 값. 결과적으로 `setCount(1)` 이 두 번.

```jsx
// ✅ updater function — prev 는 "직전에 큐에 쌓인 값"
setCount(prev => prev + 1);
setCount(prev => prev + 1);
// 결과: 2 증가
```

React 가 큐를 순회하면서 각 updater 에 **직전 상태** 를 넘겨준다.

### 배열/객체의 경우

```jsx
// ✅ 값으로 넘기기 — 단순한 경우엔 OK
setRestaurants([...restaurants, newItem]);

// ✅ updater function — 비동기 이후나 빠른 연속 호출에서 안전
setRestaurants(prev => [...prev, newItem]);
```

**판단 기준**:
- 단순히 한 번 호출 → 값으로 넘겨도 됨.
- **비동기 이후** (fetch, setTimeout 등) 에 state 를 바꾼다 → `prev =>` 강하게 권장. 그동안 state 가 이미 바뀌었을 수 있음.
- 한 핸들러에서 여러 번 호출 → `prev =>` 필수.

습관적으로 `prev =>` 를 쓰면 대부분의 경쟁 조건을 피할 수 있다.

---

## 흔한 함정

### 함정 1: "스프레드 했으니 안전하다" — 얕은 복사 착각

```jsx
const newUser = { ...user };
newUser.address.city = "부산"; // address 는 여전히 같은 참조
```

스프레드는 **한 단계** 만 복사한다. 중첩 객체까지 안전하려면 각 단계마다 따로 스프레드.

### 함정 2: `sort` 를 `map` 처럼 다루기

```jsx
const sorted = arr.sort((a, b) => a.name.localeCompare(b.name));
```

`sort` 는 원본을 정렬하고 **같은 참조를 반환** 한다. 위 코드에서 `sorted === arr`. React state 에 이걸 넘기면 리렌더링 안 됨. `[...arr].sort(...)` 로 먼저 복사.

### 함정 3: 원본 state 를 폼 초기값으로 재사용

```jsx
const [draft, setDraft] = useState(user); // 객체 참조 공유
const handleChange = (e) => {
  draft.name = e.target.value;  // 😱 원본 user 도 같이 바뀜
  setDraft(draft);              // 참조 같음 → 리렌더 안 됨
};
```

"수정 폼 초기값" 패턴에서 자주 나오는 실수. 반드시 복사해서 쓰기.

### 함정 4: `JSON.parse(JSON.stringify(obj))` 남용

깊은 복사의 편법으로 자주 보이지만:
- Date, Map, Set, undefined, 함수 등을 잃어버린다.
- 성능이 안 좋다.

정말 깊은 복사가 필요하면 `structuredClone(obj)` (최신 브라우저 지원) 또는 Immer 같은 라이브러리를 쓰자.

---

## 왜 이렇게까지 해야 하나 — 철학

불변성은 React 만의 유난이 아니라 함수형 프로그래밍의 기본 원칙이다. 이유:

1. **변경 추적이 쉽다.** "이 값이 언제 바뀌었지?" 를 참조 비교 한 번으로 판단 가능.
2. **의도치 않은 공유를 막는다.** 객체를 여러 컴포넌트가 참조하는데 한쪽이 몰래 고치면 디버깅 지옥. 항상 새 값을 만들면 이 문제가 원천 차단.
3. **시간 여행, undo/redo 가 자연스럽다.** 과거 상태를 단순히 "이전 객체" 로 들고 있으면 됨.
4. **병렬성/동시성과 궁합이 좋다.** 공유 변경이 없으니 여러 곳에서 같이 읽어도 안전.

React 가 "state 를 mutate 하지 마세요" 라고 하는 건 이 모든 장점을 코드 전반에 깔기 위함이다.

---

## 더 읽어볼 자료

- [ko.react.dev — 배열 state 업데이트하기](https://ko.react.dev/learn/updating-arrays-in-state) — 배열 불변 업데이트 레시피 공식 문서.
- [ko.react.dev — 객체 state 업데이트하기](https://ko.react.dev/learn/updating-objects-in-state) — 객체, 중첩 객체 불변 업데이트.
- [ko.react.dev — state 를 스냅샷으로 다루기](https://ko.react.dev/learn/state-as-a-snapshot) — 렌더 시점 값 스냅샷과 updater function 의 필요성.
- [ko.react.dev — state 업데이트 큐](https://ko.react.dev/learn/queueing-a-series-of-state-updates) — batching 과 updater function 동작 원리.
- [Immer](https://immerjs.github.io/immer/) — "원본을 수정하듯이 짜지만 실제로는 새 객체가 나온다." 중첩이 깊을 때 구세주.
- [useImmer](https://github.com/immerjs/use-immer) — Immer 의 React 훅 버전. `useState` 처럼 쓰면 된다.

---

## 한 줄 요약

> **원본을 고치지 말고 새 것을 만들어라. 참조가 달라야 React 가 알아챈다.**
