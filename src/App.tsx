import { useEffect, useState, useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

const slideData = [
  { url: "https://cdn.cosmos.so/484e3cc7-7e95-4c3f-a219-84c4db7154c3?format=jpeg", title: "Mountain Peaks", description: "Experience the breathtaking views from the top of the world. A journey through the clouds." },
  { url: "https://cdn.cosmos.so/608212fd-85b9-42e0-997e-e535967127d7?format=jpeg", title: "Ocean Breeze", description: "Feel the calm and serene waves of the deep blue sea crashing against the shores." },
  { url: "https://cdn.cosmos.so/f4802d37-a65f-41fc-a475-c2ab7cbe1a4b?format=jpeg", title: "Forest Echoes", description: "Lost in the woods where the ancient trees whisper stories of the past." },
  { url: "https://cdn.cosmos.so/cd9ff3d9-0f7e-43fc-9431-27022054b0c3?format=jpeg", title: "Desert Mirage", description: "Endless sands under a burning sun, where the horizon bends and tricks the eye." },
  { url: "https://cdn.cosmos.so/2bc25efe-b7b1-4315-93d9-29a49cae5372?format=jpeg", title: "Urban Nights", description: "Neon lights and bustling streets, the city that never sleeps comes alive." },
  { url: "https://cdn.cosmos.so/6dde1c81-51a4-4ef8-b146-c4974210483b?format=jpeg", title: "Autumn Leaves", description: "A cascade of gold and red, nature's final vibrant display before the winter chill." },
  { url: "https://cdn.cosmos.so/5cbd4ee1-a323-41c0-8f09-0d2cc6f9984f?format=jpeg", title: "Winter Wonderland", description: "A pristine blanket of white snow covering the quiet, sleeping landscape." },
  { url: "https://cdn.cosmos.so/27f507da-6220-42e4-b688-76deae1f7072?format=jpeg", title: "Spring Blossoms", description: "New life awakens as vibrant flowers bloom under the gentle spring sun." },
  { url: "https://cdn.cosmos.so/080d6dfa-0af9-47b9-8812-aa2d4e8a629c?format=jpeg", title: "Mystic Caves", description: "Deep underground, hidden wonders and glowing crystals light the dark paths." },
  { url: "https://cdn.cosmos.so/7a9e849f-c937-458e-927d-07990d91070f?format=jpeg", title: "Starlight Sky", description: "A clear night offering a mesmerizing view of the galaxy and distant stars." },
  { url: "https://cdn.cosmos.so/4eb0e2d4-3642-4bec-97e8-b88921e9ebf9?format=jpeg", title: "Golden Hour", description: "The perfect moment right before sunset when the world is painted in warm gold." },
  { url: "https://cdn.cosmos.so/54b2a290-dce4-402e-a3f1-626101fea298?format=jpeg", title: "Hidden Waterfall", description: "A secret oasis where clear waters plunge into a peaceful, hidden pool." },
  { url: "https://cdn.cosmos.so/f5b7df47-f4c8-47b2-a03a-0468f9b864f0?format=jpeg", title: "Ancient Ruins", description: "Remnants of a forgotten civilization standing the test of time." },
  { url: "https://cdn.cosmos.so/e1fe97bc-ff59-44d3-8600-eded7c96b1cd?format=jpeg", title: "Volcanic Ash", description: "Raw power and destruction, leaving behind a stark and beautiful landscape." },
  { url: "https://cdn.cosmos.so/f9def4f4-2d0f-48f3-8952-a3e44ee771dd?format=jpeg", title: "Tropical Paradise", description: "White sands, crystal clear waters, and the gentle shade of palm trees." },
  { url: "https://cdn.cosmos.so/75a5aeb2-5c7c-4909-82b0-ff14e6e41b3c?format=jpeg", title: "Arctic Ice", description: "Vast expanses of frozen ocean and towering icebergs in the extreme north." },
]

function App() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(Math.floor(slideData.length / 2))
  // const [trackWidth, setTrackWidth] = useState<number>(0)
  const [slideWidth, setSlideWidth] = useState<number>(0)
  // const [numSlides, setNumSlides] = useState<number>(0)
  const [images] = useState(slideData)
  const angleStep = 360 / images.length;
  const [dragging, setDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [offsetX, setOffsetX] = useState(0)

  const normalizedCurrent = ((currentSlide % images.length) + images.length) % images.length;

  function updateCards() {
    const cards = document.querySelectorAll('.card') as NodeListOf<HTMLElement>;

    cards.forEach((card, i) => {
      // Calculate the rotation for THIS card based on the current center index
      const dragRotation = (offsetX / window.innerWidth) * 60;
      const cardRotation = (i - currentSlide) * angleStep + dragRotation;
      card.style.transform = `rotate(${cardRotation}deg)`;
      // Toggle active classes
      if (i === normalizedCurrent) {
        card.classList.add("active");
      } else {
        card.classList.remove("active");
      }
    });
  }

  const move = (direction: number) => {
    setCurrentSlide(currentSlide + direction)
  }

  useEffect(() => {
    const track = document.getElementById("track")
    // const numSlides = images.length
    const slideWidth = (track?.offsetWidth || 0)
    // console.log("🚀 ~ App ~ slideWidth:", slideWidth)
    // setTrackWidth(track?.offsetWidth || 0)
    setSlideWidth(slideWidth)
    // setNumSlides(numSlides)
  }, [images])

  useEffect(() => {
    updateCards()
  }, [currentSlide, offsetX])

  useGSAP(() => {
    // Background color animation
    const hue = (32 + normalizedCurrent * (360 / images.length)) % 360;
    const targetColor = `hsl(${hue}, 22%, 55%)`;

    gsap.to(document.documentElement, {
      "--bg-gradient-color": targetColor,
      duration: 0.8,
      ease: "power2.out",
    });

    // Text animation
    gsap.fromTo(
      ".slide-text",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );
  }, { scope: contentRef, dependencies: [currentSlide] });

  useGSAP(() => {
    const pillColors = [
      { bg: '#eddfc8', color: '#231709' },
      // { bg: '#231709', color: '#fdf2e0' },
      // { bg: '#231709', color: '#d4c9a8' },
      // { bg: '#fceae0', color: '#6e2e18' },
      // { bg: '#b08840', color: '#100c06' },
    ];
    const pill = document.getElementById('dragPill');
    if (!pill) return;

    const dragCircle = pill.querySelector('.drag-circle') as HTMLElement;
    const dragDots = pill.querySelectorAll('.drag-dot') as NodeListOf<HTMLElement>;

    const colorTheme = pillColors[normalizedCurrent % pillColors.length];

    gsap.to(dragCircle, { backgroundColor: colorTheme.bg, color: colorTheme.color, duration: 0.8 });
    gsap.to(dragDots, { backgroundColor: colorTheme.bg, duration: 0.8 });
  }, [currentSlide]);

  useGSAP(() => {
    const pill = document.getElementById('dragPill');
    if (!pill) return;

    gsap.set(pill, { opacity: 0, scale: 0.5, xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(pill, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(pill, "y", { duration: 0.4, ease: "power3" });

    const movePill = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", movePill);

    const showPill = () => gsap.to(pill, { opacity: 1, scale: 1, duration: 0.3 });
    const hidePill = () => gsap.to(pill, { opacity: 0, scale: 0.5, duration: 0.3 });

    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      card.addEventListener("mouseenter", showPill);
      card.addEventListener("mouseleave", hidePill);
    });

    return () => {
      window.removeEventListener("mousemove", movePill);
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", showPill);
        card.removeEventListener("mouseleave", hidePill);
      });
    };
  }, []);


  return (
    <>
      <div className="drag-wrap" id="dragPill">
        <span className="drag-dot"></span>
        <div className="drag-circle">Drag</div>
        <span className="drag-dot"></span>
      </div>

      <div className="stage h-dvh overflow-hidden">
        <div
          className="carousel-track"
          id="track"
          style={{ touchAction: 'none' }}
          onMouseDown={(e) => {
            setDragging(true)
            setStartX(e.clientX)
            setOffsetX(0)
          }}
          onMouseMove={(e) => {
            if (!dragging) return
            const diff = e.clientX - startX
            setOffsetX(diff)
          }}
          onMouseUp={() => {
            if (!dragging) return
            setDragging(false)
            if (offsetX > 50) {
              move(-1)
            } else if (offsetX < -50) {
              move(1)
            }
            setOffsetX(0)
          }}
          onMouseLeave={() => {
            if (dragging) {
              setDragging(false)
              if (offsetX > 50) {
                move(-1)
              } else if (offsetX < -50) {
                move(1)
              }
              setOffsetX(0)
            }
          }}
          onTouchStart={(e) => {
            setDragging(true)
            setStartX(e.touches[0].clientX)
            setOffsetX(0)
          }}
          onTouchMove={(e) => {
            if (!dragging) return
            const diff = e.touches[0].clientX - startX
            setOffsetX(diff)
          }}
          onTouchEnd={() => {
            if (!dragging) return
            setDragging(false)
            if (offsetX > 50) {
              move(-1)
            } else if (offsetX < -50) {
              move(1)
            }
            setOffsetX(0)
          }}
        >
          {images.map((image, index) => (
            <div
              className="card"
              key={index}
              style={{
                width: slideWidth,
                backgroundImage: `url(${image.url})`,
                transform: `rotate(${(index - currentSlide) * angleStep}deg)`,
              }}
            >
              {/* <img src={image} alt="" /> */}
            </div>
          ))}
        </div>

        <div className="content  mix-blend-difference" ref={contentRef}>
          <h1 className="slide-text text-white text-2xl font-bold">{images[normalizedCurrent]?.title}</h1>
          <p className="slide-text text-white text-xl italic font-extralight">{images[normalizedCurrent]?.description}</p>
          <div className="nav">
            <button onClick={() => move(-1)}>❮</button>
            <button onClick={() => move(1)}>❯</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
