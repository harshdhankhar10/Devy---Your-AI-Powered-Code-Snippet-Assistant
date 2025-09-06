import Footer from '@/components/Footer'
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
            <Footer />
        </>
    )
}

export default Homepage