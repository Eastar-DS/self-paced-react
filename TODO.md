# TODO — 학습 후 돌아올 항목

Chapter 1 을 마치며 뒤로 미룬 항목 모음. 학습 흐름(리액트 핵심 패턴)에 집중하기 위해 지금은 건너뛰고, 시점이 되면 여기에서 꺼내 와서 진행한다.

---

## 1. CSS 컴포넌트별 파일 분리

- **무엇을:** 현재 `src/style.css` 한 덩어리로 묶여 있는 스타일을 컴포넌트 단위 파일(예: `Header.module.css`, `CategoryFilter.module.css` …)로 쪼갠다.
- **언제:** 전 챕터를 끝낸 후 또는 스타일이 다른 컴포넌트와 충돌해 격리가 필요해지는 순간.
- **왜 미뤘나:** 스타일 관리 방식은 리액트의 state/props/effect 학습과 독립된 주제. 지금 분리하면 챕터 2~5 의 집중이 흐려진다.
- **같이 볼 것:**
  - Vite + CSS Modules (파일명 `.module.css` 로 바꾸면 자동 지원)
  - CSS-in-JS (styled-components, emotion) 비교
  - Tailwind 같은 유틸리티 접근과의 차이

---

## 2. ✅ "이게 TypeScript 였다면?" — Chapter 2 끝 1 분 미리보기 (완료 — 2026-04-21)

- **무엇을:** Chapter 2 에서 처음으로 props 를 만들게 되는 시점에, 그 props 를 TS 로 쓰면 어떤 모양이 되는지 **전환하지 않고 감각만** 1 분 동안 맛본다.
- **결과:** `Category` 리터럴 유니온, `Restaurant` / `RestaurantListProps` / `CategoryFilterProps` 인터페이스, 핸들러 시그니처 형태까지 맛보기 완료. 본격 전환은 4 번 항목에서.

---

## 3. 컴포넌트 설계 원칙

- **무엇을:** 단일 책임 원칙, 재사용 가능한 컴포넌트 vs 그렇지 않은 컴포넌트의 기준, state 를 어느 컴포넌트가 소유해야 하는지 등.
- **언제:** Chapter 5 까지 모두 끝낸 후.
- **왜 미뤘나:** 원칙은 "아, 이게 왜 필요하지" 를 체감하는 아픈 경험이 먼저 있어야 흡수된다. 지금 컴포넌트 5 개뿐이고 props/state 미경험 상태에서는 교과서 문장으로만 남는다. Chapter 3(모달 state 소유 고민) → Chapter 5(API 로직과 UI 의 혼재) 를 겪고 나서 회고하듯 배우는 게 효율적이다.

---

## 4. (2 번과 연결) 전체 TypeScript 전환

- **무엇을:** `.jsx` → `.tsx`, `tsconfig.json` 설정, `declarations.d.ts` 생성, props / 이벤트 / fetch 응답 타입 지정.
- **언제:** Chapter 5 완료 직후.
- **참고:** "우아한 타입스크립트 with 리액트" 8 장 내용을 프로젝트에 바로 적용.

---

## 5. Chapter 2 심화 — useReducer / 불변성

- **무엇을:**
  - `useReducer` — 복잡한 상태 변화를 action 단위로 관리. `useState` 여러 개가 서로 얽혀 변할 때 "상태 전이 규칙" 을 한 곳에 모으는 도구.
  - 불변성(immutability) — 왜 배열/객체를 직접 `push`, `splice`, `obj.key = ...` 로 수정하면 React 가 변경을 감지하지 못하는지. 스프레드 연산자 / `map` / `filter` 로 "새 참조를 만들어서 교체" 하는 감각.
- **언제:** Chapter 5 완료 후, 또는 Chapter 3~4 진행 중 상태 관리가 복잡해져 "아 이게 왜 필요하지" 가 체감되는 순간.
- **왜 미뤘나:** 지금은 `useState` 하나로 충분한 단계. 고통이 먼저여야 reducer 의 효용이 체감된다.

---

## 6. Chapter 3 심화 — useRef / 접근성(a11y)

- **무엇을:**
  - `useRef` — DOM 을 직접 만져야 할 때의 탈출구. 모달이 열리면 첫 입력창에 포커스 주기, 특정 리스트 항목으로 스크롤 이동 등. "렌더와 무관하게 유지되는 값 저장소" 라는 또 다른 용도도 같이.
  - 접근성(a11y) — 모달에서 Tab 키가 모달 바깥으로 새나가지 않도록 **키보드 트랩** 구현, `role="dialog"` / `aria-modal` / `aria-labelledby` 속성, ESC 키로 닫기.
- **언제:** Chapter 5 완료 후, 또는 실무에서 접근성 감각을 빨리 체득하고 싶을 때 Chapter 4 직후에 당겨 와도 OK.
- **왜 미뤘나:** Chapter 3 의 핵심은 "state/이벤트/조건부 렌더링" 이라는 React 패턴. 접근성은 그 위에 얹히는 별도 주제이며, React 특유의 내용보다 DOM API 와 WAI-ARIA 사양 쪽에 가깝다.
