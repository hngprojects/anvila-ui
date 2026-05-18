export const Google = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
};

export const Github = ({ size = 24, color = "currentColor", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Logo = () => {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.5609 6.875L42.1665 6.87499L42.1665 10.9185L27.3415 10.9185C26.4919 14.608 20.9131 15.6323 18.2299 15.6834C19.4193 15.6834 22.7411 15.5172 25.4937 16.5139C28.9345 17.7598 31.5681 21.4099 31.0371 27.4642C30.6124 32.3077 34.4567 35.9229 36.4319 37.125L14.8104 37.125L14.8104 32.6006C14.8104 32.6006 18.4423 32.8367 23.1999 31.0707C29.1468 28.8631 26.4919 20.4263 21.8405 19.858C16.9555 19.2612 3.87214 14.8746 1.83317 10.9185L23.5609 10.9185L23.5609 6.875Z"
        fill="#0C5D56"
      />
    </svg>
  );
};

export const LogoIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.5609 6.875L42.1665 6.87499L42.1665 10.9185L27.3415 10.9185C26.4919 14.608 20.9131 15.6323 18.2299 15.6834C19.4193 15.6834 22.7411 15.5172 25.4937 16.5139C28.9345 17.7598 31.5681 21.4099 31.0371 27.4642C30.6124 32.3077 34.4567 35.9229 36.4319 37.125L14.8104 37.125L14.8104 32.6006C14.8104 32.6006 18.4423 32.8367 23.1999 31.0707C29.1468 28.8631 26.4919 20.4263 21.8405 19.858C16.9555 19.2612 3.87214 14.8746 1.83317 10.9185L23.5609 10.9185L23.5609 6.875Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const FireIcon = ({ className }: { className?: string }) => (
  <svg
    width="10"
    height="12"
    viewBox="0 0 10 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: "block" }}
  >
    <path
      d="M8.44817 5.46667C8.29484 5.26667 8.10817 5.09333 7.93484 4.92C7.48817 4.52 6.9815 4.23333 6.55484 3.81333C5.5615 2.84 5.3415 1.23333 5.97484 0C5.3415 0.153333 4.78817 0.5 4.31484 0.88C2.58817 2.26667 1.90817 4.71333 2.7215 6.81333C2.74817 6.88 2.77484 6.94667 2.77484 7.03333C2.77484 7.18 2.67484 7.31333 2.5415 7.36667C2.38817 7.43333 2.22817 7.39333 2.1015 7.28667C2.06367 7.25497 2.03202 7.21655 2.00817 7.17333C1.25484 6.22 1.13484 4.85333 1.6415 3.76C0.528171 4.66667 -0.0784955 6.2 0.00817116 7.64667C0.0481712 7.98 0.0881711 8.31333 0.201504 8.64667C0.294838 9.04667 0.474838 9.44667 0.674838 9.8C1.39484 10.9533 2.6415 11.78 3.9815 11.9467C5.40817 12.1267 6.93484 11.8667 8.02817 10.88C9.24817 9.77333 9.67484 8 9.04817 6.48L8.9615 6.30667C8.8215 6 8.44817 5.46667 8.44817 5.46667ZM6.3415 9.66667C6.15484 9.82667 5.84817 10 5.60817 10.0667C4.8615 10.3333 4.11484 9.96 3.67484 9.52C4.46817 9.33333 4.9415 8.74667 5.0815 8.15333C5.19484 7.62 4.9815 7.18 4.89484 6.66667C4.81484 6.17333 4.82817 5.75333 5.00817 5.29333C5.13484 5.54667 5.26817 5.8 5.42817 6C5.9415 6.66667 6.74817 6.96 6.9215 7.86667C6.94817 7.96 6.9615 8.05333 6.9615 8.15333C6.9815 8.7 6.7415 9.3 6.3415 9.66667Z"
      fill="#ED5F15"
    />
  </svg>
);

export const CheckIcon = ({ className }: { className?: string }) => (
  <span
    className={`inline-flex w-5 h-5 rounded-full bg-teal-brand items-center justify-center shrink-0 ${className ?? ""}`}
  >
    <svg
      width="10"
      height="8"
      viewBox="0 0 10 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <path
        d="M1 3.5L3.8 6.5L9 1.5"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

export const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M5 7.5L10 12.5L15 7.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M15 12.5L10 7.5L5 12.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TableCheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="18"
    viewBox="0 0 24 18"
    fill="none"
  >
    <path
      d="M2 9L9 16L22 2"
      stroke="#116932"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TableDashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="4"
    viewBox="0 0 24 4"
    fill="none"
  >
    <path
      d="M2 2H22"
      stroke="#A9ADA5"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

export const Facebook = ({ size = 24, color = "currentColor", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const Twitter = ({ size = 24, color = "currentColor", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

export const Linkedin = ({ size = 24, color = "currentColor", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Instagram = ({ size = 24, color = "currentColor", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export function ContactIcon({ bg, stroke }: { bg: string; stroke: string }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="24" fill={bg} />
      <path
        d="M22 33V20C22 19.7348 21.8946 19.4804 21.7071 19.2929C21.5196 19.1054 21.2652 19 21 19H16C15.7348 19 15.4804 19.1054 15.2929 19.2929C15.1054 19.4804 15 19.7348 15 20V32C15 32.2652 15.1054 32.5196 15.2929 32.7071C15.4804 32.8946 15.7348 33 16 33H28C28.2652 33 28.5196 32.8946 28.7071 32.7071C28.8946 32.5196 29 32.2652 29 32V27C29 26.7348 28.8946 26.4804 28.7071 26.2929C28.5196 26.1054 28.2652 26 28 26H15M27 15H32C32.5523 15 33 15.4477 33 16V21C33 21.5523 32.5523 22 32 22H27C26.4477 22 26 21.5523 26 21V16C26 15.4477 26.4477 15 27 15Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const IconPrefix = ({
  icon: Icon,
  show,
}: {
  icon: React.ElementType;
  show: boolean;
}) => {
  if (!show) return null;
  return (
    <span className="absolute left-[10px] top-1/2 -translate-y-1/2 text-[color:var(--color-copy-muted)]">
      <Icon size={14} />
    </span>
  );
};
