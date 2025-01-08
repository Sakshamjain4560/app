"use client";
import styles from "@/components/User/user.module.css";
import * as signalR from "@microsoft/signalr";
import { useEffect, useRef, useState } from "react";

type Props = {
  id: string;
};

export const User = ({ id }: Props) => {
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const agentVideoRef = useRef<HTMLVideoElement>(null);
  const switchSizeAgentBoxRef = useRef<HTMLDivElement>(null);
  const switchSizeUserBoxRef = useRef<HTMLDivElement>(null);
  const rtcPeerConnection = useRef<RTCPeerConnection | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [isExpand, setExpand] = useState<boolean>(false);
  const [isFrontCamera, setFrontCamera] = useState<boolean>(true);

  useEffect(() => {
    setUserName("Saksham Jain");
    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: { exact: "user" } },
        audio: true,
      })
      .then((stream) => {
        if (userVideoRef.current && agentVideoRef.current) {
          userVideoRef.current.srcObject = stream;
          agentVideoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // start the signalR connection
    (async () => {
      try {
        const connection = new signalR.HubConnectionBuilder()
          .withUrl(`http://localhost:5227/chatHub?UserId=user-${id}`)
          .configureLogging(signalR.LogLevel.Debug)
          .build();
        await connection.start();
        console.log("SignalR Connected.");
      } catch (err) {
        console.log(err);
      }
    })();

    // WebRTC implementation
    const peer = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        {
          urls: "turn:52.172.141.218:3478",
          username: "testname",
          credential: "testpass",
        },
      ],
    });
    rtcPeerConnection.current = peer;
  }, [id]);

  // const handleStartCall = () => {};

  const handleEndCall = () => {};

  const switchCamera = () => {
    // Stop the camera mode
    const stopCurrentStream = () => {
      const currentStream = userVideoRef.current
        ?.srcObject as MediaStream | null;
      currentStream?.getTracks().forEach((track) => track.stop());
    };

    // Function to switch camera on the base of mode
    const cameraMode = (mode: string) => {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: { exact: mode } } })
        .then((stream) => {
          if (userVideoRef.current) {
            userVideoRef.current.srcObject = stream;
          }
        });
    };

    stopCurrentStream();

    // Set the camera mode
    if (isFrontCamera) {
      // navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      //   if (userVideoRef.current) {
      //     userVideoRef.current.srcObject = stream;
      //   }
      // });
      setFrontCamera(false);
      cameraMode("environment");
    } else {
      // navigator.mediaDevices
      //   .getUserMedia({ video: { facingMode: { exact: "user" } } })
      //   .then((stream) => {
      //     if (userVideoRef.current) {
      //       userVideoRef.current.srcObject = stream;
      //     }
      //   });
      setFrontCamera(true);
      cameraMode("user");
    }
  };

  const switchSize = () => {
    setExpand(!isExpand);
    // if (switchSizeUserBoxRef.current && switchSizeAgentBoxRef.current) {
    //   switchSizeUserBoxRef.current.classList.toggle(styles.userVideoMax);
    //   // switchSizeAgentBoxRef.current.classList.toggle(styles.agentVideosmall);
    // }

    if (isExpand) {
      switchSizeUserBoxRef.current?.classList.remove(styles.userVideoMax);
      switchSizeAgentBoxRef.current?.classList.remove(styles.agentVideosmall);
      switchSizeAgentBoxRef.current?.classList.add(styles.agentVideoLarge);
      switchSizeUserBoxRef.current?.classList.add(styles.userVideoMin);
    } else {
      switchSizeUserBoxRef.current?.classList.remove(styles.userVideoMin);
      switchSizeAgentBoxRef.current?.classList.remove(styles.agentVideoLarge);
      switchSizeAgentBoxRef.current?.classList.add(styles.agentVideosmall);
      switchSizeUserBoxRef.current?.classList.add(styles.userVideoMax);
    }
  };
  console.log(agentVideoRef.current?.srcObject);
  return (
    <div className={styles.userBoard}>
      {userName && (
        <div className={styles.mainBox}>
          <div className={styles.userName}>
            <h1>Dear {userName ? userName : "User"}</h1>
          </div>

          <div
            className={`${styles.videocontainer} ${
              isExpand && styles.videoBoxSize
            }`}
          >
            {" "}
            {/* USER */}
            <div
              className={`${styles.userVideoBox}`}
              ref={switchSizeUserBoxRef}
            >
              <button className={styles.switchCameraBtn} onClick={switchCamera}>
                <img src="/cameraSwitch.svg" />
              </button>
              <video
                autoPlay
                playsInline
                ref={userVideoRef}
                muted
                className={styles.userVideo}
              />
            </div>
            {/* AGENT */}
            <div
              className={`${styles.agentVideoBox}`}
              ref={switchSizeAgentBoxRef}
              // style={{animationName}}
            >
              <button
                className={
                  isExpand ? styles.sizeExpandBtn : styles.sizeCollapseBtn
                }
                onClick={switchSize}
              >
                <img src={isExpand ? "/expandBtn.svg" : "/minimize.svg"} />
              </button>
              <video
                autoPlay
                playsInline
                ref={agentVideoRef}
                muted
                className={styles.agentVideo}
              />
              {/* {agentVideoRef.current ? (
                <video
                  autoPlay
                  playsInline
                  ref={agentVideoRef}
                  muted
                  className={styles.agentVideo}
                />
              ) : (
                <div className={styles.animationBoxClass}>
                  We are connecting you with our agent for video KYC shortly
                  <div className={styles.typingDotsBox}>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                  </div>
                </div>
              )} */}
            </div>
            {/* <button className={styles.swapBtn}>
              <img src="/swap.svg" />
            </button> */}
          </div>
          <div className={styles.btnBox}>
            <button onClick={handleEndCall} className={styles.endBtn}>
              <img src="/endCall.svg" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
