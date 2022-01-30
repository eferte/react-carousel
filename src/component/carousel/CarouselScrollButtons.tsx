import clsx from "clsx";
import { useState, useEffect } from "react";
import useIntersectionObservers from "../../hook/useIntersectionObservers";

import smoothscroll from "smoothscroll-polyfill";
import Style from "./CarouselScrollButtons.module.css";
import { ElementWithOffsetLeft } from "./Carousel";

// smooth scroll polyfill
smoothscroll.polyfill();

const SCROLL_BUTTON_HEIGHT = 30;

const scrollTo = (container: any, position: number) =>
  container?.scrollTo({
    left: position || 0,
    behavior: "smooth",
  });

type CarouselScrollButtonsProps = {
  container: React.MutableRefObject<HTMLDivElement | null>;
  itemElts: ElementWithOffsetLeft[];
  intersectionObserverMargin: string;
  intersectionObserverThreshold: number;
};

const CarouselScrollButtons: React.FC<CarouselScrollButtonsProps> = ({
  container,
  itemElts,
  intersectionObserverMargin = "10%" /* or (top, right, bottom, left) values*/,
  intersectionObserverThreshold = 0.90,
}) => {
  const getVisibleItems: any = useIntersectionObservers(
    itemElts,
    container.current,
    intersectionObserverMargin,
    intersectionObserverThreshold
  );
  const visibleItems = getVisibleItems();
  const [previousEnabled, setPreviousEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);

  useEffect(() => {
    const first = itemElts[0];
    const last = itemElts[itemElts.length - 1];
    setNextEnabled(itemElts.length > 1 && visibleItems.indexOf(last) === -1);
    setPreviousEnabled(itemElts.length > 1 && visibleItems.indexOf(first) === -1);
  }, [visibleItems, itemElts]);

  const handlePreviousButtonClick = () => {
    const visibleItems = getVisibleItems();
    const previousItem = itemElts[Math.max(0, itemElts.indexOf(visibleItems[0]) - visibleItems.length)];
    scrollTo(container.current, previousItem?.offsetLeft);
  };

  const handleNextButtonClick = () => {
    const visibleItems = getVisibleItems();
    const nextItemIndex = Math.min(itemElts.indexOf(visibleItems[0]) + visibleItems.length, itemElts.length - 1);
    const lastVisibleItem = itemElts[nextItemIndex];
    scrollTo(container.current, lastVisibleItem?.offsetLeft);
  };

  return (
    container.current && (
      <>
        <div className={clsx(Style.BorderLeft, !previousEnabled && Style.BorderDisabled)} />
        <div className={clsx(Style.BorderRight, !nextEnabled && Style.BorderDisabled)} />
        <div
          className={clsx(Style.ScrollButtons)}
          style={{ top: container.current.clientHeight / 2 - SCROLL_BUTTON_HEIGHT + "px" }}
        >
          <div
            onClick={handlePreviousButtonClick}
            className={clsx(Style.PreviousButton, previousEnabled ? null : Style.PreviousButtonDisabled)}
          >
            <span className="icon" style={{ color: "white" }}>
              <i className="fas fa-chevron-left"></i>
            </span>
          </div>
          <div
            onClick={handleNextButtonClick}
            className={clsx(Style.NextButton, nextEnabled ? null : Style.NextButtonDisabled)}
          >
            <span className="icon" style={{ color: "white" }}>
              <i className="fas fa-chevron-right"></i>
            </span>
          </div>
        </div>
      </>
    )
  );
};

export default CarouselScrollButtons;
