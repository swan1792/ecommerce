import React from 'react'
import Hero from '../components/Hero';
import LatestCollections from '../components/LatestCollections';
import BestSellers from '../components/BestSellers';
import Policy from '../components/Policy';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollections/>
      <BestSellers text1={"Best"} text2={"Sellers"} />
      <Policy/>
      <Newsletter/>
      <Footer />
    </div>
  )
}

export default Home