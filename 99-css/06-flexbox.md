# 06. Flexbox — 현대 레이아웃의 주력 도구

## 🤔 Flexbox 가 왜 필요할까?

이런 레이아웃을 생각해 봅시다.

```
[로고]                  [메뉴1] [메뉴2] [메뉴3]
```

왼쪽에 로고, 오른쪽에 메뉴 3개. **아주 흔한** 헤더 모양이죠.

이걸 Flexbox 없이 만들려면?

```css
/* 옛날 방식 */
.logo {
  float: left;
}
.menu {
  float: right;
}
```

`float` 라는 속성을 썼는데요, 이걸 쓰면:
- 요소 위아래 정렬이 삐뚤어짐.
- 부모 높이가 0이 됨 (나 때 많이 울렸던 "clearfix" 버그).
- 세로 가운데 정렬은 거의 불가능.

**Flexbox 는 이걸 한 줄로 해결합니다.**

```css
.header {
  display: flex;
  justify-content: space-between;
}
```

오늘날의 웹 레이아웃 90% 는 Flexbox 로 만듭니다. **여기부터가 진짜 CSS 의 힘** 이에요.

---

## 🧩 Flexbox 의 기본 개념

Flexbox 는 **부모(flex container)** 와 **자식들(flex items)** 의 관계로 동작합니다.

```html
<div class="container">      <!-- flex container -->
  <div>A</div>               <!-- flex item -->
  <div>B</div>               <!-- flex item -->
  <div>C</div>               <!-- flex item -->
</div>
```

```css
.container {
  display: flex;   /* ← 이 한 줄이 모든 걸 시작함 */
}
```

`display: flex` 를 주는 **순간** 자식들이 **가로로 나란히** 정렬됩니다.

### flex 축 (axis)

```
    main axis (주축) →
  ┌────────────────────────┐
  │ [A] [B] [C]             │  ↓ cross axis (교차축)
  │                        │
  └────────────────────────┘
```

- **main axis** : 기본적으로 **가로** (좌 → 우)
- **cross axis** : main axis 와 수직인 축 (기본 **세로**)

이 축 개념이 중요해요. Flexbox 의 속성들은 "어느 축을 기준으로 하느냐" 로 구분됩니다.

---

## 🛠 부모에게 주는 속성들 (flex container)

### `flex-direction` — 주축의 방향

```css
.container {
  flex-direction: row;             /* 기본값: 왼→오 */
  flex-direction: row-reverse;     /* 오→왼 */
  flex-direction: column;          /* 위→아래 */
  flex-direction: column-reverse;  /* 아래→위 */
}
```

`column` 을 쓰면 **세로로 쌓이는** 배치가 됩니다. 모바일 카드 리스트 등에 자주 씀.

> ⚠ `flex-direction: column` 을 쓰면 **주축이 세로로 바뀝니다.**
> 그러면 아래에서 볼 `justify-content` 가 **세로** 를, `align-items` 가 **가로** 를 제어하게 돼요. 축을 기준으로 생각하세요.

### `justify-content` — 주축 정렬

자식들을 **주축(기본: 가로)** 방향으로 어떻게 배치할지.

```css
.container {
  display: flex;
  justify-content: flex-start;     /* 기본값: 시작쪽 */
  justify-content: flex-end;       /* 끝쪽 */
  justify-content: center;         /* 가운데 */
  justify-content: space-between;  /* 양 끝에 붙이고 사이에 동일 간격 */
  justify-content: space-around;   /* 각 아이템 주변에 동일 간격 */
  justify-content: space-evenly;   /* 모든 간격(끝 포함) 동일 */
}
```

가장 많이 쓰는 것:
- `center` → 가운데 모으기
- `space-between` → 양 끝에 밀어 놓기 (헤더의 로고/메뉴)

### `align-items` — 교차축 정렬

자식들을 **교차축(기본: 세로)** 방향으로 어떻게 정렬할지.

```css
.container {
  display: flex;
  align-items: stretch;     /* 기본값: 늘려서 채움 */
  align-items: flex-start;  /* 위쪽 정렬 */
  align-items: flex-end;    /* 아래쪽 정렬 */
  align-items: center;      /* 세로 가운데 */
  align-items: baseline;    /* 텍스트 baseline 기준 */
}
```

가장 많이 쓰는 건 **`center`**. 세로 가운데 정렬이 이 한 줄로 끝납니다.

### 🧙 전설의 "세로 가운데 정렬"

옛날 CSS 에서는 세로 가운데 정렬이 **악명 높게 어려웠어요.**
`vertical-align`, `table-cell`, `transform: translateY(-50%)` 등 온갖 꼼수가 난무했습니다.

Flexbox 의 등장으로 이렇게 됩니다.

```css
.center {
  display: flex;
  justify-content: center;  /* 가로 가운데 */
  align-items: center;      /* 세로 가운데 */
}
```

**이 세 줄이면 자식이 완벽한 정중앙**. 이 트릭 하나만 익혀도 평생 써먹습니다.

### `flex-wrap` — 줄바꿈 허용

```css
.container {
  display: flex;
  flex-wrap: nowrap;    /* 기본값: 줄바꿈 없이 한 줄 안에 구겨 넣음 */
  flex-wrap: wrap;      /* 가로가 꽉 차면 다음 줄로 */
}
```

반응형 레이아웃에서 필수. "화면이 좁아지면 카드가 다음 줄로 내려가게" 만들 때.

### `gap` — 아이템 사이 간격

```css
.container {
  display: flex;
  gap: 16px;              /* 모든 아이템 사이에 16px */
  gap: 16px 8px;          /* 세로 간격, 가로 간격 */
  row-gap: 16px;
  column-gap: 8px;
}
```

예전에는 `margin-right` 로 일일이 줬지만, `gap` 이 등장한 뒤로 훨씬 깔끔해졌어요.
**무조건 `gap` 을 쓰세요.**

---

## 🎒 자식에게 주는 속성들 (flex items)

### `flex-grow` — 남는 공간을 얼마나 차지할까

```css
.item-a { flex-grow: 1; }  /* 남는 공간을 1만큼 */
.item-b { flex-grow: 2; }  /* 남는 공간을 2만큼 (a의 2배) */
```

```
┌──────────────────────────────────────┐
│ [A: 크기 1]  [B: 크기 2]              │
└──────────────────────────────────────┘
```

- 모든 아이템에 `flex-grow: 0` (기본값) 이면 남는 공간은 그냥 빈 채로 둠.
- 하나에라도 `flex-grow: 1` 을 주면 그 아이템이 남은 공간을 **흡수**.

### `flex-shrink` — 공간이 부족할 때 얼마나 줄어들까

```css
.item { flex-shrink: 1; }  /* 기본값: 줄일 수 있음 */
.item { flex-shrink: 0; }  /* 절대 줄지 마 */
```

### `flex-basis` — 기본 크기

```css
.item {
  flex-basis: 200px;  /* 기본 너비 */
}
```

`width` 비슷하지만 Flexbox 계산에 더 적합합니다.

### 축약형 `flex`

위 셋을 한 줄에:

```css
.item {
  flex: 1 0 auto;  /* grow shrink basis */
  flex: 1;         /* flex-grow: 1 만 주는 축약. 흔한 사용법 */
}
```

**초보는 `flex: 1` 하나만 기억** 하세요. "남는 공간을 내가 채울게" 라는 뜻입니다.

### `align-self` — 한 아이템만 따로 정렬

```css
.container {
  align-items: center;  /* 전체는 가운데 */
}

.special {
  align-self: flex-end;  /* 나만 아래로 */
}
```

---

## 📖 실전 패턴 8가지

### 1) 가로로 나란히 + 양 끝에 밀기 (헤더)

```html
<header>
  <div class="logo">로고</div>
  <nav>메뉴들</nav>
</header>
```

```css
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
}
```

### 2) 완벽한 정중앙 정렬 (로딩 스피너, 빈 화면)

```css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```

### 3) 카드 리스트 (가로로 나열 + 줄바꿈)

```css
.list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.card {
  width: 200px;
}
```

### 4) 아이콘 + 텍스트 (세로 가운데 맞춤)

```html
<button>
  <img src="plus.svg" />
  <span>추가하기</span>
</button>
```

```css
button {
  display: flex;
  align-items: center;
  gap: 8px;
}
```

`<img>` 와 `<span>` 의 **세로 가운데 정렬** 이 완벽. Flexbox 없이 하면 악몽.

### 5) 세로 스택 (모바일 폼)

```css
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
```

### 6) "아래에 붙는" 푸터

```css
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;  /* 남는 세로 공간을 main 이 차지 */
}

footer {
  /* 자동으로 맨 아래에 */
}
```

### 7) 메뉴 + 본문 (사이드바 레이아웃)

```css
.layout {
  display: flex;
}

.sidebar {
  width: 240px;
  flex-shrink: 0;  /* 줄지 마 */
}

.main {
  flex: 1;  /* 남는 공간 다 가져 */
}
```

### 8) "왼쪽 정렬 + 마지막 아이템만 오른쪽 끝"

```css
.list {
  display: flex;
  gap: 16px;
}

.list .last {
  margin-left: auto;  /* ← 마법 */
}
```

`margin-left: auto` 를 주면 **남는 공간을 전부 왼쪽 margin 으로** 몰아서, 그 아이템이 **오른쪽 끝** 으로 밀려납니다.

---

## 🎯 [templates/style.css](../templates/style.css) 의 flex 사용 예시

### 헤더(gnb)

```css
.gnb {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 64px;
}
```

→ 제목과 추가 버튼을 양 끝에, 세로 가운데 정렬.

### 음식점 카드 하나

```css
.restaurant {
  display: flex;
  gap: 16px;
  padding: 16px 0;
}

.restaurant__category {
  flex-shrink: 0;
}

.restaurant__info {
  flex: 1;
}
```

→ 카테고리 아이콘(고정 크기) 과 정보(남은 공간 흡수) 를 나란히.

### 모달의 버튼 영역

```css
.button-container {
  display: flex;
  justify-content: flex-end;  /* 버튼을 오른쪽 끝에 */
  margin-top: 16px;
}
```

---

## 🧪 지금 당장 해보기

### `index.html`

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>Flexbox 연습</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <header class="header">
      <div class="logo">🍱 점심 뭐먹지</div>
      <nav>
        <ul class="nav">
          <li><a href="#">홈</a></li>
          <li><a href="#">맛집</a></li>
          <li><a href="#">소개</a></li>
        </ul>
      </nav>
    </header>

    <main class="main">
      <div class="card">
        <div class="card__icon">🥘</div>
        <div class="card__content">
          <h3>피양콩할마니</h3>
          <p>평양식 콩 요리 전문점. 진한 국물이 일품.</p>
        </div>
      </div>

      <div class="card">
        <div class="card__icon">🍜</div>
        <div class="card__content">
          <h3>진대감</h3>
          <p>수제 면발과 깊은 국물. 새벽까지 영업.</p>
        </div>
      </div>

      <div class="card">
        <div class="card__icon">🍣</div>
        <div class="card__content">
          <h3>스시초밥</h3>
          <p>합리적인 가격의 오마카세 전문점.</p>
        </div>
      </div>
    </main>
  </body>
</html>
```

### `style.css`

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
}

body {
  font-family: sans-serif;
  background: #fafafa;
}

/* 1. 헤더: 양 끝 정렬 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #eee;
}

.logo {
  font-size: 20px;
  font-weight: 700;
}

.nav {
  display: flex;
  gap: 20px;
}

.nav a {
  color: #333;
  text-decoration: none;
}

.nav a:hover {
  color: #ec4a0a;
}

/* 2. 메인: 카드 리스트, 세로 스택 */
.main {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  max-width: 600px;
  margin: 0 auto;
}

/* 3. 카드: 아이콘 + 본문 가로 배치 */
.card {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid #eee;
}

.card__icon {
  flex-shrink: 0;           /* 줄지 마 */
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #fef3eb;
  display: flex;            /* 이모지 가운데 */
  justify-content: center;
  align-items: center;
  font-size: 28px;
}

.card__content {
  flex: 1;                  /* 남는 공간 */
}

.card__content h3 {
  margin-bottom: 4px;
}

.card__content p {
  color: #666;
  font-size: 14px;
}
```

### 확인해 볼 것

1. 헤더에 로고 왼쪽, 메뉴 오른쪽인가요?
2. 각 카드에 **이모지 아이콘** 이 **세로 가운데** 정렬되어 있나요?
3. 브라우저 창을 줄였을 때 헤더 메뉴가 어떻게 변하나요?

### 실험해 보기

1. `.nav` 에 `gap: 20px` 대신 `gap: 40px` 으로 늘려 보세요.
2. `.main` 의 `flex-direction: column` 을 `row` 로 바꿔 보세요. `flex-wrap: wrap` 도 추가해 보세요.
3. 카드에서 `.card__icon` 의 `flex-shrink: 0` 을 지우고, 창을 줄여 보세요. 아이콘 크기가 어떻게 변하나요?
4. `.card` 를 `align-items: flex-start` 로 바꿔 보세요. 아이콘 위치가 어떻게 달라지나요?

---

## 🎮 Flexbox 를 게임으로 익히기

**[Flexbox Froggy (한국어)](https://flexboxfroggy.com/#ko)** — 24개 레벨의 게임으로 flexbox 문법을 익힐 수 있어요. **한 시간만 투자해도 충분히 익숙해집니다.**

그 다음 [**CSS Tricks: A Complete Guide to Flexbox**](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) 을 치트시트처럼 즐겨찾기 해 두세요.

---

## 📚 정리

### 부모 (flex container)

| 속성 | 뜻 |
|---|---|
| `display: flex` | flex 시작 |
| `flex-direction` | 주축 방향 (row / column) |
| `justify-content` | 주축 정렬 |
| `align-items` | 교차축 정렬 |
| `flex-wrap` | 줄바꿈 허용 |
| `gap` | 아이템 사이 간격 |

### 자식 (flex item)

| 속성 | 뜻 |
|---|---|
| `flex: 1` | 남는 공간 흡수 |
| `flex-shrink: 0` | 줄어들지 않음 |
| `align-self` | 혼자만 다른 정렬 |
| `margin-left: auto` | 오른쪽 끝으로 밀기 |

**한 줄 요약**: `display: flex` + `gap` + `justify-content` + `align-items` 만 알면 레이아웃의 80% 는 해결됩니다.

다음은 — 마우스 올릴 때의 효과, 반응형 👉 [07. 인터랙션 스타일](./07-interactions.md)
