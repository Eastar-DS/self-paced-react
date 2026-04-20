# 02. 선택자(Selector)

## 🤔 왜 선택자가 CSS 의 절반일까?

CSS 가 하는 일을 두 단계로 나누면:
1. **"누구를"** 스타일링할지 고른다. ← **선택자**
2. **"무엇으로"** 꾸밀지 정한다. ← 속성과 값

1번을 정확히 못 하면 2번은 아무 소용이 없습니다.
그래서 CSS 실력의 절반은 **원하는 요소만 정확히 골라내는 능력** 입니다.

실제 페이지에는 수십, 수백 개의 요소가 있고, 우리는 그중 "이 버튼 하나" 또는 "이 섹션의 이 `<p>` 들만" 처럼 아주 정확한 대상을 골라야 합니다.

---

## 📌 기본 선택자 3종

### 1) 태그 선택자 (Type selector)

태그 이름을 그대로 씁니다.

```css
p {
  color: gray;
}
button {
  cursor: pointer;
}
```

**"이 페이지의 모든 `<p>` 에 적용"** 이라는 뜻입니다.
광범위해서 주로 **리셋** 이나 **기본 스타일** 에 쓰여요.

### 2) 클래스 선택자 (Class selector) — ⭐ 가장 많이 씁니다

HTML 요소에 `class` attribute 를 달고, CSS 에서 **점(`.`) + 클래스 이름** 으로 선택.

```html
<p class="warning">주의!</p>
<p class="warning">이것도 주의!</p>
```

```css
.warning {
  color: red;
  background-color: yellow;
}
```

**여러 요소에 같은 클래스** 를 달 수 있고, **한 요소에 여러 클래스** 를 달 수도 있어요.

```html
<p class="warning urgent">심각한 주의!</p>
```

```css
.warning { color: red; }
.urgent { font-weight: bold; }
```

두 클래스 모두 적용돼서 빨간색이면서 굵은 글씨가 됩니다.

> 🔑 **실무에서는 거의 모든 스타일링을 클래스로 합니다.** 이유는 곧 나옵니다.

### 3) ID 선택자 (ID selector)

HTML 요소에 `id` attribute 를 달고, CSS 에서 **샵(`#`) + id 이름** 으로 선택.

```html
<nav id="main-nav">...</nav>
```

```css
#main-nav {
  background-color: white;
}
```

### ❗ ID vs Class, 언제 뭘 쓸까

HTML 장에서 배운 것처럼 **`id` 는 페이지에 유일해야** 합니다.
반대로 `class` 는 **여러 번 나와도** 됩니다.

**스타일링에는 거의 항상 class 를 씁니다.** 이유:
1. 같은 스타일을 여러 요소에 주기 위해선 class 가 필요.
2. `id` 선택자는 **구체성이 너무 높아서** 나중에 덮어쓰기가 어려움.
3. `id` 는 JavaScript 에서 요소를 찾거나, 앵커 링크(`#section`) 에 쓰는 용도로 남겨 두는 게 관례.

> 💡 **규칙**: "이 스타일을 나중에 다른 곳에도 쓸 수 있을까?" 라는 질문에 "아마도" 라면 class 를 쓰세요.
> `id` 는 JS 나 앵커 링크에 꼭 필요할 때만.

---

## 🔗 조합 선택자 (Combinator)

여러 요소의 **관계** 로 선택할 수도 있습니다.

### 자손 선택자: `A B` (공백)

"A 안 어딘가에 있는 모든 B".

```css
.card p {
  color: gray;
}
```

→ `.card` 클래스를 가진 요소 **안에 있는 모든 `<p>`** 를 선택.

```html
<div class="card">
  <h3>제목</h3>
  <p>이 p 는 회색이 됨</p>
  <div>
    <p>이 p 도 회색이 됨 (더 깊이 있어도)</p>
  </div>
</div>

<p>바깥의 이 p 는 영향 없음</p>
```

### 자식 선택자: `A > B`

"A 의 **직계** 자식인 B 만".

```css
.card > p {
  color: gray;
}
```

→ `.card` 의 **바로 아래** `<p>` 만. 손자 `<p>` 는 제외.

```html
<div class="card">
  <p>이 p 만 회색</p>
  <div>
    <p>이 p 는 영향 없음 (손자라서)</p>
  </div>
</div>
```

### 여러 선택자 동시에: `A, B` (쉼표)

"A 거나 B 거나 모두".

```css
h1, h2, h3 {
  color: navy;
}
```

→ 모든 `<h1>`, `<h2>`, `<h3>` 에 적용.

### 정확히 일치: `A.class1.class2`

"A 이면서 class1 과 class2 를 둘 다 가진 것".

```css
button.button--primary {
  background-color: orange;
}
```

→ `<button class="button button--primary">` 같은 요소만.

### 속성 선택자 `[attr="value"]`

attribute 값으로 고를 수도 있습니다.

```css
input[type="text"] {
  border: 1px solid gray;
}
input[name="email"] {
  background-color: #f0f8ff;
}
```

---

## 🎨 가상 클래스 선택자 (Pseudo-class)

요소의 **상태(state)** 를 고르는 선택자. 콜론(`:`) 하나로 시작합니다.

```css
a:hover {
  color: red;             /* 마우스가 올라왔을 때 */
}
button:focus {
  outline: 2px solid blue; /* 포커스(탭 키 등)가 잡혔을 때 */
}
input:disabled {
  background-color: #eee;  /* 비활성화 상태일 때 */
}
li:first-child {
  font-weight: bold;       /* 첫 번째 자식 li 만 */
}
li:last-child {
  border-bottom: none;     /* 마지막 자식 li 만 */
}
li:nth-child(2) {
  color: red;              /* 두 번째 li 만 */
}
li:nth-child(odd) {
  background-color: #f0f0f0; /* 홀수 번째만 */
}
```

> 🔑 `:hover` 는 CSS 의 꽃 중 하나예요. 버튼에 마우스를 올렸을 때 색이 살짝 바뀌는 효과, 다 이걸로 만듭니다.

---

## 🎭 가상 요소 선택자 (Pseudo-element)

요소의 **일부분** 을 선택. 콜론(`::`) 두 개로 시작합니다.

```css
p::first-line {
  font-weight: bold;         /* 문단의 첫 줄만 */
}
.required-label::after {
  content: "*";              /* 요소 끝에 "*" 를 추가 */
  color: red;
}
p::selection {
  background-color: yellow;  /* 사용자가 드래그한 부분 */
}
```

`::before`, `::after` 는 **원래 HTML 에 없는 내용을 CSS 로 추가** 하는 신기한 기능이에요. `content` 속성이 필수입니다.

**[templates/style.css](../templates/style.css) 예시**:

```css
.form-item--required label::after {
  padding-left: 4px;
  color: var(--primary-color);
  content: "*";
}
```

→ "필수" 클래스가 붙은 form 의 label 끝에 **빨간 별표 \*** 를 자동으로 추가해 주는 거예요. HTML 에 `*` 를 일일이 안 써도 됨!

---

## ⚖ 구체성(Specificity) — 누가 이기는가

여러 선택자가 겹쳤을 때 누가 이길지의 규칙.

각 선택자는 **점수** 를 가지고, 점수가 높은 쪽이 이깁니다. (대략적인 개념)

| 선택자 | 점수 |
|---|---|
| 태그 (`p`, `div`) | 1 |
| 클래스 (`.warning`), 가상 클래스 (`:hover`), 속성 (`[type="text"]`) | 10 |
| id (`#main`) | 100 |
| 인라인 스타일 (`style="..."`) | 1000 |

### 예시

```css
p { color: red; }                /* 점수 1 */
.warning { color: blue; }        /* 점수 10 */
p.warning { color: green; }      /* 점수 11 */
#box p.warning { color: orange; }/* 점수 111 */
```

여러 규칙이 겹치면 **점수가 높은 규칙이 이긴다.**

### 💡 결론: **너무 구체적인 선택자를 쓰지 마세요**

```css
/* 나쁨: 너무 구체적 */
body div.container section.list ul li.item p {
  color: red;
}

/* 좋음: 충분히 선택하면서 간결 */
.item-text {
  color: red;
}
```

구체적으로 쓸수록 **나중에 덮어쓰기가 힘들어집니다.** 가장 많이 쓰는 방식은 **단순한 클래스 선택자** 예요.

### `!important` 금지령

```css
p {
  color: red !important;   /* ❌ 피해야 함 */
}
```

`!important` 를 붙이면 **거의 모든 규칙을 무시하고** 이 규칙이 이깁니다.
한번 쓰면 나중에 덮어쓰려고 또 `!important` 를 쓰게 되고, 결국 CSS 가 난장판이 돼요.

실무의 암묵적 규칙: **`!important` 는 최후의 수단.**

---

## 🎯 [templates/style.css](../templates/style.css) 에서 찾아 보기

```css
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
```
→ **전체 선택자 `*`**: 모든 요소에 적용. 리셋 용도.

```css
ul,
li {
  list-style: none;
}
```
→ **여러 선택자**: `<ul>` 과 `<li>` 모두에.

```css
.gnb__button img {
  display: block;
  width: 40px;
  height: 40px;
  object-fit: contain;
}
```
→ **자손 선택자**: `.gnb__button` 안의 `<img>` 만.

```css
.button:last-child {
  margin-right: 0;
}
```
→ **가상 클래스**: 부모의 마지막 자식이면서 `.button` 클래스인 경우.

```css
.form-item--required label::after {
  content: "*";
  color: var(--primary-color);
}
```
→ **가상 요소 + 자손**: 필수 form 의 label 끝에 별표 추가.

```css
input[name="name"],
input[name="link"] {
  height: 44px;
}
```
→ **속성 선택자**: name 이 특정 값인 input 만.

---

## 🧪 지금 당장 해보기

`index.html`:

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>선택자 연습</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>카페 메뉴</h1>

    <ul class="menu">
      <li class="menu-item">아메리카노</li>
      <li class="menu-item special">라떼</li>
      <li class="menu-item">카푸치노</li>
      <li class="menu-item special">바닐라 라떼</li>
      <li class="menu-item">에스프레소</li>
    </ul>

    <p id="note">* 모든 메뉴는 아이스/핫 선택 가능</p>

    <button class="btn btn--primary">주문하기</button>
    <button class="btn">취소</button>
  </body>
</html>
```

`style.css`:

```css
body {
  font-family: sans-serif;
  padding: 20px;
}

h1 {
  color: #5c3317;
}

.menu {
  list-style: none;
  padding: 0;
}

.menu-item {
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item.special {
  color: #ec4a0a;
  font-weight: bold;
}

.menu-item:hover {
  background-color: #fff5ed;
}

#note {
  color: gray;
  font-size: 14px;
}

.btn {
  padding: 10px 20px;
  border: 1px solid gray;
  background-color: white;
  cursor: pointer;
}

.btn--primary {
  background-color: #ec4a0a;
  color: white;
  border: none;
}
```

### 확인해 볼 것

- `special` 클래스가 붙은 메뉴만 주황색 굵은 글씨인가요?
- 마우스를 메뉴 항목 위에 올리면 배경이 바뀌나요? (`:hover`)
- 마지막 메뉴에는 밑줄(border-bottom)이 없나요? (`:last-child`)
- 주문하기 버튼은 주황, 취소 버튼은 흰색인가요?

### 도전 과제

1. **첫 번째 메뉴만** 배경을 노란색으로 해 보세요. (`:first-child`)
2. **홀수 번째 메뉴** 의 배경을 연한 회색으로 (`:nth-child(odd)`)
3. `.btn:hover` 을 추가해 마우스 올렸을 때 살짝 어둡게 만들어 보세요.

---

## 📚 정리

| 선택자 | 문법 | 구체성 점수 |
|---|---|---|
| 태그 | `p` | 1 |
| 클래스 | `.name` | 10 |
| ID | `#name` | 100 |
| 자손 | `A B` | A 점수 + B 점수 |
| 자식 | `A > B` | 같음 |
| 가상 클래스 | `:hover` | 10 |
| 가상 요소 | `::before` | 1 |
| 속성 | `[type="text"]` | 10 |

**실전 원칙**: 클래스 위주로 스타일을 짜고, id 와 `!important` 는 가급적 피합니다.

다음 — 모든 웹 요소를 담는 그릇 **박스 모델** 👉 [03. 박스 모델](./03-box-model.md)
