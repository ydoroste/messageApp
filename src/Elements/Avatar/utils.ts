const generateColor = () => {
  const MAX_DARKNESS = 0.6;
  const MAX_COLOR_VALUE = Math.floor(255 * MAX_DARKNESS);

  const red = Math.floor(Math.random() * MAX_COLOR_VALUE)
    .toString(16)
    .padStart(2, "0");
  const green = Math.floor(Math.random() * MAX_COLOR_VALUE)
    .toString(16)
    .padStart(2, "0");
  const blue = Math.floor(Math.random() * MAX_COLOR_VALUE)
    .toString(16)
    .padStart(2, "0");

  return `#${red}${green}${blue}`;
};

export default generateColor;
