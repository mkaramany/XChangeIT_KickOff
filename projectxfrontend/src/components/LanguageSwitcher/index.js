import React from 'react';

import LanguageItem from './LanguageItem';
import languageData from './data';
import CustomScrollbars from 'util/CustomScrollbars';

const LanguageSwitcher = ({switchLanguage, handleRequestClose , setDefaultLanguage}) => {
  return (
    <CustomScrollbars className="messages-list language-list scrollbar" style={{height:  80}}>
      <ul className="list-unstyled">
        {languageData.map((language, index) => <LanguageItem key={index} language={language}
                                                             handleRequestClose={handleRequestClose}
                                                             switchLanguage={switchLanguage}
                                                             setDefaultLanguage={setDefaultLanguage}/>)}
      </ul>
    </CustomScrollbars>
  )
};

export default LanguageSwitcher;

