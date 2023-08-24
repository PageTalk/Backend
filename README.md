# Backend

## Starting

Start the docker container, then run

```shell
docker exec -it pagetalk-mysql-container bash
```

To start a MySQL server, run

```shell
mysql -u root -p
```

Enter password: 1234

## Incase of SQL Connection error

Run the following command in the MySQL server
```MySQL
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '1234';
```

## How JWT Works

<img src="https://i.stack.imgur.com/b2dzI.png" alt="JWT Working Showcase">
