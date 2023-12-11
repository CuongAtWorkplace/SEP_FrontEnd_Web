import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
const VideoCallDemo = () => {
  const { roomId } = useParams();
  const [userName1, setUserName] = useState("");
  const [userId, setUserId] = useState(null);
  const [checkToken, setcheckToken] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token !== null) {
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.fullname);

      setUserId(parseInt(decodedToken.userid, 10));
    
  } else {
    window.location.href = "/";
  }
    const fetchCheckUser = async () => {
      try {
        const response = await fetch(`https://localhost:7169/api/Class/CheckUserFromClass?userId=${userId}&className=${roomId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify({ userId : Number(userId), className : roomId }),
        });
        if (response.ok) {
          setcheckToken(true);
        } else {
          setcheckToken(false);
          console.log("k co quyen");
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };
    
      fetchCheckUser();

  }, [userId, roomId]);
 

  const myMeeting = async (element) => {
    const appID = 1943776416;
    const serverSecret = "363a50c96671c62536a002adc2aaa826";
    const kitToke = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), userName1);
    const zc = ZegoUIKitPrebuilt.create(kitToke);
    zc.joinRoom({
      container: element,
      sharedLinks: [{
        url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomId,
      }],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },

    });
  }

  return (
    <div>
      {checkToken === true && <div ref={myMeeting} /> }
    </div>
  )
}
export default VideoCallDemo;