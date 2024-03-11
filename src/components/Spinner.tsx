import { PropsWithChildren } from 'react';

import { WiDaySunny } from 'react-icons/wi';

type SpinnerProps = PropsWithChildren<{
  sprinnerStyles: string;
  iconSize: string;
}>;

const Spinner = ({ children, sprinnerStyles, iconSize }: SpinnerProps) => {
  return (
    <div className={sprinnerStyles}>
      <div>
        <WiDaySunny size={iconSize} />
      </div>

      {children}
    </div>
  );
};

export default Spinner;
