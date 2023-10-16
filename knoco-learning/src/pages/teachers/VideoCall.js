import React, { useEffect } from 'react';
import './call.css';

const VideoCall = () => {

    useEffect(() => {

    }, []);

    return (
        <>
        <div class="container has-text-centered" v-cloak id="app">
      <h1 class="title">
        Ứng dụng Clone Zoom cực cool ngầu với
        <span class="header-highlight">Stringee API</span>
      </h1>

      <div>
        <button class="button is-primary" v-if="!room" onClick="createRoom">
          Tạo Meeting
        </button>

        <button class="button is-info" v-if="!room" onClick="joinWithId">
          Join Meeting
        </button>

        <button class="button is-info" v-if="room" onClick="publish(true)">
          Share Desktop
        </button>
      </div>

      <div v-if="roomId" class="info">
        <p>Bạn đang ở trong room <strong>roomId</strong>.</p>
        <p>
          Gửi link này cho bạn bè cùng join room nhé
          <a target="_blank">roomUrl</a>.
        </p>
        <p>Hoặc bạn cũng có thể copy <code>roomId</code> để share.</p>
      </div>
    </div>

    <div class="container">
      <div id="videos"></div>
    </div>
        </>
    );
};

export default VideoCall;