import clsx from "clsx";
import React, { useRef, Children, useEffect, useState } from "react";

import Style from "./Carousel.module.css";
import "./Carousel.css";
import CarouselScrollButtons from "./CarouselScrollButtons";
import { later } from "../../service/FunUtil";

type CarouselProps = {
  className: string;
  itemClassName: string;
  intersectionObserverMargin: string;
  intersectionObserverThreshold: number;
};

export type ElementWithOffsetLeft = Element & {offsetLeft:number};

const Carousel: React.FC<CarouselProps> = ({
  className,
  children,
  itemClassName,
  intersectionObserverMargin,
  intersectionObserverThreshold,
}) => {
  const container = useRef<HTMLDivElement | null>(null);
  const itemElts: ElementWithOffsetLeft[] = [];
  const [mounted, setMounted]= useState(false);

  useEffect ( ()=>{
    // l'intersection observer ne fonctionne pas bien si les éléments du carousel ne sont pas à la bonne taille
    // on attend avant de monter les boutons... Note : Fix possible si taille passée en paramètre et connue à l'avance...
    later(1500).then (()=>{
      setMounted(true);
    })
  },[])

  return (
    <div className={clsx(Style.Carousel, className)}>
      {mounted && <CarouselScrollButtons
        container={container}
        itemElts={itemElts}
        intersectionObserverMargin={intersectionObserverMargin}
        intersectionObserverThreshold={intersectionObserverThreshold}
      />}
      <div className={clsx(Style.ScrollContainer, "disable-scrollbars")} ref={container}>
        <div className={clsx(Style.ItemsContainer)}>
          {Children.map(children, (item, i) => (
            <div
              key={i}
              className={clsx(Style.Item, itemClassName ? itemClassName : Style.ItemDefault)}
              ref={(elt) => itemElts.push(elt!)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
