import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroPages from '../shared/HeroPages';
import ContactOurTeamSection from '../sections/ContactOurTeamSection';
import coverImg from '../../assets/images/new-images/مراجعة المخططات.png';
import EngineeringExperienceSection from '../sections/EngineeringExperienceSection';
import FeaturedProjectsSection from '../sections/FeaturedProjectsSection';
import ProjectCategoriesSection from '../sections/ProjectCategoriesSection';
import OurPartnersSection from '../sections/OurPartnersSection';

export default function Experience() {
    const { t } = useTranslation();

    return (
        <div className="w-full">
            <HeroPages
                image={coverImg}
                subtitle={t('pages.experience.subtitle')}
                title={t('pages.experience.title')}
                description={t('pages.experience.description')}
            />

            <EngineeringExperienceSection />
            <FeaturedProjectsSection />
            <ProjectCategoriesSection />
            <OurPartnersSection />
            <ContactOurTeamSection />
        </div>
    );
}