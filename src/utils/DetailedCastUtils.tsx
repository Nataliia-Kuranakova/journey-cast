import { IoSunny } from 'react-icons/io5';
import { LuSunset, LuSunrise } from 'react-icons/lu';
import { MdVisibility } from 'react-icons/md';
import { WiHumidity } from 'react-icons/wi';
import { DetailedCastData } from '../store/apis/weatherCastApi/types';

import { iconSize } from '../consts/icon-size';

export const createCardData = ({
  uvindex,
  humidity,
  visibility,
  sunrise,
  sunset,
}: DetailedCastData) => [
  {
    title: 'UV index',
    icon: <IoSunny  />,
    data: uvindex,
    className: 'uv-filter',
  },
  {
    title: 'Sunrise / Sunset',
    icon: <LuSunrise />,
    extraIcon: <LuSunset />,
    data: `${sunrise.slice(0, 5)} a.m `,
    extraData: `${sunset.slice(0, 5)} p.m`,
    className: 'sun-move ',
    isSpecial: true,
  },
  {
    title: 'Visibility',
    icon: <MdVisibility size={iconSize} />,
    data: visibility !== null ? `${visibility} km` : 'No data',
    className: 'visibility ',
  },
  {
    title: 'Humidity',
    icon: <WiHumidity size={iconSize} />,
    data: `${Math.floor(humidity)}%`,
    className: 'humidity ',
  },
];
