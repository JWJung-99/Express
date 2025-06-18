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

      <img width="50%" alt="image" src="https://github.com/user-attachments/assets/2ddb1f91-62e6-430c-9781-ce13ac5ad613" />

  - `POST` 요청도 작성해보자.

    ```js
    app.post('/test', (req, res) => {
    	res.send('Got a POST request');
    });
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

    |                                         **GET 요청에 대한 응답**                                          |                                         **POST 요청에 대한 응답**                                         |
    | :-------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |
    | <img alt="image" src="https://github.com/user-attachments/assets/1e39307f-75b4-4c72-bacf-1013466c56e0" /> | <img alt="image" src="https://github.com/user-attachments/assets/6a47f9ac-2ba1-4966-affe-b2a11a06703c" /> |

<br />

> [!IMPORTANT] > **[공식문서 - HTTP Response Status Code](https://developer.mozilla.org/ko/docs/Web/HTTP/Reference/Status)**

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

    |                                               **POST 요청**                                               |                                        **POST 요청에 대한 `log`**                                         |
    | :-------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |
    | <img alt="image" src="https://github.com/user-attachments/assets/8709b30c-d234-42e8-9940-c045e89a0981" /> | <img alt="image" src="https://github.com/user-attachments/assets/3ad7db65-90a3-43ed-8905-05e7cc80ab16" /> |

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

      <img width="30%" alt="image" src="https://github.com/user-attachments/assets/7732e198-d83c-4ed2-9d0f-8fe6de6c0405" />

  - 해당 `noteId`를 이용해 데이터를 불러오는 코드로 확장할 수 있다.

    - Route parameters는 `string` 형태로 저장되므로 `Number` 형태로 형변환을 진행한다.

      ```js
      app.get('/note/:noteId', (req, res) => {
      	console.log(req.params);
      	const item = data.filter(
      		(item) => item.id === Number(req.params.noteId)
      	);
      	res.send(item);
      });
      ```

    - `http://localhost:3000/note/1`로 이동해보면 다음과 같이 1번 데이터 응답이 잘 도착한 것을 확인할 수 있다.

      <img width="50%" alt="image" src="https://github.com/user-attachments/assets/9b6952a4-2d8b-4a9a-818e-f5e97b375d03" />

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

    |                                               **GET 요청**                                                |                                         **Query Parameter 확인**                                          |
    | :-------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |
    | <img alt="image" src="https://github.com/user-attachments/assets/1ccddea1-ddf8-4118-8d27-76e92d06d8f3" /> | <img alt="image" src="https://github.com/user-attachments/assets/ab0f8d7d-7ac3-4739-942a-269e3ba9042e" /> |

  - 이어서 Query Parameter를 이용해 원하는 데이터만 받아올 수 있도록 코드를 수정한다.

    ```js
    app.get('/note', (req, res) => {
    	console.log(req.query);
    	const { id } = req.query;

    	// id 값이 없다면 응답으로 빈 배열을 전송한다.
    	if (!id) res.send([]);

    	const item = data.filter((item) => item.id === Number(id));
    	res.send(item);
    });
    ```

    - 브라우저에서 `http://localhost:3000/note?id=1`로 이동하면 다음과 같이 `id`가 `1`인 데이터만 잘 불러오는 것을 확인할 수 있다.

      <img width="50%" alt="image" src="https://github.com/user-attachments/assets/6366f9eb-7983-4321-8c2a-1f8218e6d49e" />

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

    |                                               **PUT 요청**                                                |                                               **GET 요청**                                                |
    | :-------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |
    | <img alt="image" src="https://github.com/user-attachments/assets/593b529a-c97d-431c-a9b7-adb2c59118f4" /> | <img alt="image" src="https://github.com/user-attachments/assets/02d6eac2-e4f5-4380-82be-4cb5b53550fc" /> |

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

    |                                              **DELETE 요청**                                              |                                               **GET 요청**                                                |
    | :-------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |
    | <img alt="image" src="https://github.com/user-attachments/assets/d2bb8bc8-354a-4252-8e17-fe0662ea0802" /> | <img alt="image" src="https://github.com/user-attachments/assets/c161b5df-4b07-4b7d-a1cb-6696c51419f0" /> |

  - 이미 삭제된 데이터에 대해 다시 DELETE 요청을 보내면 `404 Not Found` 응답을 전송한다.

    <img width="50%" alt="image" src="https://github.com/user-attachments/assets/ee3d0787-e9a5-44e3-9699-12f1f78c3cc2" />

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

      <img width="50%" alt="image" src="https://github.com/user-attachments/assets/dcfd8d72-0257-4b23-8e2d-10d0dfd3e213" />

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

  <img width="50%" alt="image" src="https://github.com/user-attachments/assets/897017b0-4634-47b1-9053-22cd03eb22ca" />

- VPC 생성

  - AWS 콘솔에서 VPC 메뉴로 접속한 후 VPC를 생성한다. `vpc-ec2-rds`라는 이름의 VPC를 생성해보자. 다른 설정은 기본값으로 설정한다.

    <img width="50%" alt="image" src="https://github.com/user-attachments/assets/db0ea368-fa37-40bd-9a59-c6f2c892ada5" />

  - 만약 VPC가 EC2나 RDS와 연결된 상태라면 삭제가 불가능하다.

<br />

## :five: AWS EC2

### EC2 생성

- AWS 콘솔에서 EC2 메뉴로 접속하여 EC2를 생성한다.

  <img width="50%" alt="image" src="https://github.com/user-attachments/assets/42757d6f-4ce2-4fd6-afe4-532b020c9da0" />

  - ubuntu 24.04 버전을 사용하며 인스턴스는 t2.micro 유형으로 생성한다.
  - 키 페어는 RSA 유형의 `.pem` 형식으로 생성한다.

    <img width="50%" alt="image" src="https://github.com/user-attachments/assets/9f228e93-eebc-4aea-beed-580e34905781" />

  - 네트워크 설정에서 위에서 생성한 VPC를 선택하고, Public Subnet을 설정한 후 퍼블릭 IP 자동 할당을 활성화한다.

    <img width="50%" alt="image" src="https://github.com/user-attachments/assets/6759a4ed-ad02-452c-8338-74ef196e9e2e" />

  - 나머지 설정은 기본값으로 설정한다.

<br />

### EC2 Node 설치

- AWS 콘솔의 **EC2 인스턴스 연결** 탭을 이용해 인스턴스에 접속한다.

  <img width="50%" alt="image" src="https://github.com/user-attachments/assets/6007e433-c1fc-4a8b-ae87-257928bc104d" />

- `apt update`를 먼저 진행한다.

  ```bash
  sudo apt update
  ```

- 이어서 `curl`을 설치한다.

  ```bash
  sudo apt install curl
  ```

- `nvm`(노드 버전 관리자)을 설치한다. \*\*참고: [Node.js 공식문서](https://nodejs.org/en/download)

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

  <img width="50%" alt="image" src="https://github.com/user-attachments/assets/359293b8-401e-4f2a-a172-6b53515325f2" />

- 이제 test 폴더 내부로 이동해 기본적인 npm 패키지들을 설치한다.

  ```bash
  cd test
  npm install
  ```

- 이제 서버에 접속하기 위해 포트를 열어주어야 한다. EC2의 Security 탭에서 인바운드 규칙의 보안 그룹을 선택한 후 인바운드 규칙을 수정해야 한다.

  <img width="50%" alt="image" src="https://github.com/user-attachments/assets/e58bcc3d-7ecb-4c51-b5d5-6aff91f2a7ff" />

- 서버를 실행하고 EC2의 퍼블릭 주소로 이동한 후 기본 설정된 `3000`번 포트로 이동하면 다음과 같이 잘 접속되는 것을 확인할 수 있다.

  ```bash
  npm start
  ```

  <img width="50%" alt="image" src="https://github.com/user-attachments/assets/b3717f3f-f15f-4295-95d5-c5c38ad027ab" />

<br />

## :six: AWS RDS 설정

### AWS AuroraDB 설정

- AWS Aurora는 트래픽이 몰리는 시간에 따라 자동으로 확장/축소가 가능한 데이터베이스이다.
- 일반 MySQL이 감당할 수 있는 트래픽보다 더 많은 트래픽을 효율적으로 관리할 수 있다.
- 트래픽이 항상 일정하다면 MySQL을 사용하는 것이 유리하다.

<br />

### AWS RDS Subnet 설정

- AWS 콘솔의 RDS 탭으로 이동하여 서브넷 그룹을 생성한다.

  <img width="50%" alt="image" src="https://github.com/user-attachments/assets/89a40660-18fc-415c-9d54-e2740925a047" />

- VPC의 퍼블릭 서브넷 두 개를 RDS의 서브넷 그룹에 추가한다.

  <img width="50%" alt="image" src="https://github.com/user-attachments/assets/22cb920d-0355-4d4a-adf8-0fef1ceafa6c" />

<br />

### AWS RDS 설정

- MySQL 데이터베이스를 생성한다.

  - **표준 생성** 방식을 선택하고 **MySQL 엔진**을 선택한다. 템플릿은 **프리티어**를 활용한다.
  - 데이터베이스를 퍼블릭에서 접속할 예정이므로 **EC2 컴퓨팅 리소스에 연결 안 함**을 선택하며 VPC와 DB 서브넷 그룹은 위에서 생성한 서브넷 그룹을 지정한다.
  - 데이터베이스 이름을 지정하지 않으면 데이터베이스를 생성하지 않는다고 하니 이름을 지정한다.
  - 나머지는 기본 설정을 유지한다.

  |                                               **엔진 옵션**                                               |                                                **템플릿**                                                 |
  | :-------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |
  | <img alt="image" src="https://github.com/user-attachments/assets/c49922bb-7da8-46af-81f5-6decdd162f36" /> | <img alt="image" src="https://github.com/user-attachments/assets/e73057ff-e98e-4efd-a289-7a3fcc880be8" /> |
  |                                           **퍼블릭 연결 설정**                                            |                                               **추가 구성**                                               |
  | <img alt="image" src="https://github.com/user-attachments/assets/9265d5cb-7a4a-4add-898c-bf32afc7da01" /> | <img alt="image" src="https://github.com/user-attachments/assets/1f008f36-daf9-41dd-b084-4020eafaa59e" /> |

<br />

### AWS RDS Inbound Rule 설정

- 데이터베이스를 생성했지만 접속이 불가하다면 VPC의 보안 그룹으로 이동하여 인바운드 규칙을 **모든 트래픽**, **Anywhere-IPv4**로 설정해야 한다.

  <img width="50%" alt="image" src="https://github.com/user-attachments/assets/2e62bd14-e0b6-418f-968e-e38f8aca66ec" />

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

    <img width="50%" alt="image" src="https://github.com/user-attachments/assets/cc415ab4-d054-437c-ae2d-b7fa363ada23" />

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

    <img width="30%" alt="image" src="https://github.com/user-attachments/assets/44099b3f-3295-4d10-a099-126ce78d4d03" />

- 다음과 같이 `db_test`라는 이름으로 데이터베이스를 생성할 수도 있다.

  ```js
  pool.query(`CREATE DATABASE db_test`, function (err, rows, fields) {
  	// Connection is automatically released when query resolves
  	console.log(rows);
  });
  ```

  <img width="30%" alt="image" src="https://github.com/user-attachments/assets/614d9a17-411e-4ccd-bf7c-88549d52f4d1" />

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

    <img width="30%" alt="image" src="https://github.com/user-attachments/assets/087cb142-6515-4c5a-9157-65aca7231d69" />

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

    <img width="50%" alt="image" src="https://github.com/user-attachments/assets/1a949ad5-9e06-4556-bf17-b9ed345cbc7a" />

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

## :book: 참고

- [Express.js 공식문서](https://expressjs.com/)
- [MFA 인증](https://aws.amazon.com/ko/blogs/tech/all-for-mfa-in-aws-environment/)
