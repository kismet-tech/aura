import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemKey: (item: T, index: number) => string | number;
  spaceBetween?: number;
  slidesPerView?: number | "auto";
  interItemComponent?: React.ReactNode;
}

export function Carousel<T>({
  items,
  renderItem,
  itemKey,
  spaceBetween = 16,
  slidesPerView = "auto",
  interItemComponent,
}: CarouselProps<T>) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<any>(null); // Swiper instance

  const slides: React.ReactNode[] = [];
  const [showControls, setShowControls] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  items.forEach((item, index) => {
    slides.push(
      <SwiperSlide
        key={itemKey(item, index)}
        className="!w-64 sm:!w-72 md:!w-80 h-full min-h-full"
      >
        {renderItem(item, index)}
      </SwiperSlide>
    );

    if (interItemComponent && index < items.length - 1) {
      slides.push(
        <SwiperSlide
          key={`inter-${index}`}
          className="!w-auto h-full min-h-full flex items-center justify-center"
        >
          {interItemComponent}
        </SwiperSlide>
      );
    }
  });

  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.params &&
      swiperRef.current.params.navigation &&
      prevRef.current &&
      nextRef.current
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;

      swiperRef.current.navigation.destroy(); // Destroy navigation to re-initialize
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, [swiperRef, prevRef, nextRef]);

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Set new timeout to hide controls after 3 seconds
      timeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };

    // Add event listener
    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="w-full h-full relative">
      {/* Custom Navigation Buttons */}
      <button
        ref={prevRef}
        aria-label="Previous Slide"
        className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        ref={nextRef}
        aria-label="Next Slide"
        className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <Swiper
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        grabCursor={true}
        loop={false}
        modules={[Navigation]}
        autoHeight={false}
        className="mt-4 w-full h-full"
        onSwiper={(swiper: SwiperClass) => {
          swiperRef.current = swiper;
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
      >
        {slides}
      </Swiper>
    </div>
  );
}
