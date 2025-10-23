import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import "./App.css";
import localPicture from './assets/picture.jpg';
import localVideo from './assets/video.mp4';

const MEDIA_ITEMS = [
  { type: 'image', src: 'https://cdn.culture.ru/images/84b49e0a-d50a-525a-b0cd-c3f5e06ef0da' },
  { type: 'image', src: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e6d9e861-5e3e-4bd1-bd35-9ea5086af752/dieg9eq-8b19d972-11e2-4875-8be6-9cc3f68b9065.jpg/v1/fill/w_1131,h_707,q_70,strp/e2092a2bba26bc1aad412fadc70188ea_by_olivia12111_dieg9eq-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODAwIiwicGF0aCI6IlwvZlwvZTZkOWU4NjEtNWUzZS00YmQxLWJkMzUtOWVhNTA4NmFmNzUyXC9kaWVnOWVxLThiMTlkOTcyLTExZTItNDg3NS04YmU2LTljYzNmNjhiOTA2NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.4mG32ueEa5ZPsYdkwnqXp6VlXzUvZVBr8Bk4IxFONx8' },
  { type: 'image', src: 'https://99px.ru/sstorage/53/2025/03/tmb_368375_826994.jpg' },
  { type: 'image', src: localPicture },
  { type: 'video', src: localVideo },
];

function App() {
  const swiperRef = useRef<SwiperType | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  useEffect(() => {
    const handleSlideChange = () => {
      if (!swiperRef.current) return;

      const activeIndex = swiperRef.current.realIndex;
      const currentItem = MEDIA_ITEMS[activeIndex];

      // Останавливаем автоплей для видео слайдов
      if (currentItem.type === 'video') {
        swiperRef.current.autoplay.stop();
        
        const videoElement = videoRefs.current[activeIndex];
        if (videoElement) {
          videoElement.currentTime = 0;
          videoElement.play();
        }
      } else {
        // Возобновляем автоплей для изображений
        swiperRef.current.autoplay.start();
      }
    };

    if (swiperRef.current) {
      swiperRef.current.on('slideChange', handleSlideChange);
    }

    return () => {
      if (swiperRef.current) {
        swiperRef.current.off('slideChange', handleSlideChange);
      }
    };
  }, []);

  const handleVideoEnd = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
      swiperRef.current.autoplay.start();
    }
  };

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
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {MEDIA_ITEMS.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="slide-content">
              {item.type === 'image' ? (
                <img src={item.src} alt={`Slide ${index + 1}`} />
              ) : (
                <video 
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={item.src} 
                  muted 
                  playsInline
                  onEnded={handleVideoEnd}
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default App;
