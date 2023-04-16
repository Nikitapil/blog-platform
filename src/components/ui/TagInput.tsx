import React, { useCallback, useState } from 'react';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { AppInput } from './AppInput';
import { Tag } from './Tag';
import { IconButton } from './IconButton';
import styles from '../../assets/styles/tag-input.module.scss';

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
  tags,
  setTags,
  maxLength = 20,
  placeholder = ''
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

  const submitHandler = useCallback(() => {
    if (value.trim()) {
      const candidate = tags.find((tag) => tag === value);
      if (candidate) {
        toast.error('Tags must be unique');
        return;
      }
      setTags([...tags, value]);
      setValue('');
    } else {
      toast.error("Tag can't be empty");
    }
  }, [setTags, tags, value]);

  const onDeleteTag = useCallback(
    (tag: string) => {
      const newTags = tags.filter((t) => t !== tag.slice(1));
      setTags(newTags);
    },
    [setTags, tags]
  );

  return (
    <div>
      <div>
        <div className={styles['tag-area']}>
          {tags.map((tag) => (
            <Tag
              key={tag}
              text={`#${tag}`}
              deleteAvailable
              deleteHandler={onDeleteTag}
            />
          ))}
        </div>
        <div className={styles['form-area']}>
          <AppInput
            id={id}
            value={value}
            onChange={changeHandler}
            placeholder={placeholder}
            name={name}
            label={label}
          />
          <IconButton
            className={styles.submit}
            icon={faCircleRight}
            onClick={submitHandler}
            type="button"
          />
        </div>
      </div>
    </div>
  );
};
