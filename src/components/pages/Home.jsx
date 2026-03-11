import React from 'react';
import HomeHero from '../sections/HomeHero';
import WhoWeAreHome from '../sections/WhoWeAreHome';
import OurServicesHome from '../sections/OurServicesHome';
import FeaturedProjectsSection from '../sections/FeaturedProjectsSection';
import OurTrackRecord from '../sections/OurTrackRecord';
import QualityAssurance from '../sections/QualityAssurance';
import OurCommitmentHoemSection from '../sections/OurCommitmentHoemSection';

export default function Home() {
  return (
    <>
      <HomeHero />
      <WhoWeAreHome />
      <OurServicesHome />
      <FeaturedProjectsSection />
      <OurTrackRecord />
      <QualityAssurance />
      <OurCommitmentHoemSection />
    </>
  );
}