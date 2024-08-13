import React from 'react'
import Banner from '../components/Banner'
import CategoryWiseProducts from '../components/Watch&Airbods/CategoryWiseProducts'
import VerticalProducts from "../components/OtherProducts/VerticalProducts"

const Home = () => {
  return (
    <div>
      <Banner/>
      <CategoryWiseProducts categoryName={"airpods"} heading={"Top's Airpods"}/>
      <CategoryWiseProducts categoryName={"watches"} heading={"Popular's Watches"}/>
      <VerticalProducts categoryName={"mobiles"} heading={"Mobiles"}/>
      <VerticalProducts categoryName={"mouse"} heading={"Mouses"}/>
      <VerticalProducts categoryName={"televisions"} heading={"Televisions"}/>
      <VerticalProducts categoryName={"camera"} heading={"Camera & Photography"}/>
      <VerticalProducts categoryName={"earphones"} heading={"Wired & Wireless Earphones"}/>
      <VerticalProducts categoryName={"speakers"} heading={"Blutooth Speakers"}/>
      <VerticalProducts categoryName={"refrigerator"} heading={"Refrigerator"}/>
      <VerticalProducts categoryName={"trimmers"} heading={"Trimmers"}/>

      
    </div>
  )
}

export default Home
