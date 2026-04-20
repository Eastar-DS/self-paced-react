# 05. display 와 position — 요소를 어떻게 배치할 것인가

## 🤔 HTML 요소들은 왜 저렇게 쌓일까?

아무 CSS 없이 이 HTML 을 써 봅시다.

```html
<h1>제목</h1>
<p>문단 하나</p>
<p>문단 둘</p>
<span>span 1</span>
<span>span 2</span>
<a href="#">링크</a>
```

화면엔 이렇게 그려집니다.

```
제목
문단 하나
문단 둘
span 1 span 2 링크
```

- 앞 세 개(`h1`, `p`, `p`) 는 **각각 새 줄에서 시작**.
- 뒤 세 개(`span`, `span`, `a`) 는 **옆으로 나란히**.

이건 각 태그의 **`display` 기본값** 이 다르기 때문입니다. 이 장의 주제예요.

---

## 🧱 block vs inline

가장 기본이 되는 두 가지 표시 방법.

### block — 줄 하나를 독점

```
┌────────────────────────────────────┐ ← 가로 전체
│         block 요소                  │
└────────────────────────────────────┘
┌────────────────────────────────────┐
│         block 요소                  │
└────────────────────────────────────┘
```

- 항상 **새 줄에서 시작**.
- **가로 전체** 를 차지 (부모가 허용하는 만큼).
- `width`/`height` 로 크기 조절 가능.
- `margin`/`padding` 이 모든 방향에 정상 적용.

**block 기본인 태그들**: `<div>`, `<p>`, `<h1>~<h6>`, `<ul>`, `<li>`, `<section>`, `<header>`, `<main>`, `<footer>`, `<form>` 등.

### inline — 내용 크기만큼만

```
[inline] [inline] [inline]
```

- **새 줄을 만들지 않음**. 옆으로 붙음.
- **내용 크기만큼만** 차지.
- `width`/`height` 를 지정해도 **무시됨**.
- `margin-top`/`margin-bottom` 도 무시 (좌우만 됨).

**inline 기본인 태그들**: `<span>`, `<a>`, `<strong>`, `<em>`, `<img>`, `<button>`, `<input>`, `<label>` 등.

### inline-block — 하이브리드

`display: inline-block` 을 주면:

- 옆으로 **붙지만(inline 의 특징)**,
- `width`/`height` 가 **작동(block 의 특징)** 함.

"인라인처럼 흐르게 두되 크기는 정하고 싶을 때" 씁니다.

```css
.tag {
  display: inline-block;
  width: 80px;
  text-align: center;
  padding: 4px 8px;
}
```

"카테고리 태그" 같은 걸 만들 때 자주 등장.

---

## 🔁 display 바꾸기

기본값은 언제든 CSS 로 바꿀 수 있습니다.

```css
/* 원래 block 인 것을 inline 처럼 */
li {
  display: inline;
}

/* 원래 inline 인 것을 block 처럼 */
a {
  display: block;
}
```

### 실무 예시: 네비게이션 메뉴

```html
<nav>
  <ul class="nav">
    <li><a href="/">홈</a></li>
    <li><a href="/about">소개</a></li>
    <li><a href="/contact">연락처</a></li>
  </ul>
</nav>
```

```css
.nav {
  display: flex;  /* 다음 장에서 자세히 */
}

.nav li {
  display: inline-block;  /* ul > li 를 가로로 */
}

.nav a {
  display: block;         /* a 를 block 으로 */
  padding: 12px 20px;     /* 그래야 세로 padding 이 먹음 */
}
```

**왜 `<a>` 를 block 으로 바꿀까**: 기본 inline 상태에서는 `padding-top`/`padding-bottom` 이 제대로 안 먹기 때문이에요. block 으로 만들면 클릭 가능 영역도 padding 전체로 넓어져서 모바일 UX 에 좋습니다.

---

## 🚫 display: none — 완전히 사라지게

```css
.hidden {
  display: none;
}
```

이 요소는 **없는 취급** 됩니다.
- 공간도 차지 안 함.
- 화면에서 사라짐.
- 스크린 리더도 읽지 않음.

### `display: none` 과 `visibility: hidden` 의 차이

| 속성 | 화면에 보임? | 공간 차지? |
|---|---|---|
| `display: none` | ❌ | ❌ (자리 자체가 없음) |
| `visibility: hidden` | ❌ | ⭕ (투명하게 자리는 차지) |
| `opacity: 0` | ❌ (보이지만 투명) | ⭕ (자리 차지, 마우스 클릭은 받음) |

상황에 따라 골라 씁니다. 대부분은 `display: none` 을 씁니다.

### 모달에서의 활용

```html
<div class="modal">...</div>
<div class="modal modal--open">...</div>
```

```css
.modal {
  display: none;
}

.modal--open {
  display: block;
}
```

[templates/index.html](../templates/index.html) 에서 모달이 `modal--open` 클래스를 받으면 보이는 방식이 이거예요. JavaScript 로 이 클래스를 토글해서 모달을 열고 닫습니다.

---

## 📌 position — 요소를 "평면 바깥"으로 꺼내기

지금까지 배운 건 전부 **HTML 흐름** 안에서의 배치였습니다.
요소들이 차례로 쌓이는 거죠.

하지만 실제 UI 에는 **흐름에서 벗어난** 것들이 많아요.
- 화면 오른쪽 아래의 "맨 위로" 버튼
- 이미지 위에 겹쳐 올린 "NEW" 배지
- 화면 전체를 덮는 모달

이런 건 `position` 속성으로 만듭니다.

### `position` 의 5가지 값

| 값 | 설명 |
|---|---|
| `static` | **기본값**. 평범하게 흐름대로. (대부분) |
| `relative` | 원래 자리에서 살짝 이동. 공간은 그대로 차지 |
| `absolute` | 흐름에서 빠져나와서 **부모 기준** 절대 위치 |
| `fixed` | 흐름에서 빠져나와서 **화면 기준** 절대 위치 (스크롤해도 고정) |
| `sticky` | 스크롤하다가 특정 지점에서 고정되는 하이브리드 |

### `static` — 기본값

```css
.box {
  position: static;  /* 생략해도 됨 — 기본값 */
}
```

아무 일도 일어나지 않음. 흐름대로 쌓임.

### `relative` — 살짝 삐뚤게

```css
.box {
  position: relative;
  top: 10px;    /* 원래 자리에서 아래로 10px */
  left: 20px;   /* 원래 자리에서 오른쪽으로 20px */
}
```

**원래 자리에서** 위치를 조금 이동.
**중요**: 원래 자리의 공간은 **그대로 차지** 합니다 (다른 요소가 밀려들어오지 않음).

> 🔑 `relative` 그 자체로 이동용으로 쓰이는 일보다,
> 아래에서 볼 `absolute` 의 **기준점 역할** 로 훨씬 많이 쓰입니다.

### `absolute` — 부모 기준 절대 위치

```css
.parent {
  position: relative;  /* ← 기준점이 됨 */
}

.child {
  position: absolute;
  top: 10px;
  right: 10px;
}
```

`absolute` 요소는 **가장 가까운 `position: relative/absolute/fixed` 조상** 을 기준으로 배치됩니다.

"부모 박스의 오른쪽 위 구석" 같은 걸 만들 때 씁니다.

```html
<div class="card">
  <img src="..." />
  <span class="badge">NEW</span>
</div>
```

```css
.card {
  position: relative;  /* 기준점 */
}

.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  padding: 4px 8px;
}
```

카드 오른쪽 위 구석에 NEW 배지가 달린 모양이 됩니다.

**아주 많이 쓰는 패턴**. 꼭 기억해 두세요.

### `fixed` — 화면 기준 절대 위치

```css
.scroll-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
```

부모와 상관없이 **뷰포트(화면)** 기준으로 배치.
스크롤을 내려도 **항상 같은 자리** 에 있음.

- "맨 위로" 버튼
- 모바일의 하단 내비게이션 바
- 상단에 고정된 헤더

### `sticky` — 스크롤 따라오다가 멈춤

```css
header {
  position: sticky;
  top: 0;
}
```

- 처음에는 평범한 흐름대로.
- 스크롤해서 `top: 0` 에 닿는 순간 거기에 **붙어서** 움직이지 않음.
- "스크롤 따라오는 헤더" 에 적합.

---

## 🎚 z-index — 쌓이는 순서

`position` 이 `static` 이 아닌 요소들은 **겹칠** 수 있어요.
누가 위에 올지를 정하는 게 `z-index`.

```css
.modal-backdrop {
  position: fixed;
  z-index: 100;
}

.modal-container {
  position: fixed;
  z-index: 101;  /* backdrop 보다 앞 */
}
```

숫자가 **클수록 앞에** 표시됩니다. 음수도 가능.

**실무 팁**: 팀마다 z-index 체계를 정해 둡니다. 예를 들어:
- 일반 요소: 0~9
- 헤더: 10~19
- 드롭다운: 20~29
- 모달: 100~199
- 토스트 알림: 200~299

혼자서 아무 숫자나 쓰면 나중에 어느 게 어느 것 위에 오는지 엉켜 버립니다.

---

## 🏗 모달의 전형적인 구조

[templates/style.css](../templates/style.css) 의 모달 관련 CSS 를 보면 모든 개념이 담겨 있어요.

```css
.modal {
  position: fixed;        /* 화면 기준 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;           /* 다른 거 위에 */
}

.modal-backdrop {
  position: absolute;     /* modal 기준 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.35);
}

.modal-container {
  position: absolute;     /* modal 기준 */
  bottom: 0;              /* 아래에 붙임 */
  width: 100%;
  background-color: white;
  padding: 32px 16px;
}
```

해부:
1. 바깥 `.modal` 은 `fixed` 로 **화면 전체** 를 덮는 박스가 됨.
2. 안의 `.modal-backdrop` 은 `absolute` 로 `.modal` 전체를 채우는 **어두운 배경**.
3. 안의 `.modal-container` 는 `absolute` + `bottom: 0` 으로 **화면 하단에 붙은** 하얀 패널.

"모달을 화면 아래에서 쏙 올라오게" 하는 모바일식 UI 를 만든 거예요.

---

## 🧪 지금 당장 해보기

### `index.html`

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>display 와 position</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <header class="sticky-header">상단 메뉴</header>

    <main>
      <h1>포지셔닝 연습</h1>

      <div class="card">
        <span class="badge">NEW</span>
        <h2>카드 제목</h2>
        <p>오른쪽 위에 NEW 배지가 있습니다.</p>
      </div>

      <div class="card">
        <h2>두 번째 카드</h2>
        <nav>
          <ul class="inline-nav">
            <li><a href="#">메뉴 1</a></li>
            <li><a href="#">메뉴 2</a></li>
            <li><a href="#">메뉴 3</a></li>
          </ul>
        </nav>
      </div>

      <div style="height: 1000px;">스크롤 테스트용 여백</div>
    </main>

    <button class="scroll-top">↑</button>
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
  padding-top: 60px;
}

.sticky-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  background: #333;
  color: white;
  z-index: 10;
}

main {
  padding: 20px;
}

.card {
  position: relative;      /* 기준점 */
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
}

.badge {
  position: absolute;      /* card 기준 */
  top: 10px;
  right: 10px;
  background: #ec4a0a;
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 4px;
}

.inline-nav li {
  display: inline-block;   /* li 를 가로로 */
  margin-right: 10px;
}

.inline-nav a {
  display: block;          /* 클릭 영역 넓히기 */
  padding: 8px 12px;
  background: #f5f5f5;
  text-decoration: none;
  color: #333;
  border-radius: 4px;
}

.inline-nav a:hover {
  background: #ec4a0a;
  color: white;
}

.scroll-top {
  position: fixed;         /* 화면 기준 */
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #ec4a0a;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 5;
}
```

### 확인해 볼 것

1. **상단 헤더(`.sticky-header`)** — 스크롤을 내려도 항상 위에 있나요?
2. **카드의 NEW 배지** — 카드 오른쪽 위 모서리에 정확히 붙어 있나요?
3. **"↑" 버튼** — 스크롤해도 화면 오른쪽 아래에 고정되어 있나요?
4. **메뉴 링크들** — 가로로 나란히 있고, 마우스를 올리면 주황색이 되나요?

### 실험해 보기

1. `.card` 의 `position: relative` 를 지워 보세요. NEW 배지가 어디로 가나요? (힌트: `<body>` 기준으로 옮겨감)
2. `.scroll-top` 을 `position: absolute` 로 바꿔 보세요. 스크롤할 때 어떻게 달라지나요?
3. `.badge` 에 `z-index: -1` 을 줘 보세요. 어떻게 보이나요?

---

## 📚 정리

### display

| 값 | 설명 |
|---|---|
| `block` | 새 줄, 가로 전체 차지 |
| `inline` | 옆으로, 내용 크기 |
| `inline-block` | 옆으로, 크기 지정 가능 |
| `none` | 아예 사라짐 |
| `flex` | 다음 장! |

### position

| 값 | 기준 |
|---|---|
| `static` | 기본값, 아무 효과 없음 |
| `relative` | 원래 자리 (주로 absolute 의 기준점 역할) |
| `absolute` | 가장 가까운 positioned 조상 |
| `fixed` | 화면(뷰포트) |
| `sticky` | 스크롤 위치에 따라 static ↔ fixed |

**실무에서 가장 많이 쓰는 조합**:
- 부모에 `position: relative`, 자식에 `position: absolute` → "부모 안의 특정 자리"
- `position: fixed` → 화면 고정 (헤더, 모달, 토스트)

다음은 현대 CSS 레이아웃의 **주력** 도구 👉 [06. Flexbox](./06-flexbox.md)
