export default function SocialIcon({ platform }) {
  if (platform === "github") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 fill-current"
        aria-hidden="true"
      >
        <path d="M12 .7A12 12 0 0 0 8.2 24c.6.1.8-.2.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.3-1.3-1.7-1.3-1.7-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1 1.9 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.6-1.4-5.6-6.2 0-1.4.5-2.6 1.3-3.6-.1-.3-.5-1.6.1-3.3 0 0 1.1-.3 3.7 1.4a12.4 12.4 0 0 1 6.8 0c2.6-1.7 3.7-1.4 3.7-1.4.6 1.7.2 3 .1 3.3.8 1 1.3 2.2 1.3 3.6 0 4.8-2.9 5.9-5.7 6.2.4.4.8 1.1.8 2.2v3.2c0 .4.2.7.8.6A12 12 0 0 0 12 .7Z" />
      </svg>
    );
  }

  if (platform === "linkedin") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 fill-current"
        aria-hidden="true"
      >
        <path d="M6.5 8.6H3.2V20h3.3V8.6ZM4.8 3a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.8 13.1c0-3.3-1.8-4.9-4.3-4.9-2 0-2.9 1.1-3.4 1.9V8.6H9.8c0 1 .1 11.4 0 11.4H13v-6.4c0-.3 0-.7.1-.9.3-.7.9-1.5 2-1.5 1.4 0 2 1.1 2 2.7V20h3.3v-6.9Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-none stroke-current"
      aria-hidden="true"
    >
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" strokeWidth="1.8" />
      <path
        d="m5 8 7 5 7-5"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
