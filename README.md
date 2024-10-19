# icd01-team05_06-commerce-fe

## 개요
<div style="display: flex; flex-direction: row;">
  <img width="33%" alt="image" src="https://github.com/user-attachments/assets/1e3727e7-698b-4ecc-a37d-61c30801a58d">
  <img width="33%" alt="image" src="https://github.com/user-attachments/assets/d19a37bb-f69f-4e70-976b-52454f2cfa6e">
  <img width="33%" alt="image" src="https://github.com/user-attachments/assets/24642082-c83c-428f-a4b4-a3c585e304c3">
</div>
<br/>

도서 이커머스 '이너북스' 프로젝트 입니다. Next.js와 TypeScript로 개발되었으며, 상태 관리를 위해 **zustand**, UI 구성 요소에 **shadcn** , 스타일링에 **tailwindcss** , 데이터 요청을 위해 **ky**를 사용합니다. **App Router**를 사용하여 효율적인 라우팅을 구현했습니다.

## 기능
- **도서 검색 및 상세 정보**
  - 도서 검색 및 도서 상세 조회
  - 도서 리뷰 조회 및 작성 기능을 제공
- **사용자 인증**
  - 회원가입 및 로그인 기능을 통해 사용자 인증을 지원
  - **NextAuth 대신 JWT 기반 인증**: 외부 서버에서 JWT를 관리하며, NextAuth를 사용하면 JWT를 두 번 관리하게 되어 리소스 낭비를 방지하고자 **server action**과 **zustand**로 로그인 상태를 관리
- **장바구니 및 주문하기**
  - 사용자가 선택한 도서를 장바구니에 담고, 주문을 완료
- **마이 페이지**
  - 주문 내역 및 주분 상세 조회
  - 회원 정보 수정
  - 나의 리뷰 내역 조회 및 수정

## 개발 스케줄
- **에러 핸들링 구현**: `server action` 및 `router handler`에 **try-catch를 사용한 에러 핸들링** 작업 예정
- **단위 테스트**: **Vitest** 기반의 단위 테스트 코드 작성 예정(~24.10.26)
- **통합 테스트**: **Playwright** 기반의 통합 테스트 코드 작성 예정(~24.11.03)
- **데이터 관리 개선**: **tanstack query**를 적용하여 데이터 관리 및 캐싱 최적화 예정
- **반응형 디자인 적용**: 모바일 환경에서 **헤더에 마이페이지 접근 UI** 추가 예정
- **사용자 인증**: **토큰 만료 시 로그아웃**되는 로직 수정 필요
- **라우터 핸들러 및 server action 개선**:
  - 초기에는 SSR에서의 쿠키 설정 문제로 인해 모든 외부 서버와의 통신을 `server action`으로 처리함
  - **캐싱 필요성에 따른 수정 예정**: `server action`은 `GET` 요청 시 캐싱 문제를 일으키기 때문에, **캐싱이 필요한 GET 요청은 라우터 핸들러로 처리**하는 방식으로 변경할 예정

## 시작하기

### 의존성 설치
```bash
pnpm install
```

### 환경변수 설정
apps/commerce-client-web 경로에 .env 파일을 생성
```bash
NEXT_PUBLIC_EXTERNAL_API_URL=https://76ztyqn6fe.execute-api.ap-northeast-2.amazonaws.com/
```

### 애플리케이션 실행
루트 폴더에서 아래의 명령어 실행
```bash
pnpm run dev:client
```

## 배포링크
https://commerce-innerbooks.vercel.app/
