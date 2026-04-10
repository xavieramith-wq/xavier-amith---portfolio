export default function ContactIcon({ type }) {
  if (type === "email") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 fill-none stroke-current"
        aria-hidden="true"
      >
        <rect
          x="3.5"
          y="5.5"
          width="17"
          height="13"
          rx="2.5"
          strokeWidth="1.8"
        />
        <path
          d="m5 8 7 5 7-5"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "phone") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 fill-none stroke-current"
        aria-hidden="true"
      >
        <path
          d="M7.5 4.5c.7-.7 1.9-.7 2.6 0l1.6 1.6c.6.6.7 1.7.2 2.4l-1.3 2c1.2 2.1 2.9 3.8 5 5l2-1.3c.8-.5 1.8-.4 2.4.2l1.6 1.6c.7.7.7 1.9 0 2.6l-1 1c-.9.9-2.3 1.2-3.5.8-3.1-1-6-2.9-8.6-5.5C6 13.4 4.1 10.5 3.1 7.4c-.4-1.2-.1-2.6.8-3.5l1-1Z"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 fill-none stroke-current"
      aria-hidden="true"
    >
      <path
        d="M12 20s6-4.7 6-10a6 6 0 1 0-12 0c0 5.3 6 10 6 10Z"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.2" strokeWidth="1.8" />
    </svg>
  );
}
