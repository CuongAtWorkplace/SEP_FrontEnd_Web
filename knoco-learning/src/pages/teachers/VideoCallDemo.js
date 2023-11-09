import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"
import { useState ,useEffect } from "react";
import jwtDecode from "jwt-decode";
const VideoCallDemo = () => {
  const { roomId } = useParams();
  const [userName1 ,setuserName ] = useState("hiuhiu");
  const [checkToken , setcheckToken] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");  
    console.log(token);
    if (token != null) {
      const decodedToken = jwtDecode(token);
       setuserName( decodedToken.fullname);
       setcheckToken(true);
      //  localStorage.removeItem('token');
      //   localStorage.removeItem('roleid');
      //   localStorage.removeItem('id');
    }else{
      window.location.href = "/";
    }
}, []);

  const myMeeting = async (element) => {
    const appID = 699383273;
    const serverSecret = "630bf62f2c2285d34c5a982bc39440f8";
    const kitToke = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(),userName1);
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
      {checkToken == true && <div class="col-md-6"><div ref={myMeeting}/> </div> }
      
  
    </div>
  )
}
export default VideoCallDemo;