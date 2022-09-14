import React, { useState, useCallback } from "react";
import useInterval from "../../hooks/useInterval";
import {
  Banner,
  SlideButton,
  SlideItems,
  SlideWrapper,
  SwiperWrapper,
  Swiper,
  BannerCount,
} from "./styles";

const slides = [
  {
    src: "https://product-image.kurly.com/cdn-cgi/image/format=auto/banner/main/pc/img/8e55ed8b-fb13-448d-9f45-991bf99f9582.jpg",
  },
  {
    src: "https://product-image.kurly.com/cdn-cgi/image/format=auto/banner/main/pc/img/ed361f44-210a-4747-97b4-b61d2233b762.jpg",
  },
  {
    src: "https://product-image.kurly.com/cdn-cgi/image/format=auto/banner/main/pc/img/d5dcd4e4-9a54-427e-9282-e16ae5fc911e.jpg",
  },
  {
    src: "https://product-image.kurly.com/cdn-cgi/image/format=auto/banner/main/pc/img/60e2eaf4-6e56-45fb-ad3b-2f2a76f19dbc.jpg",
  },
  {
    src: "https://product-image.kurly.com/cdn-cgi/image/format=auto/banner/main/pc/img/bb6b5057-b7a4-4870-b4de-de192729c085.jpg",
  },
  {
    src: "https://product-image.kurly.com/cdn-cgi/image/format=auto/banner/main/pc/img/ca8b5770-3919-48e5-b14b-66a4d0714d30.jpg",
  },
  {
    src: "https://product-image.kurly.com/cdn-cgi/image/format=auto/banner/main/pc/img/2806b7dc-8812-4cb1-8b19-51da8aec8630.jpg",
  },
  {
    src: "https://product-image.kurly.com/cdn-cgi/image/format=auto/banner/main/pc/img/c352412a-e328-4e46-9286-4bc8c46d1860.jpg",
  },
];

const MainBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stopInterval, setStopInterval] = useState(false);

  const handleSwipe = (direction) => {
    if (currentIndex + direction === slides.length) {
      setCurrentIndex(0);
    } else if (currentIndex + direction < 0) {
      setCurrentIndex(slides.length - 1);
    } else {
      setCurrentIndex((currentIndex) => currentIndex + direction);
    }
  };

  const onMouseEnter = useCallback(() => {
    setStopInterval(true);
  }, []);
  const onMouseLeave = useCallback(() => {
    setStopInterval(false);
  }, []);

  const onMouseDown = useCallback(() => {
    setStopInterval(true);
  }, []);
  const onMouseUp = useCallback(() => {
    setStopInterval(false);
  }, []);

  useInterval(
    () => {
      if (currentIndex === slides.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    },
    stopInterval ? null : 2000
  );

  return (
    <Banner>
      <SwiperWrapper>
        <Swiper>
          <SlideButton
            direction="prev"
            onClick={() => handleSwipe(-1)}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          ></SlideButton>
          <SlideButton
            direction="next"
            onClick={() => handleSwipe(1)}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          ></SlideButton>
          <SlideWrapper
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{
              transform: `translateX(${currentIndex * -100}%) `,
            }}
          >
            {slides.map((list, idx) => {
              return (
                <SlideItems key={idx}>
                  <img src={list.src} alt="배너이미지" />
                </SlideItems>
              );
            })}
          </SlideWrapper>
        </Swiper>
        <BannerCount>
          {currentIndex + 1} / {slides.length}
        </BannerCount>
      </SwiperWrapper>
    </Banner>
  );
};

export default MainBanner;
