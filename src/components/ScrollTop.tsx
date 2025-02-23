import useSettingStore from '../stores/setting-store';
import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const ScrollTop = () => {
  const { color } = useSettingStore();
  const [isVisible, setIsVisible] = useState(false);

  const bgColor = color
    ? { backgroundColor: color }
    : { backgroundColor: '#D1D5DB' };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      {isVisible && (
        <button
          style={bgColor}
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-white dark:bg-[#878686b8]"
          onClick={scrollToTop}
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default ScrollTop;
