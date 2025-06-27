# Express

<br />

## 0️⃣ 목차

1. [Express 설정](#one-express-설정)
2. [Express 기본](#two-express-기본)
3. [AWS 계정 보안 설정](#three-aws-계정-보안-설정)
4. [AWS VPC](#four-aws-vpc)
5. [AWS EC2](#five-aws-ec2)
6. [AWS RDS 설정](#six-aws-rds-설정)
7. [AWS RDS MySQL 연결](#seven-aws-rds-mysql-연결)
8. [MySQL 함수](#eight-mysql-함수)
9. [MySQL+Express](#nine-mysql-express-연동)
10. [AWS RDS PostgreSQL 연결](#keycap_ten-aws-rds-postgresql-연결)
11. [PostgreSQL 데이터베이스 연결](#oneone-postgresql-데이터베이스-연결)
12. [PostgreSQL+Express](#onetwo-postgresql-express-연동)
13. [MongoDB 데이터베이스 연결](#onethree-mongodb-데이터베이스-연결)
14. [MongoDB+Express](#onefour-mongodb-express-연동)
15. [HTTP Authentication](#onefive-http-authentication)
16. [AWS EC2 RDS](#onesix-aws-ec2-rds)

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

3. 디렉토리 내부에 `index.js` 파일을 생성하고, 다음 코드를 붙여 넣는다.

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
>
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

      <img width="50%" alt="image" src="https://github.com/user-attachments/assets/472337ad-135a-4474-bede-6a9fe5a5e044" />

  - `POST` 요청도 작성해보자.

    ```js
    app.post('/test', (req, res) => {
      res.send('Got a POST request');
    });
    ```

    - 위 코드는 **`/test` 주소로 `POST` 요청을 보냈을 때 "Got a POST request"라는 응답을 받는다**는 의미이다.
    - `POST` 요청의 경우 브라우저에서 `request`를 보내기 어렵기 때문에 POSTMAN을 이용해 확인할 수 있다.
   
      <img width="50%" alt="image" src="https://github.com/user-attachments/assets/8493cefa-8fb9-46ad-b482-19e29fdd5746" />

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

    <img width="50%" alt="image" src="https://github.com/user-attachments/assets/19ea762c-0bd4-4119-939c-a52e641894c8" />

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
    |<img alt="image" src="https://github.com/user-attachments/assets/a2c63794-1d59-461d-ba96-2e52fe063062" />|<img alt="image" src="https://github.com/user-attachments/assets/d2cfbf4a-841f-466c-ab33-50b0c18557bf" />|

	<br />

> [!IMPORTANT]
>
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
    |:---:|:---|
    |<img width="500" alt="image" src="https://github.com/user-attachments/assets/f4534f39-bc33-442b-912d-bece803d5506" />|<img width="300" alt="image" src="https://github.com/user-attachments/assets/925a086b-e8c4-48f8-8440-82e49f870ce6" />|

  - 하지만 아직은 전송한 `body`의 내용이 아니라 `undefined`가 뜨는 상황이다.

    - `index.js` 코드의 최상단에 **`json` 형태의 `body` 데이터를 활용할 수 있도록 하는 미들웨어를 추가**해야 한다.

      ```js
      app.use(express.json());
      ```

    - 미들웨어를 사용하고 다시 한 번 POST 요청을 보내면 결과값을 잘 확인할 수 있다.

  		<img width="30%" alt="image" src="https://github.com/user-attachments/assets/b2526e80-f65a-4231-95e2-9dd11f481a18" />

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

    <img width="50%" alt="image" src="https://github.com/user-attachments/assets/12a7e91e-ac31-4e70-84d2-96f117766162" />

<br />

- 추가적으로 POST 요청을 `URL Encoded` 형태로 전송할 수도 있는데, 현재 이렇게 POST 요청을 보내면 처음 `json` 데이터와 마찬가지로 `undefined`가 나타날 것이다.

  - 마찬가지로 `index.js` 코드의 최상단에 **`json` 형태의 `URL Encoded` 형태의 데이터를 활용할 수 있도록 하는 미들웨어를 추가**해야 한다.

    ```js
    app.use(express.urlencoded({ extended: true }));
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

  <img width="50%" alt="image" src="https://github.com/user-attachments/assets/2c22de3c-c399-49c0-b063-854d65c5c862" />

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
      res.send('ab?cd');
    });
    ```

  - `ab+cd`: 이 패턴은 `+` 앞의 문자를 여러 개 사용할 수 있음을 의미한다. ⇒ `abcd`, `abbcd`, `abbbcd` 등이 가능하다.

    ```js
    app.get('/ab+cd', (req, res) => {
      res.send('ab+cd');
    });
    ```

  - `ab*cd`: 이 패턴은 `*` 자리에 어떤 문자든 올 수 있음을 의미한다. ⇒ `abcd`, `abxcd`, `abRANDOMcd`, `ab123cd` 등이 가능하다.

    ```js
    app.get('/ab*cd', (req, res) => {
      res.send('ab*cd');
    });
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

      <img width="30%" alt="image" src="https://github.com/user-attachments/assets/3764ed33-f070-4d67-b538-51dfd278b70f" />

  - 해당 `noteId`를 이용해 데이터를 불러오는 코드로 확장할 수 있다.

    - Route parameters는 `string` 형태로 저장되므로 `Number` 형태로 형변환을 진행한다.

      ```js
      app.get('/note/:noteId', (req, res) => {
		  console.log(req.params);
		  const item = data.find((item) => item.id === Number(req.params.noteId));
		  res.send(item);
		});
      ```

    - `http://localhost:3000/note/1`로 이동해보면 다음과 같이 1번 데이터 응답이 잘 도착한 것을 확인할 수 있다.

		<img width="50%" alt="image" src="https://github.com/user-attachments/assets/a1546cf9-9435-4cba-8e49-6e2af23d1e62" />

<br />

### Query Parameter

- URL 뒤에 물음표(`?`)와 함께 붙는 키-값(Key-Value) 쌍이다. 특정한 조건을 적용하고 싶을 때 사용하며, 여러 개의 Key-Value 쌍을 and 기호(&)로 구분하여 나타낸다.

```
ex) https://trifly.vercel.app/ticket-result?originLocationCode=ICN&destinationLocationCode=FUK&departureDate=2025-06-21&returnDate=2025-06-23&adults=1&nonStop=true&currencyCode=KRW
```

- HTTP의 GET, DELETE 요청에서 사용하고, 주로 유일 값을 식별하기 위한 용도가 아니라 다음과 같이 옵션을 주는 경우 사용한다.

  - 데이터 필터링
  - 데이터 정렬
  - 데이터 수 조절 (페이지네이션)
  - 검색 등

- Query Parameter를 잘 받아오는지 확인하기 위해 다음과 같이 간단한 `get` 메서드를 작성한다.

  ```js
  app.get('/note', (req, res) => {
    console.log(req.query);
    res.send('OK Query');
  });
  ```

  - 브라우저에서 `http://localhost:3000/note?id=1&name=name-1`로 이동하면 `log`에서 다음과 같이 query parameter를 잘 받아오는 것을 확인할 수 있다.

    |**GET 요청** |**Query Parameter 확인**|
    |:---:|:---:|
    |<img width="500" alt="image" src="https://github.com/user-attachments/assets/18405bd6-9966-44e2-992c-5979d3c778bd" />|<img width="300" alt="image" src="https://github.com/user-attachments/assets/5e626bec-4a00-4eba-903a-64086f2c82b9" />|

  - 이어서 Query Parameter를 이용해 원하는 데이터만 받아올 수 있도록 코드를 수정한다.

    ```js
    app.get('/note', (req, res) => {
      console.log(req.query);
      const { id } = req.query;

      if (!id) res.send({});
      const item = data.filter((item) => item.id === Number(id));
      res.send(item);
    });
    ```

    - 브라우저에서 `http://localhost:3000/note?id=1`로 이동하면 다음과 같이 `id`가 `1`인 데이터만 잘 불러오는 것을 확인할 수 있다.

      <img width="50%" alt="image" src="https://github.com/user-attachments/assets/2ab3cc21-c344-400a-ac24-01a3e720cb39" />

<br />

### HTTP PUT, PATCH

- PUT과 PATCH 모두 업데이트를 위해 사용하는 HTTP 메서드이다.

  - PUT 메서드는 새로운 리소스를 생성하거나(Create), 대상 리소스를 나타내는 데이터를 대체(Update)한다. POST 메서드와의 차이점은 **멱등성**을 가진다는 것이다. 멱등성이란 동일한 요청을 한 번 보내는 것과 여러 번 연속으로 보내는 것이 같은 효과를 지니고, 서버의 상태도 동일하게 남는 것을 의미한다. 따라서 PUT 요청을 여러 번 반복해서 보내도 서버의 상태는 동일하다.

    - 성공적인 응답은 `200`번 대 Status Code로 확인할 수 있는데,

      - 대상 리소스를 나타내는 데이터가 없고 PUT 요청이 성공적으로 하나를 새로 생성한 경우 `201 Created` 응답을 전송한다.
      - 대상 리소스를 나타내는 데이터가 있고, PUT 요청이 성공적으로 수정한 경우 `200(OK)` 또는 `204(No Content)` 응답을 전송한다.

  - PATCH 메서드는 리소스를 부분적으로 수정(Update)한다. PUT 메서드는 문서 전체의 완전한 교체만을 허용하는 반면, PATCH 메서드는 멱등성을 가지지 않아 동일한 요청이 다른 리소스에게 부수 효과를 일으킬 수도 있다.

    - 성공적인 응답은 `200`번 대 Status Code로 확인할 수 있는데,

      - 응답이 유의미한 데이터를 포함한다면 업데이트 된 데이터를 출력하며 `200(OK)`를 전송한다.
      - 응답이 유의미한 데이터를 포함하지 않는다면 `204(No Content)`를 전송한다.

- 데이터를 `request.body`로 받아 데이터를 업데이트하는 `put` 메서드를 작성해보자.

  ```js
  app.put('/note', (req, res) => {
    const { id, note, name } = req.body;

    if (!id) res.sendStatus(400);
    if (!note) res.sendStatus(400);
    if (!name) res.sendStatus(400);

    // 1. Array.findIndex를 이용해 같은 id 값을 찾는다.
    const index = data.findIndex((item) => item.id === id);

    // 2. 찾은 id 값을 이용해 원하는 데이터를 변경한다.
    data[index].note = note;
    console.log(data);
    res.sendStatus(204);
  });
  ```

  - `id`가 `2`인 데이터의 `note` 값을 업데이트 후 PUT 요청을 보내면 다음과 같이 데이터가 업데이트 되는 것을 확인할 수 있다.

    |**PUT 요청**|**GET 요청**|
    |:---:|:---:|
    |<img width="1249" alt="image" src="https://github.com/user-attachments/assets/b85aad87-b229-4766-80ea-268314b93832" />|<img width="50%" alt="image" src="https://github.com/user-attachments/assets/c98b5e93-76de-40f8-9d32-8a21df196ed1" />|

<br />

### HTTP DELETE

- DELETE는 지정한 리소스를 삭제하는 HTTP 메서드이다.

  - 성공적인 응답은 `200`번 대 Status Code를 사용하는데,

    - 성공적으로 삭제할 것 같으나 아직 실행하지 않은 경우 `202(Accepted)`를 전송한다.
    - 응답이 유의미한 데이터를 포함하지 않는다면 `204(No Content)`를 전송한다.
    - 응답이 유의미한 데이터를 포함한다면 삭제 이후의 데이터를 출력하며 `200(OK)`를 전송한다.

  - DELETE 메서드의 경우 주로 Path Parameter를 사용해 해당 데이터를 삭제한다.

- Path Parameter를 받아 해당 데이터를 삭제하는 `delete` 메서드를 작성해보자.

  ```js
  app.delete('/note/:noteId', (req, res) => {
    const noteId = Number(req.params.noteId);
    const index = data.findIndex((item) => item.id === noteId);

    // 찾는 데이터가 없다면 404 응답
    if (index === -1) res.sendStatus(404);

    // data 배열에서 데이터를 삭제하고 삭제한 배열을 반환
    const deletedItem = data.splice(index, 1)[0];
    console.log(deletedItem);

    res.sendStatus(204);
  });
  ```

  - Path Parameter에 입력한 `noteId` 값을 입력 후 DELETE 요청을 보내면 해당 데이터가 삭제되는 것을 확인할 수 있다.

    |**DELETE 요청**|**GET 요청**|
    |:---:|:---:|
    |<img alt="image" src="https://github.com/user-attachments/assets/a001ae1b-8300-41f9-bded-188c00b72572" />|<img alt="image" src="https://github.com/user-attachments/assets/20c57b82-c2b5-4956-8d4d-9c17df6bd5a2" />|

  - 이미 삭제된 데이터에 대해 다시 DELETE 요청을 보내면 `404 Not Found` 응답을 전송한다.
 
    <img width="50%" alt="image" src="https://github.com/user-attachments/assets/06449afc-1ff1-412a-a29f-ad0e2cf22235" />

  - 개발하다보면 삭제된 데이터도 필요한 경우가 있다. 이럴 때는 삭제된 데이터도 `response`에 담아서 `200` Status Code와 함께 전송할 수 있다.

    ```js
    app.delete('/note/:noteId', (req, res) => {
      const noteId = Number(req.params.noteId);
      const index = data.findIndex((item) => item.id === noteId);

      // 찾는 데이터가 없다면 404 응답
      if (index === -1) res.sendStatus(404);

      // data 배열에서 데이터를 삭제하고 삭제한 배열을 반환
      const deletedItem = data.splice(index, 1)[0];
      console.log(deletedItem);

      res.status(200).json({
        message: 'Deleted Successfully!',
        deletedItem,
      });
    });
    ```

    - DELETE 호출 시 다음과 같이 삭제된 데이터도 `deletedItem`의 Value에 담아 보내주는 것을 확인할 수 있다.

      <img width="50%" alt="image" src="https://github.com/user-attachments/assets/7a2cbce1-a1dd-4df9-811c-373110ce2dc0" />

<br />

## :three: AWS 계정 보안 설정

AWS 계정 보안은 신중해야 한다. 국내에도 AWS 해킹으로 몇 억이 청구된 사례가 많은 만큼 항상 보안에 철저하게 주의해야 한다.

### 루트 계정 보안 강화

- 루트 계정은 AWS에 가입할 때 처음 생성되는 계정으로 모든 AWS 서비스 및 리소스에 대한 액세스 권한을 가진다. 루트 계정에 액세스할 수 있는 사용자가 있으면 AWS 리소스는 물론 비즈니스에도 상당한 피해를 줄 수 있으므로 루트 계정을 보호하는 것이 중요하다.

- **MFA 계정 생성**

  - MFA(Multi-Factor Authentication)는 AWS 계정에 보안 계층을 추가한다. MFA가 활성화된 경우 계정에 액세스하려면 암호 외에 고유한 코드를 제공해야 한다.

<br />

## :four: AWS VPC

### VPC

- VPC는 Virtual Private Cloud의 약자로, 자체 데이터 센터에서 운영하는 기존 네트워크와 아주 유사한 Amazon의 **가상 네트워크**이다.

  - EC2만 생성한다면 EC2 서버에 접속하기 위해 AWS 콘솔을 이용해야만 할 것이다.
  - Public(외부)에서 EC2에 접속할 수 있도록 하기 위해 VPC를 사용하고, 같은 VPC 내에 RDS도 구축하여 EC2와 RDS 간의 통신이 가능하도록 할 수 있다.

  <img width="50%" alt="image" src="https://github.com/user-attachments/assets/b467d4cb-bcd2-4ac2-a704-9fba61b5db44" />

- VPC 생성

  - AWS 콘솔에서 VPC 메뉴로 접속한 후 VPC를 생성한다. `vpc-ec2-rds`라는 이름의 VPC를 생성해보자. 다른 설정은 기본값으로 설정한다.

    <img width="50%" alt="image" src="https://github.com/user-attachments/assets/f528bc33-fbd4-42d8-bace-8934429559de" />

  - 만약 VPC가 EC2나 RDS와 연결된 상태라면 삭제가 불가능하다.

<br />

## :five: AWS EC2

### EC2 생성

- AWS 콘솔에서 EC2 메뉴로 접속하여 EC2를 생성한다.

  <img width="50%" alt="image" src="https://github.com/user-attachments/assets/0b7e59cb-38be-48eb-815c-cc3e4e6e039f" />

  - ubuntu 24.04 버전을 사용하며 인스턴스는 t2.micro 유형으로 생성한다.
  - 키 페어는 RSA 유형의 `.pem` 형식으로 생성한다.

    <img width="50%" alt="image" src="https://github.com/user-attachments/assets/5b3842e6-3e1c-4679-aadb-43751b78a506" />

  - 네트워크 설정에서 위에서 생성한 VPC를 선택하고, Public Subnet을 설정한 후 퍼블릭 IP 자동 할당을 활성화한다.
		
	  <img width="50%" alt="image" src="https://github.com/user-attachments/assets/29ccc613-6659-4642-9503-02667c676faa" />

  - 나머지 설정은 기본값으로 설정한다.

<br />

### EC2 Node 설치

- AWS 콘솔의 **EC2 인스턴스 연결** 탭을 이용해 인스턴스에 접속한다.

  <img width="50%" alt="image" src="https://github.com/user-attachments/assets/b83c44e6-d62a-45b0-84e6-1c527783bcd6" />

- `apt update`를 먼저 진행한다.

  ```bash
  sudo apt update
  ```

- 이어서 `curl`을 설치한다.

  ```bash
  sudo apt install curl
  ```

- `nvm`(노드 버전 관리자)을 설치한다. **참고: [Node.js 공식문서](https://nodejs.org/en/download)**

  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
  ```

- `nvm`을 활성화한다.

  ```bash
  . ~/.nvm/nvm.sh
  ```

- LTS 버전의 `nvm`을 설치한다.

  ```bash
  nvm install --lts
  ```

- Node.js가 잘 설치 되었는지 확인한다.

  ```bash
  node -v       // v22.16.0 (2025.06.15 현재)
  nvm current   // v22.16.0 (2025.06.15 현재)
  ```

<br />

### EC2 Express 설치

- [Express Generator]()를 이용해 Express를 설치한다. **폴더이름**은 해당 폴더 내에 Express 설치하도록 설정하는 것인데, 옵션으로 필수는 아니다.

  ```bash
  npx express-generator [폴더이름]
  ```

- 다음과 같이 test 폴더 내부에 잘 설치가 된 것을 확인할 수 있다.

  <img width="50%" alt="image" src="https://github.com/user-attachments/assets/7fbdc652-18f2-46b0-b72e-c450c63a1f98" />

- 이제 test 폴더 내부로 이동해 기본적인 npm 패키지들을 설치한다.

  ```bash
  cd test
  npm install
  ```

- 이제 서버에 접속하기 위해 포트를 열어주어야 한다. EC2의 Security 탭에서 인바운드 규칙의 보안 그룹을 선택한 후 인바운드 규칙을 수정해야 한다.

  <img width="50%" alt="image" src="https://github.com/user-attachments/assets/bc06e178-75d4-4941-987c-a526df525f49" />

- 서버를 실행하고 EC2의 퍼블릭 주소로 이동한 후 기본 설정된 `3000`번 포트로 이동하면 다음과 같이 잘 접속되는 것을 확인할 수 있다.

  ```bash
  npm start
  ```
  
  <img width="50%" alt="image" src="https://github.com/user-attachments/assets/b341f41f-46e2-4565-816e-ddeccc13846b" />

<br />

## :six: AWS RDS 설정

### AWS AuroraDB 설정

- AWS Aurora는 트래픽이 몰리는 시간에 따라 자동으로 확장/축소가 가능한 데이터베이스이다.
- 일반 MySQL이 감당할 수 있는 트래픽보다 더 많은 트래픽을 효율적으로 관리할 수 있다.
- 트래픽이 항상 일정하다면 MySQL을 사용하는 것이 유리하다.

<br />

### AWS RDS Subnet 설정

- AWS 콘솔의 RDS 탭으로 이동하여 서브넷 그룹을 생성한다.

  <img width="50%" alt="image" src="https://github.com/user-attachments/assets/8d740966-04db-4579-80f1-f0cef069ed95" />

- VPC의 퍼블릭 서브넷 두 개를 RDS의 서브넷 그룹에 추가한다.

  <img width="50%" alt="image" src="https://github.com/user-attachments/assets/0ace8c16-94a9-4d17-b8ca-54c5fb6c66dc" />

<br />

### AWS RDS 설정

- MySQL 데이터베이스를 생성한다.

  - **표준 생성** 방식을 선택하고 **MySQL 엔진**을 선택한다. 템플릿은 **프리티어**를 활용한다.
  - 데이터베이스를 퍼블릭에서 접속할 예정이므로 **EC2 컴퓨팅 리소스에 연결 안 함**을 선택하며 VPC와 DB 서브넷 그룹은 위에서 생성한 서브넷 그룹을 지정한다.
  - 데이터베이스 이름을 지정하지 않으면 데이터베이스를 생성하지 않는다고 하니 이름을 지정한다.
  - 나머지는 기본 설정을 유지한다.

  |**엔진 옵션**|**템플릿**|
  |:---:|:---:|
  |<img alt="image" src="https://github.com/user-attachments/assets/4ccb9d1c-8b57-4e51-8de5-d569206b507b" />|<img alt="image" src="https://github.com/user-attachments/assets/e7f78423-40bd-4600-a319-e3a55ea6164f" />|
  |**퍼블릭 연결 설정**|**추가 구성**|
  |<img alt="image" src="https://github.com/user-attachments/assets/54939cb2-76c0-4a2f-a8cf-ba27751a7b63" />|<img alt="image" src="https://github.com/user-attachments/assets/cec8fcee-988a-4624-96e3-f10a5ad064ce" />|

<br />

### AWS RDS Inbound Rule 설정

- 데이터베이스를 생성했지만 접속이 불가하다면 VPC의 보안 그룹으로 이동하여 인바운드 규칙을 **모든 트래픽**, **Anywhere-IPv4**로 설정해야 한다.

 	<img width="50%" alt="image" src="https://github.com/user-attachments/assets/6a164ae6-68da-4f4b-a15e-7f8f80b6b282" />

<br />

## :seven: AWS RDS MySQL 연결

### MySQL2 설치

- 새로운 디렉토리를 하나 생성한 후 Express와 MySQL2를 설치한다.

  ```bash
  npm install express
  npm install mysql2
  ```

<br />

> [!NOTE]
>
> [공식문서 - MySQL2](https://sidorares.github.io/node-mysql2/docs)

<br />

- MySQL2의 [`createPool`](https://sidorares.github.io/node-mysql2/docs#using-connection-pools)을 사용하여 데이터베이스를 연결한다.

  - 공식문서에서 제공하는 `pool` 객체 생성 방식을 복사한 후 다음과 같이 설정을 추가한다.

    - `host`: AWS RDS의 엔드포인트
    - `user`: AWS RDS에 설정한 username
    - `password`: AWS RDS에 설정한 password
    - `port`: 3306

    <br />

    <img width="40%" alt="image" src="https://github.com/user-attachments/assets/0c477585-f3fb-44b3-889d-cee922e15462" />

<br />

### AWS RDS 데이터베이스 만들기

- `pool.query` 메서드를 사용하여 데이터베이스에 접속한다. 간단하게 데이터베이스의 `rows`만 확인할 수 있는 코드를 작성해보자.

  - `rows`는 데이터베이스의 조회 결과를 의미한다.

  <br />

  ```js
  pool.query(`SHOW DATABASES`, function (err, rows, fields) {
    // Connection is automatically released when query resolves
    console.log(rows);
  });
  ```

  - 데이터베이스에 접속에 성공한다면 다음과 같이 설정한 AWS 콘솔에서 추가한 `db_notes`가 뜨는 것을 확인할 수 있다.
		
	  <img width="30%" alt="image" src="https://github.com/user-attachments/assets/cbb64c4e-f630-43d1-bd59-d44497172a05" />

- 다음과 같이 `db_test`라는 이름으로 데이터베이스를 생성할 수도 있다.

  ```js
  pool.query(`CREATE DATABASE db_test`, function (err, rows, fields) {
    // Connection is automatically released when query resolves
    console.log(rows);
  });
  ```

- `createPool` 내부에서 `database` 값을 지정하면 해당 데이터베이스를 사용할 수 있다.

  ```js
  const pool = mysql.createPool({
    host: process.env.MYSQL_RDS_ENDPOINT,
    user: process.env.MYSQL_RDS_USERNAME,
    password: process.env.MYSQL_RDS_PASSWORD,
    port: 3306,
    database: 'db_test',
  });
  ```

<br />

### AWS RDS 테이블 설정

- 데이터베이스의 테이블을 생성한다. 다음과 같은 쿼리문을 활용하여 `notes`라는 테이블을 생성하고 id는 uuid로 설정한다.

  ```js
  pool.query(
    `CREATE TABLE notes (
    uuid BINARY(16) DEFAULT (UUID_TO_BIN(UUID(),1)) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    contents TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
  );`,
    function (err, rows, fields) {
      // Connection is automatically released when query resolves
      console.log(rows);
    }
  );

  pool.query(`SHOW TABLES`, function (err, rows, fields) {
    console.log(rows);
  });
  ```

  - 다음과 같이 테이블이 잘 생성된 것을 확인할 수 있다.

    <img width="30%" alt="image" src="https://github.com/user-attachments/assets/6efb50fd-bfc3-4fa6-83b9-58a2bd7bddb2" />

- 다음으로 테이블에 데이터를 추가해보자. 다음과 같은 쿼리문을 활용하여 `notes` 테이블에 두 개의 데이터를 저장한다.

  ```js
  pool.query(
    `INSERT INTO notes (title, contents)
    VALUES 
    ('My First Note', 'A note about something'),
    ('My Second Note', 'A note about something else');`,
    function (err, rows, fields) {
      console.log(rows);
    }
  );

  pool.query(`SELECT * FROM notes`, function (err, rows, fields) {
    console.log(rows);
  });
  ```

  - 다음과 같이 데이터가 잘 생성된 것을 확인할 수 있다.

    <img width="40%" alt="image" src="https://github.com/user-attachments/assets/a60c5636-405f-46f5-a499-54bf8a915dc3" />

<br />

### Primary Key로 UUID를 설정하는 이유

- Primary Key는 보통 integer 형식으로, `FOR INCREMENT` 속성을 적용하여 생성한다. 하지만 이 방법은 안전하지 않을 수 있다. 예를 들어 URL에 `/data/1`, `/data/2`, `/data/3` 형태로 불러온다고 가정하면 다음과 같은 문제점이 있을 수 있다.

  - 몇 번 인덱스까지 있는지 파악하기 쉽다.
  - PUT이나 DELETE 메서드를 이용해 누구든지 수정 또는 삭제를 할 수 있을지도 몰라 보안상의 위험이 존재한다.
  - Primary Key가 다른 테이블과 중복될 가능성이 높다.

- UUID는 36바이트를 사용하기 때문에 속도도 느리고 메모리 사용도 커서 비효율적이라서 UUID를 16바이트 정도로 줄여 이 문제를 해결할 수 있을 것이다.

<br />

## :eight: MySQL 함수

### SELECT 함수

- 데이터베이스의 테이블에서 데이터를 가져오기 위한 함수를 작성한다.  

   - UUID의 경우 Buffer를 이용해서 가져오기 때문에 `BIN_TO_UUID(uuid, true)` 메서드를 이용해 변경해주어야 한다.

   <br />
   
   ```js
   function getNotes() {
     pool.query(
       `SELECT BIN_TO_UUID(uuid, true) AS uuid, title, contents, created FROM notes`,
       function (err, rows, fields) {
         console.log(rows);
       }
     );
   }
   
   getNotes();
   ```

   - 함수 실행 결과는 다음과 같다.

      <img width="30%" alt="image" src="https://github.com/user-attachments/assets/daa8b25e-edd6-4173-a203-d105ecbb2bd2" />

   <br />
   
   > **`BINARY(16)`**
   >
   > - `BINARY(16)` 데이터 타입은 16바이트 크기의 고정 길이 이진 데이터, 주로 UUID를 저장하기 위해 사용된다.
   > - UUID는 문자열 형태로 저장될 때 36바이트(32자 + 4개의 하이픈)을 차지하기 때문에 `BINARY(16)`으로 저장하면 16바이트만 사용하므로 저장공간을 절약할 수 있다.
   >
   >    - UUID 예시: `1fc454e5-b9f6-4d55-b783-5987fe76cb45`
   >
   > - MySQL에서는 `UUID_TO_BIN()` 함수를 사용해 UUID 문자열을 `BINARY(16)`으로 변환하고, `BIN_TO_UUID()` 함수를 사용해 `BINARY(16)`을 UUID 문자열로 변환할 수 있다.

<br />

- 데이터베이스의 테이블에서 하나의 데이터만 가져오기 위한 함수를 작성한다.

	```js
	function getNote(uuid) {
	  pool.query(
	    `SELECT BIN_TO_UUID(uuid, true) AS uuid, title, contents, created FROM notes WHERE uuid=UUID_TO_BIN('${uuid}', 1)`,
	    function (err, rows, fields) {
	      console.log(rows);
	    }
	  );
	}
	
	getNote(uuid);
 	```

 - 다음과 같이 하나의 데이터만 잘 가져오는 것을 확인할 수 있다.

	 <img width="40%" alt="image" src="https://github.com/user-attachments/assets/0ac2c13f-ec87-49bc-9a00-19900b87f2f7" />

<br />

### INSERT 함수

- 데이터베이스의 테이블에 데이터를 추가하기 위한 함수를 작성한다.

	```js
	function addNote(title, contents) {
	  pool.query(
	    `INSERT INTO notes (title, contents) VALUES('${title}', '${contents}')`,
	    function (err, rows, fields) {
	      console.log(rows);
	    }
	  );
	}
	
	addNote('My Third Note', 'A note about something else');
 	```

	- 다음과 같이 데이터가 잘 추가된 것을 확인할 수 있다.

		<img width="40%" alt="image" src="https://github.com/user-attachments/assets/6edb5632-3eae-4c52-984a-5081acd749b1" />

<br />

### UPDATE 함수

- 데이터베이스의 테이블의 데이터를 변경하기 위한 함수를 작성한다.

	```js
	function updateNote(uuid, title, contents) {
	  pool.query(
	    `UPDATE notes SET title='${title}',contents='${contents}' WHERE uuid=UUID_TO_BIN('${uuid}', 1)`,
	    function (err, rows, fields) {
	      console.log(rows);
	    }
	  );
	}
	
	updateNote(
	  uuid,
	  'Updated - My Third Note',
	  'Updated - A note about something else'
	);
 	```

 	- 다음과 같이 데이터가 잘 변경된 것을 확인할 수 있다.

		<img width="40%" alt="image" src="https://github.com/user-attachments/assets/9e8b208d-7630-40dd-a431-f860403ca722" />

<br />

### DELETE 함수

- 데이터베이스의 테이블에서 데이터를 삭제하기 위한 함수를 작성한다.

	```js
	function deleteNote(uuid) {
	  pool.query(
	    `DELETE FROM notes WHERE uuid=UUID_TO_BIN('${uuid}', 1)`,
	    function (err, rows, fields) {
	      console.log(rows);
	    }
	  );
	}
	
	deleteNote(uuid);
 	```

	- 다음과 같이 데이터가 잘 삭제된 것을 확인할 수 있다.

 		<img width="40%" alt="image" src="https://github.com/user-attachments/assets/30f4134d-b8be-4599-af89-67bc5fe91732" />

<br />

## :nine: MySQL Express 연동

### Promise

- MySQL 함수는 비동기로 동작한다. `request`를 전달하고 MySQL에서 해당 SQL문에 대한 결과값을 반환하는데까지 시간이 필요하기 때문이다.

	- 아래 코드의 `getNotes` 함수를 실행하면 `before`와 `after`가 먼저 출력된 이후 약간의 시간이 지난 후 데이터 조회 결과가 넘어오는 것을 확인할 수 있다.

		```js
		function getNotes() {
		  console.log('before');
		  pool.query(
		    `SELECT BIN_TO_UUID(uuid, true) AS uuid, title, contents, created FROM notes`,
		    function (err, rows, fields) {
		      console.log(rows);
		    }
		  );
		  console.log('after');
		}
		```
  	
  	<br />
	 
  	<img width="40%" alt="image" src="https://github.com/user-attachments/assets/db483a4c-53ec-448d-9d1e-ead1d545f62d" />

- 따라서 코드의 흐름을 원하는대로 제어하기 위해 비동기 처리가 필요하다. `Promise`를 활용하거나 `async`/`await`을 이용할 수 있다.

<br />

### HTTP GET 만들기

- `GET` `/notes`
  
	- 기존에 작성했던 `getNotes` 함수를 비동기 함수로 수정한다. (**[공식문서 참고](https://sidorares.github.io/node-mysql2/docs#using-connection-pools)**)
	
		```js
	 	/**
		 * 전체 note 목록을 가져오는 getNotes 함수
		 * @returns {Array<{ uuid: string, title: string, contents: string, created: string }>}
		 */
		async function getNotes() {
		  const [rows] = await pool.query(
		    `SELECT BIN_TO_UUID(uuid, true) AS uuid, title, contents, created FROM notes`
		  );
		
		  return rows;
		}
	 	```
	
	- 이어서 `/notes`로 GET 요청을 보내면 `getNotes` 함수를 이용해 데이터를 가져와 응답하는 api를 작성한다.
	
		```js
		app.get('/notes', async(req, res) => {
		  const result = await getNotes();
		  res.send(result);
		})
	 	```
	
	 	- 약간의 시간이 지난 후 다음과 같이 데이터를 잘 불러오는 것을 확인할 수 있다.
	
			<img width="50%" alt="image" src="https://github.com/user-attachments/assets/c0a92925-6e57-437f-8100-013994c5dfc4" />

<br />

- `GET` `/notes/{uuid}`
  
	- 데이터 하나를 가져오는 `getNote` 함수 역시 비동기 함수로 수정한다.
	
		```js
		/**
		 * 매개변수에 전달한 uuid와 일치하는 note 한 개를 가져오는 getNote 함수
		 * @param {string} uuid - note의 uuid
		 * @returns {Array<{ uuid: string, title: string, contents: string, created: string }>}
		 */
		export async function getNote(uuid) {
		  const [rows] = await pool.query(
		    `SELECT BIN_TO_UUID(uuid, true) AS uuid, title, contents, created FROM notes WHERE uuid=UUID_TO_BIN('${uuid}', 1)`
		  );
		
		  return rows;
		}
	 	```
	
	- `/notes:uuid`로 GET 요청을 보내면 `getNote` 함수를 이용해 데이터를 가져와 응답하는 api를 작성한다.
		
		```js
		app.get('/note/:uuid', async (req, res, next) => {
		  try {
		    const uuid = req.params.uuid;
		
		    if (!uuid) throw new Error('400@No path parameter');
		
		    const result = await getNote(uuid);

  	    if (!result) res.send({});
		    if (result.length === 0) res.send({});

        res.send(result[0]);
		  } catch (err) {
		    next(err);
		  }
		});
		```

	- 다음과 같이 데이터를 잘 불러오는 것을 확인할 수 있다.

   	<img width="50%" alt="image" src="https://github.com/user-attachments/assets/c4d00c0d-fd01-4052-a288-f0b682b29a6e" />

	- Express의 [공식문서](https://expressjs.com/en/guide/error-handling.html)를 따라 에러 핸들링 코드도 작성한다.

 		```js
		app.use((err, req, res, next) => {
		  console.error(err.stack);
		  res.status(500).send('Something broke!');
		});
		```

		- 위의 GET 메서드에서 `next`에 `err`를 전달했기 때문에 에러가 발생하면 에러 핸들링 코드로 넘어가 다음과 같이 에러라고 보여주는 것을 확인할 수 있다.

			<img width="50%" alt="image" src="https://github.com/user-attachments/assets/9fad141c-a8f0-41f7-9625-7ed3d3a24ba8" />

<br />

### HTTP POST 만들기

- `POST` `/note`

	- `addNote` 함수를 비동기 함수로 수정한다.

		```js
		/**
		 * 새로운 note를 추가하는 addNote 함수
		 * @param {string} title - note의 제목
		 * @param {string} contents - note의 내용
		 */
		export async function addNote(title, contents) {
			await pool.query(
				`INSERT INTO notes (title, contents) VALUES('${title}', '${contents}')`
			);
		}
		```

	- `/note`로 POST 요청을 보내면 `addNote` 함수를 이용해 데이터를 추가하는 api를 작성한다.

		```js
		app.post('/note', async (req, res, next) => {
			const { title, contents } = req.body;
		
			if (!title) res.sendStatus(400);
			if (!contents) res.sendStatus(400);
		
			await addNote(title, contents);
			res.sendStatus(201);
		});
		```

	- 다음과 같이 데이터를 잘 저장하는 것을 확인할 수 있다.

		<img width="50%" alt="image" src="https://github.com/user-attachments/assets/a4b4138e-fa1b-4fab-a564-0faf201a9e75" />

<br />

### HTTP PUT

- `PUT` `/note/:uuid`

	- `updateNote` 함수를 비동기로 수정한다.

		```js
		/**
		 * 매개변수에 전달한 uuid와 일치하는 note의 데이터를 수정하는 updateNote 함수
		 * @param {string} uuid - 수정하려는 note의 uuid
		 * @param {string} title - 수정한 note의 제목
		 * @param {string} contents - 수정한 note의 내용
		 * @returns {{fieldCount: number, affectedRows: number, insertId: number, info: string, serverStatus: number, warningStatus: number, changedRows: number}}
		 */
		export async function updateNote(uuid, title, contents) {
		  const [rows] = await pool.query(
		    `UPDATE notes SET title='${title}',contents='${contents}' WHERE uuid=UUID_TO_BIN('${uuid}', 1)`
		  );
		
		  return rows;
		}
		```

  - `/note/:uuid`로 PUT 요청을 보내면 `updateNote` 함수를 이용해 데이터를 수정하는 api를 작성한다. 에러를 자세하게 명시하여 어떤 에러가 발생했는지 응답에서 확인할 수 있도록 작성한다.
 
    ```js
    app.put('/note/:uuid', async (req, res, next) => {
      try {
        const uuid = req.params.uuid;
        const { title, contents } = req.body;
    
        if (!uuid) {
          const error = new Error('No parameter');
          error.status = 400;
          throw error;
        }
        if (!title || !contents) {
          const error = new Error('No required data');
          error.status = 400;
          throw error;
        }
    
        const result = await updateNote(uuid, title, contents);
    
        if (result.affectedRows !== 1) {
          const error = new Error('Not updated');
          error.status = 400;
          throw error;
        }
    
        res.sendStatus(204);
      } catch (err) {
        next(err);
      }
    });
    ```

    
    - 데이터를 잘 수정하면 왼쪽과 같이 `204 No Content`를 응답하고, 만약 데이터가 하나라도 없으면 `400 No required data`를 반환하는 것을 볼 수 있다.
    
      |**성공적으로 수정한 경우**|**필수 데이터를 보내지 않은 경우**|
      |:---:|:---:|
      |<img alt="image" src="https://github.com/user-attachments/assets/2225ec57-a3dc-46f0-8f26-4a04dfe86b5a" />|<img alt="image" src="https://github.com/user-attachments/assets/2126e38d-de7f-4f1a-bbb8-e94abf04dbd5" />|

<br />

### HTTP DELETE 만들기

- `DELETE` `/note/:uuid`

  - `deleteNote` 함수를 비동기 함수로 수정한다.

    ```js
    /**
     * 매개변수에 전달한 uuid와 일치하는 note의 데이터를 삭제하는 deleteNote 함수
     * @param {string} uuid - 삭제하려는 note의 uuid
     * @returns {{fieldCount: number, affectedRows: number, insertId: number, info: string, serverStatus: number, warningStatus: number}}
     */
    export async function deleteNote(uuid) {
      const [rows] = await pool.query(
        `DELETE FROM notes WHERE uuid=UUID_TO_BIN('${uuid}', 1)`
      );
    
      return rows;
    }
    ```

  - `/note/:uuid`로 DELETE 요청을 보내면 `deleteNote` 함수를 이용해 데이터를 삭제하는 api를 작성한다.

    ```js
    app.delete('/note/:uuid', async (req, res, next) => {
      try {
        const uuid = req.params.uuid;
    
        if (!uuid) {
          const error = new Error('No parameter');
          error.status = 400;
          throw error;
        }
    
        const result = await deleteNote(uuid);
    
        if (result.affectedRows !== 1) {
          const error = new Error('Failed to delete');
          error.status = 400;
          throw error;
        }
    
        res.sendStatus(204);
      } catch (err) {
        next(err);
      }
    });
    ```

  - 다음과 같이 데이터를 잘 삭제하는 것을 확인할 수 있다.

    <img width="50%" alt="image" src="https://github.com/user-attachments/assets/8c7e2a1a-2c49-4985-8434-cd6486fceee3" />
    
<br />

## :keycap_ten: AWS RDS PostgreSQL 연결

### AWS RDS PostgreSQL 설정

- [위에서 진행한 과정](#six-aws-rds-설정)과 동일하게 PostgreSQL을 사용하기 위한 VPC, RDS를 구축한다.

  - VPC 생성과 RDS 서브넷 그룹 설정 및 언급하지 않은 DB 설정은 위와 동일하다.

	- PostgreSQL 엔진을 사용한 RDS를 생성한다.

		<img width="50%" alt="image" src="https://github.com/user-attachments/assets/62364492-7e21-4460-bb2c-5433095cb769" />

 	- PostgreSQL의 경우 `5432` 포트를 사용하는 것을 알 수 있다.

		<img width="50%" alt="image" src="https://github.com/user-attachments/assets/c38901f5-172c-4847-a8be-285680461840" />

<br />

### Express PostgreSQL 설정

- Express에서 PostgreSQL에 접근할 수 있도록 **[pg](https://www.npmjs.com/package/pg)** 라는 패키지를 설치한다.

	```bash
 	npm install pg
 	```

<br />

> **[node-postgres 공식문서](https://node-postgres.com/)**

<br />

- [공식문서](https://node-postgres.com/features/connecting#programmatic)를 참고하여 데이터베이스 연결을 위한 Pool 객체를 생성한다.

	```js
	import { Pool } from 'pg';
	import 'dotenv/config';
	
	const pool = new Pool({
	  host: process.env.POSTGRESQL_RDS_ENDPOINT,
	  user: process.env.POSTGRESQL_RDS_USERNAME,
	  password: process.env.POSTGRESQL_RDS_PASSWORD,
	  port: 5432,
	});
 	```

- 이어서 데이터베이스에 `connect` 및  `release`까지 수행해야 하는데, 이 과정에서 에러를 마주한다.

  ```js
  const client = await pool.connect();
  const res = await client.query(`SELECT NOW()`);
  console.log(res);
  client.release();
  ```

<br />

  <img width="40%" alt="image" src="https://github.com/user-attachments/assets/35ea1fe5-e875-4b1b-a378-46c53a466d62" />
  
<br />
<br />

  > **에러 핸들링**
  >
  > PostgreSQL RDS의 경우 `rds.force_ssl` 파라미터를 사용하여 SSL을 사용하도록 설정하는데, PostgreSQL 버전 15이상은 rds.force_ssl 파라미터 기본값이 1(켜짐)이라서 에러가 난 것이다.
  >
  > - 이를 해결하기 위해서는 PostgreSQL 버전을 14로 내리거나, 파라미터 값을 수정하거나, SSL을 포함하여 DB를 연결하는 방법이 있을 것이다. 보안을 위해서 세 번째 방법으로 해결하는 것이 좋지만 작은 프로젝트이기 때문에 두 번째 방법으로 문제를 해결한다.
  >
  > - 먼저 데이터베이스의 **구성** 탭에서 DB 인스턴스 파라미터 그룹을 수정해야 한다.
  > 
  >   <img width="40%" alt="image" src="https://github.com/user-attachments/assets/906676b0-dda2-4de3-aac3-e3a227a51708" />
  >
  > - 파라미터 그룹에서 `rds.force_ssl`을 검색해보면 값이 `1`인 것을 확인할 수 있다. 파라미터 그룹을 새로 생성한 다음 값을 `0`으로 바꾸고 RDS와 연결한다.
  >
  >   |**`rds.force_ssl`**|**파라미터 그룹 생성**|
  >   |:---:|:---:|
  >   |<img alt="image" src="https://github.com/user-attachments/assets/b805f140-6c10-436f-9be2-3386f7824c25" />|<img alt="image" src="https://github.com/user-attachments/assets/db7eab9d-b914-43dc-b5c7-f7c281f5bbeb" />|
  >   |**`rds.force_ssl` 값 변경**|**RDS에 연결**|
  >   |<img alt="image" src="https://github.com/user-attachments/assets/56f244b9-20df-4ac5-aff4-87c28bc30ea9" />|<img alt="image" src="https://github.com/user-attachments/assets/c625a029-a950-4403-a1a3-a0157fe7f965" />|

<br />

  - 위 과정을 진행하면 다음과 같이 PostgreSQL 데이터베이스에 잘 접속한 것을 확인할 수 있다.

    <img width="40%" alt="image" src="https://github.com/user-attachments/assets/27c8c02d-e6af-407d-b3be-029cd7a9bf4b" />

<br />

### 데이터베이스 생성

- PostgreSQL을 이용해 데이터베이스를 생성한다.

  ```js
  const client = await pool.connect();
	const res = await client.query(
	  `CREATE DATABASE db_test WITH ENCODING='UTF-8'`
	);
	console.log(res.rows);
	client.release();
	```

- 다음 쿼리문을 이용해 데이터베이스를 조회해보면 `db_test`가 생성된 것을 확인할 수 있다.

	```js
	const client = await pool.connect();
	const res = await client.query(`SELECT datname FROM pg_database`);
	console.log(res.rows);
	client.release();
 	```

	<img width="40%" alt="image" src="https://github.com/user-attachments/assets/62fd3dc3-6568-4ef6-b32d-de6567cb0e78" />

<br />

### 테이블 생성

- 데이터베이스 접속을 위해 기존 `Pool` 생성자 함수의 내에 `database` 항목을 추가한다.

	```js
	const pool = new Pool({
	  host: process.env.POSTGRESQL_RDS_ENDPOINT,
	  user: process.env.POSTGRESQL_RDS_USERNAME,
	  password: process.env.POSTGRESQL_RDS_PASSWORD,
	  port: 5432,
    database: "db_test"
	});
 	```

- 데이터베이스에 접속해 테이블을 생성한다.

  ```js
	const res = await client.query(`CREATE TABLE notes (
    "uuid" UUID DEFAULT gen_random_uuid(),
    title VARCHAR NOT NULL,
    contents VARCHAR NOT NULL,
    created TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY("uuid")
  )`);
  ```

- 테이블을 조회해보면 다음과 같이 테이블이 잘 생성된 것을 확인할 수 있다.

	```js
	const res = await client.query(
	  `SELECT table_schema,table_name FROM information_schema.tables WHERE table_schema != 'pg_catalog' AND table_schema != 'information_schema'`
	);
	console.log(res.rows);
 	```

	<img width="335" alt="image" src="https://github.com/user-attachments/assets/94cf9ced-7e08-422a-8c49-28b80342dbad" />

<br />

### 데이터 넣기

- `notes` 테이블에 데이터를 삽입한다.

  ```js
	const res = await client.query(
	  `INSERT INTO notes (title, contents) VALUES ('title1', 'content1');`
	);
  ```

- `notes` 테이블을 확인해보면 다음과 같이 데이터가 잘 생성된 것을 확인할 수 있다.

	```js
	const res = await client.query(`SELECT * FROM notes`);
 	```

	<img width="40%" alt="image" src="https://github.com/user-attachments/assets/8d0073ff-72f3-4b20-8606-77157197842c" />

<br />

## :one::one: PostgreSQL 데이터베이스 연결

### SELECT 함수 만들기

- notes 테이블에 있는 모든 데이터를 가져오는 SELECT 함수를 설계한다. 데이터를 불러오는 작업은 비동기로 이루어지므로 비동기 함수를 작성한다.

  ```js
  /**
	 * notes 테이블에 있는 모든 데이터를 가져오는 SELECT 함수
	 * @returns {Array<{ uuid: string, title: string, contents: string, created: string }>}
	 */
	async function getNotes() {
	  const client = await pool.connect();
	  const res = await client.query(`SELECT * FROM notes`);
	  console.log(res.rows);
	  client.release();
  	return res.rows;
	}
	
	await getNotes();
  ```

	- 다음과 같이 결과를 잘 가져오는 것을 확인할 수 있다.

 		<img width="40%" alt="image" src="https://github.com/user-attachments/assets/b4da099d-1873-4e91-88d6-f9e2192d5447" />

- notes 테이블에서 `uuid`가 일치하는 데이터를 가져오는 SELECT 함수를 설계한다.

	```js
	/**
	 * notes 테이블에서 uuid가 일치하는 데이터를 가져오는 SELECT 함수
	 * @param {string} uuid - 원하는 note의 uuid
	 * @returns {Array<{ uuid: string, title: string, contents: string, created: string }>}
	 */
	async function getNote(uuid) {
	  const client = await pool.connect();
	  const res = await client.query(`SELECT * FROM notes WHERE uuid='${uuid}'`);
	  console.log(res.rows);
	  client.release();
	  return res.rows;
	}

	await getNote('6dff6f2f-72e4-4185-befc-e930f137d589');
 	```

	- 다음과 같이 결과를 잘 가져오는 것을 확인할 수 있다.

 		<img width="40%" alt="image" src="https://github.com/user-attachments/assets/b4da099d-1873-4e91-88d6-f9e2192d5447" />
 
<br />

### INSERT 함수 만들기

- notes 테이블에 데이터를 추가하는 INSERT 함수를 설계한다.

	```js
	/**
	 * notes 테이블에 데이터를 추가하는 INSERT 함수
	 * @param {string} title - 새로 추가할 note의 제목
	 * @param {string} contents - 새로 추가할 note의 내용
	 */
	async function addNote(title, contents) {
	  const client = await pool.connect();
	  const res = await client.query(
	    `INSERT INTO notes (title, contents) VALUES('${title}', '${contents}')`
	  );
	  console.log(res.rows);
	  client.release();
	}
	
	await addNote('title3', 'content3');
 	```

	- `getNotes` 함수를 이용해 데이터를 조회해보면 데이터가 잘 추가된 것을 확인할 수 있다.

		<img width="40%" alt="image" src="https://github.com/user-attachments/assets/fdb115f8-b8ab-4406-9fc9-3ec7809a7b30" />

<br />

### UPDATE 함수 만들기

- notes 테이블에 있는 데이터를 수정하는 UPDATE 함수를 설계한다.

  ```js
	/**
	 * notes 테이블에서 uuid가 일치하는 데이터를 수정하는 UPDATE 함수
	 * @param {string} uuid - 변경하고자 하는 note의 uuid
	 * @param {string} title - note의 변경될 제목
	 * @param {string} contents - note의 변경될 내용
	 */
	async function updateNote(uuid, title, contents) {
	  const client = await pool.connect();
	  const res = await client.query(
	    `UPDATE notes SET title='${title}',contents='${contents}' WHERE uuid='${uuid}'`
	  );
	  console.log(res.rows);
	  client.release();
	}
	
	await updateNote(
	  '89e7e683-b526-4516-b930-d626d737b4bd',
	  'title3',
	  'content3 - updated'
	);
  ```

	- `getNotes` 함수를 이용해 데이터를 조회해보면 데이터가 잘 수정된 것을 확인할 수 있다.

		<img width="40%" alt="image" src="https://github.com/user-attachments/assets/5871f99f-6ec2-4f32-b956-b2f68c09b72f" />
		
<br />

### DELETE 함수 만들기

- notes 테이블에 있는 데이터를 삭제하는 DELETE 함수를 설계한다.

	```js
	/**
	 * notes 테이블에서 uuid가 일치하는 데이터를 삭제하는 DELETE 함수
	 * @param {string} uuid - 삭제하고자 하는 note의 uuid 
	 */
	async function deleteNote(uuid) {
	  const client = await pool.connect();
	  const res = await client.query(
	    `DELETE FROM notes WHERE uuid='${uuid}'`
	  );
	  console.log(res.rows);
	  client.release();
	}
	
	await deleteNote('0e719215-9c4e-4ef0-b694-469f44a8f037');
 	```

 	- `getNotes` 함수를 이용해 데이터를 조회해보면 데이터가 잘 삭제된 것을 확인할 수 있다.

		<img width="326" alt="image" src="https://github.com/user-attachments/assets/18c2ce16-ac85-49a7-a2e9-78335aade464" />

<br />

## :one::two: PostgreSQL Express 연동

### HTTP GET

- `GET` `/notes`

  - notes 테이블의 모든 데이터를 받아오는 GET 메서드를 작성한다.
    ```js
    app.get('/notes', async (req, res) => {
      const notes = await getNotes();
      res.send(notes);
    });
    ```
    
	- `http://localhost:3000/notes`로 접속하면 데이터를 잘 받아올 수 있다.
 
 		<img width="50%" alt="image" src="https://github.com/user-attachments/assets/d42e276d-2c4f-4eb9-85db-1b6642c346ab" />

<br />

- `GET` `/note/:uuid`

	- notes 테이블에서 `uuid`가 일치하는 데이터를 받아오는 GET 메서드를 작성한다.

	  - `uuid`가 없거나 `uuid`의 형식이 적절하지 않을 경우 에러를 발생시킨다.
   	- 조회된 데이터가 없다면 빈 객체(`{}`)를 응답한다.

		```js
		app.get('/note/:uuid', async (req, res) => {
			const uuid = req.params.uuid;
		
			if (!uuid || uuid.length !== 36) {
				const error = new Error('No / Wrong parameter');
				error.status = 400;
				throw error;
			}
		
			const note = await getNote(uuid);
		
			if (note.length === 0) res.send({});
		
			res.send(note[0]);
		});
		```

 - `http://localhost:3000/note/89e7e683-b526-4516-b930-d626d737b4bd`로 접속하면 데이터를 잘 받아올 수 있다.

   <img width="50%" alt="image" src="https://github.com/user-attachments/assets/e24e6e9d-e275-42f4-8c20-63c56609dbb7" />

<br />

### HTTP POST

- `POST` `/note`

  - notes 테이블에 데이터를 추가하는 POST 메서드를 작성한다.

    ```js
    app.post('/note', async (req, res) => {
      const { title, contents } = req.body;
    
      if (!title || !contents) {
        const error = new Error('No required data');
        error.status = 400;
        throw error;
      }
    
      await addNote(title, contents);
      res.sendStatus(201);
    });
    ```

  - `http://localhost:3000/note`로 POST 요청을 보낸 후 GET 요청을 통해 확인하면 데이터가 잘 저장된 것을 확인할 수 있다.

    |**POST 요청 결과**|**GET 요청 결과**|
    |:---:|:---:|
    |<img alt="image" src="https://github.com/user-attachments/assets/fcd35a9d-0bed-4bc6-99b0-fe8532a80332" />|<img alt="image" src="https://github.com/user-attachments/assets/d8eb972c-e9c5-4110-bcf0-7f2e7437c596" />|

<br />

### HTTP PUT

- `PUT` `/note/:uuid`

  - notes 테이블에서 `uuid`가 일치하는 데이터를 수정하는 PUT 메서드를 작성한다. 이번에는 성공적으로 PUT 요청을 처리하면 업데이트 된 데이터를 받아오는 코드도 추가한다.

    ```js
    app.put('/note/:uuid', async (req, res) => {
      const uuid = req.params.uuid;
      const { title, contents } = req.body;
    
      if (!uuid || uuid.length !== 36) {
        const error = new Error('No / Wrong parameter');
        error.status = 400;
        throw error;
      }
    
      if (!title || !contents) {
        const error = new Error('No required data');
        error.status = 400;
        throw error;
    	}
    
      await updateNote(uuid, title, contents);

      const updatedNote = await getNote(uuid);
      res.send(updatedNote);
    });
    ```

  - `http://localhost:3000/note/:uuid`로 PUT 요청을 보내면 데이터가 잘 저장된 것을 확인할 수 있다.

    <img width="50%" alt="image" src="https://github.com/user-attachments/assets/c8f5cca3-353e-4c7e-b693-839389d6ba61" />


<br />

### HTTP DELETE

- `DELETE` `/note/:uuid`

  - notes 테이블에서 `uuid`가 일치하는 데이터를 삭제하는 DELETE 메서드를 작성한다.

    ```js
    app.delete('/note/:uuid', async (req, res) => {
      const uuid = req.params.uuid;
    
      if (!uuid || uuid.length !== 36) {
        const error = new Error('No / Wrong parameter');
        error.status = 400;
        throw error;
      }
    
      await deleteNote(uuid);
      res.sendStatus(204);
    });
    ```

  - `http://localhost:3000/note/:uuid`로 DELETE 요청을 보낸 후 GET 요청을 통해 확인하면 데이터가 잘 저장된 것을 확인할 수 있다.

    |**DELETE 요청 결과**|**GET 요청 결과**|
    |:---:|:---:|
    |<img alt="image" src="https://github.com/user-attachments/assets/9abce50a-63e6-4fe0-b718-c0104b3117b4" />|<img  alt="image" src="https://github.com/user-attachments/assets/8b249e2f-671d-4988-8e1d-6c328eb930b6" />|

<br />

## :one::three: MongoDB 데이터베이스 연결

### MongoDB 프로젝트 설정

- MongoDB에 로그인한 후 Organization > Projects 탭에서 새로운 프로젝트를 생성한다.

  <img width="50%" alt="image" src="https://github.com/user-attachments/assets/3e3fc1c3-047d-4a4f-bc83-e58ce2dcd221" />

- 프리티어로 데이터베이스를 생성한다.

	<img width="50%" alt="image" src="https://github.com/user-attachments/assets/b312817b-cef3-4b54-a63c-e89e09d11515" />

- 생성한 데이터베이스에 Driver 방식으로 연결한다.

	<img width="50%" alt="image" src="https://github.com/user-attachments/assets/5d12fd07-63c9-43fb-951e-065322da607a" />

- 네트워크 IP를 설정한다. 정해진 EC2에서만 접속을 허용하려면 EC2의 IP 주소를 입력하면 되고, 외부에서 접근을 허용하려면 다음과 같이 Access from Anywhere로 설정한다.

	<img width="50%" alt="image" src="https://github.com/user-attachments/assets/b7f647a0-b9d0-47f0-b65d-2e9a3bfdaeda" />

- MongoDB는 collections라는 이름으로 데이터베이스 테이블을 생성한다. Clusters > Collections 탭에서 notes라는 새로운 collection을 생성한다.

	<img width="50%" alt="image" src="https://github.com/user-attachments/assets/e242cd78-42c8-41aa-ad04-e2615f3a9d3d" />

<br />

### MongoDB 실행 환경 구성

- 프로젝트에서 `mongodb` 패키지를 설치한다.

	```bash
 	npm install mongodb
 	```
 
- MongoDB 공식문서에서 제공하는 connection code를 복사하여 적용하고 비밀번호를 변경한다.

	<img width="50%" alt="image" src="https://github.com/user-attachments/assets/4b204a7d-a0c1-4d3b-a239-fa41a4bddf7d" />

- 다음과 같이 MongoDB 데이터베이스에 성공적으로 접속한 것을 확인할 수 있다.

	<img width="40%" alt="image" src="https://github.com/user-attachments/assets/79864c12-1f73-4600-9095-4b77741651da" />

- MongoDB 공식문서의 [가이드](https://www.mongodb.com/ko-kr/docs/manual/core/databases-and-collections/#create-a-database)에 따라 `db_test` 데이터베이스의 `notes` 컬렉션에 데이터 추가를 테스트한다.

	```js
	async function run() {
	  try {
	    // Connect the client to the server	(optional starting in v4.7)
	    await client.connect();
	    // Send a ping to confirm a successful connection
	    const db = client.db("db_test");
	    const collection = db.collection("notes");
	    await collection.insertOne({title: "title1", contents: "contents1"})
	    console.log(
	      'Pinged your deployment. You successfully connected to MongoDB!'
	    );
	  } finally {
	    // Ensures that the client will close when you finish/error
	    await client.close();
	  }
	}
	run().catch(console.dir);
 	```

 	- 다음과 같이 컬렉션에 데이터가 잘 추가된 것을 확인할 수 있다.

		<img width="50%" alt="image" src="https://github.com/user-attachments/assets/7986de99-9fb9-4405-90f6-c669b9f8a421" />

<br />

> **MongoDB Quick Reference**
> 
> [MongoDB Docs](https://www.mongodb.com/docs/drivers/node/current/reference/quick-reference/)

<br />

### INSERT 함수

- notes 테이블에 데이터를 추가하는 INSERT 함수를 설계한다.

  ```js
  async function addNote(title, contents) {
    await collection.insertOne({
      title,
      contents,
      created: new Date(),
    });
  }
  
  await addNote('title1', 'content1');
  ```

  - 데이터베이스를 확인해보면 데이터가 잘 추가된 것을 볼 수 있다.

    <img width="50%" alt="image" src="https://github.com/user-attachments/assets/8a2db6f5-f26c-433b-ab22-028ecacc6318" />

<br />

### SELECT 함수

- notes 테이블에서 데이터를 **조건 없이** 검색하는 SELECT 함수를 설계한다.

  - 조건 없이 여러 개의 데이터를 가져올 때는 **`find` 메서드를 실행한 값을 `cursor`라는 변수에 담아 이를 배열 형태로 반환**한다.

  ```js
  /**
   * notes에 저장된 데이터를 조회하는 SELECT 함수
   * @returns {Array<{ _id: object, title: string, contents: string, created: object }>}
   */
  async function getNotes() {
    const cursor = collection.find();
    const result = await cursor.toArray();
  
    console.log(result);
  
    return result;
  }
  
  await getNotes();
  ```

  <img width="40%" alt="image" src="https://github.com/user-attachments/assets/deaf16c9-bdca-4377-a84e-02fd737d05e8" />

  - 하지만 `_id` 값이 `string`이 아닌 `object` 타입인 것을 확인할 수 있다. 이 문제를 해결하기 위해 `find`의 매개변수로 projection document를 전달해 원하는 `field`를 선택하거나 원하는 형태로 변경할 수 있다. ([공식문서](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#std-label-find-projection))

    ```js
    const cursor = collection.find(
  	  {},
  	  {
  	    projection: {
  	      _id: { $toString: '$_id' },
  	      title: 1,
  	      contents: 1,
  	      created: 1,
  	    },
      }
  	);
    ```

  - 최종 검색 결과는 다음과 같다.
    
    <img width="40%" alt="image" src="https://github.com/user-attachments/assets/6cd3a6c4-585c-44fa-a9e0-6191ea59a044" />

<br />

- notes 테이블에서 해당 `id`값을 가진 데이터를 검색하는 SELECT 함수를 설계한다. `find` 메서드의 첫 번째 인수로 검색 조건을 전달하고, `_id` 값을 `string` 형태로 응답받기 위해 위와 마찬가지로 projection document를 전달한다.

  ```js
  /**
   * notes에서 특정 id 값을 갖는 데이터를 검색하는 SELECT 함수
   * @param {string} id - notes에서 찾고자 하는 데이터의 id
   * @returns {Array<{ _id: string, title: string, contents: string, created: object }>}
   */
  async function getNote(id) {
    const result = await collection.findOne(
      { _id: new ObjectId(id) },
      {
        projection: {
          _id: { $toString: '$_id' },
          title: 1,
          contents: 1,
          created: 1,
        },
      }
    );
    console.log(result);
    return result;
  }
  
  await getNote('685c07c2f2bf41a1da48235a');
  ```

  - 검색 결과는 다음과 같다.

    <img width="40%" alt="image" src="https://github.com/user-attachments/assets/8b368ecd-99c9-4d1b-8458-70e4249f5c61" />

<br />

### UPDATE 함수

- notes 테이블에서 특정 `id` 값을 가진 데이터를 찾아 값을 변경하는 UPDATE 함수를 설계한다. `updateOne` 메서드의 첫 번째 인수로 조건을 전달하고, 두 번째 인수로 변경할 데이터를 `$set` 프로퍼티의 값으로 전달한다.

  ```js
  /**
   * notes에서 특정 id 값을 갖는 note의 데이터를 변경하는 UPDATE 함수
   * @param {string} id - 변경할 note의 id
   * @param {string} title - 변경할 note의 제목
   * @param {string} contents - 변경할 note의 내용
   */
  async function updateNote(id, title, contents) {
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { title: title, contents: contents } }
    );
  }
  
  await updateNote('685c07c2f2bf41a1da48235a', 'title1', 'content1 - updated');
  ```

  - 데이터베이스를 확인해보면 다음과 같이 값이 잘 변경된 것을 확인할 수 있다.

    <img width="50%" alt="image" src="https://github.com/user-attachments/assets/07fd1a09-5429-4ac0-bfd5-bcca915d6b56" />

<br />

### DELETE 함수

- notes 테이블에서 특정 `id` 값을 가진 데이터를 삭제하는 DELETE 함수를 설계한다.

  ```js
  /**
   * notes에서 특정 id 값을 갖는 note를 삭제하는 DELETE 함수
   * @param {string} id - 삭제할 note의 id
   */
  async function deleteNote(id) {
    await collection.deleteOne({ _id: new ObjectId(id) });
  }
  
  await deleteNote('685c14819c9f271a6c91a5b4');
  ```

  - 데이터베이스를 확인해보면 다음과 같이 값이 삭제된 것을 확인할 수 있다.

    <img width="50%" alt="image" src="https://github.com/user-attachments/assets/23e64872-4cef-4424-b523-6a19c194591c" />

<br />

## :one::four: MongoDB Express 연동

### HTTP GET

- `GET` `/notes`

  ```js
	app.get('/notes', async (req, res, next) => {
	  const result = await getNotes();
	
	  res.send(result);
	});
  ```

	- `http://localhost:3000/notes`로 접속하면 데이터를 조회할 수 있다.

		<img width="50%" alt="image" src="https://github.com/user-attachments/assets/662c7a19-5886-4615-9652-0b90d2c4af92" />

<br />

- `GET` `/note/:id`

  ```js
	app.get('/note/:id', async (req, res, next) => {
	  try {
	    const id = req.params.id;
	
	    if (!id) {
	      const error = new Error('No Required Parameter');
	      error.status = 400;
	      throw error;
	    }
	
	    if (id.length !== 24) {
	      const error = new Error('Wrong Parameter');
	      error.status = 400;
	      throw error;
	    }
	
	    const result = await getNote(id);
	
	    if (result.length === 0) res.send({});
	    res.send(result);
	  } catch (err) {
	    next(err);
	  }
	});
  ```

	- `http://localhost:3000/note/:id`로 접속하면 해당 `id`를 가진 데이터를 조회할 수 있다.

		<img width="50%" alt="image" src="https://github.com/user-attachments/assets/9222638c-2f3e-4876-80db-230d3724e437" />

<br />

### HTTP POST

- `POST` `/note`

  ```js
	app.post('/note', async (req, res, next) => {
	  try {
	    const { title, contents } = req.body;
	
	    if (!title || !contents) {
	      const error = new Error('No Required Data');
		    error.status = 400;
		    throw error;
	    }
	
	    await addNote(title, contents);
	    res.sendStatus(201);
	  } catch (err) {
	    next(err);
	  }
	});
  ```

	- `http://localhost:3000/note`로 요청을 보내면 데이터를 추가할 수 있다.

		|**POST 요쳥**|**데이터베이스 조회**|
		|:---:|:---:|
		|<img alt="image" src="https://github.com/user-attachments/assets/eeddc67c-f499-4cbc-8d1e-8daf4059aa5d" />|<img alt="image" src="https://github.com/user-attachments/assets/2bc9e9b2-08d1-4588-a4c1-c6dc4ff3b8b6" />|

<br />

### HTTP PUT

- `PUT` `/note/:id`

  ```js
	app.put('/note/:id', async (req, res, next) => {
	  try {
		  const id = req.params.id;
		  const { title, contents } = req.body;
	
		  if (!id) {
	      const error = new Error('No Required Parameter');
	      error.status(400);
	      throw error;
	    }
	
	    if (id.length !== 24) {
	      const error = new Error('Wrong Parameter');
	      error.status(400);
	      throw error;
	    }
	
	    if (!title && !contents) {
	      const error = new Error('No Required Data');
	      error.status(400);
	      throw error;
	    }
	
	    await updateNote(id, title, contents);
	    res.sendStatus(204);
	  } catch (err) {
	    next(err);
	  }
	});
  ```

	- `http://localhost:3000/note/:id`로 요청을 보내면 데이터를 수정할 수 있다.

		|**PUT 요쳥**|**데이터베이스 조회**|
		|:---:|:---:|
		|<img alt="image" src="https://github.com/user-attachments/assets/eb904178-868b-4405-a3b6-08784751c7ca" />|<img alt="image" src="https://github.com/user-attachments/assets/14405662-38a9-4939-9ab4-62923fcc0aa6" />|

<br />

### HTTP DELETE

- `DELETE` `/note/:id`

  ```js
	app.delete('/note/:id', async (req, res, next) => {
	  try {
	    const id = req.params.id;
	
	    if (!id) {
	      const error = new Error('No Required Parameter');
	      error.status(400);
	      throw error;
	    }
	
	    if (id.length !== 24) {
	      const error = new Error('Wrong Parameter');
	      error.status(400);
		    throw error;
	    }
	
	    await deleteNote(id);
	    res.sendStatus(204);
	  } catch (err) {
      next(err);
	  }
	});
  ```

	- `http://localhost:3000/note/:id`로 요청을 보내면 데이터를 삭제할 수 있다.

		|**DELETE 요쳥**|**데이터베이스 조회**|
		|:---:|:---:|
		|<img alt="image" src="https://github.com/user-attachments/assets/c220e246-81c8-42d9-82d8-7395372bf063" />|<img alt="image" src="https://github.com/user-attachments/assets/4c7e2b31-bdcd-456c-8a89-4803aa214e0c" />|
	
<br />

## :one::five: HTTP Authentication

### HTTP Authentication - Basic

<img width="50%" alt="image" src="https://www.tecracer.com/blog/img/2024/03/mdn-http-auth-sequence-diagram.png" />

- [Basic](https://developer.mozilla.org/ko/docs/Web/HTTP/Guides/Authentication#basic_%EC%9D%B8%EC%A6%9D_%EC%8A%A4%ED%82%B4) 방식은 **base64를 이용하여 인코딩된 사용자 ID/비밀번호 쌍의 인증 정보를 전달**한다.

	- 사용자 ID와 비밀번호(`id:pw`)가 평문으로 네트워크를 통해 전달되기 때문에, Basic 인증 스키마는 안전하지 않습니다. base64로 인코딩되어 있기는 하지만 **암호화 되지는 않았기 때문에** 복호화가 가능한 인코딩 방식이기 때문이다.
  
	- 따라서 HTTPS / TLS이 basic 인증과 함께 사용되어야 하며 이러한 추가적인 보안 향상 없이는 basic 인증은 민감하거나 귀중한 정보를 보호하는 데 사용되어서는 안 된다.

- Basic 방식을 활용하면 다음의 과정을 거친다.

	<img width="50%" alt="image" src="https://github.com/user-attachments/assets/4578cce2-680a-4d53-9fd1-0be5e86956d6" />

<br />

### Express에 Basic Auth 추가

- 이제 Express에서 Basic Auth를 적용한다. 먼저 테스트를 위한 임시 database를 작성하고, GET 요청에 Basic authentication 로직을 추가한다.

 	- base64를 디코딩하는 과정이 필요하다. `Buffer`와 `toString`을 활용해 base64 형태의 id와 password를 디코딩한다. ([참고](https://systorage.tistory.com/entry/Nodejs-Nodejs%EC%97%90%EC%84%9C-base64%EB%A1%9C-%EB%AC%B8%EC%9E%90%EC%97%B4-Encoding-Decoding-%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95))

		```js
		const decodedHeaders = Buffer.from(headers, 'base64').toString('utf8');
		```

	- 디코딩한 `id`와 `password`를 각각의 변수에 저장한다.
	
		```js
		const [id, password] = decodedHeaders.split(":");
		```
   
	- 데이터베이스에 사용자가 입력한 `id`와 `password`가 있는지 확인한다.
	
		```js
		const user = users[0];
		
		if (id !== user.id) res.sendStatus(401);
		if (pw !== user.pw) res.sendStatus(401);
		```

	- `user`가 잘 조회되었다면 데이터를 전송하는 로직을 추가한다.
	
		```js
		const note = notes[0];
		
		res.send(note);
		```

- 다음과 같이 `id`와 `password`가 일치할 때는 데이터를 잘 가져오고, 일치하지 않다면 `Unauthorized` 에러가 발생한다.

	|**`id`, `password` 일치**|**`id`, `password` 불일치**|
	|:---:|:---:|
	|<img alt="image" src="https://github.com/user-attachments/assets/b59597f9-d6a7-4741-8fde-d111ac196cc4" />|<img alt="image" src="https://github.com/user-attachments/assets/e6ceb1d0-22bb-4635-b544-38108aa4a567" />|

- 다음으로, 사용자가 request의 headers에 담아 보내는 `Authorization` 값을 추출한다.

	- 사용자가 `headers`의 `Authorization` 프로퍼티에 `Basic <base64 encoding 값>`을 담아 보내면 `req.headers` 객체는 아래와 같은 값을 가진다.

		<img width="40%" alt="image" src="https://github.com/user-attachments/assets/c71c068d-a1e2-4b1e-9c61-eec1bc591bb0" />

	- `req.headers`의 `authorization` 값을 이용해 base64 디코딩된 값을 추출하고, 이를 이용해 데이터를 조회하는 코드를 작성한다.

 		```js
		const auth = req.headers.authorization;
		console.log(auth);
	
		if (!auth) {
		  res.sendStatus(401);
		  return;
		}
	
		const value = auth.split(' ')[1];
		```

	- 다음과 같이 `id`와 `password`가 일치할 때는 데이터를 잘 가져오고, 일치하지 않다면 `Unauthorized` 에러가 발생한다.
	
		|**`id`, `password` 일치**|**`id`, `password` 불일치**|
		|:---:|:---:|
		|<img alt="image" src="https://github.com/user-attachments/assets/d6cb37cf-bece-48d1-930b-9a954b2b95e4" />|<img alt="image" src="https://github.com/user-attachments/assets/a016f803-d1f6-483a-9acd-aed8d9f9a46e" />| 

<br />

### 미들웨어로 분리

- 지금까지 진행한 `authorization` 값 추출, base64 디코딩의 과정을 Authorization이 필요한 모든 api에서 반드시 거쳐갈 수 있도록 미들웨어를 설계한다.

	```js
	function authorization(req, res, next) {
	  const auth = req.headers.authorization;
	
	  if (!auth) {
	    res.sendStatus(401);
	    return;
	  }
	
	  const value = auth.split(' ')[1];
	
	  // base64 decoding
	  const decodedValue = Buffer.from(value, 'base64').toString('utf8');
	  const [id, password] = decodedValue.split(':');
	
	  // user를 조회했다고 가정
	  const user = users[0];
	
	  if (id !== user.id || password !== user.password) {
	    res.sendStatus(401);
	    return;
	  }
	
	  next();
	}
 	```

- API 요청 과정에서 두 번째 인자로 해당 미들웨어를 전달한다.

	```js
	app.get('/notes', authorization, (req, res) => {
	  const note = notes[0];
	
	  res.send(note);
	});
 	```

- 미들웨어 추가 후 해당 요청을 보낼 때 `id`, `password`를 보내지 않으면 `Unauthorized`로 데이터를 받아 올 수 없다.

	<img width="50%" alt="image" src="https://github.com/user-attachments/assets/092fe45d-a79c-4570-a287-b556f27e423a" />

<br />

### HTTP Authentication - Bearer JWT

- Bearer 방식을 사용하면 다음의 과정을 거친다.

	- 사용자의 `id`와 `pw`를 검증해 `token`을 생성하고, 사용자가 api 요청을 보낼 때 헤더에 `Bearer <token>`을 담아 보낸다는 차이점이 있다.

	<img width="50%" alt="image" src="https://github.com/user-attachments/assets/4331136e-3955-4125-82a9-bcba59413edd" />

- `token`을 생성하는 API를 설계한다.

	- 먼저 `token` 생성을 위해 **`jsonwebtoken`이라는 패키지를 설치**한다. 사용 방법 역시 [공식문서](https://www.npmjs.com/package/jsonwebtoken)에 잘 나와 있다.

		```bash
		npm install jsonwebtoken
		```

	- 사용자의 `id`와 `pw`를 입력받아 `token`을 생성해야 하므로 POST 요청을 설계한다.
	
		```js
		import jwt from 'jsonwebtoken';
		
		app.post('/token', (req, res, next) => {
		  try {
		    const { id, password } = req.body;
		    const user = users[0];
		
		    if (id !== user.id) {
		      const error = new Error('존재하지 않는 아이디입니다.');
		      error.status = 401;
		      throw error;
		    }
		
		    if (password !== user.password) {
		      const error = new Error('비밀번호를 확인해주세요.');
		      error.status = 401;
		      throw error;
		    }
		
		    const token = jwt.sign({ id, name: user.name }, 'secret', {
		      expiresIn: '1h',
		    });
		
		    res.send({ token });
		  } catch (err) {
		    next(err);
		  }
		});
		```

	- 다음과 같이 `token`을 잘 받아오는 것을 확인할 수 있다. `id`와 `password`가 일치하지 않는 경우 예외처리도 가능하다.

		|**`id`, `password` 일치**|**`id 불일치`**|**`password` 불일치**|
		|:---:|:---:|:---:|
		|<img alt="image" src="https://github.com/user-attachments/assets/204685c3-70e6-4adc-9671-36826ff17f49" />|<img alt="image" src="https://github.com/user-attachments/assets/21cacee6-85fa-4fae-9941-11564246bab7" />|<img alt="image" src="https://github.com/user-attachments/assets/114efa7a-6672-4fb3-bf38-79aea3497c48" />|

<br />

### `token` 검증 미들웨어

- `token`을 검증하기 위한 미들웨어를 설계한다. 사용자가 헤더에 담아 전달한 `Bearer token`을 받아 검증하는 과정이 필요하다.

	```js
	function authorizationJWT(req, res, next) {
	  const auth = req.headers.authorization;
	
	  if (!auth) {
      res.sendStatus(401);
	    return;
	  }
	
	  const value = auth.split(' ')[1];
	
	  // Bearer 처리
	  const decoded = jwt.verify(value, 'secret');
	  const user = users[0];
	
	  if (decoded.id !== user.id) {
	    res.sendStatus(401);
	    return;
	  }
	
	  if (decoded.name !== user.name) {
	    res.sendStatus(401);
	    return;
	  }
	
	  next();
	}
 	```

- 미들웨어를 GET `/notes` 요청에 추가하면 다음과 같이 Bearer token이 검증될 때 데이터를 받아올 수 있다.

	```js
	app.get('/notes', authorizationJWT, (req, res) => {
	  const note = notes[0];
	
	  res.send(note);
	});
 	```

	<img width="50%" alt="image" src="https://github.com/user-attachments/assets/649b8740-f0c9-4de2-bf5a-7d4cbf0bdfee" />

<br />

## :one::six: AWS EC2 RDS

### AWS RDS 설정

- 이전에는 RDS에 퍼블릭으로 접속했지만 이제 EC2를 이용해서 서버에서만 RDS에 접근할 수 있도록 하기 위해 인스턴스를 연결한다.

	<img width="50%" alt="image" src="https://github.com/user-attachments/assets/1d40d2c4-7aaa-4e79-9bde-19d245daa22e" />

<br />

### AWS EC2 RDS 연결

- EC2에 접속해서 먼저 apt update를 진행한다.

	```bash
	sudo apt update
	```

- MySQL 서버를 설치한다.

	```bash
	sudo apt install mysql-server
	```

- URL 로 데이터를 전송하여 서버에 데이터를 보내거나 가져올때 사용하기 위해 `curl`을 설치한다.

	```bash
	sudo apt-get install curl
	```

- 다음으로 Node.js를 설치해야 한다. `nvm`을 활용하여 Node.js를 설치하기 위해 [공식문서](https://docs.aws.amazon.com/ko_kr/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html)에서 제공하는 명령어를 입력해 `nvm`을 설치한다.

	```bash
 	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
 	```

- `nvm`을 로드한다.

	```bash
	. ~/.nvm/nvm.sh
 	```

- 최신 LTS 버전의 Node.js를 설치한다.

  ```bash
  nvm install --lts
  ```

- Node.js가 올바르게 설치되고 실행되는지 테스트한다.

	```bash
	node -e "console.log('Running Node.js ' + process.version)"
	```

- MySQL에 접속한다. RDS의 엔드포인트를 붙여넣고, 포트는 MySQL이 사용하는 `3306`번 포트로 설정한다. 이어서 사용자 이름과 비밀번호를 입력하면 접속할 수 있다.

	```bash
 	mysql -h [RDS의 엔드포인트] -P 3306 -u [사용자 이름] -p

 	Enter password: [비밀번호]
 	```

	<img width="30%" alt="image" src="https://github.com/user-attachments/assets/0d3403f9-e886-42cc-a449-f118bd116c49" />

- 다음 명령어를 입력해 `db_test` 데이터베이스로 이동할 수 있다.

	```sql
	use db_test;
 	```

- 테이블을 생성하고 데이터를 추가한 후 다음과 같이 데이터를 확인할 수 있다.

	<img width="40%" alt="image" src="https://github.com/user-attachments/assets/cbce7b4b-491e-4bd3-be0a-64eab895ad30" />

<br />

## :book: 참고

- [Express.js 공식문서](https://expressjs.com/)
- [MFA 인증](https://aws.amazon.com/ko/blogs/tech/all-for-mfa-in-aws-environment/)
- [Server Error error: no pg_hba.conf entry for host "", user "", database "", no encryption PostgreSQL 연결 에러 해결](https://sorrel012.tistory.com/407)
