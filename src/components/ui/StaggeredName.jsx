export default function StaggeredName({ text }) {
  return (
    <span className="hero-name">
      {text.split("").map((character, index) => (
        <span
          key={`${character}-${index}`}
          className="letter-reveal"
          style={{ "--char-index": index }}
        >
          {character === " " ? "\u00A0" : character}
        </span>
      ))}
    </span>
  );
}
