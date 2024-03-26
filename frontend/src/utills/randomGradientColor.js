export const randomGradientColor = () => {
  const letters = "123456789ABCDEF";

  function getRandomNum() {
    let randomNum = Math.floor(Math.random() * letters.length);
    return randomNum;
  }

  console.log(getRandomNum());

  let randomColor = "#";

  for (let i = 0; i < 6; i++) {
    randomColor += letters[getRandomNum()];
  }

  console.log(randomColor);
  return randomColor;
};
