import React from 'react';
import HeroPages from '../shared/HeroPages';
import ContactOurTeamSection from '../sections/ContactOurTeamSection';
import coverImg from '../../assets/images/1 (5).jpg';
import EngineeringExperienceSection from '../sections/EngineeringExperienceSection';
import FeaturedProjectsSection from '../sections/FeaturedProjectsSection';
import ProjectCategoriesSection from '../sections/ProjectCategoriesSection';
import OurPartnersSection from '../sections/OurPartnersSection';

export default function Experience() {
    return (
        <div className="w-full">
            <HeroPages
                image={coverImg}
                subtitle="EXPERIENCE"
                title="EXPERIENCE"
                description="Let's Discuss Your Project Requirements"
            />

            <EngineeringExperienceSection />
            <FeaturedProjectsSection />
            <ProjectCategoriesSection />
            <OurPartnersSection />
            <ContactOurTeamSection />
        </div>
    );
}