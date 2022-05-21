<h1>delivery-wpp-message</h1>
<h3>A simple API to delivery Whatsapp messages</h3>
<hr/>

```bash
# clone this repo
$ git clone https://github.com/romaaraujo/delivery-wpp-message.git

# access the directory
$ cd delivery-wpp-message

# install the dependencies
$ npm install

# run rabbitmq server on docker or locally
$ docker run -d -p 8080:15672 -p 5672:5672 -p 25676:25676 rabbitmq:3-management

# run whatsapp queue worker
$ node worker/queue.js

# rename .env-example to .env
# run this project
$ npm run dev
```

<hr/>

<h4>Endpoints<h4/>

```bash
# POST /whatsapp/send
# Header: Authorization {JWT Token}
# Body: number [number, length: 13], message [string]
# Response: 404 - Bad Request, 201 - Send to queue
```

[![Linkedin Badge](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/romaaraujo/)](https://www.linkedin.com/in/romaaraujo/)