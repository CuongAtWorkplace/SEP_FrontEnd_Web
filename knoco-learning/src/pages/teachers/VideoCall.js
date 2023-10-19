import React, { useState, useEffect } from 'react';
import './call.css';
import Axios from 'axios';

const PROJECT_ID = "SK.0.iq6RLONUX0wgNilGRrMPiCH49kNge";
const PROJECT_SECRET = "WVEwS2syR1p5ODFaZTIzVGRrdTBGbkZMNlhoWUZNUg==";
const BASE_URL = "https://api.stringee.com/v1/room2";

class API {
  constructor(projectId, projectSecret) {
    this.projectId = projectId;
    this.projectSecret = projectSecret;
    this.restToken = "";
  }

  async createRoom() {
    const roomName = Math.random().toFixed(4);
    const response = await Axios.post(
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

  async listRoom() {
    const response = await Axios.get(`${BASE_URL}/list`, {
      headers: this._authHeader()
    });

    const rooms = response.data.list;
    console.log({ rooms });
    return rooms;
  }

  async deleteRoom(roomId) {
    const response = await Axios.put(`${BASE_URL}/delete`, {
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
    return tokens.access_token;
  }

  async getRoomToken(roomId) {
    const tokens = await this._getToken({ roomId });
    return tokens.room_token;
  }

  async _getToken({ userId, roomId, rest }) {
    const response = await Axios.get(
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

const VideoCall = () => {
  const [userToken, setUserToken] = useState('');
  const [roomId, setRoomId] = useState('');
  const [roomToken, setRoomToken] = useState('');
  const [callClient, setCallClient] = useState(undefined);

  const api = new API(PROJECT_ID, PROJECT_SECRET);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('room');
    //const client = new window.StringeeClient();
    if (roomId) {
      setRoomId(roomId);
      join();
    }
  }, []);

  const authen = async () => {
    return new Promise(async (resolve) => {
      const userId = `${(Math.random() * 100000).toFixed(6)}`;
      const userToken = await api.getUserToken(userId);
      setUserToken(userToken);

      if (!callClient) {
        const client = new window.StringeeClient();

        client.on('authen', (res) => {
          console.log('on authen: ', res);
          resolve(res);
        });
        setCallClient(client);
      }
      callClient.connect(userToken);
    });
  };

  const publish = async (screenSharing = false) => {
    const localTrack = await window.StringeeVideo.createLocalVideoTrack(callClient, {
      audio: true,
      video: true,
      screen: screenSharing,
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

  const join = async () => {
    await authen();
    const roomToken = await api.getRoomToken(roomId);
    setRoomToken(roomToken);
    await publish();
  };

  const createRoom = async () => {
    const room = await api.createRoom();
    const roomUrl = `${window.location.origin}?room=${room.roomId}`;
    setRoomId(room.roomId);
    setRoomToken(room.token);
    console.log({ roomUrl });
  };

  const joinWithId = async () => {
    const roomId = prompt("Enter room ID:");
    if (roomId) {
      setRoomId(roomId);
      await join();
    }
  };

  const addVideo = (element) => {
    const videosElement = document.getElementById("videos");
    videosElement.appendChild(element);
  };

  return (
    <div>
      <h1>Video Call</h1>
      <div>
        <button onClick={createRoom}>Create Room</button>
        <button onClick={joinWithId}>Join with ID</button>
      </div>
      <div id="videos"></div>
    </div>
  );
};

export default VideoCall;