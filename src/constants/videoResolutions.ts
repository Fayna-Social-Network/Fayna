const qvgaConstraints = {
  video: {width: {exact: 320}, height: {exact: 240}}
};

const vgaConstraints = {
  video: {width: {exact: 640}, height: {exact: 480}}
};

const hdConstraints = {
  video: {width: {exact: 1280}, height: {exact: 720}}
};

const fullHdConstraints = {
  video: {width: {exact: 1920}, height: {exact: 1080}}
};

const televisionFourKConstraints = {
  video: {width: {exact: 3840}, height: {exact: 2160}}
};

const cinemaFourKConstraints = {
  video: {width: {exact: 4096}, height: {exact: 2160}}
};

const eightKConstraints = {
  video: {width: {exact: 7680}, height: {exact: 4320}}
};

export const videoResolutions = [
  qvgaConstraints,
  vgaConstraints,
  hdConstraints,
  fullHdConstraints,
  televisionFourKConstraints,
  cinemaFourKConstraints,
  eightKConstraints
] 