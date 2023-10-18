// import React, { useState, useEffect } from 'react';
// import './call.css';
// import { StringeeClient, StringeeVideo } from 'stringee-react-native';

// const VideoCall = () => {
//   const [userToken, setUserToken] = useState('');
//   const [roomId, setRoomId] = useState('');
//   const [roomToken, setRoomToken] = useState('');
//   const [room, setRoom] = useState(undefined);
//   const [callClient, setCallClient] = useState(undefined);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const roomId = urlParams.get('room');
//     if (roomId) {
//       setRoomId(roomId);
//       join();
//     }
//   }, []);

//   const authen = async () => {
//     return new Promise(async (resolve) => {
//       const userId = `${(Math.random() * 100000).toFixed(6)}`;
//       const userToken = await api.getUserToken(userId);
//       setUserToken(userToken);

//       if (!callClient) {
//         const client = new StringeeClient();

//         client.on('authen', (res) => {
//           console.log('on authen: ', res);
//           resolve(res);
//         });
//         setCallClient(client);
//       }
//       callClient.connect(userToken);
//     });
//   };

//   const publish = async (screenSharing = false) => {
//     const localTrack = await StringeeVideo.createLocalVideoTrack(callClient, {
//       audio: true,
//       video: true,
//       screen: screenSharing,
//       videoDimensions: { width: 640, height: 360 },
//     });

//     const videoElement = localTrack.attach();
//     addVideo(videoElement);

//     const roomData = await StringeeVideo.joinRoom(callClient, roomToken);
//     const room = roomData.room;
//     console.log({ roomData, room });

//     if (!room) {
//       setRoom(room);
//       room.clearAllOnMethos();
//       room.on('addtrack', (e) => {
//         const track = e.info.track;

//         console.log('addtrack', track);
//         if (track.serverId === localTrack.serverId) {
//           console.log('local');
//           return;
//         }
//         subscribe(track);
//       });
//       room.on('removetrack', (e) => {
//         const track = e.track;
//         if (!track) {
//           return;
//         }

//         const mediaElements = track.detach();
//         mediaElements.forEach((element) => element.remove());
//       });

//       // Join existing tracks
//       roomData.listTracksInfo.forEach((info) => subscribe(info));
//     }

//     await room.publish(localTrack);
//     console.log('room publish successful');
//   };

//   const createRoom = async () => {
//     const room = await api.createRoom();
//     const { roomId } = room;
//     const roomToken = await api.getRoomToken(roomId);

//     setRoomId(roomId);
//     setRoomToken(roomToken);
//     console.log({ roomId, roomToken });

//     await authen();
//     await publish();
//   };

//   const join = async () => {
//     const roomToken = await api.getRoomToken(roomId);
//     setRoomToken(roomToken);

//     await authen();
//     await publish();
//   };

//   const joinWithId = async () => {
//     const roomId = prompt('Enter Room ID:');
//     if (roomId) {
//       setRoomId(roomId);
//       await join();
//     }
//   };

//   const subscribe = async (trackInfo) => {
//     const track = await room.subscribe(trackInfo.serverId);
//     track.on('ready', () => {
//       const videoElement = track.attach();
//       addVideo(videoElement);
//     });
//   };

//   const addVideo = (video) => {
//     video.setAttribute('controls', 'true');
//     video.setAttribute('playsinline', 'true');
//     const videoContainer = document.querySelector('#videos');
//     videoContainer.appendChild(video);
//   };

//   const roomUrl = `https://${window.location.hostname}?room=${roomId}`;

//   return (
//     <div>
//       <div class="container has-text-centered" v-cloak id="app">
//         <h1 class="title">
//           Ứng dụng Clone Zoom cực cool ngầu với
//           <span class="header-highlight">Stringee API</span>
//         </h1>

//         <div>
//           <button class="button is-primary" v-if="!room" onClick="createRoom">
//             Tạo Meeting
//           </button>

//           <button class="button is-info" v-if="!room" onClick="joinWithId">
//             Join Meeting
//           </button>

//           <button class="button is-info" v-if="room" onClick="publish(true)">
//             Share Desktop
//           </button>
//         </div>

//         <div v-if="roomId" class="info">
//           <p>Bạn đang ở trong room <strong>roomId</strong>.</p>
//           <p>
//             Gửi link này cho bạn bè cùng join room nhé
//             <a target="_blank">roomUrl</a>.
//           </p>
//           <p>Hoặc bạn cũng có thể copy <code>roomId</code> để share.</p>
//         </div>
//       </div>

//       <div class="container">
//         <div id="videos"></div>
//       </div>

//       <div id="app">
//         <div id="videos"></div>
//         <button onClick={createRoom}>Create Room</button>
//         <button onClick={joinWithId}>Join Room</button>
//       </div>
//     </div>

//   );
// };

// export default VideoCall;