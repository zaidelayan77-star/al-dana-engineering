import React from 'react';
import HeroPages from '../shared/HeroPages';
import coverImg from '../../assets/images/1 (4).jpg';
import CertificationsIntro from '../sections/CertificationsIntro';
import QualityStandardsSection from '../sections/QualityStandardsSection';
import CertificatesGallery from '../sections/CertificatesGallery';
import ContactOurTeamSection from '../sections/ContactOurTeamSection';


export default function Certifications() {
    return (
        <div className="w-full">
            <HeroPages
                image={coverImg}
                subtitle="QUALITY & EXCELLENCE"
                title="CERTIFICATIONS"
                description="Our commitment to international standards and quality assurance."
            />

            <CertificationsIntro />
            <QualityStandardsSection />
            <CertificatesGallery />
            <ContactOurTeamSection />
        </div>
    );
}