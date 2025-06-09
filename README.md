# Express

<br />

## 0️⃣ 목차

1. [Express 설정](#1️⃣-express-설정)

<br />

## 1️⃣ Express 설정

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

## 📖 참고

- [Express.js 공식문서](https://expressjs.com/)
