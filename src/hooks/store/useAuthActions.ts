import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { registration } from '../../store/auth/auth-actions';
import { authActions } from '../../store/auth/auth.slice';

export const useAuthActions = () => {
  const actions = {
    ...authActions,
    registration
  };
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
