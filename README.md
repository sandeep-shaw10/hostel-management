### MODELS

#### Static:
- root location: `data/static.js`
    ```js
    const ROLE = {
        ADMIN: 'admin',
        STAFF: 'staff'
    }

    const GENDER = {
        M: 'Boys',
        F: 'Girls'
    }

    const COURSE = {
        BT: 'B.Tech',
        MT: 'M. Tech'
    }

    const BRANCH = {
        CT: 'Ceramic Technology',
        IT: 'Information Technology',
        CSE: 'Computer Science & Engineering'
    }

    const BLOCK = [
        {
            id:"1",
            name: 'Block-A',
            desc: 'Wifi, Single-Bed ....',
            type: GENDER.M
        },
        ... 
    ]
    ```

#### Dynamic DataBase:
- root location: `model/...`

<br>

- __Model__: `User.js`
    ```json
    {
        "_id": "6252edab39baefbe02a02e33",
        "name": "Staff User 2",
        "email": "staff2@yahoo.com",
        "role": "staff",
        "password": "$2a$10$NXrAR0F8x6SLBXEcbvYTReL98y4LSRa8TjF4r4yziId2pq3AQhgJC",
        "block": [ "1", "4" ],
        "date": "2022-04-10T14:46:03.847Z",
        "__v": 0
    }
    ```

- __Room__: `Room.js`
    ```json
    {
        "_id": "62532fb56fd49992f74b36c5",
        "block": "2",
        "room_no": "100-C",
        "desc": "Non-AC",
        "status": [],
        "date": "2022-04-10T19:27:49.845Z",
        "__v": 0
    }
    ```

- __Student__: `Student.js`
    ```json
    // left
    ```

<br>

- - -
### Multi-user Authorization

`dev purpose`
#### Admin User
- name: `Admin User`
- email: `admin@yahoo.com`
- password: `admin@1234`
- function
    - All staff (CRUD)
    - All function of staff

#### Staff User
- name: `Staff User {{num}}`
- email: `staff{{num}}@yahoo.com`
- password: `staff{{num}}@1234`
- function
    - Self staff (RU)
    - All room in given block (CRUD)
    - Allot Student to rooms
    - All function of student

#### Student User
- function
    - View room status block-wise
    - **Send Application

Assumption
- Admin cannot change email(uid)
- Admin cannot delete itself
- Admin cannot change own role
- - -

### API: `USER`

<br>

#### Login: POST `/api/user/login`
Request to admin and staff
```json
// body
{
    "email": "test@yahoo.com",
    "password": "admin@1234"
}
```

Response
```json
// JWT TOKEN
eyJhbGciOiJ...1m3t5qOCAd8dvXi6D5w
```
<br>

#### Register(Add Staff): POST `/api/user/register`
Request access to admin
```json
//header
{
    "auth-token": "JWT_TOKEN"
}

// body
{
    "name": "Staff Test 1",
    "email": "staff1@yahoo.com",
    "password": "staff@1234",
    "role": "staff"
}
```

Response
```json
// USER ID
{
    "user": "6252e68c3a908c0f120992fe"
}
```

<br>

#### All user: GET `/api/user/`
Request access to admin
```json
//header
{
    "auth-token": "JWT_TOKEN"
}
```

<br>

#### Get user by id: GET `/api/user/data/:userId`
Request access to admin
```json
//header
{
    "auth-token": "JWT_TOKEN"
}
```

<br>

#### Delete user by Id: GET `/api/user/delete/:userId`
Request access to admin
```json
//header
{
    "auth-token": "JWT_TOKEN"
}
```

<br>

#### Update user by Id: POST `/api/user/update/:userId`
Request access to admin
```json
//header
{
    "auth-token": "JWT_TOKEN"
}

//BODY
{
    "name": "Staff User 1",
    "password": "staff1@1234",
    "role": "staff",
    "block": ["1","4"]
}
```


<br>

#### View own credentials: GET `/api/user/my-data`
Request access to admin and staff
```json
//header
{
    "auth-token": "JWT_TOKEN"
}
```

- - - 

### API: `BLOCK`
Access: `All users`

##### Get all block: GET `/api/block/`

##### Get one block: GET `/api/block/:blockId`


##### Get room in each block: GET `/api/block/:blockId/rooms`

- - - 

### API: `ROOM`
Access: `All users`

##### Get all room: GET `/api/room/`

##### Get one room: GET `/api/room/:roomId`

<br>

Access: `Staff & Admin with Block Permission`
##### Add room in each block: POST `/api/block/add/:blockId`

Request
```json
//header
{
    "auth-token": "JWT_TOKEN"
}

//body
{
    "block": "1",
    "room_no": "123-C",
    "desc": "Non-AC",
    "status": []
}
```

Response
```json
{
    "room": "6253bcd3063288cd5a63675c"
}
```

##### Delete room in each block: GET `/api/block/delete/:roomId`

Request
```json
//header
{
    "auth-token": "JWT_TOKEN"
}
```

Response
```json
{
    "_id": "62532fb56fd49992f74b36c5",
    "block": "2",
    "room_no": "100-C",
    "desc": "Non-AC",
    "status": [],
    "date": "2022-04-10T19:27:49.845Z",
    "__v": 0
}
```

- - -

