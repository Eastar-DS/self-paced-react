## 🔍 두 줄에 모두 힌트가 숨어있어요

`interface CategoryFilterProps {
  onCategoryChange: (value) => void;  // ← value 의 타입 없음
}

const handleFilterChange = (e) => {    // ← e 의 타입 없음`

두 군데 모두 **"어떤 타입이냐?"** 를 아직 안 적었어요.

---

## 🧩 힌트 1: `e` 의 타입

`<select onChange={handleFilterChange}>` 에서 호출되는 핸들러. **select 의 change 이벤트**.

과제 안 참조표에서 찾아보세요. (다 외울 필요 없다고 했죠? VS Code 에서 JSX 안의 `onChange={(e) => ...}` 에 마우스 올려봐도 답 나와요.)

---

## 🧩 힌트 2: `e.target.value` 는 무슨 타입?

이게 핵심 포인트. DOM 스펙에 따라 **`<input>`, `<select>`, `<textarea>` 의 value 는 언제나 `string`**.

`"한식"`, `"중식"` 같은 구체적 문자열이어도 TS 는 그걸 모르고 **그냥 `string`** 으로 봐요. HTML 이 어떤 값이 올지 정적으로 보장해주지 않으니까요.

### 그래서 발생하는 **타입 경계 문제**

- `e.target.value` → `string`
- `onCategoryChange` 는 `FilterCategory` (= `"전체" | "한식" | ...`) 만 받고 싶음
- `string` 은 `FilterCategory` 보다 **넓은** 타입 → 바로는 못 넘김

이게 실무에서 수시로 만나는 **"HTML 세계 (string) ↔ 도메인 세계 (좁은 유니온)" 경계 문제**.

---

## 🧩 힌트 3: 경계에서 어떻게 좁히나

두 가지 흔한 방법:

### ✅ 방법 A: 타입 단언 (as) — 실용적

`const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  onCategoryChange(e.target.value as FilterCategory);
};`

**논리**: `<option>` 값들은 우리가 직접 하드코딩한 7가지뿐. 사용자가 HTML 조작하지 않는 한 절대 다른 값이 올 수 없음. 그래서 **개발자가 책임지고 "이건 FilterCategory 다" 라고 단언** 하는 것.

단점: 런타임 검증은 아님. 책임은 개발자에게.

### 🧊 방법 B: 타입 가드 (is) — 엄격

`const isFilterCategory = (v: string): v is FilterCategory =>
  FILTER_CATEGORIES.includes(v as FilterCategory);

const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  if (isFilterCategory(e.target.value)) {
    onCategoryChange(e.target.value);
  }
};`

**장점**: 진짜로 런타임에 확인함. 더 안전.
**단점**: 이 케이스엔 오버엔지니어링. 외부에서 오는 값이 아닌데 굳이.

### 👉 **이 프로젝트에선 방법 A 권장.**

---

## 🧩 힌트 4: `onCategoryChange` 의 value 타입

이제 경계를 건넌 값이 `FilterCategory` 가 됐으니:

`interface CategoryFilterProps {
  onCategoryChange: (value: FilterCategory) => void;
}`

`types.ts` 에서 import 필요.

---

## 🧩 힌트 5: App.tsx 도 같이 조정

이스타가 헷갈렸던 **"setCategory 타입을 어디서 지정?"** 은 여기가 정답이에요.

App.tsx:21:

`// before
const [category, setCategory] = useState("전체");

// after
const [category, setCategory] = useState<FilterCategory>("전체");`

**useState 에 제네릭을 주면** `setCategory` 의 시그니처가 **`Dispatch<SetStateAction<FilterCategory>>`** 으로 자동 정해져요. **setCategory 를 직접 타이핑할 필요 없음.**

그럼 `<CategoryFilter onCategoryChange={setCategory} />` 에서 TS 가 자동으로:

- `setCategory` 는 `FilterCategory` 받음
- `CategoryFilter` 는 `(value: FilterCategory) => void` 기대
- ✅ 타입 맞음

---

## 🎯 정리 — 데이터 흐름을 타입으로 그리면

`<select onChange>
    ↓ e: React.ChangeEvent<HTMLSelectElement>
e.target.value (string)
    ↓ as FilterCategory   ← 여기가 경계 (방법 A)
onCategoryChange(value: FilterCategory)
    ↓
setCategory(value: FilterCategory)
    ↓
useState<FilterCategory>`

---

### 👉 이제 직접 해보세요

위 힌트로 수정 후:

1. **됐어요** — CategoryFilter + App.tsx 수정 완료, 에러 줄어들었어요. 다음으로.
2. **또 막혔어요** — 어느 지점이 아직 해결 안 됐는지 말해주세요.
3. **질문 있어요** — `as FilterCategory` 같은 타입 단언을 함부로 써도 되는지 등.

**CategoryFilter.tsx**

1. onChange={(e) => ...} 에 마우스 올려봐도 답 나온다는게 무슨말인지 모르겠음. 어디에 있는 onChange에 마우스를 올려보라는거야? React.ChangeEventHandler<HTMLSelectElement> | undefined 이거말하는건가?

이스타가 본 그게 **맞는 정보**예요! 설명을 조금 더 풀어드릴게요.

## 🖱️ 힌트의 의도

**어디에 올렸을 때 그게 나왔냐면:**

CategoryFilter.tsx:17 의 `onChange={handleFilterChange}` 에서 **`onChange` 글자 자체** 에 마우스 올리면:

`(property) SelectHTMLAttributes<HTMLSelectElement>.onChange?: 
  React.ChangeEventHandler<HTMLSelectElement> | undefined`

이걸 본 거예요. **👍 정답이에요.**

---

## 🤔 근데 왜 `ChangeEvent` 가 아니라 `ChangeEventHandler` 가 떴지?

두 개가 관계가 있어요. **`ChangeEventHandler<T>` 는 `ChangeEvent<T>` 로 만든 "함수 타입 별칭"** 이에요.

실제 React 타입 정의는 이렇게 생겼어요:

`type ChangeEventHandler<T> = (event: ChangeEvent<T>) => void;`

그러니까:

- **`ChangeEvent<HTMLSelectElement>`** → 이벤트 **객체** 의 타입
- **`ChangeEventHandler<HTMLSelectElement>`** → 그 이벤트를 받는 **함수** 의 타입 = `(e: ChangeEvent<HTMLSelectElement>) => void`

이스타가 본 건 `onChange` 프롭 **전체** 의 타입(함수 타입)이라서 `...Handler` 로 끝난 거예요.

---

## 🛠️ 그래서 두 가지 쓰는 방식이 생겨요

### 방식 1: 매개변수 쪽에 타입 (내가 과제에 쓴 방식)

`const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  onCategoryChange(e.target.value as FilterCategory);
};`

### 방식 2: 함수 변수 쪽에 타입 (이스타가 발견한 타입 활용)

`const handleFilterChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
  onCategoryChange(e.target.value as FilterCategory);
};`

**둘 다 동일하게 동작**. 스타일 차이예요.

| 방식 | 장점 | 단점 |
| --- | --- | --- |
| 1 (매개변수) | 익숙함, 어떤 이벤트 받는지 한눈에 | `React.ChangeEvent<...>` 가 살짝 길다 |
| 2 (변수) | 함수 시그니처 전체가 깔끔 | 매개변수 `e` 에 마우스 올려야 정확한 타입 확인 가능 |

**권장**: 방식 1 이 더 흔함. 매개변수 위치에 타입이 있으면 함수 안에서 `e` 가 뭔지 즉시 보이니까.

---

## 🎯 e 의 정확한 타입 확인하는 더 쉬운 방법

사실 `onChange` 에 올리는 것보다 **더 직접적인 방법** 이 있어요.

일단 `(e) => ...` 를 **타입 없이** 인라인으로 써봐요:

`<select onChange={(e) => {  /* ← 여기서 e 에 마우스 올림 */}}>`

그럼 VS Code 가 contextual typing 으로 자동 추론해서:

`(parameter) e: React.ChangeEvent<HTMLSelectElement>`

이 정확한 타입을 알려줘요. **이게 복붙해서 매개변수 타입으로 쓸 수 있는 형태**.

이게 제가 말하려던 **"IDE 가 답 알려준다"** 의 핵심이었어요. 설명이 부족했네요!