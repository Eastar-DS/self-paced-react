# 99-CSS. 웹 페이지에 옷 입히기

> 이 폴더는 **HTML 은 어느 정도 익혔다** 는 가정에서 시작합니다.
> 아직 HTML 이 낯설다면 [99-html/](../99-html/README.md) 을 먼저 보고 오세요.

## 🤔 CSS 가 없으면 어떤 일이 벌어질까?

HTML 만으로 짠 페이지를 브라우저에서 열면, 흰 배경에 검은 글씨, 파란 링크 같은 **브라우저 기본 스타일** 로만 그려집니다.
그게 전부예요. 레이아웃도, 색상도, 간격도 손댈 수 없습니다.

네이버·유튜브·카카오톡 웹이 **지금 모양** 으로 보이는 이유는 전부 CSS 덕분입니다.
CSS 가 없다면 웹은 1990년대 위키피디아처럼 전부 똑같은 흰 바탕에 검은 글씨만 늘어놓은 모습일 거예요.

CSS 는 **Cascading Style Sheets** 의 줄임말입니다.
"쌓여서 적용되는 스타일 시트" 라는 뜻이에요. "쌓여서" 가 무슨 의미인지는 곧 배웁니다.

---

## 🎯 이 자료의 목표

- `className` 으로 연결된 CSS 가 HTML 에 **어떻게 적용되는지** 이해한다.
- 가장 자주 쓰이는 속성들 — `color`, `font-size`, `padding`, `margin`, `display`, `flex` — 을 자유롭게 쓴다.
- [templates/style.css](../templates/style.css) 를 한 줄씩 읽을 수 있다.
- 디자인 시안을 보고 "이건 flexbox 로 짜야지", "이건 position 이 필요하네" 같은 판단을 한다.

### ❌ 다루지 않는 것

- CSS-in-JS (styled-components, emotion 등)
- Sass/SCSS 같은 전처리기
- CSS Grid 깊이 있는 주제 (flexbox 만 확실히)
- 애니메이션 심화 (`@keyframes` 등은 맛보기만)
- Tailwind 등 유틸리티 프레임워크

## 🦮 목차

1. [CSS 기본 — 연결하는 법, 문법, 우선순위](./01-css-basics.md)
2. [선택자 (Selector)](./02-selectors.md) — 원하는 요소만 골라 스타일 주기
3. [박스 모델과 단위](./03-box-model.md) — 모든 것은 박스다
4. [텍스트 스타일링](./04-text-styling.md) — 글자 크기, 색, 굵기, 행간
5. [display 와 position](./05-display-and-position.md) — 블록·인라인·포지셔닝
6. [Flexbox](./06-flexbox.md) — 현대 레이아웃의 주력 도구
7. [인터랙션 스타일](./07-interactions.md) — hover, focus, transition, 반응형
8. [실습: templates 해부하기](./08-practice.md) — [templates/style.css](../templates/style.css) 를 한 줄씩

## ⏱ 권장 학습 시간

**총 8~12 시간** 을 권장합니다. HTML 보다 **좀 더 오래 걸립니다.**
특히 박스 모델, display, flexbox 는 한 번에 이해하기 어려우니, **직접 수치를 바꿔 보며** 익혀야 합니다.

## 🛠️ 학습 환경 준비

HTML 폴더에서 만든 파일 옆에 CSS 파일을 추가로 만들면 됩니다.

```
my-practice/
├── index.html
└── style.css
```

`index.html` 의 `<head>` 안에 이 한 줄을 넣으면 CSS 파일이 연결됩니다.

```html
<link rel="stylesheet" href="style.css" />
```

`style.css` 에 아무 스타일이나 써 보세요.

```css
body {
  background-color: lightblue;
}
```

저장하고 브라우저에서 `index.html` 을 새로고침 — 배경이 하늘색으로 바뀌면 성공입니다! 🎉

## 💡 공부 팁

CSS 는 **읽기만 해서는 절대 실력이 늘지 않습니다.**
- 같은 속성 값을 여러 번 바꿔 보세요. `padding: 10px` → `20px` → `50px` 처럼.
- 숫자 단위를 바꿔 보세요. `px`, `em`, `%`.
- **개발자 도구(F12 → Elements 탭)** 에서 요소를 클릭하고, 오른쪽에 뜨는 CSS 값을 **그 자리에서 수정** 해 보세요. 이게 최고의 실험 공간입니다.

## 🔗 참고 자료

- [MDN CSS 첫 걸음](https://developer.mozilla.org/ko/docs/Learn/CSS) — 한국어 공식 튜토리얼
- [CSS Tricks - A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) — Flexbox 의 레전드 자료
- [Flexbox Froggy](https://flexboxfroggy.com/#ko) — 게임으로 Flexbox 배우기

준비됐다면 첫 챕터로 🚀 👉 [01. CSS 기본](./01-css-basics.md)
