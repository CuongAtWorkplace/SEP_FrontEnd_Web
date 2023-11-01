import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"

const VideoCallDemo = () => {
  const { roomId } = useParams();

  const myMeeting = async (element) => {
    const appID = 421828278;
    const serverSecret = "afc78dde2cf741311179428544f8074d";
    const kitToke = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), "piii");
  const zc = ZegoUIKitPrebuilt.create(kitToke);
  zc.joinRoom({
    container:element,
    scenario:{
      mode:ZegoUIKitPrebuilt.OneONoneCall,
    },
    showScreenSharingButton:false,
  });
  
  }



  return (
    <div>
      <div ref={myMeeting}/>
    </div>
  )
}
export default VideoCallDemo;