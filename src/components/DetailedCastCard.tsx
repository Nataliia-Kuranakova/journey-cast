import { CardContent } from '../globalTypes';

interface DetailedCastCardProps {
  card: CardContent;
}

const DetailedCastCard = ({ card }: DetailedCastCardProps): JSX.Element => {
  const properContent = card.isSpecial ? (
    <>
      <p className="content">
        {card.icon} {card.data}
      </p>
      <p className="content">
        {card.extraIcon} {card.extraData}
      </p>
    </>
  ) : (
    <>
      <div>{card.icon}</div>
      <p className="detailed-cast-dinamic-data">{card.data}</p>
    </>
  );
  return (
    <>
      <div className={card.className}>
        <h5 className="card-title">{card.title}</h5>
        {properContent}
      </div>
    </>
  );
};

export default DetailedCastCard;
