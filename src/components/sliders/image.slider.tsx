import { useState, useEffect, useCallback, useRef } from "react";
import { type Image } from "../../types";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

type Props = {
  images: Image[];
};

function ImageSlider({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loadingStates, setLoadingStates] = useState<boolean[]>(
    new Array(images.length).fill(true)
  );
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionRef = useRef<HTMLDivElement>(null);

  const extendedImages = [images[images.length - 1], ...images, images[0]];

  useEffect(() => {
    if (images.length) {
      images.forEach((img, index) => {
        const preload = new Image();
        preload.src = img.small;
        preload.onload = () => {
          setLoadingStates((prev) => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
          });
        };
      });
    }
  }, [images]);

  const handleNext = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [isAnimating]);

  const handlePrev = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [isAnimating]);

  useEffect(() => {
    intervalRef.current = setInterval(handleNext, 5000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [handleNext]);

  useEffect(() => {
    if (!transitionRef.current) return;

    const slider = transitionRef.current;

    const handleTransitionEnd = () => {
      setIsAnimating(false);

      if (currentIndex === 0) {
        setCurrentIndex(images.length);
        slider.style.transition = "none";
      } else if (currentIndex === images.length + 1) {
        setCurrentIndex(1);
        slider.style.transition = "none";
      }

      setTimeout(() => {
        slider.style.transition = "transform 0.5s ease-in-out";
      }, 10);
    };

    slider.addEventListener("transitionend", handleTransitionEnd);
    return () =>
      slider.removeEventListener("transitionend", handleTransitionEnd);
  }, [currentIndex, images.length]);

  if (!images || images.length === 0) {
    return (
      <div className="h-48 bg-gray-300 flex items-center justify-center text-gray-500">
        No image available
      </div>
    );
  }

  return (
    <div className="relative rounded-xl group overflow-hidden">
      <div
        ref={transitionRef}
        className="flex transition-transform  duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {extendedImages.map((image, index) => (
          <img
            key={index}
            src={image.small}
            alt={`Slide ${index}`}
            className={`w-full h-60 object-cover flex-shrink-0 ${
              loadingStates[index] ? "animate-pulse" : ""
            }`}
          />
        ))}
      </div>

      <button
        className="absolute group-hover:block hidden left-2 top-1/2 transform -translate-y-1/2 bg-white aspect-square px-[2px] py-[2px] cursor-pointer rounded-full"
        onClick={handlePrev}
      >
        <CircleArrowLeft size={24} color="black" />
      </button>
      <button
        className="absolute group-hover:block hidden right-2 top-1/2 transform -translate-y-1/2 bg-white aspect-square px-[2px] py-[2px] cursor-pointer rounded-full"
        onClick={handleNext}
      >
        <CircleArrowRight size={24} color="black" />
      </button>
    </div>
  );
}

export default ImageSlider;
