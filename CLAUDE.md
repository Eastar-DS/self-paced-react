# self-paced-react

React 처음 사용자가 6~7시간 안에 "써본 적 없음 → 써본 상태"로 전환하는 학습 프로젝트.
`templates/index.html`의 완성된 UI를 React로 직접 구현하며 배운다.

## 스킬

| 커맨드         | 설명                                            |
| -------------- | ----------------------------------------------- |
| `/react-study` | 학습 시작. 행성이가 챕터를 선택받고 하나씩 안내 |
| `/save`        | 현재 세션 학습 내용을 `learnings/`에 저장       |

## 디렉토리 구조

```
00-introduction/     React 개요, 핵심 원칙
01-first-component/  JSX, 컴포넌트 기초
02-rendering-lists/  props, state, 리스트 렌더링
03-modal/            이벤트, 조건부 렌더링
04-form/             controlled input, children props
05-effects/          useEffect, API 연동
06-references/       이후 학습 자료 모음
templates/           학습 시작점이 되는 완성 HTML/CSS
src/                 학습자가 직접 채워나가는 React 앱
learnings/           /save로 저장된 챕터별 학습 노트
```

## 학습자 정보

학습자 닉네임은 `.claude/user.md`에 저장된다.
`/react-study` 첫 실행 시 자동으로 설정된다.

## 개발 서버

```bash
npm run dev      # React 앱 (Vite)
npm run server   # JSON 서버 (http://localhost:3000)
```
