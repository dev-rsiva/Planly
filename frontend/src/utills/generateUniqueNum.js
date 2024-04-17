function generateUniqueNumber(firstTwoChar, length) {
  const characters =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let uniqueNum = "";
  for (let i = 0; i < length; i++) {
    uniqueNum = firstTwoChar += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return uniqueNum;
}

export default generateUniqueNumber;
