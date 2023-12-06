import { Box, CircularProgress } from '@mui/material';
import React, { useCallback, useRef } from 'react';

const InfiniteScroll = ({ hasMore, loadMore, isLoading, children }: { hasMore: boolean, isLoading: boolean, loadMore: () => void, children: React.ReactNode }) => {
  const observer = useRef<IntersectionObserver | undefined>();
  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (observer.current) (observer.current as IntersectionObserver).disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, loadMore]
  );

  return (
    <div>
      {children}
      <div ref={lastElementRef} />
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default InfiniteScroll;