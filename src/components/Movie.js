import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import SpatialNavigation, { Focusable } from "react-js-spatial-navigation";
import ShakaPlayer from "shaka-player-react";
import "shaka-player/dist/controls.css";
import { useState } from "react";

const Movie = () => {
  const controllerRef = useRef(null);
  const [videoElement, setVideoElement] = useState();
  const [isBackButtonActive, setIsBackButtonActive] = useState(false);
  const [isPlayButtonActive, setIsPlayButtonActive] = useState(false);
  const [isPauseButtonActive, setIsPauseButtonActive] = useState(false);

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

  console.log({ videoElement });

  return (
    <div>
      <SpatialNavigation>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <Focusable
          onFocus={() => setIsBackButtonActive(true)}
          onUnfocus={() => setIsBackButtonActive(false)}
          onClickEnter={() => navigate("/")}
          active="active"
        >
          <button
            style={{
              backgroundColor: isBackButtonActive ? "red" : "",
              color: isBackButtonActive ? "white" : "",
            }}
          >
            Back
          </button>
        </Focusable>
        <Focusable
          onClickEnter={() => videoElement.play()}
          active="active"
          onFocus={() => setIsPlayButtonActive(true)}
          onUnfocus={() => setIsPlayButtonActive(false)}
        >
          <button
            style={{
              backgroundColor: isPlayButtonActive ? "red" : "",
              color: isPlayButtonActive ? "white" : "",
            }}
          >
            Play
          </button>
        </Focusable>
        <Focusable
          onClickEnter={() => videoElement.pause()}
          active="active"
          onFocus={() => setIsPauseButtonActive(true)}
          onUnfocus={() => setIsPauseButtonActive(false)}
        >
          <button
            style={{
              backgroundColor: isPauseButtonActive ? "red" : "",
              color: isPlayButtonActive ? "white" : "",
            }}
          >
            Pause
          </button>
        </Focusable>
        <Focusable>
          <ShakaPlayer ref={controllerRef} src={sources} />
        </Focusable>
      </SpatialNavigation>
    </div>
  );
};

export default Movie;
