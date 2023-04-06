import { JitsiMeeting } from "@jitsi/react-sdk";
import { useLocation, useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  let { state } = useLocation();
  return (
    <JitsiMeeting
      roomName="MySambeauAPP"
      configOverwrite={{
        startWithAudioMuted: true,
        disableModeratorIndicator: true,
        hideConferenceSubject: true,
        startScreenSharing: false,
        enableEmailInStats: false,
        startWithVideoMuted: true,
        prejoinPageEnabled: false // If false: Auto join
      }}
      interfaceConfigOverwrite={{
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
      }}
      userInfo={{
        displayName: state.username
      }}
      onApiReady={(externalApi) => {
        // here you can attach custom event listeners to the Jitsi Meet External API
        // you can also store it locally to execute commands
      }}
      onReadyToClose={() => {
        navigate("/dashboard", {
          state: { username: state.username }
        });
      }}
      getIFrameRef={(iframeRef) => {
        iframeRef.style.height = "100%";
        iframeRef.style.width = "100%";
      }}
    />
  );
}
