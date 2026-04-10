import { createRipple } from "../../utils/createRipple";

export default function ActionButton({
  as: Comp = "button",
  className = "",
  children,
  onClick,
  ...props
}) {
  const handleClick = (event) => {
    createRipple(event);
    onClick?.(event);
  };

  return (
    <Comp
      {...props}
      onClick={handleClick}
      data-cursor="interactive"
      className={`interactive ripple-target ${className}`}
    >
      {children}
    </Comp>
  );
}
