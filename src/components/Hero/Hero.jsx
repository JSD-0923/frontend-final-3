import React from 'react';
import Carousel from 'react-material-ui-carousel';
import HeroItem from '../HeroItem/HeroItem';
import { heroItems } from '../../assets/data/data';
export const Hero = () => {
  const carouselSettings = {
    navButtonsProps: {
      style: {
        display: "none",
      },
    },
    indicatorIconButtonProps: {
      style: {
        display: "none",
      },
    },
  };
  return (
    <Carousel {...carouselSettings}>
      {heroItems.map((item, index) => (
        <HeroItem key={index} {...item} />
      ))}
    </Carousel>
  );
};