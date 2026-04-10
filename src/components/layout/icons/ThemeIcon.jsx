export default function ThemeIcon({ theme }) {
  if (theme === "light") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 2.8v2.4M12 18.8v2.4M21.2 12h-2.4M5.2 12H2.8M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7M18.5 18.5l-1.7-1.7M7.2 7.2 5.5 5.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M20.2 15.4A8.2 8.2 0 0 1 8.6 3.8a8.3 8.3 0 1 0 11.6 11.6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
