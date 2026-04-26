'use client';
import { useState, useEffect, ChangeEvent, useRef } from 'react';
import styles from './SearchForm.module.css';
import { SearchIcon } from '@/shared/ui/icons';
import cn from 'classnames';

interface SearchFormProps {
  initialValue?: string;
  onQueryChange: (query: string) => void;
  placeholder?: string;
}

const SearchForm = ({ initialValue = '', onQueryChange, placeholder = "Поиск треков и плейлистов" }: SearchFormProps) => {
  const [query, setQuery] = useState(initialValue);
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update internal state if initialValue changes
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setIsTyping(newQuery.trim().length > 0);

    // Debounce the callback
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onQueryChange(newQuery);
      setIsTyping(false);
    }, 500); // 500ms debounce
  };

  return (
    <div className={styles.searchFormWrapper}>

      <div className={styles.inputContainer}>
        <div className={cn(styles.searchIconWrapper, { [styles.active]: isTyping })}>
          <SearchIcon />
        </div>
        <input
          id="searchInput"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(styles.searchInput, {
            [styles.hasContent]: query.length > 0
          })}
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default SearchForm;