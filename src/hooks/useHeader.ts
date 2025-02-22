import { useAppSelector } from './useSelector';

const useHeader = () => {
  const user = useAppSelector((state) => state.auth.user);

  return {
    username: user?.username || 'Guest',
    photoURL: user?.photoURL || '',
  };
};

export default useHeader;
