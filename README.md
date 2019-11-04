# GunpoTimeTable_Backend

군포e비즈니스고등학교 시간표의 백엔드 서버를 담당하는 코드입니다.

본 레포지토리는 오직 **백엔드 및 API 서버의 기능**을 담당하며, 시간표를 파싱하여 DB에 업로드 하는 기능은 [이 레포지토리](https://github.com/notkimwol/GunpoTimeTable_Cron) 에서 담당합니다.



## 기능

- DB에 저장된 시간표 정보를 RESTful API 형식으로 제공



## 개발 스택

* 프론트엔드 (WIP)
  * React
* 백엔드
  * DB : mongoDB (v4.2.1)
  * WEB : koaJS
* [서버 파싱](https://github.com/notkimwol/GunpoTimeTable_Cron)
  * 시간표 데이터 파싱 : [comcigan-parser](https://github.com/leegeunhyeok/comcigan-parser)
  * 자동화 : node-cron
  * 데이터 전송 : request



## 정보

* Node 서버는 기본적으로 4001번 포트에서 작동합니다.
* .env.template 파일을 참고하여 *.env 파일을 만들어주세요.



## 프로젝트 구조

```text
│  README.md
│  .env // 프로젝트 설정 파일, git에는 업로드되지 않았습니다.
│  .env.template // 프로젝트 설정파일 템플릿
│  .gitignore
│  package.json
│  package-lock.json
│  
├─node_modules    
│  
└─src
   │  timetableData.txt // db에 저장되는 시간표의 정보입니다.
   │  index.js
   │  
   ├─db  // git에 포함되어있지 않습니다. 직접 만들어주세요.
   ├─api
   │  │  index.js // 1차 라우팅 (localhost/api)
   │  │  
   │  └─parse
   │          index.js // 2차 라우팅 (localhost/api/parse)
   │          parser.ctrl.js // 3차 라우팅 (localhost/api/parse/function)
   │          
   └─models
           timetable.js // 데이터 모델 및 api 요청 처리 부분
```



## 기초 설정 및 사용하기

```bash
# 기본 설정
npm install
# .env 파일 추가
touch .env

cd /src/
# 데이터베이스 폴더 생성
mkdir db
```

```bash
# 서버 1
# 백엔드 서버 실행
node src/index
```

```bash
# 서버 2
# DB 서버 실행
# 반드시 mongoDB가 설치되어 있어야 합니다.
cd src
mongod --dbpath ./db
```



## 로그 살펴보기

[name] : data 형식의 로그가 서버 콘솔에 출력될 때,

name은 해당 서비스의 이름을 뜻합니다.

data는 결과를 뜻합니다.



## API 문서

### (Create) https://localhost:4001/api/parse/insert/

#### 기능

데이터베이스에 시간표의 정보와 시정표의 정보를 추가하는 기능입니다.

* 중요 : 보안을 위해 오직 **local 에서만** 사용할 수 있습니다.

#### API 요청

NOTE : timeTable과 classTime의 값을 반드시 JSON.stringify() 처리 해주세요.

| Header       | Value                                                        |
| :----------- | :----------------------------------------------------------- |
| uri          | http://127.0.0.1:4001/api/parse/insert                       |
| method       | post                                                         |
| Content-Type | application/json                                             |
| json         | true                                                         |
| body         | {<br/>	"timeTable": String,<br/>    "classTime": String<br/>} |

#### API 응답

* 정상적인 요청의 경우

| status | body    |
| ------ | ------- |
| 200    | success |

* 비정상적인 요청 (value의 Type이 맞지 않음)의 경우

| status | body        |
| ------ | ----------- |
| 400    | Bad Request |

* 서버에서 오류가 나게 된 경우

| status | body                  |
| ------ | --------------------- |
| 500    | Internal Server Error |



### (Read) http://localhost:4001/api/parse/getdata/

#### 기능

최근 데이터베이스에 추가된 시간표 정보를 받는 기능입니다.

#### API 요청

| Header       | Value                                  |
| :----------- | :------------------------------------- |
| uri          | http://localhost:4001/api/parse/getdata/ |
| method | get |
| body | {} |

#### API 응답

* 정상적인 요청의 경우

NOTE : timeTable과 classTime의 값을 반드시 JSON.parse() 처리 해주세요.

| status | body                                                         |
| ------ | ------------------------------------------------------------ |
| 200    | {<br/>      "checkSum" : String,<br/>      "_id" : String,<br/>      "data": {<br/>          "timeTable" : String,<br/>          "classTime" : String,<br/>          "unixTime" : Number<br/>      }<br/> } |

* 서버에서 오류가 나게 된 경우

| status | body                  |
| ------ | --------------------- |
| 500    | Internal Server Error |



### (Read) http://localhost:4001/api/parse/getidx/

#### 기능

최근 데이터베이스에 추가된 시간표 의 id값을 받는 기능입니다.

#### API 요청

| Header       | Value                                  |
| :----------- | :------------------------------------- |
| uri          | http://localhost:4001/api/parse/getidx/ |
| method | get |
| body | {} |

#### API 응답

* 정상적인 요청의 경우

| status | body                              |
| ------ | --------------------------------- |
| 200    | {<br/>      "_id" : String,<br/>} |

* 서버에서 오류가 나게 된 경우

| status | body                  |
| ------ | --------------------- |
| 500    | Internal Server Error |



## 커밋 이모지 살펴보기

주의 : 0.0.5 릴리즈 이전에는 잘못 기록된 커밋 이모지가 있을 수도 있습니다. 양해 부탁 드립니다!

| emoji | description                                  |
| ----- | -------------------------------------------- |
| ✨     | 기능 또는 파일이 추가되는 경우               |
| 🔨     | 코드를 수정한 경우                           |
| 🤔     | 코드를 정리하는 등의 자잘한 수정이 있는 경우 |
| 🗑     | 기능 또는 파일이 제거되는 경우               |
| 🎉     | 브랜치를 머지하는 경우                       |
| 🐛     | 버그를 수정하는 경우                         |
| 👌     | TODO 아이템을 완료한 경우                    |