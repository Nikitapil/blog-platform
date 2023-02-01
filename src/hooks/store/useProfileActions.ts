import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { profileActions } from '../../store/profile/profile.slice';

export const useProfileActions = () => {
  const dispatch = useDispatch();
  const actions = { ...profileActions };

  return bindActionCreators(actions, dispatch);
};
