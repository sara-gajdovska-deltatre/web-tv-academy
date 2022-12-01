import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import SpatialNavigation, { Focusable } from "react-js-spatial-navigation";
import ShakaPlayer from "shaka-player-react";
import "shaka-player/dist/controls.css";
import { useState } from "react";
import FocusableButton from "./FocusableButton";

const Movie = () => {
  const controllerRef = useRef(null);
  const [videoElement, setVideoElement] = useState();

  const navigate = useNavigate();

  const {
    state: { title, subtitle, sources },
  } = useLocation();

  useEffect(() => {
    const { videoElement } = controllerRef.current;

    const config = {
      controlPanelElements: [
        ...videoElement.ui.m.controlPanelElements,
        "rewind",
        "fast_forward",
      ],
      overflowMenuButtons: [...videoElement.ui.m.overflowMenuButtons, "cast"],
    };

    videoElement.ui.configure(config);
    setVideoElement(videoElement);
  }, []);

  const onPlay = () => {
    videoElement.play();
  };

  const onPause = () => {
    videoElement.pause();
  };

  const onRewind = () => {
    videoElement.currentTime -= 10;
  };

  const onFastForward = () => {
    videoElement.playbackRate += 2;
  };

  const onBack = () => {
    navigate("/");
  };

  return (
    <div>
      <SpatialNavigation>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <FocusableButton text="Back" onClick={onBack} />
        <FocusableButton text="Play" onClick={onPlay} />
        <FocusableButton text="Forward" onClick={onFastForward} />
        <FocusableButton text="Rewind 10 sec" onClick={onRewind} />
        <FocusableButton text="Pause" onClick={onPause} />
        <Focusable>
          <ShakaPlayer ref={controllerRef} src={sources} />
        </Focusable>
      </SpatialNavigation>
    </div>
  );
};

export default Movie;
