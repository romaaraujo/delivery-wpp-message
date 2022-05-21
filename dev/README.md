#### Start a RabbiMQ Container on Docker for Development
```bash 
$ docker run -d -p 8080:15672 -p 5672:5672 -p 25676:25676 rabbitmq:3-management
```

#### Start Queue Worker
```bash
$ node worker/queue.js
```