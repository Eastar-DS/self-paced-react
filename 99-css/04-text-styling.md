# 04. 텍스트 스타일링 — 글자의 얼굴을 바꾸자

## 🤔 글자를 왜 꾸며야 할까?

브라우저 기본 폰트는 **Times New Roman** 같은 딱딱한 글꼴이에요.
그대로 두면 우리 사이트는 1995년 논문처럼 보입니다.

게다가 사이트 분위기는 **글꼴, 글자 크기, 줄간격** 으로 70% 결정됩니다.
같은 내용도 글자 설정만 바꾸면 **전혀 다른 느낌** 이 되는 거예요.

이 장에서 배우는 속성들은 실무에서 **매일 쓰는** 것들입니다.

---

## 🔤 font-family — 어떤 글꼴로 보여 줄까

```css
body {
  font-family: "Pretendard", "Apple SD Gothic Neo", sans-serif;
}
```

여러 폰트를 **쉼표로 나열** 하는 게 핵심입니다. 왜 그럴까요?

- 브라우저는 **왼쪽부터 차례로** 글꼴을 찾아봅니다.
- 사용자의 컴퓨터에 `"Pretendard"` 가 있으면 그걸 사용.
- 없으면 다음 `"Apple SD Gothic Neo"` 를 시도.
- 그것도 없으면 마지막의 `sans-serif` (시스템 기본 고딕류) 를 사용.

이걸 **fallback (대체 폰트)** 이라고 합니다. 모든 사용자의 컴퓨터 환경은 다르기 때문에 이런 안전장치가 필요해요.

### 일반 분류(generic family)

맨 끝에는 항상 **일반 분류** 하나를 둡니다. 최후의 보루예요.

- `sans-serif`: 고딕체 (획 끝이 단정함) — 가장 많이 씀
- `serif`: 명조체 (획 끝에 삐침) — 장문의 본문에 가끔
- `monospace`: 글자 너비가 모두 같음 — 코드 표시용

### 따옴표는 언제 쓰나?

- 폰트 이름에 **공백이 있으면 따옴표** 로 감쌉니다. `"Apple SD Gothic Neo"` ✓
- 한 단어 폰트는 따옴표 없어도 됨. `sans-serif`, `Arial`

### 웹 폰트 쓰기 (Pretendard 예시)

사용자 컴퓨터에 없는 폰트를 **웹에서 내려받아** 적용할 수 있습니다.

```html
<head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
  />
</head>
```

```css
body {
  font-family: "Pretendard", sans-serif;
}
```

Pretendard 는 한국어 UI 에서 정말 많이 쓰는 무료 폰트예요. [templates/style.css](../templates/style.css) 에도 이게 쓰입니다.

---

## 📏 font-size — 글자 크기

```css
p {
  font-size: 16px;
}
```

단위는 저번 장에서 본 것들을 그대로 씁니다.

```css
h1 { font-size: 32px; }
h2 { font-size: 24px; }
p  { font-size: 16px; }
small { font-size: 0.875rem; }  /* 14px */
```

### 관례적 크기

딱 정해진 건 없지만, 대략 이런 느낌으로 시작합니다.

- **본문** : `14~16px`
- **소제목** : `18~22px`
- **제목** : `24~36px`
- **큰 제목(히어로)** : `48~72px`

한국어는 영어보다 약간 **작게** 보이는 경향이 있어서, 영어권 사이트보다 2px 정도 크게 잡는 경우가 많습니다.

---

## 📐 font-weight — 글자 굵기

```css
.normal { font-weight: normal; }  /* = 400 */
.bold   { font-weight: bold; }    /* = 700 */
.light  { font-weight: 300; }
.black  { font-weight: 900; }
```

- `normal` (400) 과 `bold` (700) 이 **기본값 두 개**.
- 숫자로 `100` ~ `900` 까지 지정 가능 (100 단위).
- 모든 폰트가 모든 굵기를 지원하지는 않아요. Pretendard 는 100~900 다 지원.

```css
h1 {
  font-weight: 700;  /* 굵게 */
}

.caption {
  font-weight: 400;  /* 보통 */
}
```

---

## ✏ font-style — 기울임

```css
em {
  font-style: italic;
}

.not-italic {
  font-style: normal;
}
```

`<em>` 태그는 브라우저 기본으로 기울임이지만, CSS 로 **끌 수도 켤 수도** 있습니다.

---

## 🎨 color — 글자 색

```css
p {
  color: #333;
}

h1 {
  color: var(--primary-color);
}
```

03장에서 본 색 표기법을 그대로 씁니다. `color` 는 **글자 색** 이라는 점이 중요 (배경색은 `background-color`).

### 디자인 팁

**진짜 검정(`#000`) 은 잘 안 써요.** 너무 강해서 눈이 피로함.
대신 `#333`, `#222` 정도의 **거의 검정** 을 본문에 쓰는 게 관례입니다.

```css
body {
  color: #333;  /* 거의 검정. 실무의 기본값 */
}
```

---

## 📜 line-height — 줄간격

```css
p {
  font-size: 16px;
  line-height: 1.6;  /* = 16 × 1.6 = 25.6px */
}
```

**한 줄의 높이** 를 정합니다. 이게 **글의 읽기 좋은 정도** 를 좌우해요.

- `line-height: 1`  → 줄들이 딱 붙음 (답답함)
- `line-height: 1.6` → 본문 읽기 좋음 (권장)
- `line-height: 2`  → 줄간이 너무 뜸 (논문 느낌)

**단위 없이 숫자만** 쓰는 게 관례입니다. 그러면 "현재 font-size 의 몇 배" 라는 뜻이라 폰트 크기가 바뀌어도 비율이 유지됨.

### 제목은 조금 다름

```css
h1 {
  font-size: 48px;
  line-height: 1.2;  /* 제목은 줄간을 더 좁게 */
}
```

제목은 **한 줄** 짜리가 대부분이라 `1.2~1.3` 이 적당합니다.

---

## ↔ text-align — 가로 정렬

```css
.left   { text-align: left;    }  /* 기본값 */
.center { text-align: center;  }
.right  { text-align: right;   }
.justify { text-align: justify; }  /* 양쪽 정렬 */
```

제목이나 버튼 텍스트는 `center`, 본문은 `left` 가 대부분입니다.

```css
.title {
  text-align: center;
}
```

---

## 🎯 text-decoration — 밑줄, 취소선 등

```css
.underline      { text-decoration: underline; }
.line-through   { text-decoration: line-through; }  /* 취소선 */
.none           { text-decoration: none; }
```

**자주 쓰는 용도**: `<a>` 의 기본 밑줄을 없애기.

```css
a {
  text-decoration: none;  /* 링크 밑줄 제거 */
  color: inherit;         /* 부모 색 물려받기 */
}

a:hover {
  text-decoration: underline;  /* 마우스 올리면 밑줄 */
}
```

**관례**: 네비게이션 메뉴의 링크는 밑줄이 거슬려서 대부분 `none` 으로 끕니다. 본문 안의 링크는 그대로 두는 경우가 많고요.

---

## 🔡 text-transform — 대소문자 변환

```css
.upper  { text-transform: uppercase;   }  /* 전부 대문자 */
.lower  { text-transform: lowercase;   }  /* 전부 소문자 */
.caps   { text-transform: capitalize;  }  /* 단어 첫 글자만 */
```

한국어에는 의미가 없지만, 영문 UI 에서 버튼 텍스트를 전부 대문자로 만들 때 종종 씁니다.

---

## 📏 letter-spacing — 글자 사이 간격

```css
h1 {
  letter-spacing: -0.02em;  /* 글자를 살짝 붙여서 타이트하게 */
}

.caps {
  letter-spacing: 0.1em;   /* 자간을 넓혀서 시원하게 */
}
```

한국어에서는 제목 폰트를 **약간 좁게** (`-0.02em` 정도) 하면 깔끔해 보이는 경우가 많습니다.

---

## 🔗 축약형 `font` 속성

```css
p {
  font: 16px/1.6 "Pretendard", sans-serif;
}
/* ↑ 아래와 같음 ↓ */
p {
  font-size: 16px;
  line-height: 1.6;
  font-family: "Pretendard", sans-serif;
}
```

한 줄로 줄여 쓸 수도 있지만, **가독성이 떨어져서** 초보 때는 분리해서 쓰는 걸 권합니다.

---

## 🎯 [templates/style.css](../templates/style.css) 의 텍스트 스타일 살펴보기

실제 프로젝트에서 어떻게 조직하는지 보여 주는 좋은 예입니다.

```css
/* 공통 베이스 */
body {
  font-family: "Pretendard", -apple-system, system-ui, sans-serif;
  color: var(--grey-900);
}

/* 재사용 가능한 텍스트 스타일 */
.text-title {
  font-size: 1.5rem;     /* 24px */
  font-weight: 600;
  line-height: 1.25;
}

.text-subtitle {
  font-size: 1rem;       /* 16px */
  font-weight: 600;
  line-height: 1.5;
}

.text-body {
  font-size: 0.875rem;   /* 14px */
  font-weight: 400;
  line-height: 1.4;
}

.text-caption {
  font-size: 0.75rem;    /* 12px */
  font-weight: 400;
  line-height: 1.25;
}
```

이걸 통해서:

- 제목용(title), 소제목(subtitle), 본문(body), 캡션(caption) 같은 **크기 단계** 를 **미리 정해 놓고** 재사용.
- HTML 에서는 `<h1 class="text-title">` 처럼 **조합** 하면 됨.

이걸 **타이포그래피 시스템(typography system)** 이라고 부릅니다. 규모 있는 디자인 시스템의 기본 요소예요.

---

## 🧪 지금 당장 해보기

### `index.html`

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>텍스트 스타일</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
    />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1 class="title">점심 뭐 먹지?</h1>
    <h2 class="subtitle">오늘의 추천 메뉴</h2>

    <article class="restaurant">
      <h3 class="restaurant__name">피양콩할마니</h3>
      <p class="restaurant__category">한식</p>
      <p class="restaurant__description">
        평양 출신의 할머니가 운영하시는 콩 전문점입니다.
        진한 국물과 담백한 두부 요리가 일품이에요.
        점심 시간엔 줄을 서서 기다려야 할 정도로 인기가 많습니다.
      </p>
      <a href="#">자세히 보기</a>
    </article>

    <p class="caption">© 2025 점심 뭐 먹지</p>
  </body>
</html>
```

### `style.css`

```css
:root {
  --primary-color: #ec4a0a;
  --text-color: #333;
  --text-light: #767676;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Pretendard", -apple-system, sans-serif;
  color: var(--text-color);
  padding: 40px;
  line-height: 1.6;
}

.title {
  font-size: 2rem;        /* 32px */
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 1.25rem;     /* 20px */
  font-weight: 500;
  color: var(--text-light);
  margin-bottom: 32px;
}

.restaurant {
  margin-bottom: 24px;
}

.restaurant__name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.restaurant__category {
  font-size: 0.875rem;   /* 14px */
  color: var(--primary-color);
  font-weight: 500;
  margin-bottom: 12px;
}

.restaurant__description {
  font-size: 0.9375rem;  /* 15px */
  color: var(--text-color);
  line-height: 1.7;
  margin-bottom: 8px;
}

a {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
}

a:hover {
  text-decoration: underline;
}

.caption {
  font-size: 0.75rem;
  color: var(--text-light);
  text-align: center;
  margin-top: 48px;
}
```

### 확인해 볼 것

- 제목(`.title`) 의 `letter-spacing: -0.02em` 을 지워 보세요. 자간이 어떻게 달라지나요?
- `.restaurant__description` 의 `line-height: 1.7` 을 `1.2` 로 바꿔 보세요. 읽기가 어때지나요?
- `Pretendard` 를 `serif` 로 바꿔 보세요. (body 의 font-family 에서) 전체 분위기가 달라지나요?

### 실험해 보기

1. 제목 색을 `var(--primary-color)` 로 바꿔 보세요.
2. `.restaurant__description` 에 `text-align: justify` 를 추가해 보세요. 차이가 보이나요?
3. `a:hover` 에 `color: #ff6b2b` 같은 **다른 색** 으로 변경하도록 바꿔 보세요.

---

## 📚 정리

| 속성 | 뜻 |
|---|---|
| font-family | 글꼴 (fallback 포함) |
| font-size | 글자 크기 |
| font-weight | 굵기 (400=normal, 700=bold) |
| font-style | 기울임(italic) |
| color | 글자 색 |
| line-height | 줄간격 (단위 없이 배수로) |
| text-align | 가로 정렬 |
| text-decoration | 밑줄/취소선 |
| letter-spacing | 자간 |

**가장 많이 쓰는 것만** 꼽으면: `font-family`, `font-size`, `font-weight`, `color`, `line-height`, `text-align`.

다음은 — display 와 position, 즉 **요소를 어떻게 배치할지** 👉 [05. display 와 position](./05-display-and-position.md)
