import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag } from '../ui/Tag';

export interface IPostHashTagProps {
  tag: string;
}

export const PostHashTag = ({ tag }: IPostHashTagProps) => {
  const navigate = useNavigate();

  const clickHandler = useCallback(() => {
    navigate(`/?tag=${tag}`);
  }, []);

  return <Tag text={`#${tag}`} size="sm" onClick={clickHandler} />;
};
