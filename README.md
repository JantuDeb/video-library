#(https://ionvu-live.netlify.app/) - A video library app where you can stream your favourite videos.
![image](https://user-images.githubusercontent.com/63020886/162163197-2dd5648b-22cb-4e4e-b615-56f575cdb8c1.png)

# Features:

- **History**
  - Video watch history
  - remove a video from history
  - clear all histories
- **Watch Later**
  - Add to watch later
  - Remove from watch later
- **Playlist**
  - create, update and delete playlist
  - Add videos to a playlist
  - Remove videos from a playlist
- **Auth**
  - Login, logout, Signup
  - Persist login session
  - Autheticating with *JWT* token
- Upload video
- View videos
- Filter by categories
- Like/Dislike video
- View all liked videos
- Add note to a video

# How to Install and Run this Project
Clone or fork this repository to run this locally and use the following commands.

```bash
git clone https://github.com/JantuDeb/video-library.git

cd video-library

npm install

npm start

```
`src/utils/axios-instance.js`

*use the bellow configuration for axios*
```js
    const defaultConfig = {
    baseURL: "https://ionvu-live.herokuapp.com/api/v1/"
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    };
```

# How to use and customize backend api
> [GitHub Repository for backend api](https://github.com/JantuDeb/video-api/tree/test)

`.env` 
```
PORT=4000
JWT_SECRET=9arFGaz4tZ
JWT_EXPIRY=3d
MONGO_URL=<mongodb url>
CLOUDINARY_URL=<cloudinary url>
CLOUDINARY_NAME=<cloudinary name>
CLOUDINARY_API_KEY= <your api key>
CLOUDINARY_API_SECRET=<your secret key>
```
>You have to create a mongodb cluster at MOngodb Atlas and a cloudinary account for storing images and video
```bash
git clone https://github.com/JantuDeb/video-api/tree/test

cd video-library

npm install

npm start

```
