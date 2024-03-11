import { useEffect, useState } from 'react';

function useDelayAnimation(
  isMounted: boolean | string | null,
  delayTime: number
) {
  const [showComponent, setShowComponent] = useState(false);
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (isMounted && !showComponent) {
      setShowComponent(true);
    } else if (!isMounted && showComponent) {
      timeoutId = setTimeout(() => setShowComponent(false), delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, showComponent]);
  return showComponent;
}

export default useDelayAnimation;
