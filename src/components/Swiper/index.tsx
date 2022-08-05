import React, { FC, useEffect } from 'react';
import Swiper from 'swiper/bundle';
import imgURL from '../../lib/imgURL';
import Props from './typing';
import 'swiper/swiper-bundle.css';
import './style.scss';

const Index: FC<Props> = () => {
  useEffect(() => {
    new Swiper('.specialsDiscoverability', {
      slidesPerView: 1,
      spaceBetween: 0,
      breakpoints: {
        474: {
          slidesPerView: 1,
        },
      },
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }, []);
  return (
    <React.Fragment>
      <div className='specialsDiscoverability swiper-container'>
        <ul className='swiper-wrapper'>
          <li className='swiper-slide'>
            <div className='payment-details-section'>
              <img src={imgURL['vectoe-img1']} alt='vectoe-img1.svg' />
            </div>
            <h3>Welcome to Plural</h3>
            <p>
              Control your payments ecosystem with our orchestration platform
            </p>
          </li>
          <li className='swiper-slide'>
            <div className='payment-details-section'>
              <img src={imgURL['vectoe-img2']} alt='vectoe-img2.svg' />
            </div>
            <h3>Welcome to Plural</h3>
            <p>
              Achieve highest transaction success rates across platforms with
              our intelligent ML-based routing
            </p>
          </li>
          <li className='swiper-slide'>
            <div className='payment-details-section'>
              <img src={imgURL['vectoe-img3']} alt='vectoe-img3.svg' />
            </div>
            <h3>Welcome to Plural</h3>
            <p>
              Allow customers to speed through their checkout process with our
              PCI-DSS compliant card vault
            </p>
          </li>
          <li className='swiper-slide'>
            <div className='payment-details-section'>
              <img src={imgURL['vectoe-img4']} alt='vectoe-img4.svg' />
            </div>
            <h3>Welcome to Plural</h3>
            <p>
              Integrate and manage all your payment gateways and methods with
              our restful APIs
            </p>
          </li>
        </ul>
        <div className='swiper-pagination'></div>
      </div>
    </React.Fragment>
  );
};

export default Index;
