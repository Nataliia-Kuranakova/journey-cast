import useMediaQuery from '../hooks/useMediaQuery';
import { minWidth } from '../consts/min-width';

import { skeletonCards } from '../consts/detailed-cast-skeleton-cards';

interface SkeletonProps {
  isLoading: boolean;
}

const Skeleton = ({ isLoading }: SkeletonProps) => {
  const matches = useMediaQuery(minWidth);

  const tripListCards = Array(3).fill(
    <div className="daily-trip-cast-skeleton-card"></div>
  );
  return (
    <>
      {isLoading && matches ? (
        <div className="container">
          <div className="daily-trip-cast">
            <div className="cast-skeleton-title"></div>
            <div className="daily-trip-cast-container">
              {tripListCards.map((card, index) => {
                return (
                  <div className="daily-trip-cast-skeleton-card" key={index}>
                    {card}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="detailed-cast">
            <div className="cast-skeleton-title"></div>
            <div
              className={`detailed-cast-list-data ${
                isLoading ? 'skeleton-padding' : ''
              }`}
            >
              <div className={`wind ${isLoading ? 'skeleton-bg' : ''}`}></div>
              {skeletonCards.map((card) => {
                const cardClass = isLoading
                  ? `${card.className} skeleton-bg`
                  : card.className;
                return <div key={card.className} className={cardClass}></div>;
              })}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Skeleton;
