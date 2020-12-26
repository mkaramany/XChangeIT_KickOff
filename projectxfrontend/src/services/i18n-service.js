import languageData from '../components/LanguageSwitcher/data';

export const getUserLocale = (authUser) => {

    let locale = {
        languageId: 'english',
        locale: 'en',
        name: 'English',
        icon: 'us'
    };

    languageData.map((language, index) => {
        if (language.locale === authUser.defaultLanguage) {
            locale = language;
        }
    });

    return locale;

}