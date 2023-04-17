import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProfileActions } from '../../hooks/store/useProfileActions';
import { useAppSelector } from '../../hooks/store/useAppSelector';
import { UserComment } from '../../components/profile/UserComment';
import { profileSelector } from '../../store/selectors';

export const UserComments = () => {
  const { id } = useParams();
  const { getUserComments } = useProfileActions();
  const { userComments } = useAppSelector(profileSelector);

  useEffect(() => {
    if (id) {
      getUserComments(id);
    }
  }, [getUserComments, id]);

  return (
    <div>
      {userComments.length === 0 && <p>No comments yet!</p>}
      {userComments.map((comment) => (
        <UserComment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};
