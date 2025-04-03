'use client';

import {useState, createContext} from 'react';

export const FooterContentContext = createContext({
  isFooterContentVisible: true,
  showFooterContent: () => undefined,
  hideFooterContent: () => undefined
});

export const FooterContentProvider = ({children}) => {
  const [isFooterContentVisible, setIsFooterContentVisible] = useState(true);

  const showFooterContent = () => {
    setIsFooterContentVisible(true);
  };

  const hideFooterContent = () => {
    setIsFooterContentVisible(false);
  };

  const toggleIsFooterContentVisible = () => {
    setIsFooterContentVisible(!isFooterContentVisible);
  };

  return (
    <FooterContentContext.Provider
      value={{
        isFooterContentVisible,
        toggleIsFooterContentVisible,
        showFooterContent,
        hideFooterContent
      }}
    >
      {children}
    </FooterContentContext.Provider>
  );
};