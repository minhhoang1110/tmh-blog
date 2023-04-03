import { useEffect, useState } from "react";

const ScrollToTop: React.FC = () => {
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  useEffect(() => {
    const onScroll = () => {
      const currentPosition = window.pageYOffset;
      setScrollTop(currentPosition <= 0 ? 0 : currentPosition);
      if (currentPosition < 500) {
        setIsVisible(false);
        return;
      }
      setIsVisible(true);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);
  const handleOnScrollTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  return (
    <div
      onClick={handleOnScrollTop}
      className={`fixed bottom-8 right-8 cursor-pointer rounded-50% bg-slate-400 p-2 text-white transition-all hover:bg-blue-400 hover:text-black ${
        isVisible ? "block" : "hidden"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
        />
      </svg>
    </div>
  );
};
export default ScrollToTop;
