# 01. CSS 기본 — 연결하는 법, 문법, 우선순위

## 🤔 CSS 는 어떻게 HTML 에 붙는가?

HTML 은 **구조**, CSS 는 **모양** 이라고 했습니다.
그런데 실제로 "어떻게 연결되는지" 를 보지 않으면 감이 안 잡히죠.

CSS 를 HTML 에 붙이는 방법은 **세 가지** 가 있습니다. 실무에서는 세 번째 방법 하나만 거의 씁니다.
그 이유까지 같이 볼게요.

---

## 🔌 CSS 를 HTML 에 붙이는 3가지 방법

### 1) 인라인(inline) 스타일 — `style` attribute

```html
<p style="color: red; font-size: 20px;">빨간 글씨</p>
```

HTML 태그의 `style` attribute 에 **직접** 스타일을 씁니다.

**장점**: 간단해요.

**단점**: 치명적입니다.
- 같은 스타일을 여러 `<p>` 에 주려면 **매번 복사-붙여넣기** 를 해야 함.
- 나중에 "전체 빨간 글씨를 파란 글씨로" 바꾸려면 **모든 태그를 다 찾아서** 수정해야 함.
- HTML 에 스타일이 섞여서 **코드가 지저분** 해짐.

> 🔑 React 에서 `style={{ color: 'red' }}` 로 쓰는 것도 이 인라인 방식의 변형입니다.
> HTML 전통의 관례에서는 **피하라고 권하는 방법** 이고, React 에서도 "값이 JavaScript 변수에 의존할 때만" 쓰라는 것이 정석입니다.

### 2) 내부(internal) 스타일 — `<style>` 태그

```html
<head>
  <style>
    p {
      color: red;
      font-size: 20px;
    }
  </style>
</head>
<body>
  <p>이제 p 태그는 전부 빨간 글씨야.</p>
</body>
```

`<head>` 안에 `<style>` 태그를 두고, 그 안에 CSS 를 씁니다.

**장점**: 같은 스타일을 반복 안 써도 됨.

**단점**:
- **이 HTML 파일** 에서만 유효. 다른 페이지가 같은 스타일을 쓰려면 또 복사.
- HTML 과 CSS 가 여전히 한 파일에 섞여 있음.

### 3) 외부(external) 스타일 — `.css` 파일 + `<link>` ⭐ **권장**

CSS 를 별도의 `.css` 파일로 만들고, HTML 에서 불러옵니다.

**style.css**
```css
p {
  color: red;
  font-size: 20px;
}
```

**index.html**
```html
<head>
  <link rel="stylesheet" href="style.css" />
</head>
```

**장점**:
- HTML 과 CSS 가 **완전히 분리** 됨. 역할이 명확.
- **여러 페이지** 가 같은 CSS 파일을 공유 가능.
- 브라우저가 CSS 파일을 **캐시** 하므로 두 번째 방문이 빨라짐.

> 🔑 **실무는 99% 이 방법** 을 씁니다. 위의 templates/index.html 에도 `<link rel="stylesheet" href="style.css" />` 가 있죠.

---

## 📝 CSS 문법 해부

가장 기본이 되는 CSS 코드 하나를 뜯어 봅시다.

```css
p {
  color: red;
  font-size: 20px;
}
```

이 구조의 이름들을 하나씩 배워 둡시다.

- `p` → **선택자(selector)**. "어떤 요소에 스타일을 적용할지"
- `{ ... }` → **선언 블록(declaration block)**. 스타일을 담는 중괄호.
- `color: red;` → **선언(declaration) 한 개**. `속성(property): 값(value);` 구조.
- `color` → **속성(property)**
- `red` → **값(value)**
- `;` → 선언 하나의 **끝**. 여러 선언을 이어 쓸 때 꼭 필요.

### 여러 선언을 한 번에

```css
p {
  color: red;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
```

**한 선택자에 여러 속성** 을 줄 수 있어요. 각 선언은 `;` 로 구분합니다.

### 여러 선택자에 같은 스타일

```css
h1, h2, h3 {
  color: navy;
}
```

쉼표로 선택자를 나열하면 "이 모든 요소에 같은 스타일" 을 줄 수 있습니다.

### 주석

```css
/* 이건 CSS 주석입니다. 브라우저가 무시해요. */
p {
  color: red; /* 이 한 줄에 대한 설명도 가능 */
}
```

---

## 🌊 "Cascading" — 왜 쌓여서 적용된다는 걸까?

CSS 의 C 는 "Cascading(폭포처럼 쌓이는)" 의 약자예요.
이게 **CSS 가 어려워 보이는 가장 큰 이유** 중 하나입니다. 하지만 한 번 이해하면 어렵지 않아요.

한 요소에 **여러 스타일 규칙이 동시에 맞을 때**, CSS 는 특정한 우선순위로 어떤 걸 적용할지 결정합니다.

### 예를 들어

```css
p {
  color: blue;
}
p {
  color: red;
}
```

같은 `<p>` 를 가리키는 규칙이 두 개예요. 어떤 색이 될까요?

**빨강** 이 됩니다. 이유: **나중에 쓴 규칙이 이깁니다.**

이게 Cascade 의 가장 단순한 예시예요.

### 하지만 항상 "나중이 이기는" 건 아닙니다

```css
p {
  color: red;
}
.highlight {
  color: blue;
}
```

```html
<p>그냥 p</p>
<p class="highlight">하이라이트된 p</p>
```

두 번째 `<p>` 는 무슨 색이 될까요?
- 순서대로면 `.highlight` 가 나중에 왔으니 파랑이 이길 것 같은데,
- 실제로도 파랑입니다. 이 경우엔 순서 덕이 아니라 **선택자의 구체성(specificity)** 덕이에요.

### 우선순위 규칙 요약 (지금은 감만 잡기)

CSS 가 여러 규칙 중 어떤 것을 적용할지 정하는 순서:

1. **Importance**: `!important` 가 붙었는가? (거의 쓰지 마세요)
2. **Specificity(구체성)**: 더 **구체적인** 선택자가 이김.
   - `id` > `class` > `tag`
   - 예: `#main > .card > p` 는 `.card p` 보다 구체적.
3. **Source order(순서)**: 같은 구체성이면 **나중에 쓴 것** 이 이김.

지금은 "이런 게 있다" 만 알고, 다음 장 [02. 선택자](./02-selectors.md) 에서 자세히 배웁니다.

---

## 🛡 브라우저 기본 스타일(User Agent Stylesheet)

아무 CSS 없이 HTML 만 써도 `<h1>` 은 크고, `<a>` 는 파랗고, `<button>` 은 버튼 모양이죠.
이건 **브라우저가 기본으로 가진 스타일시트** 덕분입니다.

이걸 알면 좋은 이유:
- 브라우저마다 **기본값이 조금씩 달라서** 사파리/크롬/파이어폭스에서 결과가 약간 다를 수 있음.
- 내가 짠 CSS 가 **브라우저 기본값을 덮어쓰는** 것임을 이해해야 함.
- 실무에서는 거의 모든 프로젝트가 **맨 앞에 "모든 걸 리셋" 하는 규칙** 을 둡니다.

[templates/style.css](../templates/style.css) 맨 위의 이 부분이 바로 그거예요:

```css
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

ul,
li {
  list-style: none;
}
```

- `*` 는 **모든 요소** 를 가리키는 선택자.
- 모든 요소의 기본 `padding`/`margin` 을 0으로 리셋.
- `<ul>`/`<li>` 의 기본 불릿(•) 을 없앰.

**이걸 왜 하나**: 브라우저마다 다른 기본값을 무력화해서 **어디서든 똑같이** 보이게 하기 위해서입니다.

---

## 🧪 지금 당장 해보기

두 개의 파일을 만들어 봅시다.

### `index.html`

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>CSS 첫걸음</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>안녕 CSS</h1>
    <p>이 문단은 기본 CSS 로 꾸며진다.</p>
    <p class="highlight">이 문단만 특별하게.</p>
    <p id="special">이 문단은 id 로 지정됨.</p>
  </body>
</html>
```

### `style.css`

```css
body {
  background-color: #f5f5f5;
  font-family: sans-serif;
}

h1 {
  color: darkblue;
}

p {
  color: gray;
  font-size: 18px;
}

.highlight {
  color: orange;
  font-weight: bold;
}

#special {
  color: red;
  text-decoration: underline;
}
```

저장하고 HTML 파일을 브라우저로 열어 보세요.

### 확인해 볼 것

- 세 개의 `<p>` 가 각기 다른 색/스타일로 보이나요?
- `highlight` 클래스와 `special` id 가 각각 어떤 구문으로 지정되는지 잘 보세요.
  - `.highlight` ← 클래스는 점(`.`)
  - `#special` ← id 는 샵(`#`)

### 실험해 보기

1. `.highlight` 보다 **아래에** `p { color: black; }` 를 추가해 보세요.
   - `.highlight` 는 여전히 주황색인가요? (구체성 덕분)
2. `#special` 보다 **위에** `#special { color: green; }` 를 하나 더 써 보세요.
   - 어떤 색이 이기나요? (순서 덕분)
3. 개발자 도구(F12) → Elements 탭 → 오른쪽의 Styles 패널에서,
   **취소선(취소선)** 으로 그어진 속성이 있는지 찾아 보세요. 그게 바로 "이 규칙은 이겼다/졌다" 를 브라우저가 보여 주는 것입니다.

---

## 📚 정리

| 개념 | 뜻 |
|---|---|
| 외부 CSS | 별도 파일 → `<link>` 로 불러옴 (실무 기본) |
| selector | 어떤 요소에 적용할지 |
| property: value; | 어떤 스타일을 줄지 |
| Cascade | 여러 규칙이 겹칠 때 우선순위로 선택 |
| Specificity | 선택자의 구체성. id > class > tag |
| User Agent Stylesheet | 브라우저가 가진 기본 스타일 |

다음으로 — 어떤 요소를 어떻게 "골라서" 스타일을 줄지 👉 [02. 선택자](./02-selectors.md)
