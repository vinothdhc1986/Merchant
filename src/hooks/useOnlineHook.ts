import { useEffect, useState } from 'react';

function useOnlineHook(): boolean {
  const [isOnline, setOnline] = useState<boolean>(true);

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);

    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);

    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
    };
  }, []);
  return isOnline;
}

export default useOnlineHook;
