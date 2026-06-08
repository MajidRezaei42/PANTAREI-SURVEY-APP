// src/i18n/LanguageContext.js
// App-wide language state. Lets any screen read the current language
// and switch it at any time (requirement #2).

import React, { createContext, useContext, useState } from 'react';
import { t as translate } from './translations';

const LanguageContext = createContext({
  lang: 'EN',
  setLang: () => {},
  t: (k) => k,
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('EN');
  // t bound to current language so screens can call t('key') directly
  const t = (key) => translate(key, lang);
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
