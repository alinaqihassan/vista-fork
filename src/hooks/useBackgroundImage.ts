import { useEffect, useState } from 'react';
import { BACKGROUND_IMAGES } from '@/constants/backgrounds';

const useBackgroundImage = (): { imageUrl: string; photoLink: string } => {
  const [background, setBackground] = useState<{
    imageUrl: string;
    photoLink: string;
  }>(() => {
    // Initialize with cached image to prevent flash
    const cached = localStorage.getItem('backgroundImage');
    return cached ? JSON.parse(cached) : { imageUrl: '', photoLink: '' };
  });

  useEffect(() => {
    const day = new Date().getDay();
    const dayOfWeek = (day + 6) % 7;
    const backgroundData = BACKGROUND_IMAGES[dayOfWeek];

    if (backgroundData) {
      const imageUrl = `/images/${backgroundData.image}`;
      
      const img = new Image();
      img.onload = () => {
        const newBackground = {
          imageUrl,
          photoLink: backgroundData.link,
        };
        setBackground(newBackground);
        localStorage.setItem('backgroundImage', JSON.stringify(newBackground));
      };
      img.onerror = () => {
        setBackground({
          imageUrl,
          photoLink: backgroundData.link,
        });
      };
      img.src = imageUrl;
    }
  }, []);

  return background;
};

export default useBackgroundImage;
