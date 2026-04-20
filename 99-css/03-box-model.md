# 03. 박스 모델과 단위 — 모든 것은 박스다

## 🤔 "모든 요소는 박스다" 가 무슨 말?

브라우저 개발자 도구(F12) 를 열고 아무 요소나 클릭해 보세요.
오른쪽 아래에 이런 네모 그림이 뜹니다.

```
┌─────────────── margin ───────────────┐
│  ┌─────────── border ────────────┐   │
│  │  ┌───── padding ────────┐     │   │
│  │  │                      │     │   │
│  │  │      content         │     │   │
│  │  │                      │     │   │
│  │  └──────────────────────┘     │   │
│  └───────────────────────────────┘   │
└──────────────────────────────────────┘
```

웹 페이지의 **모든 요소** (`<p>`, `<div>`, `<button>`, `<img>`, ...) 는 브라우저가 **이런 박스** 로 그립니다.
눈에 네모로 안 보여도, 속으로는 다 네모예요.

이 네 겹이 **박스 모델(Box Model)** 이고, CSS 레이아웃의 **가장 중요한 개념** 입니다.

---

## 📦 박스의 네 겹

안쪽부터 바깥쪽 순으로:

### 1) `content` — 내용 영역

실제 글자나 이미지가 들어가는 **진짜 내용** 부분.

### 2) `padding` — 내부 여백

내용과 테두리 사이의 **빈 공간**. "내용이 답답하지 않게" 안쪽으로 주는 공간.

```css
.box {
  padding: 20px;  /* 상하좌우 모두 20px */
}
```

### 3) `border` — 테두리

박스의 **경계선**. 눈에 보이는 선.

```css
.box {
  border: 1px solid black;  /* 1픽셀 두께의 실선 검정색 */
}
```

### 4) `margin` — 외부 여백

박스 **바깥쪽** 의 여백. 옆 박스와의 거리.

```css
.box {
  margin: 10px;  /* 상하좌우 모두 10px */
}
```

---

## 🎯 padding 과 margin 이 헷갈릴 때

**한 줄 요약**:
- `padding` = 박스 **안쪽** 여백 (내용과 테두리 사이)
- `margin` = 박스 **바깥쪽** 여백 (다른 박스와의 거리)

비유:
- 박스를 **선물 상자** 라고 생각하면,
- `padding` = 상자 안에 물건을 감싸는 **에어캡**
- `border` = 상자 **벽**
- `margin` = 상자끼리 **띄워 두는 거리**

```css
.card {
  padding: 20px;   /* 카드 안에 여유 공간 */
  border: 1px solid #ddd;
  margin: 10px;    /* 카드끼리 10px 떨어지게 */
}
```

---

## ✂ padding / margin 을 자세히 쓰는 법

### 방향별로 지정

```css
.box {
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 10px;
  padding-left: 20px;
}
```

`margin` 도 똑같이 `-top`, `-right`, `-bottom`, `-left` 가 있어요.

### 축약형: 값을 여러 개 넘기기

```css
.box {
  padding: 10px;                /* 상하좌우 모두 10px */
  padding: 10px 20px;           /* 상하 10px, 좌우 20px */
  padding: 10px 20px 30px;      /* 상 10, 좌우 20, 하 30 */
  padding: 10px 20px 30px 40px; /* 상 → 우 → 하 → 좌 (시계 방향) */
}
```

값 개수가 **2개** 일 때: 세로 / 가로.
값 개수가 **4개** 일 때: 위 → 오른쪽 → 아래 → 왼쪽 (시계방향).

실무에서는 2개짜리(`padding: 10px 20px`) 를 제일 많이 씁니다.

---

## 🖼 border 자세히 보기

```css
.box {
  border: 1px solid black;
}
```

이건 세 가지를 한 번에 쓴 축약형입니다.

- `border-width`: 두께 (`1px`, `2px`, ...)
- `border-style`: 스타일 (`solid`, `dashed`, `dotted`, `none`)
- `border-color`: 색 (`black`, `#ddd`, `red`, ...)

```css
.box {
  border-width: 1px;
  border-style: solid;
  border-color: black;
}
/* ↑ 이것과 아래는 똑같음 ↓ */
.box {
  border: 1px solid black;
}
```

### 한쪽 테두리만

```css
.box {
  border-bottom: 1px solid #ddd;  /* 아래쪽만 */
}
```

게시판 목록의 **줄 구분선** 이 보통 이런 식입니다.

### border-radius — 모서리 둥글게

```css
.card {
  border-radius: 8px;   /* 모든 모서리를 8px 만큼 둥글게 */
  border-radius: 50%;   /* 동그라미 */
}
```

실무에서 자주 나옵니다. 정사각형 이미지에 `border-radius: 50%` 를 주면 **동그란 프로필 이미지** 가 됩니다.

---

## 🧮 "너무 큰데?" 문제 — box-sizing 을 알아야 할 시간

여기서 정말 **많이 헷갈리는** 얘기가 나옵니다.

```css
.box {
  width: 200px;
  padding: 20px;
  border: 2px solid black;
}
```

이 박스의 **실제 가로 크기** 는 몇 픽셀일까요?

직관적으론 `200px` 일 것 같죠. 근데 **기본 동작으로는 아닙니다.**

- `width: 200px` → 이게 **content 만** 의 너비.
- `padding: 20px` 이 좌우에 붙음 → `+40px`
- `border: 2px` 이 좌우에 붙음 → `+4px`
- **실제 화면을 차지하는 너비 = 200 + 40 + 4 = 244px**

이게 CSS 초창기부터 있던 **혼란의 원흉** 이었어요.
"200px 박스를 만들려고 했는데 실제로는 244px 이 되어서 레이아웃이 삐져나감" 같은 일이 매일 벌어졌습니다.

### 해결사: `box-sizing: border-box`

```css
.box {
  box-sizing: border-box;  /* ← 이 한 줄의 마법 */
  width: 200px;
  padding: 20px;
  border: 2px solid black;
}
```

`box-sizing: border-box` 를 쓰면:

- `width: 200px` → **padding 과 border 까지 포함한** 너비가 200px.
- 즉 내용 영역은 `200 - 40 - 4 = 156px` 로 자동 축소.

**이게 우리 직관에 맞아요.**

### 실무 관례

**거의 모든 프로젝트** 가 맨 위에 이 규칙을 넣습니다:

```css
* {
  box-sizing: border-box;
}
```

"모든 요소에 `border-box` 적용" 이라는 뜻. [templates/style.css](../templates/style.css) 에도 이게 있습니다.

이 한 줄을 추가한 뒤부터는 "내가 지정한 width 가 바로 그 요소의 너비" 가 됩니다.
**`border-box` 는 그냥 기본 세팅으로 생각하고 사용하세요.**

---

## 📏 단위 — px, em, rem, %, vh/vw

CSS 에서 크기를 적을 때 쓰는 **단위** 들입니다. 가장 많이 쓰는 것부터.

### `px` (픽셀) — 가장 단순한 단위

```css
.box {
  font-size: 16px;
  padding: 20px;
}
```

**절대 단위**. 화면 위의 픽셀 수 그대로.
"정확한 크기" 를 원할 때 편합니다.

### `%` (퍼센트) — 부모 크기에 대한 비율

```css
.child {
  width: 50%;   /* 부모 너비의 50% */
}
```

반응형(화면 크기가 변해도 자연스럽게 바뀌는) 레이아웃에서 자주 씁니다.

### `em` — 부모 글자 크기의 배수

```css
.box {
  font-size: 16px;
  padding: 1em;  /* = 16px (부모 font-size 의 1배) */
}

.box-big {
  font-size: 20px;
  padding: 1em;  /* = 20px (부모 font-size 의 1배) */
}
```

"글자 크기에 비례해서 여백을 주고 싶을 때" 씁니다.

### `rem` — 최상위(Root) 글자 크기의 배수

```css
html {
  font-size: 16px;  /* 루트 크기 */
}

.box {
  font-size: 1.5rem;  /* = 24px (루트 16px × 1.5) */
  padding: 2rem;      /* = 32px */
}
```

`r` 은 **root (HTML 전체의 기준)**. `em` 처럼 부모에 휘둘리지 않아서 **일관된 크기** 를 유지하기 쉽습니다.

실무에서는 **폰트 크기와 간격은 `rem`, 자잘한 픽셀 값은 `px`** 식으로 혼용하는 경우가 많습니다.

### `vh` / `vw` — 뷰포트(화면) 크기 기준

- `1vh` = 화면 **높이** 의 1%
- `1vw` = 화면 **너비** 의 1%

```css
.hero {
  height: 100vh;  /* 화면 전체 높이 */
}
```

"첫 화면을 꽉 채우는 히어로 섹션" 같은 데에 씁니다.

### 지금 단계에서 권장

```
비율을 맞춰야 하는 너비/여백    → %
화면 전체를 채워야 할 때         → vh / vw
폰트 크기, 여백                  → rem
아이콘, 보더 등 작고 고정된 값   → px
```

처음엔 `px` 만 써도 괜찮아요. 익숙해지면 `rem`/`%` 를 섞어 봅시다.

---

## 🎨 색상 — 색을 쓰는 4가지 방법

### 1) 이름 (keyword)

```css
.box {
  color: red;
  background-color: white;
}
```

`red`, `blue`, `black`, `white`, `gray`, ... 자주 쓰는 색 이름이 정해져 있습니다.
편하지만 **세밀한 조정은 불가능**.

### 2) HEX (16진수)

```css
.box {
  color: #ff0000;      /* 빨강 */
  background-color: #f5f5f5;  /* 연한 회색 */
}
```

`#` + **6자리 16진수**. 앞 두 자리가 빨강, 가운데 두 자리가 녹색, 뒤 두 자리가 파랑.
디자인 툴(피그마 등) 에서 복사하면 이 형식이 대부분이에요.

**3자리 축약** 도 가능: `#fff` = `#ffffff` (흰색), `#000` = `#000000` (검정).

### 3) RGB

```css
.box {
  color: rgb(255, 0, 0);      /* 빨강 */
  background: rgba(0, 0, 0, 0.5);  /* 반투명 검정 */
}
```

각 숫자는 0~255. `rgba` 는 **a (alpha, 투명도)** 까지 - 0~1 사이 값.

**반투명 색** 을 쓸 때 필수입니다.

### 4) HSL (색상-채도-명도)

```css
.box {
  color: hsl(0, 100%, 50%);  /* 빨강 */
}
```

직관적으로 색을 **조정** 할 때 좋지만, 자주 쓰지는 않아요. 일단은 "이런 게 있구나" 정도.

### 실무 관례

- **디자인 시안에서 가져오는 색** → `hex` (제일 많음)
- **반투명 효과** → `rgba`
- **의미 있는 색 (primary, danger)** → **CSS 변수** 로 선언 (다음 파트!)

---

## 🏷 CSS 변수 (custom property)

같은 색을 여러 번 쓸 때 매번 `#ec4a0a` 를 적기 귀찮죠. 그리고 나중에 "주황색을 살짝 어둡게" 바꾸려면 **전부 찾아서 수정** 해야 함.

CSS 변수가 이걸 해결합니다.

```css
:root {
  --primary-color: #ec4a0a;
  --text-color: #333;
  --border-color: #e0e0e0;
}

.button {
  background-color: var(--primary-color);
  color: white;
}

.input {
  border: 1px solid var(--border-color);
  color: var(--text-color);
}
```

- `:root` 는 **HTML 전체의 최상위** 요소 (`<html>` 과 같음). 여기서 선언하면 어디서든 쓸 수 있음.
- `--primary-color` 처럼 **하이픈 두 개로 시작** 하는 이름이 CSS 변수.
- 쓸 때는 `var(--primary-color)` 으로 꺼내 씁니다.

[templates/style.css](../templates/style.css) 맨 위에 이런 선언이 있어요:

```css
:root {
  --primary-color: #ec4a0a;
  --primary-color-light: #fdddb7;
  --grey-100: #fcfcfd;
  /* ... */
}
```

**이 한 곳만 바꾸면** 사이트 전체의 주황색 버튼/강조색이 한꺼번에 바뀝니다.

---

## 🧪 지금 당장 해보기

### `index.html`

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>박스 모델</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="card">
      <h2>카드 제목</h2>
      <p>카드 안쪽에 여백이 있고, 바깥쪽에도 여백이 있어요.</p>
    </div>

    <div class="card">
      <h2>두 번째 카드</h2>
      <p>첫 번째 카드와는 margin 으로 떨어져 있습니다.</p>
    </div>

    <div class="card card--highlight">
      <h2>강조 카드</h2>
      <p>이 카드는 변수로 색이 지정되어 있어요.</p>
    </div>
  </body>
</html>
```

### `style.css`

```css
:root {
  --primary-color: #ec4a0a;
  --border-color: #e0e0e0;
  --text-color: #333;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  padding: 40px;
  font-family: sans-serif;
  color: var(--text-color);
  background-color: #fafafa;
}

.card {
  width: 400px;
  padding: 24px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  margin-bottom: 16px;
  background-color: white;
}

.card h2 {
  margin-bottom: 12px;
}

.card--highlight {
  border-color: var(--primary-color);
}

.card--highlight h2 {
  color: var(--primary-color);
}
```

### 확인해 볼 것

- **개발자 도구(F12) → Elements 탭 → 요소 선택 → 오른쪽 Styles 패널 맨 아래의 네모 그림** 을 꼭 보세요. padding/border/margin 이 시각적으로 표시됩니다.
- 카드를 **선택하고 padding 값을 바꿔** 보세요. 크기가 어떻게 변하나요?
- `box-sizing: border-box` 를 빼고 (주석 처리) 새로고침 해 보세요. 카드 너비가 어떻게 달라지나요?

### 실험해 보기

1. `.card` 의 `margin-bottom: 16px` 을 `40px` 로 늘려 보세요. 카드 사이 간격이 달라지나요?
2. `border-radius: 8px` 를 `50%` 로 바꿔 보세요. 🤔 왜 동그래지지 않고 이상한 모양이 될까요? (힌트: 너비와 높이가 같아야 원)
3. `.card--highlight` 의 `border-color` 를 `rgba(236, 74, 10, 0.3)` 으로 바꾸면 어떻게 변하나요?

---

## 📚 정리

| 용어 | 뜻 |
|---|---|
| content | 실제 내용 영역 |
| padding | 내용과 테두리 사이 (안쪽 여백) |
| border | 테두리 |
| margin | 박스 바깥 여백 |
| box-sizing: border-box | 지정한 width 에 padding/border 포함 (필수 관례) |
| px, %, em, rem, vh/vw | 크기 단위들 |
| hex / rgb / rgba | 색 표기 방법 |
| CSS 변수 | `--name` 으로 선언, `var(--name)` 으로 사용 |

**가장 중요한 실무 지식**: `* { box-sizing: border-box; }` 는 모든 프로젝트의 시작점입니다.

다음은 — 글자 꾸미기 👉 [04. 텍스트 스타일링](./04-text-styling.md)
