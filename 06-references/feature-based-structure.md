# Feature-based Folder Structure

React 프로젝트가 커질 때 가장 흔히 쓰이는 폴더 구조. **기능(도메인) 단위로 코드를 모으는 방식**이다.

---

## 왜 이게 필요한가

### 문제: Type-based 구조의 한계

프로젝트 초반엔 보통 이렇게 시작한다:

```
src/
├── components/
│   ├── Header.jsx
│   ├── CategoryFilter.jsx
│   ├── RestaurantList.jsx
│   ├── RestaurantDetailModal.jsx
│   ├── AddRestaurantModal.jsx
│   └── ...
├── hooks/
├── utils/
└── api/
```

**작을 땐 문제없다.** 컴포넌트 5~10 개 정도면 이름만 봐도 찾을 수 있다.

그런데 기능이 늘어나면:

```
src/components/
├── Header.jsx
├── CategoryFilter.jsx
├── RestaurantList.jsx
├── RestaurantDetailModal.jsx
├── AddRestaurantModal.jsx
├── UserList.jsx              ← 사용자 기능
├── UserProfile.jsx
├── LoginForm.jsx
├── SignupForm.jsx
├── OrderList.jsx             ← 주문 기능
├── OrderDetail.jsx
├── CartSidebar.jsx
├── PaymentForm.jsx
└── ... (50 개...)
```

이 시점부터 고통이 시작된다:

1. **"음식점 기능과 관련된 파일이 뭐뭐야?"** — 이름으로 일일이 골라내야 함. 실수로 하나 빠뜨릴 수 있음.
2. **"주문 기능을 통째로 제거해야 해."** — `components/` 를 뒤져서 관련된 걸 골라내고, `hooks/` 도 뒤지고, `api/` 도 뒤지고… 같은 기능이 **여러 폴더에 흩어져 있다.**
3. **"이 훅은 어디서 쓰이지?"** — `useRestaurants` 훅이 `components/` 와 얼마나 밀접한지 폴더만 봐선 모름.

**핵심 문제: "함께 바뀌는 파일이 같이 모여 있지 않다."**

---

## 해결: Feature-based 구조

**기능(도메인) 단위로 폴더를 나눈다.** 한 기능과 관련된 모든 파일 — 컴포넌트, 훅, API 호출, 타입 — 이 한 폴더 안에 산다.

```
src/
├── features/
│   ├── restaurant/
│   │   ├── components/
│   │   │   ├── RestaurantList.jsx
│   │   │   ├── RestaurantDetailModal.jsx
│   │   │   ├── AddRestaurantModal.jsx
│   │   │   └── CategoryFilter.jsx
│   │   ├── hooks/
│   │   │   └── useRestaurants.js
│   │   ├── api/
│   │   │   └── restaurantApi.js
│   │   ├── types.ts
│   │   └── index.js              ← 외부로 공개할 것만 re-export
│   │
│   ├── user/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── ...
│   │
│   └── order/
│       └── ...
│
├── shared/                       ← 기능 간 공통으로 쓰이는 것
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── Modal.jsx
│   │   └── Input.jsx
│   ├── hooks/
│   │   └── useDebounce.js
│   └── utils/
│
├── app/                          ← 앱 전역 설정 (라우팅, 전역 스타일)
│   └── App.jsx
│
└── main.jsx
```

### 세 개의 계층

| 계층 | 역할 | 예시 |
|---|---|---|
| `features/*` | 특정 도메인에 귀속되는 모든 코드 | `features/restaurant/` |
| `shared/*` | 여러 기능이 공통으로 쓰는 **범용** 컴포넌트/훅 | `Button`, `Modal`, `useDebounce` |
| `app/*` | 앱 전체 설정, 진입점 | 라우팅, Provider 조합 |

---

## 구체 예시: 우리 프로젝트에 적용한다면

현재:

```
src/
├── components/
│   ├── Header.jsx
│   ├── CategoryFilter.jsx
│   ├── RestaurantList.jsx
│   ├── RestaurantDetailModal.jsx
│   └── AddRestaurantModal.jsx
├── App.jsx
└── main.jsx
```

Feature-based 로 옮기면:

```
src/
├── features/
│   └── restaurant/
│       ├── components/
│       │   ├── CategoryFilter.jsx
│       │   ├── RestaurantList.jsx
│       │   ├── RestaurantDetailModal.jsx
│       │   └── AddRestaurantModal.jsx
│       ├── constants.js           ← CATEGORIES 배열 등
│       └── types.ts               ← Restaurant, Category 타입
│
├── shared/
│   └── components/
│       └── Header.jsx             ← 특정 기능에 묶이지 않음
│
├── App.jsx
└── main.jsx
```

**판단 근거:**
- `RestaurantList`, `RestaurantDetailModal`, `AddRestaurantModal`, `CategoryFilter` 는 **전부 음식점 도메인** → `features/restaurant/`.
- `Header` 는 "앱 상단 레이아웃" 이라 도메인 중립 → `shared/`. (만약 Header 가 "음식점 추가 버튼" 처럼 특정 기능에 깊이 얽히면 `features/restaurant/` 로 옮기는 것도 논의 가능.)

---

## 규칙 몇 가지

### 1. 기능끼리는 직접 import 하지 않는다

```jsx
// ❌ BAD
// features/order/components/OrderList.jsx
import { RestaurantCard } from "../../restaurant/components/RestaurantCard";
```

기능 간 의존성은 **`shared/` 를 통하거나, 상위 `app/` 레이어에서 합친다.** 그렇지 않으면 `features/` 로 나눈 의미가 없어지고 원래 섞여 있던 것과 똑같아짐.

### 2. 한 기능의 `index.js` 로 공개 API 를 통제한다

```js
// features/restaurant/index.js
export { RestaurantList } from "./components/RestaurantList";
export { useRestaurants } from "./hooks/useRestaurants";
// 내부용 헬퍼는 export 하지 않음
```

외부에서는 `import { RestaurantList } from "@/features/restaurant"` 로만 접근. 기능 내부 구조는 언제든 리팩터링 가능.

🔑 관련 키워드: **barrel exports**

### 3. `shared/` 에는 도메인 용어가 없어야 한다

```
shared/components/Button.jsx       ✅  — 어디서든 쓸 수 있음
shared/components/RestaurantCard.jsx   ❌  — 음식점 도메인 단어. features/restaurant 로
```

`shared/` 에 도메인 이름이 들어가면 그 기능이 `shared/` 에 스며들고 있다는 신호.

### 4. 기능을 **지우기 쉬운** 방향으로 설계한다

"order 기능 필요 없어졌어" → `features/order/` 폴더 삭제 + `App.jsx` 에서 라우트 한 줄 제거. 다른 기능엔 영향 없음. 이게 이상적인 상태.

---

## 언제 적용하면 좋은가

| 프로젝트 상태 | 추천 구조 |
|---|---|
| 컴포넌트 5~10 개, 혼자 작업 | Type-based 로 충분 |
| 기능 2~3 개 이상 또는 팀 작업 | **Feature-based 전환 권장** |
| 여러 앱이 코드 공유 | Monorepo + Feature-based |

**억지로 초반부터 도입하지 말 것.** 작은 프로젝트엔 과잉 구조가 오히려 방해. "뭔가 폴더가 답답하다, 관련 파일을 찾기 힘들다" 는 체감이 올 때 옮기는 게 자연스럽다.

---

## 흔한 함정

### 함정 1: "모든 걸 features 에 넣으면 될 줄 알았다"

기능 간에 점점 `import` 가 얽히기 시작하면 **features 간 직접 참조 금지** 원칙을 지키는 게 어려워진다. 규칙을 명확히 세우지 않으면 금세 원점 회귀.

### 함정 2: "shared 가 또 하나의 쓰레기통이 된다"

기능에서 "어디 둘지 애매한 컴포넌트" 를 전부 `shared/` 에 밀어 넣는 패턴. 결국 shared 폴더가 새로운 거대한 components 폴더로 변함. `shared/` 에 넣을 땐 **"정말 3 개 이상의 기능이 공통으로 쓰나?"** 를 질문할 것.

### 함정 3: 기능 경계를 잘못 그음

"음식점" 과 "주문" 을 각각의 기능으로 나눴는데, 실제론 두 기능이 강하게 결합해 항상 같이 바뀐다면 — 경계가 틀렸을 가능성. 경계는 **"이 폴더를 통째로 지울 수 있는가?"** 로 검증해보자.

---

## 더 읽어볼 자료

- [Bulletproof React](https://github.com/alan2207/bulletproof-react) — Feature-based 를 제대로 적용한 실전 저장소. `src/features/` 구조를 그대로 참고 가능.
- [Screaming Architecture (Robert C. Martin)](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html) — "폴더 구조만 봐도 앱의 도메인이 드러나야 한다" 는 원칙. Feature-based 의 철학적 뿌리.
- Kent C. Dodds, [Colocation](https://kentcdodds.com/blog/colocation) — "함께 바뀌는 것은 함께 둔다." Feature-based 를 관통하는 원칙.

---

## 한 줄 요약

> **기능 하나를 통째로 지울 수 있도록 폴더를 나눠라.**
