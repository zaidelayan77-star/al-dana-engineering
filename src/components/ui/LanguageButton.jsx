import { useTranslation } from 'react-i18next';

export default function LanguageButton() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <button 
            onClick={toggleLanguage}
            className="focus:outline-none transition-transform hover:scale-110 hover:text-[#C39B3E] flex items-center gap-2"
            title={i18n.language === 'en' ? 'Switch to Arabic' : 'تغيير للإنجليزية'}
        >
            <span className="text-sm font-bold uppercase">
                {i18n.language === 'en' ? 'AR' : 'EN'}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
        </button>
    );
}