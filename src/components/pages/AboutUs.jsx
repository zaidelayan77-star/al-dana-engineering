import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroPages from '../shared/HeroPages';
import ContactOurTeamSection from '../sections/ContactOurTeamSection';
import coverImg from '../../assets/images/new-images/مراجعة المخططات.png';
import OurPeople from '../sections/OurPeople';
import OurJourneySection from '../sections/OurJourneySection';
import MissionAndVisionSection from '../sections/MissionAndVisionSection';
import WhoWeAreSection from '../sections/WhoWeAreSection';
import CertificationsSection from '../sections/CertificationsSection';
import OurCommitmentSection from '../sections/OurCommitmentSection';
import TeamSection from '../sections/TeamSection';

export default function AboutUs() {
    const { t } = useTranslation();

    return (
        <div className="w-full">
            <HeroPages
                image={coverImg}
                subtitle={t('pages.about.subtitle')}
                title={t('pages.about.title')}
                description={t('pages.about.description')}
            />
            <WhoWeAreSection />
            <OurJourneySection />
            <MissionAndVisionSection />
            <OurPeople />
            <TeamSection limit={4} />
            <CertificationsSection />
            <OurCommitmentSection />
            <ContactOurTeamSection />
        </div>
    );
}