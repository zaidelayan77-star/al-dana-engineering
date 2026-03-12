import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroPages from '../shared/HeroPages';
import ContactInformationSection from '../sections/ContactInformationSection';
import OurLocationSection from '../sections/OurLocationSection';
import ContactUsForm from '../sections/ContactUsForm';
import OurAdvantagesSection from '../sections/OurAdvantagesSection';
import ContactOurTeamSection from '../sections/ContactOurTeamSection';
import coverImg from '../../assets/images/1 (3).jpg';

const ContactUs = () => {
    const { t } = useTranslation();

    return (
        <div className="w-full">
            <HeroPages
                image={coverImg}
                subtitle={t('pages.contact.subtitle')}
                title={t('pages.contact.title')}
                description={t('pages.contact.description')}
            />
            <ContactInformationSection />
            <ContactUsForm />
            <OurLocationSection />
            <OurAdvantagesSection />
            <ContactOurTeamSection/>
        </div>
    );
};

export default ContactUs;