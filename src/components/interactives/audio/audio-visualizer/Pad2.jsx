import React, { useState } from "react";
import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";
import audio from "../../../../assets/pad/1ja2.wav";
import extraAudio from "../../../../assets/pad/1ja2.wav";
import videoFile1 from "../../../../assets/pad/11september2.mp4";
import videoFile2 from "../../../../assets/pad/suns-soleil2.mp4";
import videoFile3 from "../../../../assets/pad/suns-soleil2.mp4";
import extraVideoFile from "../../../../assets/lacienaga.mp4";
import "./SketchAudioStyles.css";

let sound;
let extraSound;
let video1, video2, video3;
let extraVideo; 
let isSoundOn = false;
let isVideoPlaying = false;
let isExtraSoundPlaying = false;

const Pad2 = (props) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const preload = (p5) => {
    sound = p5.loadSound(audio);
    extraSound = p5.loadSound(extraAudio); 
    video1 = p5.createVideo([videoFile1]);
    video2 = p5.createVideo([videoFile2]);
    video3 = p5.createVideo([videoFile3]);
    extraVideo = p5.createVideo([extraVideoFile]); 

    video1.hide();
    video2.hide();
    video3.hide();
    extraVideo.hide();
  };

  const setup = (p5, canvasParentRef) => {
    const canvasWidth = p5.windowWidth < 768 ? p5.windowWidth * 0.9 : 1200;
    const canvasHeight = p5.windowHeight;

    p5.createCanvas(canvasWidth, canvasHeight, p5.WEBGL).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(4, 18, 37);

    if (isSoundOn && sound.isPlaying()) {
      const drawVideo = (video, opacity, xOffset = 0) => {
        const videoWidth = isFullScreen ? p5.width : p5.width * 0.8;
        const videoHeight = (videoWidth / video.width) * video.height;

        p5.push();
        p5.tint(255, opacity);
        p5.translate(xOffset, -videoHeight / 2, 0);
        p5.image(video, -videoWidth / 2, 0, videoWidth, videoHeight);
        p5.pop();
      };

      drawVideo(video1, 120, 0);  
      drawVideo(video2, 200, 0);   
      drawVideo(video3, 180, 0); 
    }

    if (isExtraSoundPlaying && extraSound.isPlaying()) {
      const videoWidth = isFullScreen ? p5.width : p5.width * 0.8;
      const videoHeight = (videoWidth / extraVideo.width) * extraVideo.height;

      p5.push();
      p5.tint(255, 200); 
      p5.translate(-videoWidth / 2, -videoHeight / 2, 0);
      p5.image(extraVideo, 0, 0, videoWidth, videoHeight);
      p5.pop();
    }

    if (isVideoPlaying) {
      const videoWidth = isFullScreen ? p5.width : p5.width * 0.8;
      const videoHeight = (videoWidth / video1.width) * video1.height;

      p5.tint(255, 150);
      p5.push();
      p5.translate(-videoWidth / 2, -videoHeight / 2, 0);
      p5.image(video1, 0, 0, videoWidth, videoHeight);
      p5.pop();
    }
  };

  const handleFullScreen = (p5) => {
    if (!isFullScreen) {
      const canvas = p5.canvas;
      if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
      } else if (canvas.mozRequestFullScreen) { 
        canvas.mozRequestFullScreen();
      } else if (canvas.webkitRequestFullscreen) { 
        canvas.webkitRequestFullscreen();
      } else if (canvas.msRequestFullscreen) {
        canvas.msRequestFullscreen();
      }
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullScreen(false);
    }
  };

  const touchStarted = (p5) => {
    if (p5.mouseY < p5.height / 2) {
      if (p5.mouseX < p5.width / 2) {
        if (!isExtraSoundPlaying) {
          extraSound.loop();
          extraVideo.loop();
          isExtraSoundPlaying = true;
        }
      } else {
        if (!isSoundOn) {
          sound.loop(); 
          video1.loop();
          video2.loop();
          video3.loop();
          isSoundOn = true;
        }
      }
    }

    if (p5.mouseY >= p5.height / 2) {
      if (!isVideoPlaying) {
        video1.loop();
        video2.loop();
        video3.loop();
        isVideoPlaying = true;
      }
    }
  };

  const touchEnded = (p5) => {
    if (p5.mouseY < p5.height / 2 && p5.mouseX < p5.width / 2) {
      if (isExtraSoundPlaying) {
        extraSound.stop();
        extraVideo.stop(); 
        isExtraSoundPlaying = false;
      }
    }

    if (p5.mouseY < p5.height / 2 && p5.mouseX >= p5.width / 2) {
      if (isSoundOn) {
        sound.stop();
        video1.stop();
        video2.stop();
        video3.stop();
        isSoundOn = false;
      }
    }

    if (p5.mouseY >= p5.height / 2) {
      if (isVideoPlaying) {
        video1.pause();
        video2.pause();
        video3.pause();
        isVideoPlaying = false;
      }
    }
  };

  const windowResized = (p5) => {
    const canvasWidth = isFullScreen ? p5.windowWidth : (p5.windowWidth < 768 ? p5.windowWidth * 0.9 : 1200);
    const canvasHeight = p5.windowHeight;

    p5.resizeCanvas(canvasWidth, canvasHeight);
  };

  return (
    <div>
      <button
        className="fullscreen-button"
        onClick={() => handleFullScreen(window.p5instance)}
      >
        {isFullScreen ? "Exit Full Screen" : "Full Screen"}
      </button>
      <Sketch
        className={"sketch"}
        setup={setup}
        draw={draw}
        preload={preload}
        touchStarted={touchStarted}
        touchEnded={touchEnded}
        windowResized={windowResized}
      />
    </div>
  );
};

export default Pad2;
