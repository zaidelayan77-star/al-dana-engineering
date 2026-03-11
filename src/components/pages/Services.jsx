import React from 'react';
import HeroPages from '../shared/HeroPages';
import ContactOurTeamSection from '../sections/ContactOurTeamSection';
import coverImg from '../../assets/images/1 (1).jpg';
import WhatWeDoSection from '../sections/WhatWeDoSection';
import OurCoreServicesSection from '../sections/OurCoreServicesSection';
import OurProcessSection from '../sections/OurProcessSection';
import WhyChooseUsSection from '../sections/WhyChooseUsSection';
import SectorsSection from '../sections/SectorsSection';

export default function Services() {
    return (
        <div className="w-full">
            <HeroPages
                image={coverImg}
                subtitle="OUR EXPERTISE"
                title="SERVICES"
                description="Comprehensive testing and technical solutions."
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
