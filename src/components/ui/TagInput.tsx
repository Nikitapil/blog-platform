import React, { useCallback, useState } from 'react';
import { AppInput } from './AppInput';
import { Tag } from './Tag';

interface ITagInputProps {
  id: string;
  tags: string[];
  name: string;
  setTags: (tags: string[]) => void;
  placeholder?: string;
  label?: string;
  maxLength?: number;
}

export const TagInput = ({
  label,
  id,
  name,
  maxLength = 20,
  placeholder = '',
  tags
}: ITagInputProps) => {
  const [value, setValue] = useState('');

  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length < maxLength) {
        setValue(e.target.value);
      }
    },
    [maxLength]
  );

  return (
    <div>
      <div>
        {tags.map((tag) => (
          <Tag key={tag} text={tag} />
        ))}
      </div>
      <AppInput
        id={id}
        value={value}
        onChange={changeHandler}
        placeholder={placeholder}
        name={name}
        label={label}
      />
    </div>
  );
};
