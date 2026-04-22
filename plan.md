## 1. 로또로 확정 — OK

복잡도 낮춘 게 맞아요. 로또는 **순수 도메인 로직이라 Model/Validator/ScoreBoard/LottoGenerator 를 그대로 들고 가서** View 만 React 로 바꾸면 돼요. 이 "순수 계층 재사용" 감각 자체가 실무에서도 귀한 경험이에요.

---

## 2. 로또 React 전환 챕터 구조 (4챕터, i+2~5)

self-paced-react 가 5챕터였으니 로또는 **4챕터**, 각 스텝을 더 굵게 잡았어요. 개념 도입 간격이 넓어지고, 한 챕터 안에서 여러 개를 같이 돌려요.

### Ch1. 프로젝트 셋업 + 정적 JSX 변환 (i+2) — 2-3일

- Vite + React + TS 프로젝트 생성, tsconfig 설정
- `src/Model`, `src/Validator.ts`, `src/LottoGenerator.ts`, `src/ScoreBoard.ts`, `src/constants.ts` **그대로 이식 + TS 타입만 추가** (이미 클래스·순수함수라 구조 유지)
- index.html 과 style.css 기반으로 컴포넌트 트리 분해: `App` → `Header`, `MoneyForm`, `LottoList` (→ `LottoItem`), `WinningForm`, `ResultModal`
- **아직 상태/이벤트 없음. 정적 렌더링까지만.**
- 학습 포인트: "도메인 로직은 React 와 무관하다" 를 몸으로 느끼기

### Ch2. 금액 입력 → 로또 발행 (i+3) — 3-4일

- `useState<number>` 로 money, `useState<Lotto[]>` 로 lottos
- `MoneyForm` controlled input + submit 핸들러
- submit 시 `LottoGenerator.makeLottos(count)` 호출 → state 업데이트
- **Validator 의 throw 를 에러 state 로 전환** (`useState<string | null>`) — 이게 TODO #9 "로딩/에러 상태 패턴" 의 미니 버전
- 학습 포인트: **도메인 로직 재사용 + 에러 상태 관리 첫 경험**

### Ch3. 당첨번호 + 결과 + 모달 (i+4) — 4-5일

- 당첨번호 6개 input → `useState<string[]>` 배열 상태, **불변성으로 업데이트** (TODO #5 후반 불변성이 여기서 필수)
- 보너스 number 별도 state
- submit → `new WinningLotto(...)`, `ScoreBoard.makeAllRankCount(...)`, `ScoreBoard.getProfitRate(...)` → 결과 state
- 결과 모달 표시 토글
- **재사용 `<Modal>` 컴포넌트 도입** — Phase A 에서 만든 걸 그대로 적용 (TODO #7)
- 다시시작: 전체 state 리셋
- 학습 포인트: **배열 상태 불변 업데이트, 여러 state 동기화, 재사용 컴포넌트 실전 적용**

### Ch4. 심화 리팩터링 (i+5) — 3-5일

- `useLotto` 커스텀 훅: money/lottos/winning/result 를 한 덩어리로, `buyLotto`, `calculateResult`, `restart` 메서드 노출
- 상태 전이가 많아지니 **`useReducer` 로 재작성** (TODO #5 전반) — idle → bought → scored → 각 action 정의
- `useForm` 훅 (당첨번호 입력에 적용) — Phase A 에서 만든 걸 복잡한 케이스에 확장
- 컴포넌트 설계 회고 (TODO #3) — "어느 컴포넌트가 뭘 소유하는가?"
- (선택) 접근성 — 모달 `role="dialog"`, ESC 닫기, 포커스 트랩 (TODO #6)

---

## 3. 공부 순서 (이스타의 "미리 알기" 의지 반영)

"발견 후 학습" 원칙을 **레벨2 진입 전에는 완화**, 레벨2 중에는 유지. 4단계로 재편했어요.

### 📘 Phase A — 기본기 선제 학습 (1-2주)

**"로또 시작 전에 손에 쥐고 가야 할 것들"**

| 순서 | 항목                                         | 근거                                                                                                 | 예상 소요                    |
| ---- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------- |
| 1    | 우아한 TS 책 **8장만** 정독 (React+TS)       | 로또는 **처음부터 TS 로 쓸 거라** 이게 없으면 1줄도 못 씀                                            | 1일 (이스타 TS 레벨이면)     |
| 2    | self-paced-react 를 **TS 로 전환** (TODO #4) | 책 8장 바로 실전. 이미 익숙한 코드에 타입만 입히는 연습                                              | 2-3일                        |
| 3    | 재사용 `<Modal>` + `useForm` 훅 (TODO #7)    | 레벨2 대부분 미션에 **Modal, Form 기본 탑재**. self-paced-react 에서 만들어두면 로또에 그대로 재사용 | 3-4일                        |
| 4    | 불변성 (TODO #5 후반) — immutability.md 정독 | 모르면 무조건 버그. 레벨2 코드리뷰 단골 지적                                                         | 반나절 (이미 쓴 문서 읽기만) |

### 🎰 Phase B — 로또 React+TS 전환 (2-3주)

**위 4챕터 순서대로.**
중간에 TODO #5 `useReducer` 가 Ch4 에서 필요해지면 그때 꺼내서 학습 → 적용.

### 🛡️ Phase C — 레벨2 선제 학습 (1-2주)

**로또 끝나고 레벨2 시작 전. "문제 만나기 전 무기 장착"**

| 순서 | 항목                                               | 근거                                                                               |
| ---- | -------------------------------------------------- | ---------------------------------------------------------------------------------- |
| 1    | TODO #8 cleanup / AbortController / race condition | 레벨2 검색/필터 미션에서 race 는 **거의 확정적으로 터짐**. 모르면 그때 당황        |
| 2    | TODO #9 커스텀 훅 추출 + 로딩/에러 + React Query   | 레벨2 API 미션에서 **React Query 는 사실상 표준 도구**. 미리 손에 익혀두는 게 안전 |

> **학습 보조로 영화리뷰 레포 활용**: MovieListStore.ts:52 의 `_requestToken` 패턴을 읽으면서 "내가 손으로 짠 race 방어 vs React Query 로 풀면" 비교. 영화리뷰 전환은 안 해도 코드 읽기만으로 좋은 교본.

### 🌱 Phase D — 레벨2 진행 중 "발견 시" 공부 (상시)

**여긴 원래의 "문제 만나서 배우기" 유지.**

- TODO #3 컴포넌트 설계 원칙 — 미션 2-3개 하고 회고할 때
- TODO #6 useRef + a11y — 포커스 관리/키보드 네비 필요한 미션에서
- TODO #1 CSS 분리 — 스타일 충돌 만나거나 팀 컨벤션 정할 때
- 우아한 TS 책 **1~7장** — 8장에서 막힌 개념 역추적하며 필요한 장만 (책은 **순서대로 읽는 교재가 아니라 레퍼런스**)

---

## 🔑 핵심 변경점 한 줄

> **Phase A (선제) + Phase B (로또) + Phase C (선제) + Phase D (발견 시)**
> 레벨2 진입 전엔 **"알아야 할 건 미리"** 를 적극 적용, 레벨2 중엔 **"만나면 판다"** 로 전환.

---

## ⚖️ 총 타임라인 예상

- Phase A: 1-2주
- Phase B: 2-3주
- Phase C: 1-2주
- **합계: 4-7주**

레벨2 시작 시점 고려해서 Phase C 까지 여유 있게 들어갈 수 있으면 베스트. 빠듯하면 Phase C 2번 (React Query) 을 Phase B Ch4 뒤에 이어붙여서 압축 가능.
