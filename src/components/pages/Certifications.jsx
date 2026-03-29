import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroPages from '../shared/HeroPages';
import coverImg from '../../assets/images/new-images/2.png';
import CertificationsIntro from '../sections/CertificationsIntro';
import QualityStandardsSection from '../sections/QualityStandardsSection';
import CertificatesGallery from '../sections/CertificatesGallery';
import ContactOurTeamSection from '../sections/ContactOurTeamSection';


export default function Certifications() {
    const { t } = useTranslation();

    return (
        <div className="w-full">
            <HeroPages
                image={coverImg}
                subtitle={t('pages.certifications.subtitle')}
                title={t('pages.certifications.title')}
                description={t('pages.certifications.description')}
            />

            <CertificationsIntro />
            <QualityStandardsSection />
            <CertificatesGallery />
            <ContactOurTeamSection />
        </div>
    );
}