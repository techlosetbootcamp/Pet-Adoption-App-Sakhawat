import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const useHeader = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return {
    username: user?.username || 'Guest',
    photoURL: user?.photoURL || '',
  };
};

export default useHeader;
