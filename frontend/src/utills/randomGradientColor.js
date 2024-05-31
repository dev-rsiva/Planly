export const randomGradientColor = () => {
  const letters = "123456789ABCDEF";

  function getRandomNum() {
    let randomNum = Math.floor(Math.random() * letters.length);
    return randomNum;
  }

  let randomColor = "#";

  for (let i = 0; i < 6; i++) {
    randomColor += letters[getRandomNum()];
  }

  return randomColor;
};

export const colors = {
  color1: "#448e5d",
  color2: "#93552d",
  color3: "#582b34",
  color4: "#8d1335",
  color5: "#fc22ef",
  color6: "#eabf79",
  color7: "#dbbbc5",
  color8: "#01f809",
  color9: "#1b147c",
  color10: "#37afa0",
  color11: "#0d6fce",
  color12: "#e35cec",
  color13: "#6f322d",
  color14: "#106de5",
  color15: "#9dea43",
  color16: "#9c1a19",
  color17: "#7689f0",
  color18: "#0e039c",
  color19: "#692588",
  color20: "#e2dfcd",
  color21: "#bf0dc2",
  color22: "#fc8f76",
  color23: "#59e6bf",
  color24: "#05eb05",
  color25: "#8d6c61",
};

function getRandomColor() {
  const keys = Object.keys(colors);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return colors[randomKey];
}

// Example usage
export const randomColor = getRandomColor();
console.log(randomColor); // This will log a random color from the colors object
