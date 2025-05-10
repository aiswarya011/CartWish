import React from 'react'
import HeroSection from './HeroSection'
import iphone from '../../assets/iphone-14-pro.webp';
import mac from '../../assets/mac-system-cut.jfif';
import FeaturedProducts from './FeaturedProducts'

const HomePage = () => {
    return (
        <div>
            <HeroSection
                title={'Buy Iphone 14 pro'}
                subTitle={'Experience the power of the latest Iphone 14 pro'}
                link={'/products'}
                image={iphone}>

            </HeroSection>

            <FeaturedProducts></FeaturedProducts>

            <HeroSection
                title={'Build the ultimate setup'}
                subTitle={'Experience the power of the latest Iphone 14 pro'}
                link={'/products'}
                image={mac}>
            </HeroSection>
        </div>
    )
}

export default HomePage
