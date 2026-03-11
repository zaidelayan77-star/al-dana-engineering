import React from 'react';
import HeroPages from '../shared/HeroPages';
import ContactOurTeamSection from '../sections/ContactOurTeamSection';
import coverImg from '../../assets/images/1 (5).jpg';
import TeamSection from '../sections/TeamSection';

export default function Team() {
    return (
        <div className="w-full">
            <HeroPages
                image={coverImg}
                subtitle="OUR EXPERTISE"
                title="OUR TEAM"
                description="The professionals behind Al Dana Engineering Laboratories."
            />

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                    <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-3">
                        TEAM MEMBERS
                    </h3>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        Our Professionals & Specialists
                    </h2>
                    <p className="max-w-3xl mx-auto text-gray-500 text-lg leading-relaxed">
                        We pride ourselves on having a team of dedicated professionals who are committed to precision and engineering excellence. Meet the experts who make Al Dana possible.
                    </p>
                    <div className="w-16 h-1 bg-[#E9B10C] mx-auto rounded-full mt-8"></div>
                </div>

                <TeamSection limit={50} showHeader={false} isFullPage={true} />
            </section>

            <ContactOurTeamSection />
        </div>
    );
}
