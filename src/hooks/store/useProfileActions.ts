import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { profileActions } from '../../store/profile/profile.slice';
import {
  deleteAvatar,
  updateAvatar,
  updateUserName
} from '../../store/profile/profile-actions';

export const useProfileActions = () => {
  const dispatch = useDispatch();
  const actions = {
    ...profileActions,
    updateAvatar,
    deleteAvatar,
    updateUserName
  };

  return bindActionCreators(actions, dispatch);
};
