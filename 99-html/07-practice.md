# 07. 실습: templates 해부하기

지금까지 배운 모든 태그가 **실제 프로젝트에서 어떻게 조합되는지** 확인하는 단계입니다.
여기서는 [templates/index.html](../templates/index.html) 을 **한 블록씩 따라 읽으며** "왜 이 태그를 썼을까?" 를 스스로 설명해 봅니다.

---

## 🎯 목표

- 템플릿 HTML 의 **모든 태그** 를 이해하고 설명할 수 있다.
- 새로운 HTML 페이지를 봤을 때 **큰 구조부터 읽어 내려갈 수 있다.**
- 이 템플릿을 **맨땅에서 다시 짜 보기** 로 마무리한다.

---

## 🧱 1단계 — 큰 뼈대부터 보기

파일 맨 위부터 한번 봅시다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>점심 뭐 먹지</title>
    <link rel="stylesheet" href="style.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    ...
  </body>
</html>
```

### 스스로 설명해 보기

- `<!DOCTYPE html>` 이 뭘 선언하나요?
- `lang="ko"` 는 왜 있는지?
- `<meta charset="utf-8" />` 이 없으면 무슨 일이 생기나요?
- `<link rel="stylesheet" href="style.css" />` 는 지금까지 본 적 없죠? 이건 **CSS 파일을 연결** 하는 줄입니다. CSS 장에서 자세히 다룹니다.
- `<meta name="viewport" ...>` 는 **모바일에서 화면 크기에 맞게 그려지게** 해주는 설정입니다. 모바일 페이지에는 거의 필수.

모든 HTML 파일은 이 뼈대로 시작하고, `<body>` 안에만 실제 콘텐츠가 들어갑니다.

---

## 🏠 2단계 — body 의 큰 영역 나누기

`<body>` 를 **큰 덩어리** 만 보면 세 개입니다.

```html
<body>
  <header class="gnb">...</header>
  <main>...</main>
  <aside>...</aside>
</body>
```

### 왜 이렇게 나뉘었나?

- `<header>`: 페이지 맨 위 — 제목과 "음식점 추가" 버튼이 있는 상단바.
- `<main>`: 핵심 콘텐츠 — 카테고리 필터와 음식점 목록.
- `<aside>`: 본문과 분리된 영역 — 모달 두 개가 여기에 있음.

> 🤔 **왜 모달을 `<aside>` 에?**
> 모달은 "기본 흐름과 별개로 떠 있는 창" 이라서 `<main>` 에 넣으면 어색합니다.
> 본문과 **의미상 분리된** 추가 영역이니 `<aside>` 가 자연스러워요. (정답은 아니고, 하나의 관점입니다.)

---

## 👑 3단계 — `<header>` 속 보기

```html
<header class="gnb">
  <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
  <button type="button" class="gnb__button" aria-label="음식점 추가">
    <img src="./add-button.png" alt="음식점 추가">
  </button>
</header>
```

### 체크포인트

- 페이지 대표 제목이라 `<h1>` 사용 ✓
- `<button type="button">` — 기본 `submit` 이 아닌 일반 버튼으로 명시 ✓
- `<button>` 안에 `<img>` 가 있음 — 이미지 버튼이에요.
- `aria-label="음식점 추가"` 는 뭘까?
  - 버튼 안에 **텍스트가 없고 이미지만 있을 때**, 스크린 리더에게 "이 버튼의 이름은 '음식점 추가' 야" 라고 알려 주는 속성.
  - 이미지의 `alt="음식점 추가"` 도 있으므로 중복이지만 둘 다 해두는 게 안전한 관례.

### `class="gnb gnb__title text-title"` 같은 건?

이건 **CSS 를 위한 식별자** 입니다. HTML 의 역할과는 별개의 "꼬리표" 예요.
CSS 장에서 배울 테니 지금은 무시해도 됩니다.

---

## 🥘 4단계 — `<main>` 속 보기

```html
<main>
  <section class="restaurant-filter-container">
    <select name="category" id="category-filter" ...>
      <option value="전체">전체</option>
      ...
    </select>
  </section>

  <section class="restaurant-list-container">
    <ul class="restaurant-list">
      <li class="restaurant">...</li>
      <li class="restaurant">...</li>
      ...
    </ul>
  </section>
</main>
```

### 주목할 점

- 필터와 목록을 각각 다른 `<section>` 으로 분리. 각각이 **주제가 다른 영역** 이므로.
- 카테고리 필터는 `<select>` + `<option>` — 드롭다운 폼.
- 음식점 목록은 `<ul>` + `<li>` — 순서 없는 목록.

### `<li>` 하나를 확대해서 보면

```html
<li class="restaurant">
  <div class="restaurant__category">
    <img src="./category-korean.png" alt="한식" class="category-icon">
  </div>
  <div class="restaurant__info">
    <h3 class="restaurant__name text-subtitle">피양콩할마니</h3>
    <p class="restaurant__description text-body">평양 출신의 할머니가...</p>
  </div>
</li>
```

- 음식점 **이미지** 과 **텍스트 정보** 를 `<div>` 두 개로 나눠 놨습니다.
  이 `<div>` 들은 **CSS 레이아웃용** 으로, 의미보다는 배치를 위한 그룹이에요.
- 음식점 이름은 `<h3>` (페이지 `<h1>`, 모달 `<h2>` 아래 계층에 있으므로 `<h3>` 이 적절).
- 설명은 `<p>`.
- `category-icon` 이미지의 `alt` 는 "한식" — 이미지가 표현하는 **카테고리 이름**.

---

## 🪟 5단계 — `<aside>` 속 모달 보기

두 개의 모달이 있습니다.

### 5-1. 음식점 정보 모달

```html
<div class="modal modal--open">
  <div class="modal-backdrop"></div>
  <div class="modal-container">
    <h2 class="modal-title text-title">음식점 이름</h2>
    <div class="restaurant-info">
      <p class="restaurant-info__description text-body">음식점 소개 문구</p>
    </div>
    <div class="button-container">
      <button class="button button--primary text-caption">닫기</button>
    </div>
  </div>
</div>
```

- `<div class="modal-backdrop">` : 모달 뒤의 **어두운 배경**. 비어있지만 CSS 로 화면 전체를 덮는 색칠된 박스가 됩니다.
- `<div class="modal-container">` : 모달의 실제 **카드** 영역. 안에 제목, 내용, 닫기 버튼.
- `<h2>` : 페이지 `<h1>` 아래 위상의 제목.
- `<button>` : `type` 이 명시되지 않아서 기본값 `submit`. 주의해야 하는 부분입니다. (모달 밖에 `<form>` 이 없으므로 실제 영향은 없지만, 관례상 `type="button"` 을 붙이는 게 안전).

### 5-2. 음식점 추가 모달

```html
<div class="modal modal--open">
  <div class="modal-backdrop"></div>
  <div class="modal-container">
    <h2 class="modal-title text-title">새로운 음식점</h2>
    <form>
      <div class="form-item form-item--required">
        <label for="category text-caption">카테고리</label>
        <select name="category" id="category" required>...</select>
      </div>

      <div class="form-item form-item--required">
        <label for="name text-caption">이름</label>
        <input type="text" name="name" id="name" required>
      </div>

      <div class="form-item">
        <label for="description text-caption">설명</label>
        <textarea name="description" id="description" cols="30" rows="5"></textarea>
        <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
      </div>

      <div class="button-container">
        <button class="button button--primary text-caption">추가하기</button>
      </div>
    </form>
  </div>
</div>
```

- `<form>` 안에 `<select>`, `<input type="text">`, `<textarea>` 가 각각 `<label>` 과 짝지어 있습니다.
- `required` 가 필수 입력 표시.

### 🐞 버그를 찾아봅시다

이 템플릿에는 사실 **의도적이지 않아 보이는 버그 하나** 가 있습니다.

```html
<label for="category text-caption">카테고리</label>
```

`for` attribute 값은 **단 하나의 `id`** 여야 합니다. 그런데 `"category text-caption"` 처럼 두 단어가 들어가 있죠. `"text-caption"` 은 원래 class 였는데 실수로 `for` 안에 같이 들어가 버린 것 같습니다.
**올바른 형태는 `for="category"`** 입니다. 이런 건 실무에서도 자주 나오는 실수예요. 찾아서 고쳐 보는 것도 좋은 연습입니다.

---

## 🏁 최종 실습 — 빈 파일부터 다시 짜 보기

지금까지는 읽기만 했습니다. 이번엔 **진짜로 손으로 짜 보는** 단계예요.

### 규칙

1. 새 파일 `my-lunch.html` 을 만듭니다.
2. `templates/index.html` 을 **직접 보지 않고** 기억나는 대로 먼저 짜 봅니다.
3. 10~20분쯤 짜 보고 막히면 템플릿을 살짝 **열어서 확인** 합니다.
4. 다시 덮고, 나머지 이어서 짭니다.

### 최소 요구 사항

- `<header>` 에 페이지 제목과 "추가" 버튼
- `<main>` 에 카테고리 드롭다운과 음식점 목록 (최소 3개)
- `<aside>` 에 음식점 추가 폼이 있는 모달 하나

> 💡 CSS 는 아직 안 배웠으니 모양은 신경 쓰지 마세요.
> **HTML 구조만** 맞추는 것이 이번 연습의 목표입니다.

---

## ✅ 자가 평가

- [ ] `<!DOCTYPE html>` 부터 뼈대를 기억해서 쓸 수 있다.
- [ ] `<header>`, `<main>`, `<aside>`, `<footer>` 의 역할을 한 문장씩 설명할 수 있다.
- [ ] `<ul>` 과 `<ol>` 을 언제 각각 쓰는지 판단할 수 있다.
- [ ] `<label>` 과 `<input>` 을 `id` 로 연결할 수 있다.
- [ ] `<button>` 의 `type` 종류 세 개와 기본값을 기억하고 있다.
- [ ] `<img>` 에 `alt` 를 쓰는 이유 세 가지를 말할 수 있다.
- [ ] 의미 태그 vs `<div>` 를 선택하는 기준을 이해한다.

모두 체크된다면 HTML 파트는 졸업입니다. 👏
이제 **생김새를 바꾸는 도구** 인 CSS 로 넘어갑니다.

---

## 🚀 다음 단계

`99-css/` 폴더로 이동해 주세요.
- [99-css/README.md](../99-css/README.md) 부터 시작합니다.

HTML 은 "뼈대" 이고, CSS 는 "옷" 입니다. 뼈대가 튼튼해야 옷도 예쁘게 입을 수 있어요.
여기까지 잘 따라와 주셨습니다. 다음 폴더에서 만나요! 🎉
