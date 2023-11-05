import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"

const VideoCallDemo = () => {
  const { roomId } = useParams();

  const myMeeting = async (element) => {
    const appID = 699383273;
    const serverSecret = "630bf62f2c2285d34c5a982bc39440f8";
    const kitToke = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), "piii");
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
      <div class="col-md-6"><div ref={myMeeting}/> </div>
      <div class="col-md-6">s </div>
      
    </div>
  )
}
export default VideoCallDemo;