# 07. 인터랙션 스타일 — hover, focus, transition, 반응형

## 🤔 "정적인 페이지" 만으로는 부족하다

지금까지 만든 페이지는 **움직이지 않았습니다.** 하지만 실제 UI 는:
- 마우스를 올리면 버튼이 **살짝 색이 바뀌고**
- 클릭하면 **눌린 듯한 효과** 가 있고
- 화면 크기가 달라지면 **레이아웃이 바뀝니다.**

이 장에서 배우는 건 CSS 만으로 이런 **동적인 느낌** 을 만드는 법입니다.
JavaScript 없이 순수 CSS 로 할 수 있는 범위가 생각보다 넓어요.

---

## 👆 `:hover` — 마우스를 올렸을 때

02장에서 이미 맛본 pseudo-class 중 가장 자주 쓰는 것.

```css
button {
  background: #ec4a0a;
  color: white;
}

button:hover {
  background: #d63f05;  /* 좀 더 어두운 주황 */
  cursor: pointer;      /* 손가락 모양 커서 */
}
```

핵심 포인트:
- **마우스가 올라가 있는 동안만** 적용되는 스타일.
- 떨어지면 원래 스타일로 돌아감.
- **PC 에서만** 의미 있음. 모바일(터치) 에는 `:hover` 가 없어요. 그래서 hover 효과에 의존하는 UI 는 모바일에서 깨짐.

### `cursor` 속성

`:hover` 와 세트로 나오는 친구.

```css
.clickable { cursor: pointer; }   /* 손가락 */
.disabled  { cursor: not-allowed; } /* 금지 표시 */
.text      { cursor: text; }      /* 글자 선택 커서 */
```

`<button>`, `<a>` 같은 건 원래 `pointer` 지만, `<div>` 로 클릭 가능한 걸 만들었을 때 **꼭 `cursor: pointer`** 를 줘야 사용자가 클릭 가능한지 알 수 있어요.

---

## 🎯 `:focus` — 선택된 상태

키보드의 Tab 키로 요소를 옮겨 다닐 때, 현재 "선택된" 요소 상태.
주로 `<input>`, `<button>`, `<a>` 에 적용됩니다.

```css
input:focus {
  outline: none;                   /* 기본 파란 테두리 끄기 */
  border-color: #ec4a0a;           /* 내 색으로 바꾸기 */
  box-shadow: 0 0 0 3px rgba(236, 74, 10, 0.2);  /* 은은한 그림자 */
}
```

### ⚠ 접근성 주의

`outline: none` 을 **그냥 없애 버리면** 키보드 사용자가 "어디를 선택했는지" 알 수 없게 됩니다.

- `outline: none` 을 쓸 때는 **반드시 대체 스타일** 을 제공하세요. (border 색, box-shadow 등)

### `:focus-visible` — 더 똑똑한 focus

```css
button:focus {
  outline: none;
}

button:focus-visible {
  outline: 2px solid #ec4a0a;
}
```

`:focus-visible` 은 **키보드로 focus 됐을 때만** 적용됩니다. 마우스 클릭으로 focus 된 경우엔 outline 을 보여 주지 않아서 더 예쁘면서도 접근성을 지키는 방법이에요.

---

## ✅ `:active` — 클릭하는 순간

```css
button:active {
  transform: scale(0.95);   /* 살짝 작아지는 "눌림" 효과 */
}
```

마우스를 **누른 순간** 만 적용. 손을 떼면 원래대로.

보통 **push 버튼 느낌** 을 내고 싶을 때 `scale` 이나 **더 어두운 색** 을 줍니다.

---

## 🌀 `transition` — 부드러운 변화

hover/active 효과는 그냥 적용하면 **순간 이동** 처럼 바뀝니다. `transition` 을 주면 **부드럽게 전환** 돼요.

```css
button {
  background: #ec4a0a;
  transition: background 0.2s;   /* background 속성을 0.2초에 걸쳐 바꿈 */
}

button:hover {
  background: #d63f05;
}
```

이제 마우스를 올리면 색이 **0.2초 동안 서서히** 어두워집니다.

### transition 문법

```css
transition: [속성] [시간] [타이밍 함수] [지연];
```

- **속성**: 어떤 CSS 속성을 전환할지. `all` 로 전부, 아니면 특정 이름.
- **시간**: `0.2s`, `300ms` 등.
- **타이밍 함수**: 전환의 "속도 곡선".
  - `linear` — 일정한 속도
  - `ease` — 빨리 시작해서 천천히 끝남 (기본값)
  - `ease-in` — 천천히 시작
  - `ease-out` — 천천히 끝남
  - `ease-in-out` — 양 끝 천천히
- **지연**: 시작을 얼마나 미룰지. `0.1s` 처럼.

```css
button {
  transition: all 0.2s ease-out;
}

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
```

### 실무 권장값

**0.2s ~ 0.3s** 가 제일 자연스럽습니다.
- `0.1s` 이하 → 너무 빨라서 느낌이 안 살아요.
- `0.5s` 이상 → 답답해 보입니다.
- `all` 은 편하지만 예상치 못한 속성까지 전환할 수 있으니 명시적으로 적는 게 안전.

---

## 🎨 `transform` — 요소를 움직이고, 돌리고, 크게

```css
.box {
  transform: translate(10px, 20px);  /* x 10, y 20 만큼 이동 */
  transform: scale(1.1);              /* 1.1배 크게 */
  transform: rotate(45deg);           /* 45도 회전 */
  transform: translateX(-50%);        /* x 로 -50% */
}
```

여러 개를 한 번에:

```css
.box {
  transform: translate(10px, 20px) scale(1.1) rotate(5deg);
}
```

### `transform` 의 특별한 점

**레이아웃을 다시 계산하지 않기 때문에** `top`/`left` 로 움직이는 것보다 **훨씬 빠릅니다.** 부드러운 애니메이션에 필수.

### 실무 패턴: hover 에 살짝 띄우기

```css
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
```

마우스를 올리면 **카드가 살짝 위로 떠오르고** 그림자가 생기는 효과. 요즘 거의 모든 쇼핑몰 카드가 이러고 있어요.

---

## 🎁 `box-shadow` — 그림자

```css
.card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  /*           ↑x ↑y   ↑blur   ↑color */
}
```

네 숫자의 의미:
- **x-offset**: 그림자 가로 오프셋 (양수 = 오른쪽)
- **y-offset**: 세로 오프셋 (양수 = 아래)
- **blur**: 흐림 정도 (클수록 부드럽게 퍼짐)
- **color**: 그림자 색 (보통 살짝 투명한 검정)

**팁**: 자연스러운 그림자는 `rgba(0, 0, 0, 0.1)` 정도로 **은은하게** 해야 예뻐요. 진한 검정 그림자는 90년대 느낌.

---

## 🎯 `@keyframes` 로 애니메이션 (맛보기만)

`transition` 보다 복잡한 움직임을 만들고 싶으면 `@keyframes`.

```css
@keyframes bounce {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-20px); }
  100% { transform: translateY(0); }
}

.loading {
  animation: bounce 1s infinite;
  /*          이름   시간  반복횟수 */
}
```

이 장에서는 깊이 들어가지 않아요. "이런 게 있다" 정도만 알고 가세요.

---

## 📱 반응형(Responsive) — 화면 크기별로 다른 스타일

PC 에서는 `1440px` 로 넓게 보지만, 모바일은 `375px` 정도로 좁습니다.
같은 CSS 로는 양쪽 모두에 예쁠 수가 없어요.

### `@media` — 미디어 쿼리

```css
/* 기본: 모바일 스타일 */
.container {
  width: 100%;
  padding: 16px;
}

/* 화면 너비가 768px 이상일 때만 적용 */
@media (min-width: 768px) {
  .container {
    width: 700px;
    margin: 0 auto;
    padding: 24px;
  }
}
```

`@media (조건) { ... }` 안에 쓴 CSS 는 **조건이 참일 때만** 적용됩니다.

### 자주 쓰는 중단점 (breakpoints)

```css
/* 모바일 */
/* (기본 — 미디어 쿼리 밖) */

/* 태블릿 이상 */
@media (min-width: 768px) { ... }

/* 데스크톱 이상 */
@media (min-width: 1024px) { ... }

/* 큰 데스크톱 */
@media (min-width: 1440px) { ... }
```

### Mobile-First vs Desktop-First

```css
/* Mobile-first (권장): 기본은 모바일, 커지면 덮어씀 */
.card { width: 100%; }
@media (min-width: 768px) {
  .card { width: 300px; }
}

/* Desktop-first: 기본은 PC, 좁아지면 덮어씀 */
.card { width: 300px; }
@media (max-width: 767px) {
  .card { width: 100%; }
}
```

**Mobile-first 가 요즘의 관례**. 이유:
- 세상은 모바일이 더 많은 사용자를 가짐.
- 모바일은 CSS 를 **덜** 로드할수록 빠름.
- 기본은 단순하게, 큰 화면에서만 복잡한 걸 추가하는 게 자연스러움.

### 📱 viewport meta 태그는 필수

반응형을 하려면 HTML 에도 **이 한 줄** 이 있어야 해요.

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

이게 없으면 모바일 브라우저가 "PC 페이지를 축소해서 보여주는" 모드로 열려서 미디어 쿼리가 제대로 동작 안 합니다.

---

## 🧪 지금 당장 해보기

### `index.html`

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>인터랙션 연습</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>인터랙션 실험</h1>

    <div class="buttons">
      <button class="btn btn--primary">주문하기</button>
      <button class="btn btn--secondary">장바구니</button>
      <button class="btn" disabled>품절</button>
    </div>

    <form class="form">
      <input type="text" placeholder="이름을 입력하세요" />
      <input type="email" placeholder="이메일" />
      <button type="submit" class="btn btn--primary">제출</button>
    </form>

    <div class="card-grid">
      <div class="card">
        <h3>카드 1</h3>
        <p>마우스를 올려 보세요.</p>
      </div>
      <div class="card">
        <h3>카드 2</h3>
        <p>떠오르는 느낌이에요.</p>
      </div>
      <div class="card">
        <h3>카드 3</h3>
        <p>transition 이 핵심.</p>
      </div>
    </div>
  </body>
</html>
```

### `style.css`

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  padding: 24px;
  background: #fafafa;
}

h1 {
  margin-bottom: 24px;
}

/* ===== 버튼 ===== */
.buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}

.btn--primary {
  background: #ec4a0a;
  color: white;
}

.btn--primary:hover {
  background: #d63f05;
}

.btn--primary:active {
  transform: scale(0.97);
}

.btn--secondary {
  background: white;
  color: #ec4a0a;
  border: 1px solid #ec4a0a;
}

.btn--secondary:hover {
  background: #fef3eb;
}

.btn:disabled {
  background: #ddd;
  color: #999;
  cursor: not-allowed;
}

/* ===== 폼 ===== */
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
  margin-bottom: 32px;
}

input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus {
  outline: none;
  border-color: #ec4a0a;
  box-shadow: 0 0 0 3px rgba(236, 74, 10, 0.15);
}

/* ===== 카드 그리드 ===== */
.card-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card {
  padding: 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card h3 {
  margin-bottom: 8px;
}

.card p {
  color: #666;
}

/* ===== 반응형 ===== */
@media (min-width: 768px) {
  .card-grid {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .card {
    width: calc(33.333% - 12px);
  }
}
```

### 확인해 볼 것

- 버튼 위에 마우스를 올렸을 때 **부드럽게** 색이 바뀌나요?
- 버튼을 **누를 때** 살짝 작아지는 효과가 있나요?
- input 에 클릭해서 focus 를 주면 테두리 색이 바뀌고 그림자가 생기나요?
- 카드에 마우스를 올리면 **살짝 떠오르는** 느낌이 드나요?
- 브라우저 창을 **768px 기준으로** 줄였다 늘렸다 해 보세요. 카드 배치가 바뀌나요?

### 실험해 보기

1. `.btn--primary` 의 `transition` 을 지우면 어떻게 달라지나요?
2. `.card:hover` 의 `translateY(-4px)` 를 `translateY(-20px)` 로 바꿔 보세요.
3. `@media (min-width: 768px)` 의 값을 `1200px` 로 바꿔 보세요. 언제 레이아웃이 바뀌나요?
4. `input:focus` 의 `outline: none` 을 지웠다 넣었다 해 보세요. 키보드 Tab 으로 이동할 때 차이를 봐 보세요.

---

## 📚 정리

### 상호작용 pseudo-classes

| 셀렉터 | 언제 |
|---|---|
| `:hover` | 마우스 올렸을 때 |
| `:focus` | 포커스가 있을 때 |
| `:focus-visible` | 키보드로 포커스 됐을 때만 |
| `:active` | 누르는 순간 |
| `:disabled` | 비활성화된 폼 요소 |

### 전환과 변형

| 속성 | 뜻 |
|---|---|
| `transition` | 속성 변화를 부드럽게 (0.2s 추천) |
| `transform` | 이동/회전/크기 (translateY, scale, rotate) |
| `box-shadow` | 그림자 |
| `@keyframes` | 복잡한 애니메이션 (맛보기) |

### 반응형

| 문법 | 뜻 |
|---|---|
| `@media (min-width: 768px)` | 768px 이상에서만 적용 |
| Mobile-first | 기본은 모바일, 커지면 덮어쓰기 |
| viewport meta | 모바일에서 반응형 활성화 (필수) |

**이 장에서 가장 실전적인 것**: `transition: ... 0.2s ease` + `:hover` + `transform: translateY()` + `box-shadow`. 이 네 줄 조합만으로 사이트 전체 느낌이 확 살아납니다.

다음은 — 마지막으로, **templates/style.css 를 한 줄씩 읽어 보기** 👉 [08. 실습: templates 해부하기](./08-practice.md)
