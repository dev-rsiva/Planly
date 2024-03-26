import generateUniqueNumber from "./generateUniqueNum";

export const labelColors = [
  {
    id: "",
    colorName: "subtle green",
    color: "#BAF3DB",
    title: "",
  },
  {
    id: "",
    colorName: "subtle yellow",
    color: "#F8E6A0",
    title: "",
  },
  {
    id: "",
    colorName: "subtle orange",
    color: "#FEDEC8",
    title: "",
  },
  {
    id: "",
    colorName: "subtle red",
    color: "#FFD5D2",
    title: "subtle red",
  },
  {
    id: "",
    colorName: "subtle purple",
    color: "#DFD8FD",
    title: "",
  },

  {
    id: "",
    colorName: "green",
    color: "#4BCE97",
    title: "green",
  },
  {
    id: "",
    colorName: "yellow",
    color: "#F5CD47",
    title: "yellow",
  },
  {
    id: "",
    colorName: "orange",
    color: "#FEA362",
    title: "orange",
  },
  {
    id: "",
    colorName: "red",
    color: "#F87168",
    title: "red",
  },
  {
    id: "",
    colorName: "purple",
    color: "#9F8FEF",
    title: "purple",
  },

  {
    id: "",
    colorName: "bold green",
    color: "#1F845A",
    title: "",
  },
  {
    id: "",
    colorName: "bold yellow",
    color: "#946F00",
    title: "",
  },
  {
    id: "",
    colorName: "bold orange",
    color: "#C25100",
    title: "",
  },
  {
    id: "",
    colorName: "bold red",
    color: "#C9372C",
    title: "",
  },
  {
    id: "",
    colorName: "bold purple",
    color: "#6E5DC6",
    title: "",
  },

  ///////////////////////////////////////////

  {
    id: "",
    colorName: "subtle blue",
    color: "#CCE0FF",
    title: "",
  },
  {
    id: "",
    colorName: "subtle sky",
    color: "#C6EDFB",
    title: "",
  },
  {
    id: "",
    colorName: "subtle lime",
    color: "#D3F1A7",
    title: "",
  },
  {
    id: "",
    colorName: "subtle pink",
    color: "#FDD0EC",
    title: "",
  },
  {
    id: "",
    colorName: "subtle black",
    color: "#DCDFE4",
    title: "",
  },

  {
    id: "",
    colorName: "blue",
    color: "#579DFF",
    title: "blue",
  },
  {
    id: "",
    colorName: "sky",
    color: "#6CC3E0",
    title: "",
  },
  {
    id: "",
    colorName: "lime",
    color: "#94C748",
    title: "",
  },
  {
    id: "",
    colorName: "pink",
    color: "#E774BB",
    title: "",
  },
  {
    id: "",
    colorName: "black",
    color: "#8590A2",
    title: "",
  },

  {
    id: "",
    colorName: "bold blue",
    color: "#0C66E4",
    title: "",
  },
  {
    id: "",
    colorName: "bold sky",
    color: "#227D9B",
    title: "",
  },
  {
    id: "",
    colorName: "bold lime",
    color: "#5B7F24",
    title: "",
  },
  {
    id: "",
    colorName: "bold pink",
    color: "#AE4787",
    title: "",
  },
  {
    id: "",
    colorName: "bold black",
    color: "#626F86",
    title: "",
  },
];

labelColors.forEach(
  (each) =>
    (each.id = generateUniqueNumber(each.colorName.split(" ").join(""), 5))
);

console.log(labelColors);

const allowedColors = [
  "green",
  "yellow",
  "orange",
  "subtle red",
  "red",
  "purple",
  "blue",
];

const labels = labelColors.filter((eachItem) =>
  allowedColors.includes(eachItem.colorName)
);

console.log(labels);

// Custom sorting function
const customSort = (a, b) => {
  const indexA = allowedColors.indexOf(a.colorName);
  const indexB = allowedColors.indexOf(b.colorName);

  return indexA - indexB;
};

// Sorting the labelColors array using the custom sorting function
export const sortedLabels = labels.slice().sort(customSort);
