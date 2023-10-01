# PageTalk (Backend)

Backend for a project which will allow users to upload a PDF, and receieve a summary on the same, while also answering queries based on the same.

## Database Diagram

<img src="https://github.com/PageTalk/Backend/blob/5d19a46daa0b7e56e5d29d224f3df6b56cd1eb73/screenshots/PageTalk.png">

## Starting

Start the docker container, then run

```shell
docker exec -it pagetalk-mysql-container bash
```

To start a MySQL server, run

```mysql
mysql -u root -p
```

Enter password: 1234

## Troubleshooting

### Incase of SQL Connection error

Run the following command in the MySQL server

```mysql
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '1234';
```

Note: Server is running on port 3306 so add the port to the dbconfig while creating a connection.

### If connection still fails

If the connection still fails, go into the MySQL Container files, look for etc/my.cnf config file, and set port to 3306 (port=3306).

## How JWT Works

<img src="https://i.stack.imgur.com/b2dzI.png" alt="JWT Working Showcase">

## How JWT is used

<img src="https://media.geeksforgeeks.org/wp-content/uploads/20210925202132/Untitled1-660x404.png">

## How to use JWT

1. User sends a POST request to the server with username and password
2. Server checks if the username and password is correct
3. If correct, server creates a JWT token and sends it back to the user
4. User stores the JWT token in the local storage
5. User sends the JWT token in the header of every request
6. Server checks if the JWT token is valid
7. If valid, server sends the response back to the user

## Checklist

### Overall

- [x] Create Docker Container
- [x] Create MySQL Server
- [x] Create MySQL Database
- [x] Create MySQL Tables
- [ ] Clean up all routes.
- [ ] Make v2 of API (e.g. /api/v2/{user}/operations <- all operations)
- [ ] Add validation to the data received (either frontend or backend).
### Tables

 User

- [x] Create User
- [x] Login User
- [x] (ADMIN) Get User by username
- [x] (ADMIN) Get All users
- [x] Update User
- [ ] Delete User

PDF

- [x] Upload PDF (Edge cases pending)
- [x] Add PDF data to table
- [ ] Get All PDFs
- [x] Retrieve PDF
- [ ] Update PDF (Replace)

Query

- [x] Create query 
- [x] Update query
- [x] Retrieve queries by PDF
- [x] Retrieve a specific query
- [x] Delete a query
- [x] (ADMIN) Get all queries from all users


