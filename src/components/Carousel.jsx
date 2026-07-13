'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext';
import Link from 'next/link';

export default function Carousel() {
  const { locale, t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);

  const slides = [
    {
      image: "/first_carousle.png",
      heading: "Quality Healthcare You Can Trust",
      description: "Providing compassionate, affordable healthcare for our community every day.",
      buttons: [
        { text: "Book Appointment", link: "/portal", primary: true },
        { text: "Find a Department", link: "/departments", primary: false }
      ]
    },
    {
      image: "/second_carousle.png",
      heading: "24/7 Emergency Care",
      description: "Immediate medical attention whenever you need it most.",
      buttons: [
        { text: "Emergency Contacts", link: "/contact#emergency-contacts", primary: true },
        { text: "Get Directions", link: "/contact#directions", primary: false }
      ]
    },
    {
      image: "/third_carousle.png",
      heading: "Community Health Outreach",
      description: "Bringing free screenings, vaccinations, and healthcare closer to your community.",
      buttons: [
        { text: "View Programs", link: "/#news-updates", primary: true },
        { text: "Learn More", link: "/patient-info", primary: false }
      ]
    },
    {
      image: "/fourth_carousle.png",
      heading: "Modern Medical Services",
      description: "Advanced diagnostics, specialist clinics, surgery, maternity, and emergency care in one place.",
      buttons: [
        { text: "Explore Services", link: "/departments", primary: true },
        { text: "Contact Us", link: "/contact", primary: false }
      ]
    }
  ];

  const startAutoPlay = () => {
    stopAutoPlay();
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
  };

  const stopAutoPlay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const handlePrev = () => {
    stopAutoPlay();
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    startAutoPlay();
  };

  const handleNext = () => {
    stopAutoPlay();
    setActiveIndex((prev) => (prev + 1) % slides.length);
    startAutoPlay();
  };

  const handleDotClick = (index) => {
    stopAutoPlay();
    setActiveIndex(index);
    startAutoPlay();
  };

  return (
    <div 
      className="hero-container"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      {slides.map((slide, idx) => (
        <div 
          key={idx} 
          className={`carousel-slide ${idx === activeIndex ? 'active' : ''}`}
        >
          {/* Fallback color when image is loading */}
          <div style={{ position: 'absolute', inset: 0, backgroundColor: '#0f172a' }}></div>
          <img 
            src={slide.image} 
            alt={slide.heading} 
            className="carousel-img"
          />
          <div className="carousel-overlay">
            <div className="container">
              <div className="carousel-content">
                <h1>{slide.heading}</h1>
                <p>{slide.description}</p>
                <div className="carousel-buttons">
                  {slide.buttons.map((btn, bIdx) => (
                    <Link 
                      key={bIdx} 
                      href={btn.link} 
                      className={`btn ${btn.primary ? 'btn-primary' : 'btn-outline'}`}
                      style={btn.primary ? {} : { color: '#FFFFFF', borderColor: '#FFFFFF' }}
                    >
                      {btn.text}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button 
        className="carousel-arrow carousel-prev" 
        onClick={handlePrev}
        aria-label="Previous Slide"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>
      <button 
        className="carousel-arrow carousel-next" 
        onClick={handleNext}
        aria-label="Next Slide"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="carousel-dots">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`carousel-dot ${idx === activeIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            aria-current={idx === activeIndex}
          />
        ))}
      </div>
    </div>
  );
}
