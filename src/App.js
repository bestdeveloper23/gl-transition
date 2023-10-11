import React, { Component } from "react";
import PropTypes from "prop-types";
import { Surface } from "gl-react-dom";
import transitions from "gl-transitions";
import GLTransition from "react-gl-transition";
import v1 from "./v3.mp4";
import v2 from "./v4.mp4";
import "./App.css";

const loadVideo = async (url) => {
  const video = document.createElement("video");
  video.crossOrigin = "anonymous";
  video.muted = true;
  video.autoplay = true;
  video.src = url;

  return new Promise((res) => {
    video.onloadeddata = () => {
      video.autoplay = false;
      video.muted = false;
      video.height = '100vh';
      video.width = '100vw';
      res(video);
    };
  });
};

const TransitionCanvas = ({ from, to, progress, transition }) => {
  return (
    <GLTransition
      from={from}
      to={to}
      progress={progress}
      transition={transition}
    ></GLTransition>
  );
};
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      progress: 0,
      animationType: 8,
      to: "",
      from: ""
    };
  }
  componentDidMount = async () => {
    let video1 = await loadVideo(v1);
    let video2 = await loadVideo(v2);

    let d1 = video1.duration;
    let d2 = video2.duration;
    setInterval(() => {
      video1.currentTime += 0.1;
      video2.currentTime += 0.1;
      if (video1.currentTime === d1) {
        video1.currentTime = 0;
      }
      if (video2.currentTime === d2) {
        video2.currentTime = 0;
      }

      this.setState({
        progress: this.state.progress + 0.1 > 1 ? 0 : this.state.progress + 0.1,
        from: video1,
        to: video2
      });
    }, 100);
  };

  render() {
    return (
      <div>
        <Surface id="tc" width={640} height={320}>
          <TransitionCanvas
            from={this.state.from}
            to={this.state.to}
            progress={this.state.progress}
            transition={transitions[this.state.animationType]}
          ></TransitionCanvas>
        </Surface>
      </div>
    );
  }
}
