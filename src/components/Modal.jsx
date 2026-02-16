export default function Modal({ image }) {
  return (
    <div className="mainImage">
      <img
        src={image.urls.regular}
        alt={image.alt_description || "Large view"}
        aria-live="polite"
      />
    </div>
  );
}
