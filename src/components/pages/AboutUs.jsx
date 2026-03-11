import React from 'react';
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
    return (
        <div className="w-full">
            <HeroPages
                image={coverImg}
                subtitle="WHO WE ARE"
                title="ABOUT US"
                description="Leading the way in engineering excellence and material testing."
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