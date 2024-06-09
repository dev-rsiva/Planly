import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const Table = () => {
  const [workspaceInfo, setShowWorkspaceHeading] = useOutletContext();
  const [cards, setCards] = useState([]);

  const formatDate = (timestamp) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleDateString(); // Format the date as MM/DD/YYYY
  };

  useEffect(() => {
    // Assuming workspaceInfo has the cards data
    let cards = [];

    workspaceInfo?.boards?.forEach((board) => {
      board?.lists?.forEach((list) => {
        list?.cards?.forEach((card) => {
          cards?.push({
            listName: list?.title,
            boardBackgroundImg: board?.backgroundImg,
            ...card,
          });
        });
      });
    });

    console.log(cards);
    setCards(cards);
  }, [workspaceInfo]);

  useEffect(() => {
    setShowWorkspaceHeading(false);
    return () => {
      console.log("Table Component unmounting");
      setShowWorkspaceHeading(true);
    };
  }, [setShowWorkspaceHeading]);

  if (cards.length === 0) {
    return (
      <p className="font-sans text-sm font-semibold text-[#172b4d] w-full text-center mt-24 ">
        You have no cards to display in table view.
      </p>
    );
  }

  return (
    <div className="flex flex-col mx-4 my-4">
      <h1 className="font-sans text-2xl text-[#172b4d] italic pt-1 pb-4">
        Table
      </h1>
      <div className="flex text-xs text-gray-600 font-semibold bg-gray-100 sticky top-0 z-10">
        <div className="flex-1 p-2 border-b-2">Card</div>
        <div className="flex-1 p-2 border-b-2">List</div>
        <div className="flex-1 p-2 border-b-2">Labels</div>
        <div className="flex-1 p-2 border-b-2">Members</div>
        <div className="flex-1 p-2 border-b-2">Due date</div>
      </div>
      <div className="flex flex-col font-sans text-sm text-[#172b4d] max-h-[70vh] overflow-y-auto">
        {cards?.map((card) => (
          <div key={card?.id} className="flex">
            <div className="flex-1 p-2 border-b">
              <div className="flex h-full items-center gap-2">
                <img
                  src={card?.boardBackgroundImg}
                  className="w-[34px] h-[23px] rounded mr-2"
                />
                <div>
                  {card?.title ? card?.title : <p className="mx-6">-</p>}
                </div>
              </div>
            </div>
            <div className="flex-1 p-2 border-b">
              <div className="flex h-full items-center">
                {card?.listName ? card?.listName : <p className="mx-6">-</p>}
              </div>
            </div>
            <div className="flex-1 p-2 border-b">
              <div className="flex h-full items-center">
                {card?.labels?.filter((label) => label?.isChecked).length ===
                  0 ||
                card?.labels?.filter((label) => label?.isChecked) === false ? (
                  <p className="mx-4">-</p>
                ) : (
                  card?.labels
                    ?.filter((label) => label?.isChecked)
                    .map((label) => {
                      return (
                        <div
                          key={label.id}
                          style={{ backgroundColor: label?.color }}
                          className="w-[45px] h-[15px] rounded mr-2 flex"
                        >
                          {/* <p>{label.title}</p> */}
                        </div>
                      );
                    })
                )}
              </div>
            </div>
            <div className="flex-1 p-2 border-b">
              <div className="flex items-center h-full">
                {card?.members?.length === 0 || card?.members === false ? (
                  <p className="mx-2">-</p>
                ) : (
                  card?.members?.map((member) => {
                    return (
                      <div
                        key={member.id}
                        className="flex justify-center text-white text-sm font-semibold items-center rounded-full min-w-[30px] w-[30px] h-[30px] mr-1"
                      >
                        <img src={member?.photoURL} className="w-full" />
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div className="flex-1 p-2 border-b">
              <div className="flex items-center h-full">
                {card?.dueDate === "" || card?.dueDate === false ? (
                  <p className="mx-3">-</p>
                ) : (
                  formatDate(card?.dueDate)
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
