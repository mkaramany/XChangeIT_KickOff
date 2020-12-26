import React from 'react';


const LanguageItem = ({language, switchLanguage, handleRequestClose, setDefaultLanguage}) => {
  const {icon, name} = language;
  return (
    <li className="pointer" onClick={() => {
      handleRequestClose();
      switchLanguage(language);
      setDefaultLanguage(language);
    }}>
      <div className="d-flex align-items-center">
        <i className={`flag flag-24 flag-${icon}`}/>
        <h4 className="mb-0 ml-2">{name}</h4>
      </div>
    </li>
  );
};

export default LanguageItem;
