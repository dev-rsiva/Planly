import Card from "./Card";

const Cards = ({ workspaceData, setWorkspaceData, list, cards }) => {
  return (
    <div>
      {cards.map((card, i) => {
        return (
          <Card
            key={card.id}
            workspaceData={workspaceData}
            setWorkspaceData={setWorkspaceData}
            list={list}
            card={card}
            cardId={card.id}
            i={i}
          />
        );
      })}
    </div>
  );
};

export default Cards;
