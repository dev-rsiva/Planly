import { data } from "./utills";
import { sortedLabels } from "./labelColors";

export const cardData = {};

data.workspaces?.forEach((workspace) =>
  workspace?.boards?.forEach((board) =>
    board?.lists?.forEach((list) =>
      list?.cards?.forEach((card) => {
        cardData[card?.id] = {
          description: "",
          Activities: [],
          labels: sortedLabels,
          members: [],
          covers: [],
          dates: { start: null, due: null },
          attachments: [],
          cover: [],
          customFields: [],
          archived: false,
          watchers: [],
        };
      })
    )
  )
);
