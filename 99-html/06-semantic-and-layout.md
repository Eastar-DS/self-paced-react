# 06. 의미(semantic)와 레이아웃

## 🤔 "의미 있는 태그" 가 왜 따로 필요할까?

지금까지 배운 태그로도 웬만한 건 다 만들 수 있습니다.
하지만 실제 페이지를 보면 큰 영역들이 있죠.
- 맨 위의 **헤더** (사이트 로고, 상단 메뉴)
- 가운데의 **메인 콘텐츠**
- 양 옆의 **사이드바**
- 맨 아래의 **푸터** (저작권, 연락처)

옛날 HTML 에는 이 "영역들을 나타내는 이름이 붙은 태그" 가 없었습니다.
그래서 모든 영역을 `<div>` 로 만들고 class 로 구분했어요.

```html
<div class="header">...</div>
<div class="main">...</div>
<div class="footer">...</div>
```

동작은 합니다. 하지만 문제가 있어요.

- 브라우저·검색엔진·스크린 리더 입장에서는 **전부 똑같은 `<div>`** 입니다. 구분할 수가 없음.
- 개발자가 다른 프로젝트로 이사갔을 때, class 이름이 `.header` 일 수도 `.gnb` 일 수도 `.top-bar` 일 수도 있으니 일관성이 없음.

HTML5 에서 이 문제를 해결하려고 **"이 영역의 역할" 을 이름으로 가진 태그들** 을 도입했습니다.
이걸 **semantic(의미 있는) 태그** 라고 부릅니다.

> 🔑 semantic 태그는 **눈에 보이는 동작이 `<div>` 와 거의 똑같습니다.**
> 하지만 브라우저·검색엔진·접근성 도구에게는 **전혀 다른 신호** 를 줍니다.
> 즉 "사람의 눈에는 똑같지만, 기계에게는 훨씬 친절한 HTML" 을 만드는 도구예요.

---

## 🗺 페이지의 큰 구조: semantic 태그 6종

### `<header>` — 사이트나 섹션의 **머리**

페이지의 최상단에 로고·사이트 이름·상단 메뉴가 들어가는 부분.

```html
<header>
  <h1>점심 뭐 먹지</h1>
  <button>음식점 추가</button>
</header>
```

`<header>` 는 페이지 하나당 하나만 있는 게 아니라, **섹션 안에도 들어갈 수 있습니다.**
예를 들어 블로그 글 하나 안에도 "글의 제목과 작성일" 부분에 `<header>` 를 쓸 수 있어요.

### `<nav>` — **내비게이션** (메뉴)

사이트의 주요 메뉴 링크 묶음.

```html
<nav>
  <ul>
    <li><a href="/">홈</a></li>
    <li><a href="/about">소개</a></li>
    <li><a href="/contact">연락처</a></li>
  </ul>
</nav>
```

보통 `<ul>` 로 묶인 링크 목록이 들어갑니다. "이건 이 사이트의 주요 내비게이션이야" 라는 신호예요.

### `<main>` — 페이지의 **주요 콘텐츠**

페이지마다 **정확히 한 개** 만 있어야 하는 태그입니다.
헤더, 사이드바, 푸터를 **제외한 본체 콘텐츠** 가 여기 들어갑니다.

```html
<main>
  <!-- 이 페이지의 핵심 내용 -->
</main>
```

스크린 리더 사용자는 **"메인 콘텐츠로 바로 점프"** 기능을 쓸 수 있습니다.
`<main>` 이 있어야 이 기능이 동작해요.

### `<section>` — 주제가 있는 **구획**

한 가지 주제로 묶인 영역을 나타냅니다.
"이건 한 덩어리의 이야기야" 라는 신호.

```html
<main>
  <section>
    <h2>오늘의 추천</h2>
    <p>...</p>
  </section>

  <section>
    <h2>인기 음식점</h2>
    <p>...</p>
  </section>
</main>
```

관례: **각 `<section>` 은 제목 (`<h2>` 등) 을 하나 가지는 것이 일반적** 입니다.

### `<article>` — **독립적인 글 한 조각**

그 자체로 **혼자 떼어 내도 말이 되는** 콘텐츠일 때 씁니다.
- 블로그 포스트 하나
- 뉴스 기사 하나
- 댓글 하나

```html
<article>
  <h2>오늘의 맛집: 피양콩할마니</h2>
  <p>평양 출신의 할머니가...</p>
</article>
```

### `<section>` vs `<article>` 헷갈려요

판단법: **"이걸 잘라내서 다른 페이지에 붙여도 말이 되나?"**
- 네 → `<article>`
- 아니요 (맥락이 있어야 함) → `<section>`

### `<aside>` — **곁다리 콘텐츠**

본문과 직접 관련은 있지만 **떨어져도 본문은 말이 되는** 내용.
- 사이드바의 "추천 글" 목록
- 본문 옆의 용어 설명
- 광고

```html
<aside>
  <h3>관련 글</h3>
  <ul>
    <li><a href="...">한식집 추천</a></li>
  </ul>
</aside>
```

> 🔗 React 미션의 템플릿에서는 **모달(음식점 추가, 정보 모달) 을 `<aside>` 안에** 넣어 뒀습니다.
> 본문과 따로 노는 영역이라서 의미상 `<aside>` 가 적절하다고 판단한 거예요.

### `<footer>` — **발** (저작권, 연락처)

페이지나 섹션의 맨 아래에 쓰는 메타 정보.

```html
<footer>
  <p>© 2025 점심 뭐 먹지</p>
</footer>
```

---

## 📐 전체 조합 예시

```html
<body>
  <header>
    <h1>내 블로그</h1>
    <nav>
      <ul>
        <li><a href="/">홈</a></li>
        <li><a href="/posts">글 목록</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <header>
        <h2>React 공부 시작</h2>
        <p>2025-04-20</p>
      </header>
      <p>오늘부터 React 공부를 시작했다...</p>
    </article>

    <aside>
      <h3>이 블로그에 대하여</h3>
      <p>개발 공부 기록장입니다.</p>
    </aside>
  </main>

  <footer>
    <p>© 2025 내 블로그</p>
  </footer>
</body>
```

---

## 🧱 `<div>` 와 `<span>` — **의미 없는 포장지**

의미 태그로 딱 맞는 게 없을 때 쓰는 **중립 태그** 두 개.

| 태그 | 특징 |
|---|---|
| `<div>` | **블록(block)** — 기본적으로 가로 전체를 차지하고, 위아래로 쌓임 |
| `<span>` | **인라인(inline)** — 딱 내용 크기만큼만 차지하고, 옆에 붙음 |

```html
<div>나는 한 줄 전체를 차지해요.</div>
<div>나도 새 줄부터 시작해요.</div>

<p>
  문장 중간에 <span>span 은 이렇게</span> 흐름을 안 깨고 들어와요.
</p>
```

### 언제 `<div>` / `<span>` 을 쓰나?

- semantic 태그 (`<section>`, `<article>` 등) 중 어느 것도 의미가 맞지 않음
- 순수하게 **CSS 스타일을 적용하기 위한 그룹핑** 이 필요함

의미 태그와 div 를 고를 때 순서:
1. **의미 태그로 딱 맞는 게 있나?** (header, nav, main, section, article, aside, footer 등) → 있으면 그걸 사용
2. 없으면 `<div>` / `<span>`

### 💡 `<div>` 남용은 나쁘지만, 무리한 semantic 집착도 나쁘다

"모든 `<div>` 를 `<section>` 으로 바꾸자!" 같은 건 오히려 나쁜 HTML 을 만듭니다.
**의미가 없는 영역** 을 억지로 semantic 태그로 만들면, 오히려 구조가 혼란스러워져요.
스타일을 위해 나눠야 할 뿐이라면 당당히 `<div>` 를 쓰면 됩니다.

---

## 🎯 [templates/index.html](../templates/index.html) 에서 찾아 보기

템플릿 전체 구조를 뼈대만 보면 이렇습니다.

```html
<body>
  <header class="gnb">...</header>    <!-- 상단바 -->

  <main>
    <section class="restaurant-filter-container">...</section>
    <section class="restaurant-list-container">
      <ul class="restaurant-list">...</ul>
    </section>
  </main>

  <aside>
    <div class="modal">...</div>    <!-- 음식점 정보 모달 -->
    <div class="modal">...</div>    <!-- 음식점 추가 모달 -->
  </aside>
</body>
```

지금까지 배운 내용이 **어떻게 조합되어 하나의 앱 골격** 이 되는지 이제 읽을 수 있죠?
- `<header>` : 상단바
- `<main>` : 필터 + 음식점 목록
- `<aside>` : 모달 (본문과 별개)
- `<div class="modal">` : 의미 태그로 딱 맞는 게 없어서 `<div>` 를 사용

---

## 🧪 지금 당장 해보기

`06-layout.html` 을 만들어 보세요. 지금까지 배운 모든 것을 합쳐 봅니다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>내 블로그</title>
  </head>
  <body>
    <header>
      <h1>내 블로그</h1>
      <nav>
        <ul>
          <li><a href="/">홈</a></li>
          <li><a href="/posts">글 목록</a></li>
          <li><a href="/about">소개</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section>
        <h2>최근 글</h2>

        <article>
          <header>
            <h3>React 공부 시작</h3>
            <p>2025-04-20</p>
          </header>
          <p>오늘부터 React 공부를 시작했다. 우선 HTML 부터...</p>
          <p>
            <a href="/posts/react-start">전체 글 보기</a>
          </p>
        </article>

        <article>
          <header>
            <h3>오늘의 맛집: 피양콩할마니</h3>
            <p>2025-04-18</p>
          </header>
          <p>평양 출신의 할머니가 운영하시는 비지 전문점입니다.</p>
          <p>
            <a href="/posts/restaurant-1">전체 글 보기</a>
          </p>
        </article>
      </section>

      <aside>
        <h3>블로그 안내</h3>
        <p>개발 공부 기록용 블로그입니다.</p>
        <h4>태그</h4>
        <ul>
          <li>#React</li>
          <li>#HTML</li>
          <li>#CSS</li>
        </ul>
      </aside>
    </main>

    <footer>
      <p>© 2025 내 블로그</p>
      <p>
        연락: <a href="mailto:me@example.com">me@example.com</a>
      </p>
    </footer>
  </body>
</html>
```

### 확인해 볼 것

- 의미 태그들은 **눈으로 보기엔 `<div>` 와 똑같이** 그려집니다. 아직 CSS 가 없으니까요.
- 페이지 소스에서 `<header>` / `<main>` / `<footer>` 가 명확히 구분되어 있는지 읽어 보기.

### 도전 과제

1. 이 페이지를 **Chrome 개발자 도구 → Elements 탭** 에서 열어 보세요.
   HTML 트리 구조가 어떻게 그려지는지 눈으로 확인해 보세요.
2. 크롬 확장 프로그램 **"Accessibility Tree"** 같은 도구로 보면, semantic 태그들이
   "landmark(랜드마크)" 로 표시되는 걸 볼 수 있습니다. 한 번 찾아보세요.

---

## 📚 정리

| 태그 | 의미 | 예시 |
|---|---|---|
| `<header>` | 머리 영역 | 사이트 상단, 글 제목 |
| `<nav>` | 내비게이션 | 메인 메뉴 |
| `<main>` | 주 콘텐츠 | 페이지당 하나 |
| `<section>` | 주제 구획 | 한 섹션 |
| `<article>` | 독립 콘텐츠 | 블로그 글, 댓글 |
| `<aside>` | 곁다리 | 사이드바, 모달 |
| `<footer>` | 발 영역 | 저작권 |
| `<div>` | 의미 없는 블록 | 스타일 용 |
| `<span>` | 의미 없는 인라인 | 스타일 용 |

**의미 태그가 맞으면 의미 태그, 아니면 div/span.** 이 한 문장이면 충분합니다.

다음은 실전 — [templates/index.html](../templates/index.html) 을 한 줄 한 줄 해부해 봅시다 👉 [07. 실습: templates 해부하기](./07-practice.md)
