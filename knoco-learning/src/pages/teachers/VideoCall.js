// import React, { useEffect, useRef, useState } from 'react';
// // import StringeeClient from 'path/to/StringeeClient';
// // import StringeeCall from 'path/to/StringeeCall';
// import './call.css';

// const VideoCall = () => {
//     const localVideoRef = useRef(null);
//     const remoteVideoRef = useRef(null);
//     const callButtonRef = useRef(null);
//     const answerCallButtonRef = useRef(null);
//     const rejectCallButtonRef = useRef(null);
//     const endCallButtonRef = useRef(null);
//     const incomingCallNoticeRef = useRef(null);

//     const [currentCall, setCurrentCall] = useState(null);

//     useEffect(() => {
//         const token = 'ACCESS_TOKEN';
//         const callerId = '';
//         const calleeId = '';

//         let currentCall = null;

//         const client = new StringeeClient();
//         client.connect(token);

//         client.on('connect', () => {
//             console.log('+++ connected!');
//         });

//         client.on('authen', (res) => {
//             console.log('+++ on authen: ', res);
//         });

//         client.on('disconnect', (res) => {
//             console.log('+++ disconnected');
//         });

//         function settingCallEvent(call, localVideo, remoteVideo, callButton, answerCallButton, endCallButton, rejectCallButton) {
//             call.on('addremotestream', (stream) => {
//                 // reset srcObject to work around minor bugs in Chrome and Edge.
//                 console.log('addremotestream');
//                 remoteVideo.srcObject = null;
//                 remoteVideo.srcObject = stream;
//             });

//             call.on('addlocalstream', (stream) => {
//                 // reset srcObject to work around minor bugs in Chrome and Edge.
//                 console.log('addlocalstream');
//                 localVideo.srcObject = null;
//                 localVideo.srcObject = stream;
//             });

//             call.on('signalingstate', (state) => {
//                 console.log('signalingstate ', state);

//                 if (state.code === 6 || state.code === 5)//end call or callee rejected
//                 {
//                     callButton.show();
//                     endCallButton.hide();
//                     rejectCallButton.hide();
//                     answerCallButton.hide();
//                     localVideo.srcObject = null;
//                     remoteVideo.srcObject = null;
//                     document.getElementById('incoming-call-notice').style.display = 'none';
//                 }
//             });

//             call.on('mediastate', (state) => {
//                 console.log('mediastate ', state);
//             });

//             call.on('info', (info) => {
//                 console.log('on info:' + JSON.stringify(info));
//             });
//         }

//         const handleCallButtonClick = () => {
//             currentCall = new StringeeCall(client, callerId, calleeId, true);

//             settingCallEvent(
//                 currentCall,
//                 localVideoRef.current,
//                 remoteVideoRef.current,
//                 callButtonRef.current,
//                 answerCallButtonRef.current,
//                 endCallButtonRef.current,
//                 rejectCallButtonRef.current
//             );

//             currentCall.makeCall((res) => {
//                 console.log('+++ call callback: ', res);
//                 if (res.message === 'SUCCESS') {
//                     document.dispatchEvent(new Event('connect_ok'));
//                 }
//             });
//         };
//         callButtonRef.current.addEventListener('click', handleCallButtonClick);

//         client.on('incomingcall', function (incomingcall) {
//             incomingCallNoticeRef.current.style.display = 'block';
//             setCurrentCall(incomingcall);
//             settingCallEvent(
//                 incomingcall,
//                 localVideoRef.current,
//                 remoteVideoRef.current,
//                 callButtonRef.current,
//                 answerCallButtonRef.current,
//                 endCallButtonRef.current,
//                 rejectCallButtonRef.current
//             );

//             callButtonRef.current.style.display = 'none';
//             answerCallButtonRef.current.style.display = 'block';
//             rejectCallButtonRef.current.style.display = 'block';
//         });

//         const handleAnswerCallButtonClick = () => {
//             answerCallButtonRef.current.style.display = 'none';
//             rejectCallButtonRef.current.style.display = 'none';
//             endCallButtonRef.current.style.display = 'block';
//             callButtonRef.current.style.display = 'none';

//             if (currentCall !== null) {
//                 currentCall.answer((res) => {
//                     console.log('+++ answering call: ', res);
//                 });
//             }
//         };
//         answerCallButtonRef.current.addEventListener('click', handleAnswerCallButtonClick);

//         const handleRejectCallButtonClick = () => {
//             if (currentCall !== null) {
//                 currentCall.reject((res) => {
//                     console.log('+++ reject call: ', res);
//                 });
//             }

//             callButtonRef.current.style.display = 'block';
//             rejectCallButtonRef.current.style.display = 'none';
//             answerCallButtonRef.current.style.display = 'none';
//         };
//         rejectCallButtonRef.current.addEventListener('click', handleRejectCallButtonClick);

//         const handleEndCallButtonClick = () => {
//             if (currentCall !== null) {
//                 currentCall.hangup((res) => {
//                     console.log('+++ hangup: ', res);
//                 });
//             }

//             callButtonRef.current.style.display = 'block';
//             endCallButtonRef.current.style.display = 'none';
//         };
//         endCallButtonRef.current.addEventListener('click', handleEndCallButtonClick);

//         const handleConnectOkEvent = () => {
//             callButtonRef.current.style.display = 'none';
//             endCallButtonRef.current.style.display = 'block';
//           };
//           document.addEventListener('connect_ok', handleConnectOkEvent);

//         return () => {
//             callButtonRef.current.removeEventListener('click', handleCallButtonClick);
//             answerCallButtonRef.current.removeEventListener('click', handleAnswerCallButtonClick);
//             rejectCallButtonRef.current.removeEventListener('click', handleRejectCallButtonClick);
//             endCallButtonRef.current.removeEventListener('click', handleEndCallButtonClick);
//             document.removeEventListener('connect_ok', handleConnectOkEvent);
//         };

//     }, []);

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-12">
//                     <div className="jumbotron">
//                         <div className="container">
//                             <h2>Video call Demo - User 1</h2>
//                             <p>
//                                 By <a href="https://developer.stringee.com/">stringee.com</a>
//                             </p>
//                             <div id="incoming-call-notice" style={{ display: 'none' }}>
//                                 <div className="spinner-grow text-primary" role="status">
//                                     <span className="sr-only">Incoming call...</span>
//                                 </div>
//                                 <h3>Incoming call...</h3>
//                             </div>
//                         </div>
//                     </div>

//                     <div id="video-container">
//                         <video id="localVideo" ref={localVideoRef} autoPlay muted></video>
//                         <video id="remoteVideo" ref={remoteVideoRef} autoPlay style={{ height: '360px' }}></video>
//                     </div>
//                 </div>
//             </div>

//             <div className="row">
//                 <div className="col" id="action-buttons">
//                     <button id="callButton" className="btn btn-success" ref={callButtonRef}>
//                         Call
//                     </button>
//                     <button id="answerCallButton" className="btn btn-info hidden-first" ref={answerCallButtonRef}>
//                         Answer Call
//                     </button>
//                     <button id="rejectCallButton" className="btn btn-warning hidden-first" ref={rejectCallButtonRef}>
//                         Reject Call
//                     </button>
//                     <button id="endCallButton" className="btn btn-danger hidden-first" ref={endCallButtonRef}>
//                         End Call
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default VideoCall;