import { useEffect, useState } from "react";
import ImageItem from "./ImageItem";
import Modal from "./Modal";
import SearchBar from "./SearchBar";
import "../style.css";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [query, setQuery] = useState("nature");

  // Fetch images from Unsplash
  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch(
          `https://api.unsplash.com/search/photos?query=${query}&per_page=12&client_id=${
            import.meta.env.VITE_UNSPLASH_KEY
          }`,
        );
        const data = await res.json();
        setImages(data.results);
        setSelectedIndex(0);
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    }

    fetchImages();
  }, [query]);

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "ArrowRight") {
        nextImage();
      }
      if (e.key === "ArrowLeft") {
        prevImage();
      }
      if (e.key === " ") {
        e.preventDefault();
        // чтобы страница не скроллилась
        nextImage();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [images, selectedIndex]);

  return (
    <div className="carousel" aria-label="Image gallery">
      <SearchBar query={query} setQuery={setQuery} />

      <button className="carousel-button next" onClick={nextImage}>
        &#187;
      </button>

      <button className="carousel-button prev" onClick={prevImage}>
        &#171;
      </button>

      {images.length > 0 && <Modal image={images[selectedIndex]} />}

      <div className="thumbnails">
        {images.map((img, index) => (
          <ImageItem
            key={img.id}
            img={img}
            isActive={index === selectedIndex}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
