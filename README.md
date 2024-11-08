## 테커 파트너스 5기 2번째 과제 프론트엔드 API 연동 세션

# Todo List 구현하기

<br>

# 과제 요구사항

## 기본 요구 사항

1. [Figma 디자인](https://www.figma.com/design/GoXOrkZRu1Lznw37pjWDHw/Techeer-Partners-5%EA%B8%B0-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-API-%EC%97%B0%EB%8F%99-%EC%8B%A4%EC%8A%B5-%EA%B3%BC%EC%A0%9C?node-id=0-1&t=vQObqjzePvNdFsu4-1)을 참고하여 퍼블리싱
2. [API 명세서](https://melodic-walleye-2ab.notion.site/TodoList-API-1385051bdea58043bd8bd272376db7f8)를 참고하여 CRUD API 연동하기 (할일 생성, 조회, 수정, 완료)

## Challenge (추가 도전 과제)</p>

1. 컴포넌트화 시키기
2. 모달 떠오르는 효과, 버튼들 효과같은 css 애니메이션 붙이기 - 사용자 경험성 고려
3. 전체, 완료, 미완료 상태에 따라 조회하는 버튼 만들기
4. 태스크가 늘어났을 때를 고려하여 페이지네이션 혹은 무한스크롤 구현 - 백엔드 팀원들과 상의해서 결정하기

#### - 이외의 추가 기능은 팀에서 자유롭게 회의하시면서 예외처리 및 할일을 인풋에 적지 않았을때는 컴포넌트를 블록시키는 등 여러 방면으로 사용자 경험성을 고려하시면서 추가하셔도 됩니다

<br>

# 과제 진행 방식

## 1. 세션 레포지토리를 fork

![image](https://github.com/user-attachments/assets/87f043f3-4ef3-4856-90c8-388cc6e08d81)
![image](https://github.com/user-attachments/assets/9b8bede4-f129-425c-b641-4e111419b1df)

<p>Owner를 팀 organization으로 설정합니다.</p>
<p>레포지토리 이름을 변경하지 않아야 스프링 프로젝트가 제대로 인식됩니다!</p>

## 2. 이전에 진행한 Git 세션을 참고하여 fork한 레포지토리를 clone

## 3. Docker Desktop 설치 (API 연동을 위해선 도커를 실행해야 합니다.)

<p>https://www.docker.com/products/docker-desktop/</p>
<p>위의 링크를 통해 본인 노트북에 맞는 Docker Desktop을 설치합니다.</p>

![image](https://github.com/user-attachments/assets/8ffa568f-fa3f-4a8e-bf37-48df1d75b38c)

## 4. Docker Desktop 실행

<p>설치한 Docker Desktop을 실행합니다. 회원가입과 로그인을 요구한다면 skip하셔도 무방합니다.</p>

![image](https://github.com/user-attachments/assets/335468d8-9f1d-447e-ad69-69f4ab7da19c)

## 5. docker-compose 빌드

<p>터미널을 통해 프로젝트의 루트 디렉토리로 이동합니다.</p>

![image](https://github.com/user-attachments/assets/f539b6de-d3ad-471d-b813-72a2ef97a5d6)

<p>터미널에 다음 명령어를 입력하여 도커 이미지를 빌드합니다.</p>

```bash
docker-compose up

# 버전에 따라 -를 제거한 다음 명령어를 쳐야할 수도 있습니다.
docker compose up
```

![image](https://github.com/user-attachments/assets/ec888f2d-2ccc-4268-af74-d4b96908ccb7)

<p>처음 빌드할 때는 시간이 오래 걸릴 수 있습니다.</p>

## 6. Docker Desktop 확인

![image](https://github.com/user-attachments/assets/2180df91-6793-4730-8939-9a96919130e5)

<p>위와 같이 컨테이너가 생성된 것이 보인다면 성공입니다.</p>
<p>8080:8080을 누르면 localhost:8080으로 접속됩니다</p>

![image](https://github.com/user-attachments/assets/f8ff0e25-74f4-4312-87a8-d899c85ab783)

<p>에러가 아닌 처음 스프링 서버를 실행했을 때의 기본 화면입니다.</p>

<br>

<p>이렇게 Docker Desktop만 설치해준다면 프론트엔드에서도 별도의 서버 프레임워크 설치 없이 서버를 구동할 수 있습니다.</p>
