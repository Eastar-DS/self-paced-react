---
title: Thinking in React (한국어 학습 노트)
---

## 들어가며

React 는 **당신이 디자인과 앱을 바라보는 사고 방식 자체를 바꿔 놓습니다.**
React 로 UI 를 만들 때는 보통 이런 흐름을 따릅니다.

1. UI 를 **component 라고 부르는 조각들** 로 쪼갠다.
2. 각 component 가 가질 수 있는 **시각적 상태(visual state)** 를 묘사한다.
3. component 들을 서로 연결해서 **데이터가 흐르도록(flow)** 만든다.

이 문서에서는 "검색 가능한 상품 데이터 테이블" 을 React 로 만드는 **사고 과정** 을 따라가 봅니다.

---

## 시작 전: mockup 과 데이터

디자이너가 준 mockup 과, 이미 준비된 JSON API 가 있다고 가정합니다.

JSON API 는 다음과 같은 데이터를 돌려줍니다.

```json
[
  { "category": "Fruits", "price": "$1", "stocked": true, "name": "Apple" },
  {
    "category": "Fruits",
    "price": "$1",
    "stocked": true,
    "name": "Dragonfruit"
  },
  {
    "category": "Fruits",
    "price": "$2",
    "stocked": false,
    "name": "Passionfruit"
  },
  {
    "category": "Vegetables",
    "price": "$2",
    "stocked": true,
    "name": "Spinach"
  },
  {
    "category": "Vegetables",
    "price": "$4",
    "stocked": false,
    "name": "Pumpkin"
  },
  { "category": "Vegetables", "price": "$1", "stocked": true, "name": "Peas" }
]
```

mockup 은 다음과 같이 생겼습니다:

- 상단: 검색어 `input` + "재고 있는 것만" checkbox
- 하단: 카테고리별로 그룹핑된 상품 테이블 (이름 / 가격)
- 품절 상품은 빨간색 이름으로 표시

![mockup 이미지](https://react.dev/images/docs/s_thinking-in-react_ui.png)

React 로 UI 를 구현할 때는 보통 아래 **5단계** 를 거칩니다.

---

## Step 1. UI 를 component 계층(hierarchy)으로 쪼개기

먼저 mockup 위에 **사각형을 그려가며** 각 component 와 subcomponent 에 이름을 붙입니다.
디자이너와 함께 일한다면 디자인 툴에 이미 이름이 붙어 있을 수 있으니 물어보세요.

component 경계를 정할 때 참고할 만한 관점 세 가지:

- **Programming 관점**: "새 함수나 object 를 만들까?" 와 같은 기준을 적용합니다.
  그중 하나가 [separation of concerns(관심사의 분리)](https://en.wikipedia.org/wiki/Separation_of_concerns) 로,
  **하나의 component 는 이상적으로 한 가지만 책임져야 합니다.**
  책임이 너무 커지면 더 작은 subcomponent 로 쪼갭니다.
- **CSS 관점**: 어디에 class selector 를 만들지를 생각해 봅니다.
  (단, component 는 class 보다 조금 덜 세분화됩니다.)
- **Design 관점**: 디자인 레이어(layer)를 어떻게 정리할지 생각해 봅니다.

> 💡 **JSON 구조 = UI 구조**:
> JSON 이 잘 설계되어 있다면, 그 구조가 UI 의 component 구조와 자연스럽게 맞아떨어지는 경우가 많습니다.
> **UI 와 data model 은 보통 같은 information architecture(정보 구조)** 를 공유하기 때문입니다.
> 각 component 가 data model 의 한 조각에 대응되도록 나누세요.

이 화면에는 총 **5개의 component** 가 있습니다.

1. `FilterableProductTable` (회색) — 앱 전체를 감쌉니다.
2. `SearchBar` (파랑) — 사용자 입력을 받습니다.
3. `ProductTable` (연보라) — 입력에 따라 목록을 필터링해 보여줍니다.
4. `ProductCategoryRow` (초록) — 카테고리 제목 행을 표시합니다.
5. `ProductRow` (노랑) — 각 상품의 행을 표시합니다.

> 🧐 `ProductTable` 의 `thead` (Name/Price 라벨)는 **별도 component 로 뽑지 않았습니다.**
> 이건 취향의 영역입니다. 여기서는 테이블에 속한 일부로 봤지만,
> 나중에 정렬(sorting) 등으로 헤더가 복잡해지면 `ProductTableHeader` 로 분리할 수 있습니다.

이제 component 들을 **계층(hierarchy)** 으로 정리합니다.
mockup 에서 어떤 component 가 다른 component 안에 있었다면, 계층에서도 그 관계를 유지합니다.

```
- FilterableProductTable
  - SearchBar
  - ProductTable
    - ProductCategoryRow
    - ProductRow
```

---

## Step 2. React 로 정적(static) 버전 만들기

component 계층을 정했으면, 이제 구현할 차례입니다.
가장 직관적인 접근법은 **상호작용(interactivity) 없이**, data model 을 화면에 그리기만 하는 버전을 먼저 만드는 것입니다.

> 🔑 **왜 정적 버전을 먼저?**
> 정적 버전 만들기는 **타이핑은 많지만 생각할 거리는 적고**,
> 상호작용 붙이기는 **생각할 거리는 많지만 타이핑은 적습니다.**
> 두 가지 종류의 작업을 분리하면 각각이 쉬워집니다.

정적 버전을 만드는 규칙:

- component 들을 [작성](https://react.dev/learn/your-first-component) 하고, 다른 component 를 재사용합니다.
- 데이터는 [**props**](https://react.dev/learn/passing-props-to-a-component) 로 전달합니다. props 는 부모(parent) 가 자식(child) 에게 데이터를 넘기는 방법입니다.
- ❌ 이 단계에서는 **state 를 절대 쓰지 마세요.**
  state 는 "시간에 따라 변하는 데이터", 즉 상호작용을 위해 남겨둡니다.

빌드 순서는 두 가지가 있습니다:

- **Top-down**: 계층의 위쪽(`FilterableProductTable`)부터 내려오며 만들기
- **Bottom-up**: 계층의 아래쪽(`ProductRow`)부터 올라가며 만들기

보통 작은 예제에서는 top-down, 큰 프로젝트에서는 bottom-up 이 편합니다.

### 정적 버전 코드

```jsx
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />,
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <label>
        <input type="checkbox" /> Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

> (이 코드가 부담스럽게 느껴진다면 [Quick Start](https://react.dev/learn) 를 먼저 끝내고 돌아오세요.)

정적 버전을 다 만들면, 여러 **재사용 가능한 component 들의 라이브러리** 가 생깁니다.
정적 앱이므로 각 component 는 **JSX 만 `return`** 합니다.
계층 맨 위의 component(`FilterableProductTable`)는 data model 을 **prop 으로 받습니다.**
이렇게 데이터가 맨 위에서 아래로 흘러 내려가는 구조를 **one-way data flow(단방향 데이터 흐름)** 라고 부릅니다.

> ⚠️ **Pitfall**: 이 단계에서는 아직 state 를 쓰지 않습니다. 다음 단계에서 다룹니다.

---

## Step 3. UI state 의 "최소한이자 완전한 표현" 찾기

UI 를 상호작용 가능하게 만들려면, 사용자가 **밑바닥의 data model 을 바꿀 수 있게** 해야 합니다.
이때 쓰는 것이 **state** 입니다.

> 🎯 **state = 앱이 기억해야 하는, 시간에 따라 바뀌는 데이터의 최소 집합**
>
> state 를 구성할 때 가장 중요한 원칙은 [**DRY (Don't Repeat Yourself)**](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) 입니다.
> state 는 **절대적으로 최소한**만 저장하고, 나머지는 필요할 때 계산(compute)합니다.
>
> 예) 쇼핑 목록을 만든다면 item 배열을 state 로 저장합니다.
> "목록 개수"도 표시하고 싶다면, 개수를 별도의 state 로 저장하지 말고 **배열의 `length` 를 읽으세요.**

### 이 앱의 모든 "데이터 조각"

1. 원본 상품 목록 (original list of products)
2. 사용자가 입력한 검색어
3. checkbox 의 값
4. 필터링된 상품 목록

### 어떤 게 state 인지 판별하기

다음 세 질문에 **하나라도 "예" 라면 state 가 아닙니다.**

- **시간이 지나도 변하지 않나?** → state 가 아님
- **부모로부터 props 로 전달되나?** → state 가 아님
- **기존의 state 나 props 로부터 계산할 수 있나?** → **확실히** state 가 아님

남은 것이 state 입니다.

### 하나씩 대입해 보기

1. 원본 상품 목록 → **props 로 전달됨. state 아님.**
2. 검색어 → 시간에 따라 변하고, 다른 데서 계산할 수 없음. **state 임.**
3. checkbox 값 → 시간에 따라 변하고, 다른 데서 계산할 수 없음. **state 임.**
4. 필터링된 상품 목록 → **원본 목록 + 검색어 + checkbox 값으로 계산 가능. state 아님.**

결론: 이 앱의 state 는 **검색어와 checkbox 값 단 두 개** 입니다.

### 🧠 Deep Dive: Props vs State

React 에는 두 종류의 "모델 데이터" 가 있습니다.

- **Props**: 함수에 넘기는 **인자(argument)** 같은 것.
  부모 component 가 자식 component 에 데이터를 전달하고 외형을 커스터마이즈할 때 씁니다.
  예) `Form` 이 `Button` 에 `color` prop 을 넘김.
- **State**: component 의 **기억(memory)** 같은 것.
  component 가 어떤 정보를 유지하면서 상호작용에 따라 그 정보를 바꾸고 싶을 때 씁니다.
  예) `Button` 이 `isHovered` state 를 추적.

둘은 다르지만 **함께 동작** 합니다.
부모 component 가 state 로 정보를 들고 있다가, 그 값을 자식의 props 로 **내려보내는** 패턴이 매우 흔합니다.
처음에 헷갈리는 게 정상이고, 연습하면서 자연스럽게 익숙해집니다.

---

## Step 4. state 가 어디 살아야 할지(where to live) 찾기

state 를 식별했으면, 이제 **어떤 component 가 이 state 를 "소유(own)" 할지** 결정해야 합니다.
소유한다는 건 "그 state 를 바꿀 책임이 있다" 는 뜻입니다.

> 🔁 React 는 **one-way data flow**: 데이터는 부모 → 자식 방향으로만 흐릅니다.
> 따라서 state 를 어디에 둘지는 처음엔 감이 안 올 수 있지만, 아래 규칙을 따르면 됩니다.

### 각 state 조각마다:

1. 이 state 에 기반해 **뭔가를 render 하는 모든 component** 를 식별한다.
2. 그들의 **가장 가까운 공통 부모(closest common parent)** component 를 찾는다.
3. state 를 어디 둘지 결정한다:
   1. 보통은 **공통 부모에 직접 넣는다.**
   2. 아니면 **공통 부모보다 더 위에 있는 어떤 component** 에 넣는다.
   3. 적당한 component 가 없다면, **state 만을 위한 새 component 를 만들어서** 공통 부모 위 어딘가에 추가한다.

### 이 앱에 대입

이 앱에는 state 가 두 개(`filterText`, `inStockOnly`) 있습니다.
둘은 항상 함께 등장하므로 같은 곳에 두는 것이 자연스럽습니다.

1. **state 를 쓰는 component 찾기:**
   - `ProductTable` 이 state 에 따라 상품 목록을 필터링해야 함.
   - `SearchBar` 가 state 를 화면에 표시해야 함(입력값, checkbox).
2. **공통 부모 찾기:** 두 component 의 가장 가까운 공통 부모는 `FilterableProductTable`.
3. **결론:** state 는 `FilterableProductTable` 에 둔다.

### 코드로 옮기기

[`useState()` Hook](https://react.dev/reference/react/useState) 으로 component 에 state 를 추가합니다.
Hook 은 React 에 "hook into(연결)" 할 수 있게 해주는 특별한 함수입니다.
`FilterableProductTable` 상단에 state variable 두 개를 선언하고 초깃값을 지정합니다.

```js
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
```

그다음, `filterText` 와 `inStockOnly` 를 `ProductTable` 과 `SearchBar` 에 props 로 내려보냅니다.

```js
<div>
  <SearchBar filterText={filterText} inStockOnly={inStockOnly} />
  <ProductTable
    products={products}
    filterText={filterText}
    inStockOnly={inStockOnly}
  />
</div>
```

> 🧪 실험: `useState('')` 의 초깃값을 `useState('fruit')` 로 바꿔 보면,
> `input` 에도 "fruit" 이 뜨고, 테이블도 "fruit" 으로 필터링된 결과가 함께 바뀝니다.

### 이 단계에서 일어나는 일

이 시점 코드:

```jsx
import { useState } from "react";

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar filterText={filterText} inStockOnly={inStockOnly} />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />,
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ filterText, inStockOnly }) {
  return (
    <form>
      <input type="text" value={filterText} placeholder="Search..." />
      <label>
        <input type="checkbox" checked={inStockOnly} /> Only show products in
        stock
      </label>
    </form>
  );
}
```

그런데 지금은 **폼을 수정해도 반응하지 않습니다.**
브라우저 콘솔에는 이런 경고가 뜹니다.

> ⚠️ You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field.

`<input value={filterText} />` 를 썼기 때문에 `input` 의 `value` 는 **언제나 부모의 `filterText` state 값과 같도록** 고정되었습니다.
그런데 아직 `filterText` 를 **바꾸는 코드가 없으므로** `input` 도 절대 안 바뀌죠.
이 문제를 해결하는 것이 마지막 단계입니다.

---

## Step 5. 역방향 데이터 흐름(inverse data flow) 추가하기

지금까지는 props 와 state 가 계층을 **아래로** 흘러내리며 UI 를 그렸습니다.
이제 사용자 입력에 따라 state 를 바꾸려면, **반대 방향** 의 흐름이 필요합니다.
깊은 곳에 있는 form component 가 `FilterableProductTable` 의 state 를 업데이트해야 하니까요.

React 는 이 흐름을 **명시적(explicit)으로** 만듭니다.
two-way data binding 을 쓰는 다른 framework 보다 타이핑은 조금 더 들지만,
데이터가 어떻게 흘러가는지가 코드에 드러나기 때문에 추적하기 쉽습니다.

> 🔑 핵심 규칙: **state 를 소유한 component 만 그 state 를 바꿀 수 있다.**
>
> 지금 `filterText` 와 `inStockOnly` 는 `FilterableProductTable` 이 소유하고 있으므로,
> `setFilterText` / `setInStockOnly` 를 호출할 수 있는 것도 `FilterableProductTable` 뿐입니다.
> `SearchBar` 가 그 state 를 업데이트하고 싶다면? **`set` 함수를 props 로 내려받아야** 합니다.

### 부모: `set` 함수를 props 로 내려보내기

```js {2,3,10,11}
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
```

### 자식: `onChange` event handler 에서 부모의 `set` 함수 호출

```js {4,5,13,19}
function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
```

이제 앱이 **완전히 동작** 합니다.

### 완성 코드

```jsx
import { useState } from "react";

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />,
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

event 처리와 state 업데이트에 대한 더 자세한 내용은 [Adding Interactivity](https://react.dev/learn/adding-interactivity) 섹션에서 배울 수 있습니다.

---

## 전체 흐름 다시 보기 (요약)

| Step | 질문                                      | 결과물                                          |
| ---- | ----------------------------------------- | ----------------------------------------------- |
| 1    | UI 를 어떻게 쪼갤까?                      | component 계층                                  |
| 2    | 움직이지 않는 UI 를 어떻게 만들까?        | props 로 데이터를 내려주는 정적 버전            |
| 3    | 무엇이 바뀔 수 있는가?                    | 최소한의 state 목록                             |
| 4    | state 는 어느 component 가 소유해야 하나? | 공통 부모에 `useState` 배치                     |
| 5    | 사용자 입력을 어떻게 state 에 반영하나?   | `set` 함수를 props 로 내려 `onChange` 에서 호출 |

## 다음으로 가려면

이 문서는 React 로 component 와 앱을 생각하는 방법에 대한 **아주 짧은 소개** 였습니다.
바로 [React 프로젝트를 시작](https://react.dev/learn/installation) 하거나,
[이 튜토리얼에서 쓴 문법을 더 깊이 파보기](https://react.dev/learn/describing-the-ui) 로 이동할 수 있습니다.

> 📎 원문: <https://react.dev/learn/thinking-in-react>
