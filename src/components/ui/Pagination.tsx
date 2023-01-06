import React, { useMemo } from 'react';
import styles from '../../assets/styles/pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  setPage: (page: number) => void;
  limit?: number;
}

export const Pagination = ({
  currentPage,
  totalCount,
  setPage,
  limit = 10
}: PaginationProps) => {
  const pages = useMemo(() => {
    const totalPagesCount = Math.ceil(totalCount / limit);
    return Array.from({ length: totalPagesCount }, (a, b) => b + 1);
  }, [totalCount, limit]);

  if (pages.length <= 1) {
    return null;
  }
  return (
    <div className={styles.pagination}>
      {pages.map((page) => {
        return (
          <button
            className={page === currentPage ? styles.active : ''}
            key={page}
            type="button"
            onClick={() => setPage(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};
