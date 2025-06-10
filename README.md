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

### HTTP GET

- Express의 `get` 메서드에 대한 예시 코드를 살펴보자.

  ```js
  app.get('/', (request, response) => {
    response.send('Hello World!');
  });
  ```

  - `request`: 웹 애플리케이션에서 URL 또는 path로 보내는 모든 정보들을 담고 있다.
  - `response`: 서버에서 보내는 결과값을 담고 있다.

- 테스트를 위해 임의의 데이터 `data`를 생성한 후 `get` 요청의 `response.send()`에 담아보자.

  ```js
  const data = [
    { id: 1, name: 'name-1', note: 'note-1' },
    { id: 2, name: 'name-2', note: 'note-2' },
    { id: 3, name: 'name-3', note: 'note-3' },
  ];
  
  app.get('/notes', (req, res) => {
    res.send(data);
  });
  ```

  - 브라우저에서 `http://localhost:3000/notes`로 이동해보면 `data`를 확인할 수 있다.

    <img width="50%" alt="image" src="https://github.com/user-attachments/assets/d1f62d13-b490-4478-9e25-033482e9f566" />

- 이처럼 `get` 메서드는 CRUD 중 **READ**를 위해 사용하는 HTTP 메서드이다.

<br />

### HTTP POST

- `post` 메서드를 사용할 때, URL 또는 path는 보통 `get` 메서드와 동일한 URL 또는 path를 사용한다.
- 성공적으로 POST 되었다면, "요청이 성공적이었으며 그 결과로 새로운 리소스가 생성되었음"을 알리기 위해 **`201`** Status Code를 전송한다.

  ```js
  app.post('/notes', (req, res) => {
    res.sendStatus(201);
  });
  ```
  
  - 일반적으로 성공 응답을 위해 `200`번대 Status Code를 사용하며, 성공적인 POST 요청 또는 일부 PUT 요청 이후 `201`번 Status Code를 전송한다.
  - GET 요청 이후 "성공적으로 리소스를 불러와서 메시지 바디에 전송됨"을 알리기 위해 `200`번 Status Code를 전송한다.
  - 각 요청이 성공한 후 다음과 같이 Status Code와 응답을 보내주는 것을 확인할 수 있다.
    
    |**GET 요청에 대한 응답**|**POST 요청에 대한 응답**|
    |:---:|:---:|
    |<img alt="image" src="https://github.com/user-attachments/assets/1e39307f-75b4-4c72-bacf-1013466c56e0" />|<img alt="image" src="https://github.com/user-attachments/assets/6a47f9ac-2ba1-4966-affe-b2a11a06703c" />|

<br />

> [!IMPORTANT]
> **[공식문서 - HTTP Response Status Code](https://developer.mozilla.org/ko/docs/Web/HTTP/Reference/Status)**

<br />

- POST 요청은 일반적으로 `JSON` 형태의 `body`와 함께 전송된다.

  - `request.body`를 확인하기 위해 다음의 코드를 추가하고 POST 요청을 보내보자.

    ```js
    app.post('/notes', (req, res) => {
      console.log(req.body);
      res.sendStatus(201);
    });
    ```

  - POSTMAN에서 `body`에 새로운 데이터를 담아 POST 요청을 보내면, `201` Status Code와 함께 `log`가 생성되는 것을 확인할 수 있다.
 
    |**POST 요청**|**POST 요청에 대한 `log`**|
    |:---:|:---:|
    |<img alt="image" src="https://github.com/user-attachments/assets/8709b30c-d234-42e8-9940-c045e89a0981" />|<img alt="image" src="https://github.com/user-attachments/assets/3ad7db65-90a3-43ed-8905-05e7cc80ab16" />|

  - 하지만 아직은 전송한 `body`의 내용이 아니라 `undefined`가 뜨는 상황이다.

    - `index.js` 코드의 최상단에 **`json` 형태의 `body` 데이터를 활용할 수 있도록 하는 미들웨어를 추가**해야 한다.

      ```js
      app.use(express.json());
      ```

    - 미들웨어를 사용하고 다시 한 번 POST 요청을 보내면 결과값을 잘 확인할 수 있다.

      <img width="30%" alt="image" src="https://github.com/user-attachments/assets/1e4c51ca-fa8c-4460-8b2b-665d706a7106" />

<br />

- 마지막으로, POST 요청을 보낸 데이터를 `data` 배열에 추가한다.

  ```js
  app.post('/notes', (req, res) => {
    console.log(req.body);
    data.push(req.body);
    res.sendStatus(201);
  });
  ```

  - 다시 한 번 GET 요청을 보내보면, 기존 `data` 배열에 새로운 객체가 추가된 것을 확인할 수 있다.

    <img width="50%" alt="image" src="https://github.com/user-attachments/assets/c0dbff46-a154-4539-a5cf-1ce52343c9d5" />
    
<br />

- 추가적으로 POST 요청을 `URL Encoded` 형태로 전송할 수도 있는데, 현재 이렇게 POST 요청을 보내면 처음 `json` 데이터와 마찬가지로 `undefined`가 나타날 것이다.

  - 마찬가지로 `index.js` 코드의 최상단에 **`json` 형태의 `URL Encoded` 형태의 데이터를 활용할 수 있도록 하는 미들웨어를 추가**해야 한다.

    ```js
    app.use(express.urlencoded({ extended: true}));
    ```

<br />

### 미들웨어

- `/notes`로 GET 요청을 보내기 전에 다음과 같이 `get` 메서드의 두 번째 인수로 미들웨어를 추가해보자.

  ```js
  app.get(
    '/notes',
    (req, res) => {
      console.log('Middleware test');
    },
    (req, res) => {
      res.send(data);
    }
  );
  ```

- `http://localhost:3000/notes`로 이동해보면 아래 사진처럼 계속해서 로딩이 발생하는 것을 확인할 수 있다.

  <img width="50%" alt="image" src="https://github.com/user-attachments/assets/9ec4f400-62f7-4c83-b8d5-4f11cc353c66" />

  - 코드의 미들웨어를 테스트하는 부분에서 다음 콜백 함수로 넘어가지 않고 대기 중이기 때문이다!

- 이를 해결하기 위해 미들웨어 함수의 세 번째 인수로 `next`를 넘겨준 후 실행한다.

  ```js
  app.get(
    '/notes',
    (req, res, next) => {
      console.log('Middleware test');
      next();
    },
    (req, res) => {
      res.send(data);
    }
  );
  ```

- 미들웨어를 여러 개 추가할 수도 있고, `index.js`의 최상단에 추가할 수도 있다.

  ```js
  app.use((req, res, next) => {
    console.log('Middleware test 0');
    next();
  });
  ```
<br />

### Routing의 기본

- **[참고] Route path의 string pattern**

  - `ab?cd`: 이 패턴은 `?` 앞의 문자가 있어도 되고 없어도 됨을 의미한다. ⇒ `acd` 또는 `abcd`가 가능하다.

    ```js
    app.get('/ab?cd', (req, res) => {
      res.send('ab?cd')
    })
    ```

  - `ab+cd`: 이 패턴은 `+` 앞의 문자를 여러 개 사용할 수 있음을 의미한다. ⇒ `abcd`, `abbcd`, `abbbcd` 등이 가능하다.

    ```js
    app.get('/ab+cd', (req, res) => {
      res.send('ab+cd')
    })
    ```

  - `ab*cd`: 이 패턴은 `*` 자리에 어떤 문자든 올 수 있음을 의미한다. ⇒ `abcd`, `abxcd`, `abRANDOMcd`, `ab123cd` 등이 가능하다.

    ```js
    app.get('/ab*cd', (req, res) => {
      res.send('ab*cd')
    })
    ```

<br />

- **Path Parameters**

  - Route 경로에 `:`을 사용하면 해당 경로에 있는 데이터를 지정한 변수명으로 받아올 수 있다.

    ```js
    Route path: /users/:userId/books/:bookId
    Request URL: http://localhost:3000/users/34/books/8989
    req.params: { "userId": "34", "bookId": "8989" }

    app.get('/users/:userId/books/:bookId', (req, res) => {
      res.send(req.params)
    })
    ```

    - 위의 예시에서는 `:userId` 자리에 있는 `34`를 `userId`에, `:bookId` 자리에 있는 `8989`를 `bookId`에 저장하며, 이를 `req.params`로 가져올 수 있다.

    - 중간에 `-`이나 `.`이 있다면 이를 기준으로 변수에 저장해 `req.params`로 가져올 수 있다.

      ```js
      Route path: /flights/:from-:to
      Request URL: http://localhost:3000/flights/LAX-SFO
      req.params: { "from": "LAX", "to": "SFO" }

      Route path: /plantae/:genus.:species
      Request URL: http://localhost:3000/plantae/Prunus.persica
      req.params: { "genus": "Prunus", "species": "persica" }
      ```

  - 이를 실제로 적용해보자. `/note/:noteId`로 `get` 요청을 보내는 코드를 작성한다.

    ```js
    app.get('/note/:noteId', (req, res) => {
      console.log(req.params);
      res.sendStatus(200);
    });
    ```

    - `http://localhost:3000/note/1`로 이동해보면 다음과 같이 `log`에 `req.params`가 담기는 것을 확인할 수 있다.

      <img width="30%" alt="image" src="https://github.com/user-attachments/assets/7732e198-d83c-4ed2-9d0f-8fe6de6c0405" />

  - 해당 `noteId`를 이용해 데이터를 불러오는 코드로 확장할 수 있다.

    - Route parameters는 `string` 형태로 저장되므로 `Number` 형태로 형변환을 진행한다.

      ```js
      app.get('/note/:noteId', (req, res) => {
        console.log(req.params);
        const item = data.filter((item) => item.id === Number(req.params.noteId));
        res.send(item);
      });
      ```

    - `http://localhost:3000/note/1`로 이동해보면 다음과 같이 1번 데이터 응답이 잘 도착한 것을 확인할 수 있다.

      <img width="50%" alt="image" src="https://github.com/user-attachments/assets/9b6952a4-2d8b-4a9a-818e-f5e97b375d03" />

<br />

### Query Parameter


<br />

## :book: 참고

- [Express.js 공식문서](https://expressjs.com/)
