#### Start PostgreSQL Server on Docker Container
```
docker run -d -p 127.0.0.1:5432:5432/tcp --name some-postgres -e POSTGRES_PASSWORD=postgres -e PGDATA=/var/lib/postgresql/data/pgdata -v /custom/mount:/var/lib/postgresql/data postgres
```

#### Start pgsql on terminal
```
docker exec -tiu postgres some-postgres psql
```

#### Start a RabbiMQ Container on Docker for Development
```
docker run -d -p 8080:15672 -p 5672:5672 -p 25676:25676 rabbitmq:3-management
```