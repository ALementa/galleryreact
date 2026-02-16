export default function ImageItem({ img, isActive, onClick }) {
  return (
    <img
      src={img.urls.thumb}
      alt={img.alt_description || "Thumbnail"}
      className={`thumbnail ${isActive ? "active" : ""}`}
      onClick={onClick}
      tabIndex="0"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
    />
  );
}
