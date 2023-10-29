import React, { useState, useEffect } from 'react';
import './call2.css';
import axios from 'axios';
import { Component } from 'react';

const PROJECT_ID = "SK.0.SbdigpaBHMHaq5Zz9oRcRvVSWlagDcqR";
const PROJECT_SECRET = "WlN6c3QyMFdiMUt3NFdPWkY3Z0NNWFhvSmc2d2tKVzI=";
const BASE_URL = "https://api.stringee.com/v1/room2";
// const PROJECT_ID = "SKIuNgIgQclWM0GFSPCJO7eervWS7hKkQg";
// const PROJECT_SECRET = "Tk1NaUZGVElWZ3VpNFZVQlZVVTZseWFsWTlHTndyMw==";
// const BASE_URL = "https://api.stringee.com/v1/room2";
class API {
  constructor(projectId, projectSecret) {
    this.projectId = projectId;
    this.projectSecret = projectSecret;
    this.restToken = "";
  }

  // async createRoom() {
  //   const roomName = Math.random().toFixed(4);
  //   console.log(roomName);

  //   const authToken = this._authHeader()["X-STRINGEE-AUTH"];
  //   const url = `${BASE_URL}/create`;
  //   const requestBody = {
  //     name: roomName,
  //     uniqueName: roomName,
  //   };

  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "X-STRINGEE-AUTH": authToken,
  //       },
  //       body: JSON.stringify(requestBody),
  //     });

  //     if (!response.ok) {
  //       // Handle non-2xx HTTP status codes here
  //       throw new Error(`Request failed with status ${response.status}`);
  //     }

  //     const room = await response.json();
  //     console.log({ room });
  //     return room;
  //   } catch (error) {
  //     // Handle network errors, request errors, or any other issues here
  //     console.error("Error creating room:", error);
  //   }
  // }

  async createRoom() {
    const roomName = Math.random().toFixed(4);
    const response = await axios.post(
      `${BASE_URL}/create`,
      {
        name: roomName,
        uniqueName: roomName
      },
      {
        headers: this._authHeader()
      }
    );
    const room = response.data;
    console.log({ room });
    return room;
  }
  // async listRoom() {
  //   const response = await axios.get(`${BASE_URL}/list`, {
  //     headers: this._authHeader()
  //   });

  //   const rooms = response.data.list;
  //   console.log({ rooms });
  //   return rooms;
  // }
  async listRoom() {
    const response = await axios.get(`${BASE_URL}/list`, {
      headers: this._authHeader()
    });
    const rooms = response.data.list;
    console.log({ rooms });
    return rooms;
  }

  async deleteRoom(roomId) {
    const response = await axios.put(`${BASE_URL}/delete`, {
      roomId
    }, {
      headers: this._authHeader()
    })

    console.log({ response })

    return response.data;
  }

  async clearAllRooms() {
    const rooms = await this.listRoom()
    const response = await Promise.all(rooms.map(room => this.deleteRoom(room.roomId)))

    return response;
  }

  async setRestToken() {
    const tokens = await this._getToken({ rest: true });
    const restToken = tokens.rest_access_token;
    this.restToken = restToken;
    return restToken;
  }

  async getUserToken(userId) {
    const tokens = await this._getToken({ userId });
    const access_token = tokens.access_token;
    console.log(access_token);
    return access_token;
  }

  async getRoomToken(roomId) {
    const tokens = await this._getToken({ roomId });
    return tokens.room_token;
  }

  async _getToken({ userId, roomId, rest }) {
    const response = await axios.get(
      "https://v2.stringee.com/web-sdk-conference-samples/php/token_helper.php",
      {
        params: {
          keySid: this.projectId,
          keySecret: this.projectSecret,
          userId,
          roomId,
          rest
        }
      }
    );

    const tokens = response.data;
    console.log({ tokens });
    return tokens;
  }

  isSafari() {
    const ua = navigator.userAgent.toLowerCase();
    return !ua.includes('chrome') && ua.includes('safari');
  }

  _authHeader() {
    return {
      "X-STRINGEE-AUTH": this.restToken
    };
  }
}
const api = new API(PROJECT_ID, PROJECT_SECRET);
const VideoCallDemo = () => {
  const [userTokenConnect, setUserToken] = useState('');
  const [roomId, setRoomId] = useState('');
  const [roomToken, setRoomToken] = useState('');
  const [callClient, setCallClient] = useState(undefined);
  const [room, setRoom] = useState(undefined);
  const getRoomUrl = () => `https://${window.location.hostname}?room=${roomId}`;

  const server = 'production';//local | test | production
  //            var server = 'local';//local | test | production
  const [stringeeClient, setStringeeClient] = useState(null);

  useEffect(() => {

    api.setRestToken();
   
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('room');

    //const client = new window.StringeeClient();
    console.log('Trang đã được render lại.');
    if (roomId) {
      setRoomId(roomId);
      join();
    }
  }, []);


  const authen = async () => {
    return new Promise(async resolve => {
      const userId = `${(Math.random() * 100000).toFixed(6)}`;
      const userToken = await api.getUserToken(userId);
      setUserToken(userToken); 
      console.log(userTokenConnect + "aaaas1a");

      const script = document.createElement('script');
      script.src = 'https://cdn.stringee.com/sdk/web/latest/stringee-web-sdk.min.js';
      script.onload = function () {
        // Thư viện đã được tải xong ở đây. Bạn có thể sử dụng nó ngay bây giờ.

       // Gọi các hàm sử dụng thư viện ở đây
        if (!callClient) {
          // var clienta = new StringeeClient() ;
          const client = new window.StringeeClient(); // Ví dụ về cách tạo một đối tượng stringeeClient
          client.on("authen", function(res) {
            console.log("on authen: ", res);
            resolve(res);
          });

          setCallClient(client);
          console.log(client);
        }
        // callClient.connect(userTokenConnect);
      };

      document.head.appendChild(script);



    });
  };


  const [cameraOn, setCameraOn] = useState(true);
  const publish = async (screenSharing = false) => {
    const localTrack = await window.StringeeVideo.createLocalVideoTrack(callClient, {
      audio: true,
      video: cameraOn,
      screen: false,
      videoDimensions: { width: 640, height: 360 },
    });
    const videoElement = localTrack.attach();
    addVideo(videoElement);

    const roomData = await window.StringeeVideo.joinRoom(callClient, roomToken);
    const room = roomData.room;
    console.log({ roomData, room });

    room.publish(localTrack).then(() => {
      console.log("Publish success");
    }).catch((error) => {
      console.error("Publish error: ", error);
    });
  };
  const toggleCamera = () => {
    // Hàm này sẽ đảo ngược giá trị của trạng thái cameraOn khi nút bấm được nhấn
    setCameraOn(!cameraOn);
  }
  const publishscreenSharing = async (screenSharing = false) => {
    const localTrack = await window.StringeeVideo.createLocalVideoTrack(callClient, {
      audio: true,
      video: true,
      screen: screenSharing,
      videoDimensions: { width: 640, height: 360 },
    });


    const videoElement = localTrack.attach();
    addVideoscreenSharing(videoElement);

    // const roomData = await window.StringeeVideo.joinRoom(callClient, roomToken);
    // const room = roomData.room;
    // console.log({ roomData, room });

    // if (!room) {
    //   setRoom(room);
    //   room.clearAllOnMethos();
    //   room.on("addtrack", e => {
    //     const track = e.info.track;

    //     console.log("addtrack", track);
    //     if (track.serverId === localTrack.serverId) {
    //       console.log("local");
    //       return;
    //     }
    //     subscribe(track);
    //   });
    //   room.on("removetrack", e => {
    //     const track = e.track;
    //     if (!track) {
    //       return;
    //     }

    //     const mediaElements = track.detach();
    //     mediaElements.forEach(element => element.remove());
    //   });

    //   // Join existing tracks
    //   roomData.listTracksInfo.forEach(info => subscribe(info));
    // }
    // room.publish(localTrack).then(() => {
    //   console.log("Publish success");
    // }).catch((error) => {
    //   console.error("Publish error: ", error);
    // });
  };


  const createRoom = async () => {
    const room = await api.createRoom();
    const roomUrl = `${window.location.origin}?room=${room.roomId}`;
    // setRoomId(room.roomId);
    // setRoomToken(room.token);
    // console.log({ roomUrl });
    // console.log(room.roomToken);
    // console.log(room.roomId);
    console.log(room);
    const { roomId } = room;
    const roomToken = await api.getRoomToken(roomId);
    setRoomId(room.roomId);
    setRoomToken(roomToken);
    console.log({ roomId, roomToken });
    await authen();
    await publish();

  };



  //   const joinWithId = async () => {
  //     const roomId = prompt("Enter room ID:");
  //     if (roomId) {
  //       setRoomId(roomId);
  //       console.log(roomId);
  //       await join();
  //     }
  //   };
  // const join = async () => {

  //     const roomToken = await api.getRoomToken(roomId);
  //     setRoomToken(roomToken);
  //     await authen();
  //     await publish();
  //   };



  const joinWithId = async () => {
    // const roomId = prompt("Enter room ID:");

    setRoomId("room-vn-1-QZKWP5QC5B-1698369924575");

    await join();


  };
  const join = async () => {
    const pathArray = window.location.pathname.split("/");
    const roomData = pathArray[pathArray.length - 1];
    console.log("roomid + " + roomData);
    const roomToken = await api.getRoomToken("room-vn-1-QZKWP5QC5B-1698369924575");
    setRoomToken(roomToken);
    console.log(roomToken);
    
    await authen();
    await publish();


  };
  // const addVideo = (element) => {
  //   const videosElement = document.getElementById("videos");
  //   videosElement.appendChild(element);
  // };


  const subscribe = async (trackInfo) => {
    const track = await this.room.subscribe(trackInfo.serverId);
    track.on("ready", () => {
      const videoElement = track.attach();
      this.addVideo(videoElement);
    });
  };
  const addVideo = (element) => {
    //const videosElement = document.getElementById("videos");
    const videoContainer = document.querySelector("#videos");
    videoContainer.appendChild(element);
  };
  const addVideoscreenSharing = (element) => {
    //const videosElement = document.getElementById("videos");
    const videoContainer = document.querySelector("#screenSharing");
    videoContainer.appendChild(element);
  };


  return (
    <div>
      <h1>Video Call</h1>
      <div>
        <button onClick={toggleCamera}>
          {cameraOn ? 'Tắt Camera' : 'Bật Camera'}
        </button>
        <button onClick={createRoom}>Create Room</button>
        <button onClick={joinWithId}>Join with ID</button>
        <button onClick={publishscreenSharing}>Join with ID</button>
      </div>
      {/* <div id="videos"></div> */}
      <div class="app-container">
        <div class="app-main">
          <div class="video-call-wrapper">
            <div class="video-participant">
              <div class="participant-actions">
                <button class="btn-mute"></button>
                <button class="btn-camera"></button>
              </div>
              <a href="#" class="name-tag">Andy Will</a>
              {/* <img src="https://images.unsplash.com/photo-1566821582776-92b13ab46bb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="participant" /> */}
              <div id="videos"></div>
            </div>
            <div class="video-participant">
              <div class="participant-actions">
                <button class="btn-mute"></button>
                <button class="btn-camera"></button>
              </div>
              <a href="#" class="name-tag">Emmy Lou</a>
              <img src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80" alt="participant" />
            </div>
          </div>
          <div class="video-call-screen" id="screenSharing">
          </div>
          <div class="video-call-actions">
            <button class="video-action-button mic"></button>
            <button class="video-action-button camera"></button>
            <button class="video-action-button endcall">Leave</button>
          </div>
        </div>
        <div class="right-side">
          <button class="btn-close-right">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-x-circle" viewBox="0 0 24 24">
              <defs></defs>
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M15 9l-6 6M9 9l6 6"></path>
            </svg>

          </button>
          <div class="chat-container">
            <div class="chat-header">
              <h2 class="chat-header-h2">
                Note Room
              </h2>
            </div>
            <div class="chat-area">
              <textarea type="text" rows="30" cols="100" placeholder="Write note..." class="chat-input" />
            </div>

          </div>
          <div class="participants">
            <div class="participant profile-picture">
              <img src="https://images.unsplash.com/photo-1576110397661-64a019d88a98?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80" alt="pp" />
            </div>
            <div class="participant profile-picture">
              <img src="https://images.unsplash.com/photo-1566821582776-92b13ab46bb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="pp" />
            </div>
            <div class="participant profile-picture">
              <img src="https://images.unsplash.com/photo-1600207438283-a5de6d9df13e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80" alt="pp" />
            </div>
            <div class="participant profile-picture">
              <img src="https://images.unsplash.com/photo-1581824283135-0666cf353f35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1276&q=80" alt="pp" />
            </div>
            <div class="participant-more">2+</div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default VideoCallDemo;