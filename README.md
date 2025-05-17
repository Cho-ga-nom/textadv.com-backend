# textadv.com-backend

**textadv.com**는 사용자가 직접 텍스트 기반 게임을 제작하고 공유하며 즐길 수 있는 웹 플랫폼입니다. 이 프로젝트는 텍스트 게임의 창작과 플레이를 웹 환경에서 손쉽게 구현할 수 있도록 지원합니다.

### 도메인 만료로 서비스하고 있지 않습니다.

## 🛠 기술 스택

* **TypeScript**
* **NestJS**
* **PostgreSQL**
* **Redis**
* **Docker**
* **AWS**(EC2, Rds, Route 53)

## 📁 프로젝트 구조

```
textadv.com-backend/
├── src/                # 주요 소스 코드
├── test/               # 테스트 코드
├── public/             # 정적 파일
├── .env                # 환경 변수 설정
├── Dockerfile          # Docker 이미지 설정
├── docker-compose.yml  # Docker Compose 설정
├── package.json        # 프로젝트 메타데이터 및 의존성
├── tsconfig.json       # TypeScript 설정
└── README.md           # 프로젝트 설명 파일
```



## 🚀 시작하기

### 1. 레포지토리 클론

```bash
git clone https://github.com/Cho-ga-nom/textadv.com-backend.git
cd textadv.com-backend
```



### 2. 환경 변수 설정

`.env` 파일을 생성하고 필요한 환경 변수를 설정합니다. 예시:

```env
DATABASE_URL=postgres://user:password@localhost:5432/textadv
REDIS_HOST=localhost
REDIS_PORT=6379
```



### 3. Docker를 통한 실행

```bash
docker-compose up --build
```



이 명령어는 PostgreSQL, Redis, NestJS 서버를 포함한 모든 서비스를 컨테이너로 실행합니다.

### 4. 로컬 실행 (옵션)

Docker를 사용하지 않고 로컬에서 직접 실행하려면:

```bash
npm install
npm run start:dev
```



## 🧪 테스트

```bash
npm run test
```



## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙌 기여

기여를 환영합니다! 이슈를 생성하거나 풀 리퀘스트를 제출하여 프로젝트에 참여해주세요.

## 🔗 관련 링크

* 프론트엔드 저장소: [One-room-developers/Twine\_pull](https://github.com/One-room-developers/Twine_pull)
* 공식 웹사이트: [textadv.com](https://textadv.com)

---

추가로 프로젝트에 대한 스크린샷, API 문서, 배포 링크 등이 있다면 README에 포함시키는 것이 좋습니다. 필요하시면 해당 부분도 도와드리겠습니다!

[1]: https://medium.com/%40sumudithalanz/the-art-of-crafting-an-effective-readme-for-your-github-project-cf425a8b1580?utm_source=chatgpt.com "How to Create a Perfect README for Your GitHub Project - Medium"
[2]: https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories?utm_source=chatgpt.com "Quickstart for repositories - GitHub Docs"
