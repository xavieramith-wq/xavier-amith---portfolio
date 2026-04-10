export default function ProfileIcon({ platform }) {
  if (platform === "GitHub") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 fill-current"
        aria-hidden="true"
      >
        <path d="M12 .6A12 12 0 0 0 8.2 24c.6.1.8-.2.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.3-1.3-1.7-1.3-1.7-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1 1.9 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.6-1.4-5.6-6.2 0-1.4.5-2.6 1.3-3.6-.1-.3-.5-1.6.1-3.3 0 0 1.1-.3 3.7 1.4a12.5 12.5 0 0 1 6.8 0c2.6-1.7 3.7-1.4 3.7-1.4.6 1.7.2 3 .1 3.3.8 1 1.3 2.2 1.3 3.6 0 4.8-2.9 5.9-5.7 6.2.4.4.8 1.1.8 2.2v3.2c0 .4.2.7.8.6A12 12 0 0 0 12 .6Z" />
      </svg>
    );
  }

  if (platform === "LeetCode") {
    return (
      <svg
        viewBox="0 0 64 64"
        className="h-6 w-6 fill-none stroke-current"
        aria-hidden="true"
      >
        <path
          d="M39 14 20 32l19 18"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M47 32H22" strokeWidth="5" strokeLinecap="round" />
        <path
          d="M33 8 53 28"
          strokeWidth="5"
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
        d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
        strokeWidth="1.8"
      />
      <path d="M8 8h8M8 12h8M8 16h5" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
