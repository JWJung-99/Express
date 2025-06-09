# Express

<br />

## 0️⃣ 목차

1. [Express 설정](#one-express-설정)
2. [Express 기본](#two-express-기본)

[참고](#book-참고)

<br />

## :one: Express 설정

### Express 설정

1. 애플리케이션에 `package.json` 파일을 생성한다.

    ```bash
    npm init
    ```

2. Express를 설치한다.
   
    ```bash
    npm install express
    ```

4. 디렉토리 내부에 `index.js` 파일을 생성하고, 다음 코드를 붙여 넣는다.

    ```js
    const express = require('express');
    const app = express();
    const port = 3000;
    
    app.get('/', (req, res) => {
     res.send('Hello World!');
    });
    
    app.listen(port, () => {
     console.log(`Example app listening on port ${port}`);
    });
    ```

4. 터미널에서 `index.js` 파일을 실행한 뒤 브라우저(`http://localhost:3000`)에서 "Hello World!"가 잘 출력되는지 확인한다.

    ```bash
    node index.js
    
    # package.json의 script에 명령어를 다음과 같이 등록했다면 ⇒ "dev": "node index.js"
    npm run dev
    ```

<br />

> ➕ **참고: Express-Generator 활용하기**
>
> [Express Generator](https://expressjs.com/en/starter/generator.html)를 이용해 애플리케이션의 보일러 플레이트를 빠르게 생성하는 방법도 존재한다!
>
> 이 방법을 활용하면 다음과 같은 폴더 구조를 자동으로 생성한다.
> ```
> .
> ├── app.js
> ├── bin
> │   └── www
> ├── package.json
> ├── public
> │   ├── images
> │   ├── javascripts
> │   └── stylesheets
> │       └── style.css
> ├── routes
> │   ├── index.js
> │   └── users.js
> └── views
>     ├── error.jade
>     ├── index.jade
>     └── layout.jade
> 
> 7 directories, 9 files
> ```

<br />

### 기본적인 라우팅 설정

- **라우팅(Routing)**
  
  - 라우팅은 **특정 엔드포인트(URI 혹은 path)로의 클라이언트의 요청(HTTP 메서드)에 애플리케이션이 어떻게 응답하는지** 결정하는 것이다.
  - 각각의 라우트는 라우트가 일치할 때 실행되는 하나 이상의 핸들러 함수를 가진다.
  - 라우트의 구조는 다음과 같다.

    ```js
    app.METHOD(PATH, HANDLER);
    ```

    - `app`: Express 애플리케이션
    - `METHOD`: `GET`, `POST` 등의 HTTP 메서드 (소문자로 작성)
    - `PATH`: 서버의 경로
    - `HANDLER`: 라우트가 일치할 때 실행되는 함수

  - 다음과 같은 `GET` 요청을 작성해보자.

    ```js
    app.get('/test', (req, res) => {
    	res.send('Hello Test!');
    });
    ```

    - 위 코드는 **`/test` 주소로 `GET` 요청을 보냈을 때 "Hello Test!"라는 응답을 받는다**는 의미이다.
    - 실제로 브라우저에서 `http://localhost:3000/test`로 이동해보면 아래와 같은 결과를 확인할 수 있다.

      <img width="50%" alt="image" src="https://github.com/user-attachments/assets/2ddb1f91-62e6-430c-9781-ce13ac5ad613" />

  - `POST` 요청도 작성해보자.

    ```js
    app.post('/test', (req, res) => {
      res.send('Got a POST request')
    })
    ```
    - 위 코드는 **`/test` 주소로 `POST` 요청을 보냈을 때 "Got a POST request"라는 응답을 받는다**는 의미이다.
    - `POST` 요청의 경우 브라우저에서 `request`를 보내기 어렵기 때문에 POSTMAN을 이용해 확인할 수 있다.

      <img width="50%" alt="image" src="https://github.com/user-attachments/assets/a247839a-6fff-4b74-a4e8-1b3935f5f508" />

  - `PUT`, `DELETE` 요청도 같은 방법으로 작성할 수 있다.

<br />

## :two: Express 기본


<br />

## :book: 참고

- [Express.js 공식문서](https://expressjs.com/)
