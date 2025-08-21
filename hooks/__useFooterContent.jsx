'use client';

import {useContext} from 'react';
/* import { FooterContentContext } from '@/context/footerContentContext'; */

const useFooterContent = () => {
  const {
    isFooterContentVisible,
    toggleIsFooterContentVisible,
    showFooterContent,
    hideFooterContent
  } = useContext(FooterContentContext);
  return {
    isFooterContentVisible,
    toggleIsFooterContentVisible,
    showFooterContent,
    hideFooterContent
  };
};

export default useFooterContent;
