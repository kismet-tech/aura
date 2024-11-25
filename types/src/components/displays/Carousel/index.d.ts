import React from "react";
import "swiper/css";
import "swiper/css/navigation";
export interface CarouselProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    itemKey: (item: T, index: number) => string | number;
    spaceBetween?: number;
    slidesPerView?: number | "auto";
    interItemComponent?: React.ReactNode;
}
export declare function Carousel<T>({ items, renderItem, itemKey, spaceBetween, slidesPerView, interItemComponent, }: CarouselProps<T>): React.JSX.Element | null;
