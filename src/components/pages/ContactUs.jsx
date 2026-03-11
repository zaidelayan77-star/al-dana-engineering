import React from 'react';
import HeroPages from '../shared/HeroPages';
import ContactInformationSection from '../sections/ContactInformationSection';
import OurLocationSection from '../sections/OurLocationSection';
import ContactUsForm from '../sections/ContactUsForm';
import OurAdvantagesSection from '../sections/OurAdvantagesSection';
import ContactOurTeamSection from '../sections/ContactOurTeamSection';
import coverImg from '../../assets/images/1 (3).jpg';

const ContactUs = () => {
    return (
        <div className="w-full">
            <HeroPages
                image={coverImg}
                subtitle="GET IN TOUCH"
                title="CONTACT US"
                description="Let's Discuss Your Project Requirements"
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