'use client';

import { useState, useEffect } from 'react';

type Banner = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
};

const banners: Banner[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=400&fit=crop',
    title: '遇见你的灵魂伴侣',
    subtitle: '加入百万用户，开启你的恋爱之旅',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=400&fit=crop',
    title: 'Soul测试',
    subtitle: '了解自己，找到最适合的TA',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=400&fit=crop',
    title: '同城活动',
    subtitle: '线下见面，真实社交',
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-48 md:h-64 overflow-hidden rounded-xl mb-6">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
            <div>
              <h2 className="text-white text-2xl font-bold mb-1">{banner.title}</h2>
              <p className="text-white/80 text-sm">{banner.subtitle}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === current ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
