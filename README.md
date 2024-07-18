<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# 🖥️ Team 광수와 아이들의 Nest.js 트렐로 만들기 프로젝트

## 프로젝트 소개

- 프로젝트 이름 : 5조 트렐로 만들기
- 내용 : 현재 사용되고 있는 트렐로와 유사한 사이트를 만들어 팀원들 팀원들 간 협업에 용이한 내용을 공유 할 수 있게 한다.
- 구분 : 팀 프로젝트
- GitHub : https://github.com/KwangSoo1555/sparta-6th-week-trello-project
- 시연 영상 : https://youtu.be/Uo9lumzJrsI <- 여기다 넣어야함. 미정
- 배포 : https://currypang.shop/ <- 여기다 넣어야함. 미정

<br>

## 팀원 구성

- 팀장 : 복광수 [@KwangSoo1555](https://github.com/KwangSoo1555)
- 팀원 : 김만규 [@fierceCry](https://github.com/fierceCry)
- 팀원 : 이윤형 [@clearghost3](https://github.com/clearghost3)
- 팀원 : 이길현 [@leegilhyeon](https://github.com/leegilhyeon)
- 팀원 : 송사무엘 [@SaintSSong](https://github.com/SaintSSong)

<br>

## 1. 개발 기간

- 2024.07.11 ~ 2024.07.18

<br>

## 2. 개발 환경

- 운영체제 : Window/Mac
- FrontEnd : X
- BackEnd : Node.js, Express, MySQL(Prisma)
- Tool : Visual Studio Code, Insomnia, MySQL Workbench, DBeaver
- Publish : PM2, AWS/RDS, AWS/EC2, AWS/load balancer

<br>

## 3. 역할 분배

- **복광수**
  - 이메일 인증 코드
  - 회원가입
  - 로그인
  - 로그아웃
  - 토근 재발급
  - 사용자 프로필 조회
  - 사용자 프로필 수정
  - 사용자 보드 조회
  - 보드 멤버 조회
  - 멤버 강제 퇴장
  - 소셜 로그인(Naver, Kakao, Google)
- **이윤형**

  - 멤버 권한 변경
  - 멤버 별명 변경
  - 보드 생성
  - 보드 수정
  - 보드 삭제
  - 보드 초대링크 생성

- **이길현**

  - 리스트 생성
  - 리스트 이름 수정
  - 리스트 삭제
  - 리스트 순서 이동

- **송사무엘**
  - 카드 생성
  - 카드 수정
  - 카드 삭제
  - 카드 순서 이동
- **김만규**
  - 카드 댓글 생성
  - 카드 댓글 수정
  - 카드 댓글 삭제
  - 카드 날짜 지정
  - 카드 파일 업로드
  - 카드 파일 삭제
  - 카드 체크리스트 내용 추가
  - 카드 체크리스트 토글 변경
  - Socket 알림 목록조회

<br>

## 4. API 명세서 및 ERD, 와이어 프레임

- API 명세서 : [https://west-territory-778.notion.site/Team-Ace-Node-js-API-221adeefaec14c38bf1a623f068c0c22?pvs=4](https://www.notion.so/teamsparta/294c35986a084687bda3f2ee3b2d103b?v=49f77c87142442b693e2449acdfdad20&pvs=4)
- ERD : ![ERD](https://github.com/user-attachments/assets/78ab3742-d735-4ca2-b9bd-a21b595daf70)

![와이어 프레임 1](https://github.com/user-attachments/assets/f31add8e-efcf-4f91-8862-465b32e1b170)
![와이어 프레임 2](https://github.com/user-attachments/assets/8cd07eb0-3078-4447-aed5-8de56ea615d8)

<br>

## 5. 주요 기능 및 설명

### 5-1. 이메일 인증 API

- 회원 가입을 위한 이메일 인증 코드를 반환하는 API입니다.

- 이메일 가입 시 이메일 인증을 위한 Nodemailer와 같은 패키지를 사용했습니다.

- nodemailer.createTransport() 메서드를 통해 메일 발송을 위한 객체를 생성합니다.

- codeObject라는 인증 코드 객체를 통해서 코드의 유효 여부를 판단합니다.

- https://github.com/KwangSoo1555/sparta-6th-week-trello-project/blob/a261f54c8a51ac41fc61c0b6f3651210b40316cb/src/modules/auth/email/email-verification.service.ts#L11

![이메일 인증](https://github.com/user-attachments/assets/2814efe7-0d20-44cd-ad26-678c94d9604a)

<br>

### 5-2. 회원가입 API

- **이메일, 비밀번호, 비밀번호 확인, 이름, 이메일 인증 코드**를 Request Body(**`req.body`**)로 전달 받습니다.

- **보안을 위해 비밀번호는** 평문(Plain Text)으로 저장하지 않고 `Hash` 된 값을 저장합니다.

- [https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/auth.routers.js#L17](https://github.com/KwangSoo1555/sparta-6th-week-trello-project/blob/a261f54c8a51ac41fc61c0b6f3651210b40316cb/src/modules/auth/users-auth/user-auth.service.ts#L37)

![회원가입](https://github.com/user-attachments/assets/85086bea-1640-4e5b-b1fd-d8cd5a86928b)

<br>

### 5-3. 로그인 API

- **이메일, 비밀번호**를 Request Body(**`req.body`**)로 전달 받습니다.

- **AccessToken(Payload**에 `사용자 ID`를 포함하고, **유효기한**이 `12시간`)을 생성합니다.

- **RefreshToken(Payload**에 `사용자 ID`를 포함하고, **유효기한**이 `7일`)을 생성합니다.

- **AccessToken**와**RefreshToken**을 반환합니다.

- [https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/auth.routers.js#L83](https://github.com/KwangSoo1555/sparta-6th-week-trello-project/blob/a261f54c8a51ac41fc61c0b6f3651210b40316cb/src/modules/auth/users-auth/user-auth.service.ts#L71)

![로그인](https://github.com/user-attachments/assets/d1751d46-ff7d-4e04-9bb1-42e04e915bcf)

<br>

### 5-4. 카카오 소셜 로그인 API 미구현

- `OAuth`를 이용한 로그인 API입니다.

- 외부의 로그인 인증 수단을 사용하기 위해 `passport` 모듈을 사용했습니다.

- 사용하기 위해서는 https://developers.kakao.com/ 에서 애플리케이션을 등록해야 합니다.

- 로그인 과정

  - `/auth/kakao` 라우터를 통해 로그인 요청이 들어오면 `passport.authenticate` 메서드 호출합니다.
  - `KakaoStrategy 전략` 실행해서 데이터베이스에 사용자 정보를 등록합니다
  - `사용자 ID`를 담은 `JWT 토큰`을 생성해서 클라이언트에게 반환합니다.

- https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/auth-passport.router.js#L17

![카카오 소셜 로그인 API](./imgs/4-kakao-social.png)

<br>

### 5-5. 네이버 소셜 로그인 API 미구현

- `OAuth`를 이용한 로그인 API입니다.

- 외부의 로그인 인증 수단을 사용하기 위해 `passport` 모듈을 사용했습니다.

- 사용하기 위해서는 https://developers.naver.com/ 에서 애플리케이션을 등록해야 합니다.

- 로그인 과정

  - `/auth/naver` 라우터를 통해 로그인 요청이 들어오면 `passport.authenticate` 메서드 호출합니다.
  - `naverStrategy 전략` 실행해서 데이터베이스에 사용자 정보를 등록합니다
  - `사용자 ID`를 담은 `JWT 토큰`을 생성해서 클라이언트에게 반환합니다.

- https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/auth-passport.router.js#L38

![네이버 소셜 로그인 API](./imgs/5-naver-social.png)

<br>

### 5-6. 토큰 재발급 API 맞는지 확인 필요

- `Refresh Token`를 새롭게 발급 API입니다.

- 다른 API와는 다르게 `Refresh Token`을 `헤더`로 받아와서 `DB에 있는 토큰`과 비교합니다.

- 토큰 유효성 검사가 통과하면 새로운 Refresh 토큰을 재발급 받습니다.

- [https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/auth.routers.js#L109](https://github.com/KwangSoo1555/sparta-6th-week-trello-project/blob/a261f54c8a51ac41fc61c0b6f3651210b40316cb/src/modules/auth/users-auth/user-auth.service.ts#L71)

<br>

### 5-7. 로그아웃 API

- 로그인한 사용자가 로그아웃 하는 API입니다.

- refreshTokenValidator 통해서 로그인한 사용자의 Refresh Token를 검증합니다.

- 토큰 유효성 검사가 통과하면 DB에 있는 기존 Refresh Token을 null값으로 변경합니다.

- 즉, Refresh Token을 폐기하는 것입니다.

- https://github.com/KwangSoo1555/sparta-6th-week-trello-project/blob/a261f54c8a51ac41fc61c0b6f3651210b40316cb/src/modules/auth/users-auth/user-auth.service.ts#L113

![로그아웃](https://github.com/user-attachments/assets/75ce52ce-4a90-48cd-9302-c743f2987c71)

<br>

### 5-8. 내 정보 조회 API

- 로그인한 사용자의 정보를 조회하는 API입니다.

- `accessTokenValidator`를 통해서 로그인한 사용자의 `Access Token를 검증`합니다.

- 토큰 유효성 검사가 통과하면 `id: userId`를 통해 사용자의 정보를 가져옵니다.

- 그대로 조회한 사용자 데이터를 반환합니다.

- https://github.com/KwangSoo1555/sparta-6th-week-trello-project/blob/a261f54c8a51ac41fc61c0b6f3651210b40316cb/src/modules/users/users.service.ts#L28

![내 정보 가져오기](https://github.com/user-attachments/assets/74f82e8c-ea2b-4036-8d49-b2f9383cb66f)

<br>

### 5-9. 내 정보 수정 API

- 사용자의 정보를 수정하는 API입니다.

- `이메일, 이름, 수정할 비밀번호, 수정할 비밀번호 확인`을 `req.body`를 통해 받아옵니다.

- https://github.com/KwangSoo1555/sparta-6th-week-trello-project/blob/a261f54c8a51ac41fc61c0b6f3651210b40316cb/src/modules/users/users.service.ts#L35

![내 정보 수정하기](https://github.com/user-attachments/assets/8f7e6b0b-299a-4fa8-a28b-21c7838e20f1)

<br>

### 5-10. 보드 생성 API

- 보드의 정보를 입력 받아 보드를 생성하는 API입니다.
  
- `보드 제목, 보드 내용, 백그라운드 컬러, 닉네임`을 `req.body`를 통해 받아옵니다.
  
![보드 생성](https://github.com/user-attachments/assets/f16e06eb-26d0-4070-a768-4b705b76e449)

<br>

### 5-11. 유저 강퇴 기능

- 보드내에 존재하는 유저를 강퇴하는 기능입니다.
  
- 해당 유저가 서버에 존재하는지 확인합니다.
  
![서버에 존재 확인](https://github.com/user-attachments/assets/58765789-3fe8-4629-a112-8b9d636c7dea)

- 강퇴하는 유저와, 강퇴당하는 유저의 역할을 비교 후, 강퇴를 실행합니다.
  
![유저 강퇴](https://github.com/user-attachments/assets/2ff6398b-ac31-4ecd-afef-971ed9567890)

<br>

### 5-12. 보드 초대 링크 생성

- 보드의 초대 링크를 만드는 API입니다.
  
- 초대 링크의 형식은 inviteLink/board${초대 보드의 숫자} 형식을 따릅니다.
  
- 만들어진 링크를 통해 다른 유저가 서버에 들어올 수 있습니다.
  
  ![유저 초대 받기](https://github.com/user-attachments/assets/c8bb5b08-d509-4120-a846-1e6447612199)
  
<br>

### 5-13. 보드 수정 API

- 보드의 정보를 수정하는 API입니다.
  
- 보드 작성과 마찬가지로 `보드 제목, 보드 내용, 색깔, 이미지`를 `req.body`를 통해 받아옵니다.
  
- 위 내용은 필수로 받아오는 게 아니라 `일부만 수정이 가능`합니다.
  
![보드 수정](https://github.com/user-attachments/assets/3ed828c6-2b3c-4c54-9561-ccfd88b0243e)

<br>

### 5-14. 보드 삭제 API

- 상품 게시물을 선택해서 삭제하는 API입니다.
  
- `상품 게시물의 ID`는 `req.params`를 통해 URL에서 가져옵니다.
  
- 해당 ID를 조회하고 삭제를 진행합니다. `(Hard Delete)`
  
- https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/trade.router.js#L238
  
![보드 삭제](https://github.com/user-attachments/assets/52afb683-d4c8-4775-96fb-196f32ac2de4)

<br>

### 5-15. 리스트 생성 API

- 보드에 들어갈 리스트를 생성하는 API입니다.

- 이후 리스트 속에는 카드가 들어 갈 수 있습니다.

- [https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/trade.router.js#L271](https://github.com/KwangSoo1555/sparta-6th-week-trello-project/blob/c07c6a107ae51498a53f4d7f3f8b45da6313338a/src/modules/list/list.service.ts#L20)

![리스트 생성](https://github.com/user-attachments/assets/b6f5126f-4713-422b-9864-5ba1c47bdb6a)

<br>

### 5-16. 리스트 전체 조회 API

- 작성된 리스트들을 전부 조회하는 API입니다.

- :boardId를 통해 특정 보더를 지정하고 보더 속에 있는 리스트 전체를 가져옵니다.

- https://github.com/KwangSoo1555/sparta-6th-week-trello-project/blob/c07c6a107ae51498a53f4d7f3f8b45da6313338a/src/modules/list/list.service.ts#L59

![리스트 전체 조회](https://github.com/user-attachments/assets/057e35e6-ca24-487f-a499-55866f1388f9)

<br>

### 5-17. 리스트 상세 조회 API

- 작성된 리스트 중 특정 리스트 하나를 조회하는 API입니다.

- :boardId를 통해 특정 보더를 지정하고 보더 속에 있는 리스트 중 :listId로 찾은 것 하나를 가져옵니다.

- [https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/comment.router.js#L66](https://github.com/KwangSoo1555/sparta-6th-week-trello-project/blob/c07c6a107ae51498a53f4d7f3f8b45da6313338a/src/modules/list/list.service.ts#L43)

![리스트 상세 조회](https://github.com/user-attachments/assets/14ae8081-1e37-4847-aa43-8e7a23930ee6)

<br>

### 5-18. 리스트 수정 API

- 작성된 리스트 중 특정 리스트 하나를 수정하는 API입니다.

- :boardId를 통해 특정 보더를 지정하고 보더 속에 있는 리스트 중 :listId로 찾은 것 하나를 선택 한 후 수정합니다.

- [https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/comment.router.js#L120](https://github.com/KwangSoo1555/sparta-6th-week-trello-project/blob/c07c6a107ae51498a53f4d7f3f8b45da6313338a/src/modules/list/list.service.ts#L67)

![리스트 수정](https://github.com/user-attachments/assets/6281b3d8-1bc7-46e2-91c7-aacc3a57c766)

<br>

### 5-19. 리스트 순서 이동 API

- 작성된 리스트 중 특정 리스트 하나를 타겟 리스트의 위치로 이동하게 만드는 API입니다

- :boardId를 통해 특정 보더를 지정하고 보더 속에 있는 리스트 중 :listId로 찾은 것 하나를 선택 한 후 특정 위치(newPositionId)로 이동하게 합니다.

- [https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/comment.router.js#L358](https://github.com/KwangSoo1555/sparta-6th-week-trello-project/blob/c07c6a107ae51498a53f4d7f3f8b45da6313338a/src/modules/list/list.service.ts#L93)

![리스트 순서 이동](https://github.com/user-attachments/assets/417c965f-d12d-4de2-b39f-26af28cefbe4)
![리스트 순서 이동](https://github.com/user-attachments/assets/77956295-4689-44e1-8589-c2f1248fdb62)

<br>

### 5-20. 리스트 삭제 API

- 작성된 리스트 중 특정 리스트 하나를 삭제하는 API입니다

- :boardId를 통해 특정 보더를 지정하고 보더 속에 있는 리스트 중 :listId로 찾은 것 하나를 선택 한 후 삭제합니다.

- 삭제 후 리스트의 순서를 지칭하는 order_index의 순서를 재 정립하여 오류가 발생하지 않도록 합니다.

- [https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/comment.router.js#L195](https://github.com/KwangSoo1555/sparta-6th-week-trello-project/blob/c07c6a107ae51498a53f4d7f3f8b45da6313338a/src/modules/list/list.service.ts#L93)

![리스트 삭제](https://github.com/user-attachments/assets/6674574d-3480-4556-8c10-408113c13120)

<br>

### 5-21. 카드 생성 API

- 리스트 속 카드를 생성하는 API입니다.

- listId 통해 특정 리스트를 지정하고 그 속에서 카드를 생성합니다.

- 카드 제목("cardTitle)를 `req.body`를 통해 가져옵니다.

- [https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/trade-complete.router.js#L12](https://github.com/KwangSoo1555/sparta-6th-week-trello-project/blob/6ae86b21af9a9cb412ca8555811d34fc9a2a7409/src/modules/cards/card.service.ts#L29)

![카드 생성](https://github.com/user-attachments/assets/3e22243b-29bd-4bc5-969c-b1703bfa4939)

<br>

### 5-22. 카드 수정 API

- 리스트 속 카드 내용을 수정하는 API입니다.

- listId 통해 특정 리스트를 지정하고 그 속에서 카드 내용을 변경합니다.

- 카드 제목, 카드 내용, 카드 배경 색상, 작업자 할당 및 변경을 `req.body`를 통해 가져옵니다.

- [https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/trade-history.router.js#L11](https://github.com/KwangSoo1555/sparta-6th-week-trello-project/blob/6ae86b21af9a9cb412ca8555811d34fc9a2a7409/src/modules/cards/card.service.ts#L78)

![카드 수정](https://github.com/user-attachments/assets/75c69d41-9516-44f9-8abb-aa0c78630560)

<br>

### 5-23. 카드 삭제 API

- 리스트 속 카드를 삭제하는 API입니다.

- listId 통해 특정 리스트를 지정하고 cardId를 통해서 특정 카드를 지정한 후 카드를 삭제합니다.

- [https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/follow.router.js#L10](https://github.com/KwangSoo1555/sparta-6th-week-trello-project/blob/6ae86b21af9a9cb412ca8555811d34fc9a2a7409/src/modules/cards/card.service.ts#L147)

![카드 삭제](https://github.com/user-attachments/assets/41f1e68b-39e3-4469-b8de-1ed2f29394ae)

<br>

### 5-24. 카드 순서 변경 API

- 리스트 속 카드의 순서를 API입니다.

- listId 통해 특정 리스트를 지정하고 그 속의 카드를 orderIndex를 통해서 특정 위치를 가진 카드를 지정합니다.

- 그 후 타켓 위치의 리스트와 카드를 "swapListIndex" 와 "swapCardOrderIndex"로 받아서 위치를 특정하여 이동할 위치를 지정합니다.

- [https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/follow.router.js#L10](https://github.com/KwangSoo1555/sparta-6th-week-trello-project/blob/6ae86b21af9a9cb412ca8555811d34fc9a2a7409/src/modules/cards/card.service.ts#L147)

![카드 삭제](https://github.com/user-attachments/assets/41f1e68b-39e3-4469-b8de-1ed2f29394ae)

<br>

### 5-25. 카드 코멘트 생성 변경 API

- 리스트 속 카드의 코멘트를 생성하는 API입니다.

- listId 통해 특정 리스트를 지정하고 그 속의 카드를 orderIndex를 통해서 특정 위치를 가진 카드를 지정합니다.

- 그 후 타켓 위치의 리스트와 카드를 "swapListIndex" 와 "swapCardOrderIndex"로 받아서 위치를 특정하여 이동할 위치를 지정합니다.

- [https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/follow.router.js#L10](https://github.com/KwangSoo1555/sparta-6th-week-trello-project/blob/6ae86b21af9a9cb412ca8555811d34fc9a2a7409/src/modules/cards/card.service.ts#L147)

![카드 삭제](https://github.com/user-attachments/assets/41f1e68b-39e3-4469-b8de-1ed2f29394ae)

<br>

### 5-23. 카드 순서 변경 API

- 리스트 속 카드의 순서를 API입니다.

- listId 통해 특정 리스트를 지정하고 그 속의 카드를 orderIndex를 통해서 특정 위치를 가진 카드를 지정합니다.

- 그 후 타켓 위치의 리스트와 카드를 "swapListIndex" 와 "swapCardOrderIndex"로 받아서 위치를 특정하여 이동할 위치를 지정합니다.

- [https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/follow.router.js#L10](https://github.com/KwangSoo1555/sparta-6th-week-trello-project/blob/6ae86b21af9a9cb412ca8555811d34fc9a2a7409/src/modules/cards/card.service.ts#L147)

![카드 삭제](https://github.com/user-attachments/assets/41f1e68b-39e3-4469-b8de-1ed2f29394ae)

<br>

### 5-23. 카드 순서 변경 API

- 리스트 속 카드의 순서를 API입니다.

- listId 통해 특정 리스트를 지정하고 그 속의 카드를 orderIndex를 통해서 특정 위치를 가진 카드를 지정합니다.

- 그 후 타켓 위치의 리스트와 카드를 "swapListIndex" 와 "swapCardOrderIndex"로 받아서 위치를 특정하여 이동할 위치를 지정합니다.

- [https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/follow.router.js#L10](https://github.com/KwangSoo1555/sparta-6th-week-trello-project/blob/6ae86b21af9a9cb412ca8555811d34fc9a2a7409/src/modules/cards/card.service.ts#L147)

![카드 삭제](https://github.com/user-attachments/assets/41f1e68b-39e3-4469-b8de-1ed2f29394ae)

<br>

## 6. 어려웠던 점

### 6-1. N:M 관계 vs 1:N 관계의 차이 (복광수)

- ERD 작성을 하면서 사용자가 게시물에 좋아요를 누를 경우에 대해서 이야기가 나왔음

- 

<br>

### 6-2. 소셜 로그인과 기존 인증방식의 호환 (김만규)

- passport를 이용한 소셜 로그인을 구현했을 때 받아오는 토큰을 사용하면 기존 JWT를 사용하던 인증 로직을 재사용 할 수 없음

- 

<br>

### 6-3. Prisma 작동 로직의 이해 (이윤형)

- 백엔드 작업에 필수적인 서버를 구현하는 방식인 Prisma의 이해가 잘 되지 않았음

- 

<br>

### 6-4. 계획, 설계의 부족과 테스트 여러움 (이길현)

- 클라이언트에게 어떤 방향으로 서비스를 제공할 것인지 미리 계획을 잡지 않아 로직 구현 도중 서비스 방향성이 잡히지 않았음

- 

<br>

### 6-4. 계획, 설계의 부족과 테스트 여러움 (송사무엘)

- 클라이언트에게 어떤 방향으로 서비스를 제공할 것인지 미리 계획을 잡지 않아 로직 구현 도중 서비스 방향성이 잡히지 않았음

- 

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# develop mode
$ npm run dev

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

```
6th-trello-project
├─ .github
│  └─ workflows
│     ├─ cd.yml
│     └─ ci.yml
├─ presentation
│  ├─ drawSQL-image-export-2024-07-12.png
│  ├─ trello figma.png
│  └─ trello project memo.txt
├─ src
│  ├─ common
│  │  ├─ constants
│  │  │  ├─ auth.constant.ts
│  │  │  ├─ board.contant.ts
│  │  │  ├─ dto.constant.ts
│  │  │  ├─ env.constant.ts
│  │  │  └─ messages.constant.ts
│  │  └─ custom
│  │     ├─ decorator
│  │     │  ├─ user-request-jwt.ts
│  │     │  └─ user-roles-guards.ts
│  │     ├─ pipes
│  │     │  ├─ auth-validator.ts
│  │     │  └─ file-size-validation.pipe.ts
│  │     └─ types
│  │        ├─ enum-color.type.ts
│  │        ├─ enum-member-roles.ts
│  │        └─ enum-social-provider.ts
│  │
│  ├─ database
│  │  ├─ redis
│  │  ├─ seeds
│  │  │  ├─ 01-user-seed.ts
│  │  │  ├─ 02-board-seed.ts
│  │  │  ├─ 03-member-seed.ts
│  │  │  ├─ 04-list-seed.ts
│  │  │  ├─ 05-card-seed.ts
│  │  │  ├─ 06-card-assignee-seed.ts
│  │  │  ├─ 07-card-check-list-seed.ts
│  │  │  ├─ 08-card-comment-seed.ts
│  │  │  ├─ 09-file-seed.ts
│  │  │  └─ 10-notification-seed.ts
│  │  └─ typeorm
│  │     ├─ typeorm.config.ts
│  │     └─ typeorm.module.ts
│  │
│  ├─ entities
│  │  ├─ boards.entity.ts
│  │  ├─ card-assignees.entity.ts
│  │  ├─ card-check-list.entity.ts
│  │  ├─ card-comments.entity.ts
│  │  ├─ cards.entity.ts
│  │  ├─ files.entity.ts
│  │  ├─ lists.entity.ts
│  │  ├─ members.entity.ts
│  │  ├─ notification.entity.ts
│  │  ├─ refresh-tokens.entity.ts
│  │  └─ users.entity.ts
│  │
│  └─ modules
│     ├─ auth
│     │  ├─ email
│     │  │  ├─ email-verification.controller.ts
│     │  │  ├─ email-verification.dto.ts
│     │  │  ├─ email-verification.module.ts
│     │  │  └─ email-verification.service.ts
│     │  ├─ jwt
│     │  │  ├─ jwt-strategy.service.ts
│     │  │  ├─ jwt.controller.ts
│     │  │  ├─ jwt.module.ts
│     │  │  └─ jwt.service.ts
│     │  ├─ social
│     │  │  ├─ dto
│     │  │  │  ├─ social.google.dto.ts
│     │  │  │  ├─ social.kakao.dto.ts
│     │  │  │  └─ social.naver.dto.ts
│     │  │  ├─ google
│     │  │  │  ├─ google-passport.controller.ts
│     │  │  │  ├─ google-passport.module.ts
│     │  │  │  ├─ google-passport.service.ts
│     │  │  │  └─ jwt-google-strategy.service.ts
│     │  │  ├─ kakao
│     │  │  │  ├─ jwt-kakao-strategy.service.ts
│     │  │  │  ├─ kakao-passport.controller.ts
│     │  │  │  ├─ kakao-passport.module.ts
│     │  │  │  └─ kakao-passport.service.ts
│     │  │  └─ naver
│     │  │     ├─ jwt-naver-strategy.service.ts
│     │  │     ├─ naver-passport.controller.ts
│     │  │     ├─ naver-passport.module.ts
│     │  │     └─ naver-passport.service.ts
│     │  └─ users-auth
│     │     ├─ dto
│     │     │  ├─ user-auth-log-in.dto.ts
│     │     │  └─ user-auth-sign-up.dto.ts
│     │     ├─ user-auth.controller.ts
│     │     ├─ user-auth.module.ts
│     │     └─ user-auth.service.ts
│     ├─ board
│     │  ├─ board.controller.ts
│     │  ├─ board.module.ts
│     │  ├─ board.service.ts
│     │  └─ dto
│     │     ├─ board.create.dto.ts
│     │     └─ board.update.dto.ts
│     ├─ card-comment
│     │  ├─ card-comment.controller.ts
│     │  ├─ card-comment.module.ts
│     │  ├─ card-comment.service.ts
│     │  └─ dto
│     │     ├─ card-comment.create.dto.ts
│     │     └─ card-comment.update.dto.ts
│     ├─ cards
│     │  ├─ card.controller.ts
│     │  ├─ card.module.ts
│     │  ├─ card.service.ts
│     │  └─ dtos
│     │     ├─ create.cardDto.ts
│     │     ├─ swap.cardDto.ts
│     │     └─ update.cardDto.ts
│     ├─ events
│     │  ├─ dto
│     │  │  ├─ notification.dto.ts
│     │  │  └─ notification.update.dto.ts
│     │  ├─ events.controller.ts
│     │  ├─ events.gateway.ts
│     │  ├─ events.module.ts
│     │  └─ events.service.ts
│     ├─ file
│     │  ├─ file.controller.spec.ts
│     │  ├─ file.controller.ts
│     │  ├─ file.module.ts
│     │  └─ file.service.ts
│     ├─ list
│     │  ├─ dto
│     │  │  ├─ create-list.dto.ts
│     │  │  ├─ update-list-order.dto.ts
│     │  │  └─ update-list.dto.ts
│     │  ├─ list.controller.ts
│     │  ├─ list.module.ts
│     │  └─ list.service.ts
│     ├─ members
│     │  ├─ dto
│     │  │  ├─ member.create.dto.ts
│     │  │  └─ member.update.dto.ts
│     │  ├─ members.controller.ts
│     │  ├─ members.module.ts
│     │  └─ members.service.ts
│     ├─ redis
│     │  ├─ ioredis.provider.ts
│     │  └─ redis.module.ts
│     ├─ users
│     │  ├─ users.controller.ts
│     │  ├─ users.dto.ts
│     │  ├─ users.module.ts
│     │  └─ users.service.ts
│     │
│     ├─ app.controller.ts
│     ├─ app.module.ts
│     ├─ app.service.ts
│     └─ main.ts
├─ test
│  ├─ app.e2e-spec.ts
│  └─ jest-e2e.json
│
├─ .env
├─ .eslintrc.js
├─ .gitignore
├─ .prettierrc
├─ nest-cli.json
├─ ormconfig.ts
├─ package-lock.json
├─ package.json
├─ README.md
├─ tsconfig.build.json
├─ tsconfig.json
└─ webpack-hmr.config.js
