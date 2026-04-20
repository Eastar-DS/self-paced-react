# 03. 링크와 이미지

## 🤔 왜 웹은 **"웹(web)"** 이라고 불릴까?

월드 와이드 웹(WWW) 이 세상에 처음 나왔을 때, 그 가장 큰 혁신은 단 하나였습니다.
바로 **"문서 사이를 클릭 한 번으로 이동할 수 있다"** 는 것.

이걸 **하이퍼링크(hyperlink)** 라고 부르고, 이 기능을 담당하는 태그가 바로 `<a>` 입니다.
**`<a>` 가 없으면 웹은 그냥 거미줄이 아니라 낱장의 문서 더미일 뿐** 이에요.
이 글에서는 그 `<a>` 와, 글만큼 중요한 `<img>` 를 배웁니다.

---

## 🔗 링크: `<a>`

```html
<a href="https://react.dev">React 공식 문서로 가기</a>
```

- `a` 는 "anchor(앵커, 닻)" 의 앞 글자.
- `href` 는 "hypertext reference" → **어디로 갈지의 주소**.
- 태그 사이에 있는 **텍스트** 는 사용자가 클릭할 **링크 글** 이 됩니다.

### `<a>` 에 쓸 수 있는 주소 종류

```html
<!-- 1) 외부 사이트로 (절대 경로, absolute URL) -->
<a href="https://react.dev">React</a>

<!-- 2) 같은 사이트 안의 다른 페이지 (상대 경로, relative path) -->
<a href="./about.html">소개 페이지</a>
<a href="/blog/first-post.html">블로그 첫 글</a>

<!-- 3) 같은 페이지 안의 특정 위치 (앵커, anchor) -->
<a href="#contact">연락처로 스크롤</a>

<!-- 4) 이메일 열기 -->
<a href="mailto:hello@example.com">이메일 보내기</a>

<!-- 5) 전화 걸기 (모바일에서 유용) -->
<a href="tel:010-1234-5678">전화 걸기</a>
```

> 🔑 **절대 경로 vs 상대 경로**
> - 절대 경로: `https://` 부터 시작하는 **완전한 주소**.
> - 상대 경로: **현재 파일 위치를 기준** 으로 한 주소.
>   - `./` : 지금 폴더
>   - `../` : 한 단계 위 폴더
>   - `/` : 사이트 최상위 폴더

### 새 탭에서 열기

```html
<a href="https://react.dev" target="_blank" rel="noopener noreferrer">React</a>
```

- `target="_blank"` → 새 탭에서 열기
- `rel="noopener noreferrer"` → **보안 장치**. 새 탭이 원래 탭을 마음대로 조작하지 못하게 막아 줍니다.

`target="_blank"` 만 단독으로 쓰지 말고 **꼭 `rel="noopener noreferrer"` 와 같이** 쓰는 것이 현대 웹의 관례예요.

### ❗ 링크 글 작성 팁

나쁜 예:
```html
더 알고 싶다면 <a href="...">여기</a> 를 클릭하세요.
```

좋은 예:
```html
<a href="...">React 공식 문서</a> 에서 더 알아보세요.
```

왜냐하면:
- 스크린 리더는 "링크만 훑어 보기" 기능을 제공하는데, "여기", "클릭" 같은 글자만 들리면 **어디로 가는 링크인지 알 수 없어요.**
- 검색 엔진도 링크 글을 보고 목적지 페이지의 주제를 판단합니다.

---

## 🖼 이미지: `<img>`

```html
<img src="cat.png" alt="까만 고양이 사진">
```

- `src` ("source") → 이미지 파일의 **주소**. 링크의 `href` 와 같은 역할.
- `alt` ("alternative text") → 이미지를 **글자로 대체 설명** 한 것.

### `alt` 는 왜 꼭 써야 할까?

1. **이미지가 안 뜰 때** 보조 설명으로 쓰입니다. (네트워크가 느리거나 파일이 잘못된 경우)
2. **스크린 리더** 가 이 글자를 소리로 읽어 줍니다.
3. **검색 엔진** 이 이미지의 내용을 이 글자로 인식합니다.

**`alt` 없이 `<img>` 만 쓰면 안 됩니다.** 웹 표준에서 `alt` 는 필수 attribute 예요.

### `alt` 에 뭐라고 써야 하지?

- **정보성 이미지** (상품 사진, 인물 사진 등): 그 이미지가 설명하는 내용을 적습니다.
  ```html
  <img src="apple.jpg" alt="빨간 사과 한 개">
  ```
- **장식용 이미지** (순수 디자인용, 의미 없는 배경): `alt=""` 처럼 **빈 문자열** 로 둡니다.
  ```html
  <img src="decoration-line.png" alt="">
  ```
  빈 `alt=""` 는 "이 이미지는 일부러 의미 없으니 스크린 리더는 건너뛰어라" 라는 신호입니다.
- **버튼 역할 이미지**: 그 버튼의 **동작** 을 적습니다.
  ```html
  <img src="close.png" alt="닫기">
  ```

### 이미지 크기

브라우저는 이미지를 **원본 크기로** 그립니다. 크기를 지정하고 싶으면:

```html
<img src="cat.png" alt="고양이" width="200" height="150">
```

- `width`, `height` 를 숫자로 쓰면 단위는 자동으로 `px`.
- **실무에서는 CSS 로 크기를 조절하는 게 훨씬 일반적** 입니다. 위 attribute 는 "이미지 원본 비율" 을 브라우저에 알려 줘서 레이아웃 튐(layout shift)을 막는 용도로 주로 씁니다.

---

## 🎯 [templates/index.html](../templates/index.html) 에서 찾아 보기

```html
<button type="button" class="gnb__button" aria-label="음식점 추가">
  <img src="./add-button.png" alt="음식점 추가">
</button>
```

`<img>` 가 `<button>` **안에** 들어가 있습니다.
이렇게 하면 이미지가 있는 버튼이 됩니다. 버튼의 **역할** 은 "음식점 추가" 이므로 그대로 `alt` 에 씁니다.

```html
<img src="./category-korean.png" alt="한식" class="category-icon">
```

카테고리 아이콘이 여러 개 있는데, 각각 `alt` 에 "한식", "중식", "일식" 처럼
**그 아이콘이 의미하는 카테고리 이름** 이 들어있죠. 시각장애인 사용자도 어떤 카테고리인지 알 수 있습니다.

---

## 🧪 지금 당장 해보기

같은 폴더에 이미지 파일 하나(예: `me.jpg`) 를 두고 `03-links.html` 을 만들어 보세요.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>링크와 이미지 연습</title>
  </head>
  <body>
    <h1>내 프로필</h1>

    <img src="me.jpg" alt="내 얼굴 사진" width="200">

    <h2>자기 소개</h2>
    <p>안녕하세요, 개발 공부 중입니다.</p>

    <h2>유용한 링크</h2>
    <p>
      <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
        React 공식 문서
      </a>
    </p>
    <p>
      <a href="https://developer.mozilla.org/ko/">MDN Web Docs (한국어)</a>
    </p>

    <h2>연락처</h2>
    <p>
      <a href="mailto:me@example.com">이메일 보내기</a>
    </p>
  </body>
</html>
```

### 확인해 볼 것

- 링크를 클릭하면 새 탭에서 react.dev 가 열리는지
- `mailto:` 링크를 클릭하면 메일 앱이 열리는지
- 이미지 파일명을 일부러 틀리게 바꿔서 저장해 보고, 브라우저가 **`alt` 를 어떻게 표시하는지** 봐 보세요.

### 도전 과제

1. `<a>` 태그 안에 `<img>` 를 넣어 보세요. **"이미지 링크"** (클릭하면 어디로 이동하는 이미지) 가 만들어집니다.
   ```html
   <a href="https://react.dev">
     <img src="react-logo.png" alt="React 공식 사이트">
   </a>
   ```
2. 같은 페이지 안 이동을 만들어 보세요.
   - `<h2 id="section-a">섹션 A</h2>`
   - 맨 위에 `<a href="#section-a">섹션 A 로 가기</a>`

---

## 📚 정리

| 태그/속성 | 역할 | 꼭 기억 |
|---|---|---|
| `<a href="...">` | 링크 | 주소는 절대/상대/앵커/mailto 등 |
| `target="_blank"` | 새 탭 열기 | `rel="noopener noreferrer"` 같이 쓰기 |
| `<img src="..." alt="...">` | 이미지 | `alt` 는 **필수** |
| `alt=""` | 장식 이미지 | 스크린 리더가 건너뛰게 함 |

다음은 사람 눈이 가장 잘 따라가는 구조 — 목록과 테이블 👉 [04. 목록과 테이블](./04-lists-and-tables.md)
