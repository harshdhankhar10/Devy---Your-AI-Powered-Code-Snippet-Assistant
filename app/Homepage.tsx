import Footer from '@/components/Footer'
import CTASection from '@/components/homepage/CTASection'
import FeaturesSection from '@/components/homepage/FeaturesSection'
import HeroSection from '@/components/homepage/HeroSection'
import HowItWorks from '@/components/homepage/HowItWorks'
import Navbar from '@/components/Navbar'
import React from 'react'

const Homepage = () => {
    return (
        <>
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <HowItWorks />
            <CTASection />
            <Footer />
        </>
    )
}

export default Homepage