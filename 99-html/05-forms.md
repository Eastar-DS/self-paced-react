# 05. 폼(Form)

## 🤔 왜 폼이 중요한가?

웹에서 **사용자가 정보를 입력하는 거의 모든 곳** 이 폼입니다.
- 로그인 페이지의 아이디/비밀번호 입력
- 회원가입의 이름·이메일·성별 선택
- 검색창의 검색어 입력
- 댓글 창의 내용 입력
- 이 레포 React 미션의 "음식점 추가" 모달

React 의 4단계 미션이 "폼 UI 구현하기: controlled vs uncontrolled" 인 이유가 여기 있습니다.
**React 에서 가장 헷갈리는 부분 중 하나가 바로 폼** 이라, HTML 차원에서 탄탄하게 이해하지 못하면 React 에서 훨씬 더 헤매게 됩니다.

---

## 🏠 감싸개: `<form>`

관련된 입력 요소들을 **한 덩어리로 묶는** 컨테이너입니다.

```html
<form>
  <!-- 여기 안에 input, button 등이 들어감 -->
</form>
```

`<form>` 태그 자체는 화면에 아무것도 안 그립니다. 역할은 "이 안의 값들이 **한 세트** 로 서버에 보내진다" 는 의미 표시예요.

### `action`, `method`

```html
<form action="/api/restaurants" method="POST">
  ...
</form>
```

- `action` : 폼을 제출(submit) 했을 때 **어디로 데이터를 보낼지** 의 주소.
- `method` : **어떻게 보낼지** (`GET` / `POST` 가 가장 흔함).

> 💡 전통적인 HTML 만으로도 서버에 데이터를 보낼 수 있도록 이 기능이 있습니다.
> 하지만 React 에서는 **JavaScript 로 직접 제출을 처리** 하는 것이 일반적이라,
> `action` 을 쓰지 않고 `onSubmit` 같은 이벤트를 씁니다. 지금은 "이런 게 있다" 정도만 알고 넘어가세요.

---

## ⌨️ 한 줄 입력: `<input>`

폼에서 가장 자주 쓰이는 태그입니다.
`type` attribute 에 따라 **완전히 다른 모양** 으로 변신해요.

```html
<input type="text">        <!-- 일반 텍스트 -->
<input type="password">    <!-- 별표(*)로 가려지는 비밀번호 -->
<input type="email">       <!-- 이메일. 모바일에서 @ 키보드 자동 -->
<input type="number">      <!-- 숫자만 -->
<input type="tel">         <!-- 전화. 모바일에서 숫자 키보드 자동 -->
<input type="date">        <!-- 날짜 선택기 -->
<input type="checkbox">    <!-- 체크박스 -->
<input type="radio">       <!-- 라디오 버튼 -->
<input type="file">        <!-- 파일 업로드 -->
<input type="submit">      <!-- 폼 제출 버튼 -->
```

**같은 `<input>` 태그지만 `type` 에 따라 다른 UI 와 다른 동작** 을 하게 됩니다.
모바일 브라우저는 `type="email"` 이면 `@` 키가 있는 키보드를, `type="tel"` 이면 숫자 키보드를 띄워 줍니다.

### 자주 쓰는 attribute

```html
<input
  type="text"
  name="restaurantName"
  id="restaurant-name"
  placeholder="음식점 이름을 입력해 주세요"
  value="기본값"
  required
  maxlength="100"
>
```

| attribute | 역할 |
|---|---|
| `type` | 어떤 종류의 input 인지 |
| `name` | 서버로 보낼 때의 **키 이름** |
| `id` | `<label>` 과 연결할 때 등에 씀 |
| `placeholder` | 비어있을 때 희미하게 보이는 안내 글 |
| `value` | **현재 값** (혹은 초기값) |
| `required` | 비어있으면 제출 불가 |
| `maxlength` | 최대 글자 수 |

### ❗ `placeholder` 는 label 이 아니에요

많은 초보자가 실수하는 부분입니다.

```html
<!-- 나쁨: placeholder 로 라벨을 대신함 -->
<input type="text" placeholder="이름">

<!-- 좋음: label 을 쓰고 placeholder 는 예시 -->
<label for="name">이름</label>
<input type="text" id="name" placeholder="예: 홍길동">
```

`placeholder` 는 **입력하는 순간 사라집니다.** 그러면 사용자가 "이 칸이 뭐였지?" 하고 다시 스크롤을 위로 올려야 하거나, 아예 잊어버립니다.
**라벨은 항상 보여야 합니다.** 아래의 `<label>` 을 쓰세요.

---

## 🏷 라벨: `<label>`

"이 입력칸은 무엇을 위한 것인가" 를 설명하는 글. **접근성에 치명적으로 중요합니다.**

### 연결 방법 두 가지

#### 1) `for` + `id` 로 연결 (권장)

```html
<label for="name">이름</label>
<input type="text" id="name">
```

`<label>` 의 `for` 와 `<input>` 의 `id` 를 **같은 값** 으로 맞춥니다.

**React/JSX 에서는** `for` 가 JavaScript 예약어라서 쓸 수 없습니다. 대신 **`htmlFor`** 로 씁니다.

```jsx
<label htmlFor="name">이름</label>
<input type="text" id="name" />
```

#### 2) `<label>` 로 감싸기

```html
<label>
  이름
  <input type="text">
</label>
```

이렇게 하면 `for`/`id` 없이도 자동 연결됩니다.

### 라벨이 있으면 뭐가 좋지?

- **라벨 글자를 클릭해도** 해당 input 에 포커스가 잡힙니다. (체크박스/라디오에서 특히 유용)
- 스크린 리더가 input 에 포커스가 갈 때 라벨을 같이 읽어 줍니다.
- 모바일에서 터치 영역이 넓어집니다.

> 🔑 **폼에서 `<label>` 없이 `<input>` 만 있는 건 잘못된 HTML** 이라고 생각해도 무방합니다.

---

## 📝 여러 줄 입력: `<textarea>`

`<input type="text">` 는 한 줄만 입력 가능합니다.
**긴 글 (댓글, 설명 등)** 은 `<textarea>` 를 씁니다.

```html
<label for="description">설명</label>
<textarea id="description" name="description" rows="5" cols="30">
</textarea>
```

- `rows` : 세로로 보이는 줄 수.
- `cols` : 가로로 보이는 글자 수.

### ⚠️ 자주 하는 실수: 닫는 태그와 초기값

`<textarea>` 는 **self-closing 이 아닙니다.** 반드시 닫아야 해요.
그리고 초기값은 `value` attribute 가 아니라 **태그 사이에** 씁니다.

```html
<!-- 잘못됨: input 처럼 썼지만 작동 안 함 -->
<textarea value="기본 내용" />

<!-- 올바름: 태그 사이에 -->
<textarea>기본 내용</textarea>
```

단, **React 에서는 `<textarea value="...">` 로 씁니다.** (React 가 일부러 일관되게 만든 예외)
HTML 순정 이랑 React 가 다른 몇 안 되는 지점 중 하나라, 이건 React 미션 때 다시 만나게 됩니다.

---

## 🔽 드롭다운: `<select>` + `<option>`

여러 개 중 하나를 고르는 UI.

```html
<label for="category">카테고리</label>
<select id="category" name="category">
  <option value="">선택해 주세요</option>
  <option value="한식">한식</option>
  <option value="중식">중식</option>
  <option value="일식">일식</option>
  <option value="양식">양식</option>
</select>
```

- `<option value="...">` 의 `value` → 실제로 서버에 보낼 값
- 태그 사이의 글자 → 사용자에게 **보여 주는** 값

두 값이 다를 수 있다는 점에 주목하세요. 표시는 "한식" 으로 보여 주고 서버에는 `"KR"` 을 보낼 수도 있죠.

---

## ✅ 체크박스와 라디오

### 체크박스 — 여러 개 선택 가능

```html
<label>
  <input type="checkbox" name="hobby" value="reading">
  독서
</label>
<label>
  <input type="checkbox" name="hobby" value="coding">
  코딩
</label>
```

### 라디오 — 하나만 선택

```html
<label>
  <input type="radio" name="gender" value="male">
  남성
</label>
<label>
  <input type="radio" name="gender" value="female">
  여성
</label>
```

**같은 그룹의 라디오는 반드시 같은 `name` 값을 가져야** 합니다. 그래야 "그룹" 으로 인식되어 "하나만 고르기" 가 동작해요.

---

## 🔘 버튼: `<button>`

폼 제출 버튼이나 일반적인 클릭 버튼을 만드는 태그.

```html
<button type="submit">제출</button>
<button type="reset">초기화</button>
<button type="button">일반 버튼</button>
```

| `type` 값 | 의미 |
|---|---|
| `submit` | **기본값.** 감싸고 있는 `<form>` 을 제출 |
| `reset` | 폼 안의 모든 값을 비움 |
| `button` | 아무 기본 동작 없음. JavaScript 로 동작을 붙임 |

### ⚠️ 아주 흔한 실수

`<form>` 안에 `<button>` 을 그냥 두면 **기본 type 이 `"submit"`** 입니다.
즉 클릭만 해도 폼이 제출돼서 페이지가 새로고침됩니다.

**"제출" 이 아닌 버튼은 반드시 `type="button"`** 을 명시해야 해요.

```html
<form>
  <input type="text">

  <!-- 이게 기본 submit 이라 폼이 제출됨! -->
  <button>취소</button>

  <!-- 올바른 방법 -->
  <button type="button">취소</button>
</form>
```

> 🔑 React 미션에서 모달에 여러 버튼을 둘 때 이 함정에 자주 빠집니다. **"일반 버튼은 `type="button"`"** 을 외워 두세요.

---

## 🎯 [templates/index.html](../templates/index.html) 에서 찾아 보기

템플릿의 "음식점 추가" 모달을 보면:

```html
<form>
  <!-- 카테고리 -->
  <div class="form-item form-item--required">
    <label for="category text-caption">카테고리</label>
    <select name="category" id="category" required>
      <option value="">선택해 주세요</option>
      <option value="한식">한식</option>
      ...
    </select>
  </div>

  <!-- 음식점 이름 -->
  <div class="form-item form-item--required">
    <label for="name text-caption">이름</label>
    <input type="text" name="name" id="name" required>
  </div>

  <!-- 설명 -->
  <div class="form-item">
    <label for="description text-caption">설명</label>
    <textarea name="description" id="description" cols="30" rows="5"></textarea>
    <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
  </div>

  <!-- 추가 버튼 -->
  <div class="button-container">
    <button class="button button--primary text-caption">추가하기</button>
  </div>
</form>
```

요소 하나하나가 지금까지 배운 것입니다.
- `<form>` 으로 전체 묶기
- `<label>` + `<select>/<input>/<textarea>` 로 입력 받기
- `required` 로 필수 입력 표시
- `<button>` 으로 제출

---

## 🧪 지금 당장 해보기

`05-form.html` 을 만들어 보세요.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>폼 연습</title>
  </head>
  <body>
    <h1>자기소개 폼</h1>

    <form>
      <div>
        <label for="name">이름</label><br>
        <input type="text" id="name" name="name" placeholder="예: 홍길동" required>
      </div>

      <br>

      <div>
        <label for="email">이메일</label><br>
        <input type="email" id="email" name="email" required>
      </div>

      <br>

      <div>
        <label for="age">나이</label><br>
        <input type="number" id="age" name="age" min="0" max="150">
      </div>

      <br>

      <div>
        <label for="job">직업</label><br>
        <select id="job" name="job">
          <option value="">선택해 주세요</option>
          <option value="student">학생</option>
          <option value="developer">개발자</option>
          <option value="designer">디자이너</option>
          <option value="other">기타</option>
        </select>
      </div>

      <br>

      <div>
        <p>관심사 (여러 개 선택 가능)</p>
        <label><input type="checkbox" name="interest" value="react"> React</label><br>
        <label><input type="checkbox" name="interest" value="css"> CSS</label><br>
        <label><input type="checkbox" name="interest" value="design"> 디자인</label>
      </div>

      <br>

      <div>
        <label for="bio">자기소개</label><br>
        <textarea id="bio" name="bio" rows="5" cols="40"></textarea>
      </div>

      <br>

      <button type="submit">제출</button>
      <button type="reset">초기화</button>
    </form>
  </body>
</html>
```

### 확인해 볼 것

- 이름을 비우고 제출 버튼을 눌러 보세요. 브라우저가 **자동으로** "이 칸을 입력해 주세요" 라는 풍선을 띄워줍니다. `required` 덕분이에요.
- 이메일 칸에 `hello` 만 쓰고 제출해 보세요. "올바른 이메일을 입력하세요" 라는 메시지가 뜹니다. `type="email"` 덕분.
- 나이에 `-5` 를 넣으려 해 보세요. `min="0"` 때문에 거절됩니다.
- **라벨 글자를 클릭** 해 보세요. 해당 input 에 포커스가 잡히죠? 이게 접근성입니다.
- "초기화" 를 눌러 모두 비워 보세요.

### 도전 과제

1. 폼에 **라디오 버튼 그룹** 을 추가해 보세요. "나의 개발자 유형: 프론트엔드 / 백엔드 / 풀스택".
2. `<input type="date">` 로 생일 입력을 받아 보세요. 브라우저가 자동으로 달력을 띄워 줍니다.

---

## 📚 정리

| 태그 | 역할 |
|---|---|
| `<form>` | 입력 요소들의 묶음 |
| `<input>` | `type` 에 따라 다양한 한 줄 입력 |
| `<label>` | input 의 의미 설명. 접근성 핵심 |
| `<textarea>` | 여러 줄 입력 |
| `<select>` + `<option>` | 드롭다운 |
| `<button>` | 버튼 (`type="button"` 주의) |
| `required` | 필수 입력 |
| `placeholder` | 빈 칸 안내 (라벨 대용 ❌) |

다음은 페이지의 **의미 있는 구조** 를 만드는 semantic 태그들 👉 [06. 의미(semantic)와 레이아웃](./06-semantic-and-layout.md)
