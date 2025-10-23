import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import "./App.css";

const IMAGE_URLS = [
  'https://cdn.culture.ru/images/84b49e0a-d50a-525a-b0cd-c3f5e06ef0da',
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e6d9e861-5e3e-4bd1-bd35-9ea5086af752/dieg9eq-8b19d972-11e2-4875-8be6-9cc3f68b9065.jpg/v1/fill/w_1131,h_707,q_70,strp/e2092a2bba26bc1aad412fadc70188ea_by_olivia12111_dieg9eq-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODAwIiwicGF0aCI6IlwvZlwvZTZkOWU4NjEtNWUzZS00YmQxLWJkMzUtOWVhNTA4NmFmNzUyXC9kaWVnOWVxLThiMTlkOTcyLTExZTItNDg3NS04YmU2LTljYzNmNjhiOTA2NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.4mG32ueEa5ZPsYdkwnqXp6VlXzUvZVBr8Bk4IxFONx8',
  'https://99px.ru/sstorage/53/2025/03/tmb_368375_826994.jpg',
];

function App() {
  return (
    <div className="slider-container">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        speed={800}
        className="fullscreen-swiper"
      >
        {IMAGE_URLS.map((url, index) => (
          <SwiperSlide key={index}>
            <div className="slide-content">
              <img src={url} alt={`Slide ${index + 1}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default App;
