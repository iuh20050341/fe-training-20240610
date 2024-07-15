import React from "react";
import BannerSlide from "../../components/Banner/index.tsx";
import Content from "../../components/Content/index.tsx";
const images1 = [
  "https://cdn0.fahasa.com/media/magentothem/banner7/DoChoiT624-slide_-smallbanner_Slide_840x320.png?text=Slide+1",
  "https://cdn0.fahasa.com/media/magentothem/banner7/Summersale_0624_ldp_840x320_DealHot.jpg?text=Slide+2",
  "https://cdn0.fahasa.com/media/magentothem/banner7/NCC_0624_HuyHoang_Slide_840x320_1.png?text=Slide+3",
];
const images2 = [
  "https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2024/NCC_0624_ThienLong_Smallbanner_310x210.png",
  "https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2024/NgoaiVanT6_310x210.jpg",
  "https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2024/BachHoa_SmallBanner_310x210.jpg",
  "https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2024/NCC_0624_HuyHoang_Smallbanner_310x210.png",
];
const images3 = [
  {
    url: "https://cdn0.fahasa.com/media/wysiwyg/Thang-07-2024/IconT7_Sale Năm Học Mới_120x120.png",
    title: "Back To School",
  },
  {
    url: "https://cdn0.fahasa.com/media/wysiwyg/Thang-07-2024/IconT7_Logo NCC_ZenBooks_120x120.png",
    title: "Zen Books",
  },
  {
    url: "https://cdn0.fahasa.com/media/wysiwyg/Thang-05-2024/Icon_GiamGia_120x120.png",
    title: "Product Sale",
  },
  {
    url: "https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_FlashSale_Thuong_120x120.png",
    title: "Flash Sale",
  },
  {
    url: "https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_SanPhamMoi_8px_1.png",
    title: "New Product",
  },
  {
    url: "https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_MaGiamGia_8px_1.png",
    title: "Voucher",
  },
];
const Home = () => {
  return (
    <div className="home" style={{}}>
      <div className="banner" style={{}}>
        <BannerSlide
          time={3000}
          imgList1={images1}
          imgList2={images2}
          imgList3={images3}
        />
      </div>
      <div className="content" style={{}}>
        <Content />
      </div>
    </div>
  );
};

export default Home;
