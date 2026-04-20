# 99-HTML. 웹 페이지의 뼈대 만들기

> 이 폴더는 **HTML 을 전혀 모르는 상태** 에서 시작해, 이 레포의 React 미션을 수행할 수 있는 수준까지 끌어올리는 것을 목표로 합니다.

## 🤔 왜 HTML 부터 공부해야 할까?

React 로 만드는 앱도 결국 **브라우저에 HTML 을 띄우기 위한 도구** 입니다.
JSX 문법이 `<div>`, `<button>`, `<form>` 처럼 HTML 처럼 생긴 것도 그 때문이에요.
React 가 하는 일을 한 줄로 요약하면 이렇게 말할 수 있습니다.

> **"시간이 지나도 틀어지지 않는 HTML 을 JavaScript 로 만들어 주는 라이브러리"**

그러니까 HTML 이 뭔지, 어떤 태그들이 어떤 의미를 가지고 있는지 **모르면** React 를 배워도
"그냥 React 가 이렇게 하라고 해서 했어요" 수준에서 멈춥니다.
반대로 HTML 을 알고 있으면,
- "이 부분은 `<section>` 이 맞을까 `<div>` 가 맞을까"
- "이건 `<button>` 이어야지 `<a>` 면 접근성이 깨지겠네"
- "폼에서 `label` 을 `input` 에 어떻게 연결하지?"

같은, **코드 뒤의 의미 있는 질문** 을 스스로 던질 수 있게 됩니다.
React 는 **HTML 위에 올라가는 한 층** 일 뿐입니다. 아래층이 튼튼해야 위층이 흔들리지 않아요.

## 🎯 이 자료의 목표

- 브라우저가 HTML 을 어떻게 "읽어서 화면에 그리는지" 감을 잡는다.
- 실제 프로젝트에 흔히 쓰이는 태그 **20~30 개 정도** 를 자신 있게 쓴다.
- [templates/index.html](../templates/index.html) 의 내용을 **처음부터 끝까지 이해** 할 수 있다.
- 작은 페이지를 보고 "HTML 로 어떻게 짤지" 머릿속으로 그려낼 수 있다.

### ❌ 다루지 않는 것

- SEO 최적화, 메타 태그 고급 활용
- HTML5 의 모든 태그 (실무에서 거의 안 쓰는 것들)
- 접근성(accessibility) 의 깊은 주제 — 기초만 다룹니다
- SVG, Canvas, Web Component 같은 고급 주제

## 🦮 목차

순서대로 진행하는 것을 추천합니다.
각 챕터는 **왜 이게 필요한가 → 어떻게 쓰는가 → 직접 해보기** 순서로 구성되어 있습니다.

1. [HTML 기본 구조와 용어](./01-html-basics.md) — HTML 이 뭐고, tag / element / attribute 가 뭔지
2. [텍스트를 표현하는 태그들](./02-text.md) — heading, paragraph, span, strong 등
3. [링크와 이미지](./03-links-and-images.md) — `<a>`, `<img>`
4. [목록과 테이블](./04-lists-and-tables.md) — `<ul>`, `<ol>`, `<table>`
5. [폼(Form)](./05-forms.md) — `<form>`, `<input>`, `<label>`, `<button>`, `<select>`, `<textarea>`
6. [의미(semantic)와 레이아웃](./06-semantic-and-layout.md) — `<header>`, `<main>`, `<section>`, `<div>` 등
7. [실습: templates 해부하기](./07-practice.md) — [templates/index.html](../templates/index.html) 을 한 줄씩 읽어보기

## ⏱ 권장 학습 시간

**총 5~7 시간** 정도를 잡으시면 적당합니다.
한 번에 몰아서 하지 말고 **1~2 챕터씩 나눠서** 진행하는 걸 추천해요.
쉬는 시간에 직접 HTML 파일을 만들어서 태그를 하나씩 써 보는 것이 진짜 학습입니다.

## 🛠️ 학습 환경 준비

별다른 준비물이 거의 없습니다.

1. 아무 코드 에디터 (VS Code 추천)
2. 아무 웹 브라우저 (Chrome 추천)
3. 파일 하나 — `practice.html` 같은 이름으로 만들고, 브라우저로 **더블 클릭하면 바로 열립니다**.

```html
<!-- practice.html 에 이 내용을 써 보세요 -->
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>내 첫 페이지</title>
  </head>
  <body>
    <h1>안녕, HTML</h1>
  </body>
</html>
```

저장하고 브라우저로 열면 "안녕, HTML" 이라는 큰 글씨가 보일 거예요.
**이렇게 직접 만져 보는 것이 이 자료를 활용하는 가장 좋은 방법입니다.**

## 🔗 참고 자료

- [MDN Web Docs (한국어)](https://developer.mozilla.org/ko/) — HTML/CSS/JS 의 공식 레퍼런스. 궁금한 태그가 있으면 여기서 검색.
- [생활코딩 HTML](https://opentutorials.org/course/3084) — 한국어 입문 영상

> 💡 **학습 팁**: 이 문서를 그냥 읽지 말고, 각 예제를 **직접 타이핑해서 브라우저에 띄워 보세요.**
> 손으로 치면서 "앗, 이건 뭐지?" 하고 삼천 번쯤 검색해 보는 것이 최고의 공부입니다.