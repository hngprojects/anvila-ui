export function BoltIcon({ color = "#0C5D56" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M13 10V3L4 14h7v7l9-11h-7z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ScaffoldIcon({ color = "#0C5D56" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="3"
        width="7"
        height="7"
        rx="1.5"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect
        x="14"
        y="3"
        width="7"
        height="7"
        rx="1.5"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect
        x="3"
        y="14"
        width="7"
        height="7"
        rx="1.5"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M14 17.5h7M17.5 14v7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GitHubIcon({ color = "#0C5D56" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlusIcon({ size = 14 }: { size?: number }) {
  const isSmall = size <= 14;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={isSmall ? "0 0 14 14" : "0 0 24 24"}
      fill="none"
      className="shrink-0"
    >
      {isSmall ? (
        <path
          d="M0.75 6.75H6.75M6.75 6.75H12.75M6.75 6.75V0.75M6.75 6.75V12.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M6 12H12M12 12H18M12 12V6M12 12V18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export function ArrowUpIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className={`shrink-0 ${className}`}
    >
      <path
        d="M12 20L12 4M6 10L12 4L18 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ClipboardPencilIcon({ stroke }: { stroke: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M21.3333 5.33341H23.9999C24.7072 5.33341 25.3854 5.61437 25.8855 6.11446C26.3856 6.61456 26.6666 7.29284 26.6666 8.00008V26.6667C26.6666 27.374 26.3856 28.0523 25.8855 28.5524C25.3854 29.0525 24.7072 29.3334 23.9999 29.3334H16.6666M5.33325 18.0001V8.00008C5.33325 7.29284 5.6142 6.61456 6.1143 6.11446C6.6144 5.61437 7.29267 5.33341 7.99992 5.33341H10.6666M11.9999 2.66675H19.9999C20.7363 2.66675 21.3333 3.2637 21.3333 4.00008V6.66675C21.3333 7.40313 20.7363 8.00008 19.9999 8.00008H11.9999C11.2635 8.00008 10.6666 7.40313 10.6666 6.66675V4.00008C10.6666 3.2637 11.2635 2.66675 11.9999 2.66675ZM17.8373 20.8347C18.1002 20.5718 18.3089 20.2595 18.4512 19.9159C18.5935 19.5723 18.6668 19.204 18.6668 18.8321C18.6668 18.4602 18.5935 18.0919 18.4512 17.7482C18.3089 17.4046 18.1002 17.0924 17.8373 16.8294C17.5743 16.5664 17.262 16.3578 16.9184 16.2155C16.5748 16.0731 16.2065 15.9999 15.8346 15.9999C15.4627 15.9999 15.0944 16.0731 14.7508 16.2155C14.4071 16.3578 14.0949 16.5664 13.8319 16.8294L7.15192 23.5121C6.83491 23.8289 6.60288 24.2205 6.47725 24.6507L5.36125 28.4774C5.32779 28.5921 5.32578 28.7138 5.35544 28.8295C5.3851 28.9453 5.44534 29.051 5.52985 29.1355C5.61435 29.22 5.72003 29.2802 5.8358 29.3099C5.95157 29.3395 6.07319 29.3375 6.18792 29.3041L10.0146 28.1881C10.4448 28.0625 10.8364 27.8304 11.1533 27.5134L17.8373 20.8347Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AtomIcon({ stroke }: { stroke: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M16.0001 17.3334C16.7365 17.3334 17.3334 16.7365 17.3334 16.0001C17.3334 15.2637 16.7365 14.6668 16.0001 14.6668C15.2637 14.6668 14.6668 15.2637 14.6668 16.0001C14.6668 16.7365 15.2637 17.3334 16.0001 17.3334Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.9334 26.9334C29.6534 24.2268 26.9601 17.1201 20.9334 11.0668C14.8801 5.04009 7.77343 2.34676 5.06676 5.06676C2.34676 7.77343 5.04009 14.8801 11.0668 20.9334C17.1201 26.9601 24.2268 29.6534 26.9334 26.9334Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.9334 20.9334C26.9601 14.8801 29.6534 7.77343 26.9334 5.06676C24.2268 2.34676 17.1201 5.04009 11.0668 11.0668C5.04009 17.1201 2.34676 24.2268 5.06676 26.9334C7.77343 29.6534 14.8801 26.9601 20.9334 20.9334Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
