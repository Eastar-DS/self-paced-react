# 08. 실습: templates/style.css 한 줄씩 해부하기

지금까지 배운 모든 것을 동원해 **[templates/style.css](../templates/style.css) 를 처음부터 끝까지** 읽어 봅시다.
이 장을 마치면 "어디선가 본 적 있는 속성" 이 아니라 **"이게 왜 여기 있는지"** 가 보이는 눈이 생깁니다.

---

## 🧱 1단계 — 리셋과 전역 기본

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

html,
body {
  font-family: sans-serif;
  font-size: 16px;
}
```

### 한 줄씩 읽기

- `* { padding: 0; margin: 0; box-sizing: border-box; }`
  - `*` 는 **모든 요소** (01장).
  - 브라우저가 기본으로 주는 padding/margin 을 **전부 0으로 리셋**.
  - `box-sizing: border-box` 로 "width 안에 padding/border 포함" 관례를 전역 적용 (03장).
- `ul, li { list-style: none; }`
  - `<ul>`/`<li>` 의 기본 불릿(•) 을 없앰. 내비게이션, 카드 리스트를 만들 때 방해되기 때문.
- `html, body { font-family: sans-serif; font-size: 16px; }`
  - 전체 폰트를 **고딕 계열** 로, 기본 크기 16px 로 설정 (04장).
  - 최신 프로젝트라면 여기에 Pretendard 같은 웹폰트를 더 추가했을 거예요.

**스스로 확인**: "왜 `*` 선택자로 한 번에 리셋하나요?" 에 대한 답을 말로 해보세요. (힌트: 브라우저 기본값이 브라우저마다 달라서)

---

## 🎨 2단계 — 색상 변수

```css
:root {
  --primary-color: #ec4a0a;
  --lighten-color: #f6a88a;
  --grey-100: #ffffff;
  --grey-200: #d0d5dd;
  --grey-300: #667085;
  --grey-400: #344054;
  --grey-500: #000000;
}
```

### 한 줄씩 읽기

- `:root` 는 최상위 요소. 여기에 선언한 변수는 **어디서든** `var(...)` 로 꺼내 쓸 수 있음 (03장).
- `--primary-color: #ec4a0a` → 주황색(주 색상). 버튼, 포인트 색에 쓰임.
- `--grey-100` ~ `--grey-500` → 흰색에서 검정까지의 **회색 단계**.

### 설계 관점

왜 이렇게 **변수로 빼놨을까**?

- 나중에 주 색상을 파란색으로 바꾸려면 **이 한 줄만** 수정하면 됨.
- 회색을 단계로 나눠 두면 "이 텍스트는 중간 회색", "이 테두리는 연한 회색" 같은 판단이 일관됨.

**디자인 시스템** 의 축소판이라고 보면 됩니다.

---

## 🔤 3단계 — 타이포그래피 유틸 클래스

```css
.text-title {
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
}

.text-subtitle {
  font-size: 18px;
  line-height: 28px;
  font-weight: 600;
}

.text-body {
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
}

.text-caption {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
}
```

### 한 줄씩 읽기

- 네 가지 **텍스트 크기 단계** 를 클래스로 미리 정의.
- `font-weight: 600` → Semibold (두꺼운 제목용). `400` → Regular (일반 본문).
- `line-height: 24px` → 04장에서 배운 줄간격.

### HTML 에서 어떻게 쓰이나

`templates/index.html` 을 보면:

```html
<h1 class="gnb__title text-title">점심 뭐 먹지</h1>
<p class="text-body">음식점 소개 문구</p>
<span class="help-text text-caption">메뉴 등 추가 정보...</span>
```

`text-title`, `text-body` 같은 **재사용 클래스** 를 HTML 에 여러 개 조합해서 붙입니다.
이 패턴을 **유틸리티 클래스** 라고 부르고, Tailwind CSS 같은 라이브러리의 기본 철학이기도 해요.

---

## 👑 4단계 — 상단바(Header / gnb)

```css
.gnb {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;

  padding: 0 16px;

  background-color: var(--primary-color);
}
```

### 한 줄씩 읽기

- `display: flex` → Flexbox 시작 (06장).
- `justify-content: space-between` → 제목은 왼쪽 끝, 버튼은 오른쪽 끝.
- `align-items: center` → 세로 가운데.
- `height: 64px` → 헤더의 고정 높이.
- `padding: 0 16px` → 좌우에만 16px, 위아래 0. (상하 여백은 `align-items: center` 로 해결.)
- `background-color: var(--primary-color)` → 주황색 배경.

**이 한 블록이 "양 끝에 밀어 놓기 + 세로 가운데" 의 교과서** 입니다.

```css
.gnb__title {
  color: #fcfcfd;
}

.gnb__button {
  height: 40px;

  border: none;
  border-radius: 8px;
  background: transparent;

  font-size: 24px;
  cursor: pointer;
}

.gnb__button img {
  display: block;
  width: 40px;
  height: 40px;
  object-fit: contain;
}
```

### 한 줄씩 읽기

- `.gnb__title { color: #fcfcfd; }` → 주황색 배경 위이기 때문에 **거의 흰색** 글자로.
- `.gnb__button`:
  - `border: none; background: transparent;` → 브라우저 기본 버튼 스타일을 **완전히 제거**. 이미지 버튼이기 때문.
  - `cursor: pointer;` → 마우스 올리면 손가락 커서 (07장).
- `.gnb__button img`:
  - `display: block;` → 이미지 아래의 미세한 여백 없애기 (inline 이미지의 baseline 문제를 피하는 관례).
  - `object-fit: contain;` → 이미지 비율 유지하면서 박스에 맞춤.

---

## 🥘 5단계 — 음식점 필터와 목록

### 카테고리 필터

```css
.restaurant-filter-container {
  display: flex;
  justify-content: space-between;

  padding: 0 16px;
  margin-top: 24px;
}

.restaurant-filter-container select {
  height: 44px;
  min-width: 125px;

  border: 1px solid #d0d5dd;
  border-radius: 8px;
  background: transparent;

  font-size: 16px;
}
```

### 한 줄씩 읽기

- `display: flex; justify-content: space-between;` → 만약 select 가 두 개였다면 양 끝으로 밀었을 것 (현재 템플릿엔 하나만).
- `padding: 0 16px;` → 좌우 여백. 헤더와 동일한 수치로 정렬선 맞춤.
- `margin-top: 24px;` → 위 요소와의 거리.
- `select` 에:
  - `height: 44px;` → 모바일 터치에 적절한 크기 (보통 44px 이상 권장).
  - `border-radius: 8px;` → 모서리 둥글게.
  - `background: transparent;` → 브라우저 기본 배경 없애고 부모 색 따라가게.

### 음식점 목록 래퍼

```css
.restaurant-list-container {
  display: flex;
  flex-direction: column;

  padding: 0 16px;
  margin: 16px 0;
}
```

- `flex-direction: column` → 음식점 카드들을 **세로로 쌓기** (06장).
- `margin: 16px 0` → 위아래 16px, 좌우 0.

### 한 줄에 카드 하나

```css
.restaurant {
  display: flex;
  align-items: flex-start;

  padding: 16px 8px;

  border-bottom: 1px solid #e9eaed;
}
```

### 한 줄씩 읽기

- `display: flex` → 카테고리 아이콘 + 정보 텍스트를 **가로로**.
- `align-items: flex-start` → 세로로 **위쪽 정렬**. (설명이 길어지면 아이콘은 위에 고정)
- `border-bottom: 1px solid #e9eaed` → 카드 아래에 **얇은 구분선**. 리스트 스타일의 전형.

### 카테고리 아이콘 (동그라미)

```css
.restaurant__category {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  min-width: 64px;
  min-height: 64px;

  margin-right: 16px;

  border-radius: 50%;
  background: var(--lighten-color);
}

.category-icon {
  width: 36px;
  height: 36px;
}
```

### 한 줄씩 읽기

- `display: flex; justify-content: center; align-items: center;` → **정중앙 정렬의 교과서**. 안의 아이콘 이미지를 동그라미 한가운데에 배치 (06장).
- `width: 64px; height: 64px;` → 정사각형.
- `min-width: 64px; min-height: 64px;` → Flexbox 에서 **줄어들지 않도록** 보호 (긴 설명 옆에서 아이콘이 쭈그러드는 버그 방지).
- `border-radius: 50%;` → **동그라미**. 정사각형을 50% 반경으로 깎으면 원이 됨 (03장).
- `background: var(--lighten-color);` → 연한 주황색 배경.

### 음식점 정보

```css
.restaurant__info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.restaurant__name {
  margin: 0;
}

.restaurant__distance {
  color: var(--primary-color);
}
```

- `flex-direction: column` → 이름, 거리, 설명을 세로로 쌓기.
- `.restaurant__distance { color: var(--primary-color); }` → 주황색으로 강조.

### 설명의 "...더보기" 효과

```css
.restaurant__description {
  display: -webkit-box;

  padding-top: 8px;

  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

여기는 **어려워요**. 처음 보면 "뭐지?" 싶을 수 있어요.

- 설명이 길어지면 **2줄까지만 보이고, 그 뒤는 "..." 으로 잘림** 을 만드는 **전설의 CSS 트릭** 입니다.
- `-webkit-line-clamp: 2` → 최대 2줄.
- `overflow: hidden` + `text-overflow: ellipsis` → 넘치는 부분을 `...` 으로 표시.
- `-webkit-` 접두사는 Chrome/Safari 용 실험 문법. 하지만 **거의 모든 브라우저가 지원** 해서 실무에서 많이 씀.

이 4~5줄은 **이 트릭을 통째로 외워 두면** 언제든 꺼내 쓸 수 있습니다.

---

## 🪟 6단계 — 모달

### 보임/숨김 전환

```css
.modal {
  display: none;
}

.modal--open {
  display: block;
}
```

- 기본은 숨김 (`display: none` → 아예 없는 것처럼).
- JavaScript 로 `modal--open` 클래스를 추가하면 보이게 됨 (05장).

### 어두운 배경

```css
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background: rgba(0, 0, 0, 0.35);
}
```

### 한 줄씩 읽기

- `position: fixed` + `top/right/bottom/left: 0` → **화면 전체** 를 덮음 (05장).
  - 이게 "width: 100%; height: 100%;" 와 거의 같은 효과인데, 4면 모두 0 으로 잡는 이 패턴이 더 관용적이에요.
- `background: rgba(0, 0, 0, 0.35)` → 35% 투명한 검정. 본문이 **살짝 비쳐 보이는** 어두운 반투명 덮개.

### 모달 카드

```css
.modal-container {
  position: fixed;
  bottom: 0;
  width: 100%;

  padding: 32px 16px;

  border-radius: 8px 8px 0px 0px;
  background: var(--grey-100);
}
```

### 한 줄씩 읽기

- `position: fixed; bottom: 0; width: 100%;` → **화면 하단에** 들러붙는 흰 패널 (모바일 바텀 시트 UI).
- `padding: 32px 16px;` → 상하 32px, 좌우 16px.
- `border-radius: 8px 8px 0px 0px;` → **모서리 값을 4개** 줄 때는 **시계방향** (좌상, 우상, 우하, 좌하). 즉 **위쪽 모서리만 둥글게**, 아래는 각지게.
- `background: var(--grey-100);` → 흰색.

### 모달 제목

```css
.modal-title {
  margin-bottom: 36px;
}
```

- 제목과 아래 내용 사이에 **큰 간격** 주기.

---

## 📋 7단계 — 폼

```css
.form-item {
  display: flex;
  flex-direction: column;

  margin-bottom: 36px;
}
```

- 각 폼 항목(label + input) 을 **세로로** 쌓기.
- 항목끼리 `margin-bottom: 36px` 로 큼직하게 띄움.

### label 스타일

```css
.form-item label {
  color: var(--grey-400);
  font-size: 14px;
}
```

- 진한 회색의 작은 글자. 본문보다 덜 튀게.

### 필수 표시 `*`

```css
.form-item--required label::after {
  padding-left: 4px;

  color: var(--primary-color);
  content: "*";
}
```

### 한 줄씩 읽기

**이게 pseudo-element 의 실전 예시** 입니다 (02장).

- `.form-item--required` 클래스가 붙은 항목의 `label` **뒤에** 가상의 요소를 삽입.
- `content: "*"` → 그 가상 요소의 내용은 별표.
- `color: var(--primary-color)` → 주황색.
- `padding-left: 4px` → label 과 별표 사이 간격.

HTML 상으로는 `<label>카테고리</label>` 이지만 **화면에는 "카테고리 \*"** 로 보입니다.
HTML 을 건드리지 않고 **CSS 만으로 장식** 하는 정석 기법.

### 도움말 텍스트

```css
.form-item .help-text {
  color: var(--grey-300);
}
```

- 조금 흐린 회색. "여기는 안내문이야" 라는 시각적 신호.

### 모든 입력 요소 공통 스타일

```css
.form-item input,
.form-item textarea,
.form-item select {
  padding: 8px;
  margin: 6px 0;

  border: 1px solid var(--grey-200);
  border-radius: 8px;

  font-size: 16px;
}
```

- **쉼표로 셀렉터를 나열** (01장) → 세 종류의 입력 요소에 **똑같은 스타일**.
- `padding: 8px` → 클릭 가능 영역과 여유.
- `border-radius: 8px` → 둥근 모서리.
- `font-size: 16px` → **모바일에서 input 에 16px 이상** 을 권장하는 관례. (14px 이하면 iOS 가 자동 확대해서 레이아웃이 깨짐.)

### textarea 크기 조절 잠그기

```css
.form-item textarea {
  resize: none;
}
```

- 기본적으로 `<textarea>` 는 사용자가 드래그로 크기를 바꿀 수 있음.
- `resize: none` 으로 **잠가서** 레이아웃이 망가지는 걸 방지.

### select 의 세로 크기

```css
.form-item select {
  height: 44px;

  padding: 8px;

  border: 1px solid var(--grey-200);
  border-radius: 8px;

  color: var(--grey-300);
}
```

- 필터의 `select` 와 동일한 44px 높이. 터치하기 편한 크기.

### 특정 input 이름만 골라 스타일

```css
input[name="name"],
input[name="link"] {
  height: 44px;
}
```

**속성 선택자** (02장)!

- `input[name="name"]` 은 `name` attribute 가 `"name"` 인 input.
- 즉 `<input name="name">`, `<input name="link">` 에만 `height: 44px` 적용.
- `<textarea>` 는 높이가 더 커야 하므로 이 규칙에서 제외.

---

## 🔘 8단계 — 버튼

```css
.button-container {
  display: flex;
}

.button {
  width: 100%;
  height: 44px;

  margin-right: 16px;

  border: none;
  border-radius: 8px;

  font-weight: 600;
  cursor: pointer;
}

.button:last-child {
  margin-right: 0;
}
```

### 한 줄씩 읽기

- `.button-container` 는 `display: flex` → 버튼들을 가로로 나열.
- `.button`:
  - `width: 100%` → 부모를 꽉 채움. Flex 컨테이너 안에서 여러 버튼이 있으면 **균등 분할** 에 가까움.
  - `height: 44px` → 모바일 터치 크기.
  - `margin-right: 16px` → 버튼 사이 간격.
  - `border: none` → 기본 테두리 제거.
  - `cursor: pointer` → 손가락 커서 (07장).
- `.button:last-child { margin-right: 0; }`
  - **마지막 버튼** 의 오른쪽 여백은 제거. 안 그러면 컨테이너 오른쪽에 쓸데없는 공간이 생김.
  - **`:last-child` pseudo-class** (02장) 의 고전 용도.

> 💡 요즘은 `margin-right` 대신 부모에 `gap: 16px` 을 주는 게 더 깔끔합니다. 이 템플릿은 오래된 방식을 따른 거예요.

### 두 가지 버튼 스타일

```css
.button--secondary {
  border: 1px solid var(--grey-300);
  background: transparent;

  color: var(--grey-300);
}

.button--primary {
  background: var(--primary-color);

  color: var(--grey-100);
}
```

- **primary** : 주황색 꽉 찬 버튼 (주 액션).
- **secondary** : 테두리만 있는 회색 버튼 (보조 액션, 취소 등).

**BEM 작명 규칙** (02장) 의 실전 예시입니다.

### 모달 내용 마무리

```css
.restaurant-info {
  margin-bottom: 24px;
}
```

- 모달 안 상세 정보와 아래 버튼 사이의 간격.

---

## 🎓 최종 확인 — 스스로 설명해 보기

아래 질문들을 **말로 답할 수 있다면** CSS 파트 졸업입니다.

### 기본 개념

- [ ] `* { box-sizing: border-box; }` 는 왜 맨 위에 있나요? (03장)
- [ ] `:root` 에 왜 변수를 정의하나요? 어디서든 쓸 수 있는 이유는? (03장)
- [ ] `.text-title`, `.text-body` 같은 **유틸 클래스** 의 장점은? (04장)

### 레이아웃

- [ ] `display: flex; justify-content: space-between; align-items: center;` 로 만들 수 있는 레이아웃을 설명해 보세요. (06장)
- [ ] `border-radius: 50%` 는 언제 원이 되나요? (03장)
- [ ] `.restaurant__category` 의 `min-width` 는 왜 있나요? (06장)

### 포지셔닝

- [ ] `position: fixed` 와 `top: 0; left: 0; right: 0; bottom: 0;` 조합이 만드는 결과는? (05장)
- [ ] 왜 모달은 `display: none` 과 `display: block` 으로 여닫나요? (05장)

### 심화

- [ ] `label::after { content: "*"; }` 이 HTML 에 어떤 영향을 주나요? HTML 에 `*` 를 쓰는 것과의 차이는? (02장)
- [ ] `input[name="name"]` 이 무슨 뜻인가요? (02장)
- [ ] `-webkit-line-clamp` 는 어떤 효과를 만드나요? (08장 본문 참조)
- [ ] `button:last-child { margin-right: 0; }` 이 없으면 어떤 레이아웃 문제가 생기나요? (02장)

---

## 🏁 최종 도전 — **빈 파일부터 다시 짜기**

### 규칙

1. 새 파일 `my-style.css` 를 만듭니다.
2. `templates/index.html` 은 **볼 수 있습니다.** (HTML 구조를 보고 CSS 를 짜기)
3. `templates/style.css` 는 **보지 않고** 기억나는 대로 짜 봅니다.
4. 막히면 이 장을 참고하되, **정답 CSS 는 마지막에만** 열어 확인합니다.

### 최소 목표

- 헤더(주황색 배경, 흰 글씨, 양 끝 정렬) ✓
- 음식점 한 줄 카드 (아이콘 원형 + 정보 텍스트) ✓
- 모달 (하단 바텀시트 형태, 반투명 배경) ✓
- 폼 (label + input, 필수 표시 `*`) ✓

완성하고 `templates/style.css` 와 비교해 보세요. 다른 점은 **더 나은 방법** 일 수도 있고, 놓친 부분일 수도 있어요. 둘 다 배울 점이 있습니다.

---

## 🎉 CSS 파트 졸업!

여기까지 오신 분께 — 진심으로 축하합니다.

이제 여러분은:
- HTML 과 CSS 로 **정적인 웹 페이지를 혼자** 만들 수 있습니다.
- 템플릿의 CSS 를 **한 줄씩 설명** 할 수 있습니다.
- 디자인 시안을 보고 "이건 flexbox, 이건 position, 이건 pseudo-element" 같은 **계획** 을 세울 수 있습니다.

이것은 React 공부의 **단단한 기초** 입니다.
React 에서 만드는 모든 컴포넌트는 결국 HTML + CSS 를 **JSX 로 조합** 하는 일이에요.

## 🚀 다음 단계

CSS 가 끝났으니 본래 목표인 React 로 돌아갑시다.

- [00-aa/quick-start.md](../00-aa/quick-start.md) — React 공식 Quick Start 를 한국어 학습 노트로
- [00-aa/thinking-in-react.md](../00-aa/thinking-in-react.md) — "Thinking in React" 학습 노트
- 또는 바로 [루트 README.md](../README.md) 로 돌아가 미션 0 부터 시작

CSS 는 평생 옆에 둘 도구예요. 이 문서는 필요할 때마다 **참고 자료처럼** 다시 꺼내 보세요.
화이팅입니다! 🍱
