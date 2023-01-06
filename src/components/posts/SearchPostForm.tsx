import React, { useState } from 'react';
import { AppInput } from '../ui/AppInput';
import { AppButton } from '../ui/AppButton';

interface SearchPostFormProps {
  onSearch: (search: string) => void;
}

export const SearchPostForm = ({ onSearch }: SearchPostFormProps) => {
  const [search, setSearch] = useState('');

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <form className="d-flex gap-10" onSubmit={submitHandler}>
      <AppInput
        id="search"
        value={search}
        onChange={inputHandler}
        placeholder="Search post..."
        name="search"
      />
      <AppButton text="Search" type="submit" />
    </form>
  );
};
