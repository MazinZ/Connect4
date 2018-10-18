# Connect4

## Host

Currently (10/17/2018) Hosted at http://ec2-52-40-222-76.us-west-2.compute.amazonaws.com

Cost: AWS offers a 12 month free trial for specific types of EC2 and RDS instances. App hosted with NGINX to provide more scalability.

## Features

### Spectate
http://ec2-52-40-222-76.us-west-2.compute.amazonaws.com/spectate/{ROOM_ID} where {ROOM_ID} is an existing room to spectate.

### Play
- User navigates to http://ec2-52-40-222-76.us-west-2.compute.amazonaws.com.
- User waits for another user to connect on play URL.
- If a player disconnects, the other player and the spectators are notified and the room is closed.
- If a player wins or the game draws, the other player and spectators are notified and the room is closed.
- Users are tracked by Session IDs, so two tabs == two users.
- Game is stored on room in server to prevent client manipulation.
- First turn is randomly selected and players are referred to as 1 or 2 depending on join order.

### Storage
- Games are stored in a RDS PostgreSQL instance.
- Connect4Game model stores the following:

Schema:

| Field         | Type           | Info  |
| ------------- |:-------------: | -----:|
| id            | string         |
| board      	| array(int)     | Flattened array representation of board. Use width and height to recover shape. |
| player_1 	| string         | Player 1 Session ID |
| player_2 	| string         | Player 2 Session ID |
| width 	| int      	 | Board width |
| height 	| int     	 | Board height |
| winner 	| int      	 | 1 or 2 indicating Player 1 or 2. |
| draw 		| boolean        | True or False, indicating if game ended in draw. |
| createdAt 	| date           |  |
| updatedAt 	| date           |  |

- Game is only stored if at least 1 player joined the room.

## Improvements if I were to spend more time on it
- Make interface responsive/fix mobile experience.
- Unit tests.
- Configure SSL using Let's Encrypt.
- Overall better UI (ex: more clear display of server updates).
- Add chat (it would be fairly simple with the existing server capabilities).
- Refactor both Node & React app structures to be more scalable.
- Possibly host static files in an S3 bucket.
- Refactor Connect4 & InfoPanel components.
- Check that some values aren't being synced. I have not used Colyseus before so I would like to do more testing to ensure that clients cannot manipulate game state.

## Local installation
-- Todo

## NGINX config
```
map $http_upgrade $type {
  default "web";
  websocket "ws";
}

server {
    listen 80;
    server_name *.amazonaws.com;

    index index.html;
    root /home/mazin/Connect4/frontend/build;

    location / {
        try_files /nonexistent @$type;
    }

    location @ws {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location @web {
	try_files $uri /index.html =404;
    }
}
```

## Screenshots

### One Player joined
![1](https://i.imgur.com/bPDutm8.png)

### Both players 
![2](https://i.imgur.com/f5zME9a.png)

### A Player disconnected
￼![3](https://i.imgur.com/IqyNXo8.png)

## Game ended in a draw
![4](https://i.imgur.com/lpo7lsY.png)



￼
