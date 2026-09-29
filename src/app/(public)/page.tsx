import React from 'react'
import HeroSection from './_components/home/hero-section';
import ImpactSection from './_components/home/impact-section';
import ProblemSection from './_components/home/problem-section';
import SolutionSection from './_components/home/solution-section';
import FeaturesSection from './_components/home/features-section';
import HowItWorksSection from './_components/home/how-it-works-section';
import BloodGroupsSection from './_components/home/blood-groups-section';
import EmergencySection from './_components/home/emergency-section';
import DonorSection from './_components/home/donor-section';
import TestimonialsSection from './_components/home/testimonials-section';
import FaqSection from './_components/home/faq-section';
import CtaSection from './_components/home/cta-section';

function HomePage() {
    return (
        <>
            <HeroSection />
            <ImpactSection />
            <ProblemSection />
            <SolutionSection />
            <FeaturesSection />
            <HowItWorksSection />
            <BloodGroupsSection />
            <EmergencySection />
            <DonorSection />
            <TestimonialsSection />
            <FaqSection />
            <CtaSection />

        </>
    )
}

export default HomePage
