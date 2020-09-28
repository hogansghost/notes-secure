import React, { createContext, useEffect, useState } from 'react';

export const LoadingContext = createContext();

export const LoadingStates = {
  Loading: 'loading',
  Saving: 'saving',
};

export function LoadingProvider({
  children,
}) {
  const [isLoading, setIsLoading] = useState([]);
  const [loading, setLoading] = useState([]);

  const addLoadingState = (newLoading) => {
    if (newLoading && !loading.includes(newLoading)) {
      setLoading([...loading, newLoading]);
    }
  }

  const removeLoadingState = (loadingToRemove) => {
    setLoading([...loading.filter((load) => load !== loadingToRemove)]);
  }

  useEffect(() => {
    setIsLoading(!!loading.length);
  }, [loading]);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        addLoadingState,
        removeLoadingState,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}
