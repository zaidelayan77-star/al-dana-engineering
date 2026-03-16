import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroPages from '../shared/HeroPages';
import ContactOurTeamSection from '../sections/ContactOurTeamSection';
import coverImg from '../../assets/images/new-images/hf_20260311_101625_53c3f7e5-d981-42a4-9889-dc51ecd4e8eb.jpeg';
import WhatWeDoSection from '../sections/WhatWeDoSection';
import OurCoreServicesSection from '../sections/OurCoreServicesSection';
import OurProcessSection from '../sections/OurProcessSection';
import WhyChooseUsSection from '../sections/WhyChooseUsSection';
import SectorsSection from '../sections/SectorsSection';

export default function Services() {
    const { t } = useTranslation();

    return (
        <div className="w-full">
            <HeroPages
                image={coverImg}
                subtitle={t('pages.services.subtitle')}
                title={t('pages.services.title')}
                description={t('pages.services.description')}
            />
            <WhatWeDoSection />
            <OurCoreServicesSection />
            <OurProcessSection />
            <WhyChooseUsSection />
            <SectorsSection />
            <ContactOurTeamSection />
        </div>
    );
}
