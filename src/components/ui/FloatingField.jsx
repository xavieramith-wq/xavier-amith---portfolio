export default function FloatingField({
  as = "input",
  id,
  label,
  className = "",
  ...props
}) {
  return (
    <label className={`floating-field ${className}`} htmlFor={id}>
      {as === "textarea" ? (
        <textarea id={id} placeholder=" " {...props} />
      ) : (
        <input id={id} placeholder=" " {...props} />
      )}
      <span>{label}</span>
    </label>
  );
}
