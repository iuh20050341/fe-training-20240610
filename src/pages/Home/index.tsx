import React from 'react';
import BannerSlide from '../../components/Banner/index.tsx'
import Content from '../../components/Content/index.tsx';
const images1 = [
  'https://cdn0.fahasa.com/media/magentothem/banner7/DoChoiT624-slide_-smallbanner_Slide_840x320.png?text=Slide+1',
  'https://cdn0.fahasa.com/media/magentothem/banner7/Summersale_0624_ldp_840x320_DealHot.jpg?text=Slide+2',
  'https://cdn0.fahasa.com/media/magentothem/banner7/NCC_0624_HuyHoang_Slide_840x320_1.png?text=Slide+3',
];
const images2 = [
  'https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2024/NCC_0624_ThienLong_Smallbanner_310x210.png',
  'https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2024/NgoaiVanT6_310x210.jpg',
  'https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2024/BachHoa_SmallBanner_310x210.jpg',
  'https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2024/NCC_0624_HuyHoang_Smallbanner_310x210.png'
];
const Home = () => {

  return (
    <div className='home' style={{}}>
      <div className='banner' style={{}}>
        <BannerSlide time={3000} imgList1 = {images1} imgList2 ={images2}/>
      </div>
      <div className='content' style={{}}>
        <Content />
      </div>
    </div>
  );  
};

export default Home;
