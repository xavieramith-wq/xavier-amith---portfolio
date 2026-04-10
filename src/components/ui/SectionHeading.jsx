export default function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}) {
  return (
    <div
      className={`section-heading mx-auto max-w-3xl ${center ? "text-center" : ""}`}
      data-aos="fade-up"
    >
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
