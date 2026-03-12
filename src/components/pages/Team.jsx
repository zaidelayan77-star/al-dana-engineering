import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroPages from '../shared/HeroPages';
import ContactOurTeamSection from '../sections/ContactOurTeamSection';
import coverImg from '../../assets/images/1 (5).jpg';
import TeamSection from '../sections/TeamSection';

export default function Team() {
    const { t } = useTranslation();

    return (
        <div className="w-full">
            <HeroPages
                image={coverImg}
                subtitle={t('pages.team.subtitle')}
                title={t('pages.team.title')}
                description={t('pages.team.description')}
            />

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                    <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-3">
                        {t('team_page.label')}
                    </h3>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {t('team_page.title')}
                    </h2>
                    <p className="max-w-3xl mx-auto text-gray-500 text-lg leading-relaxed">
                        {t('team_page.desc')}
                    </p>
                    <div className="w-16 h-1 bg-[#E9B10C] mx-auto rounded-full mt-8"></div>
                </div>

                <TeamSection limit={50} showHeader={false} isFullPage={true} />
            </section>

            <ContactOurTeamSection />
        </div>
    );
}
