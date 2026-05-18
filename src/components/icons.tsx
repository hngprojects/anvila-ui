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
export const ShieldPolicyIcon = ({ className }: { className?: string }) => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="50" fill="#F0FDFA"/>
    <path d="M20 48.7223C20 38.0637 20 32.7343 21.2584 30.9414C22.5168 29.1485 27.5277 27.4333 37.5497 24.0027L39.4591 23.3491C44.6833 21.5609 47.2954 20.6667 50 20.6667C52.7046 20.6667 55.3167 21.5609 60.5409 23.3491L62.4503 24.0027C72.4723 27.4333 77.4832 29.1485 78.7416 30.9414C80 32.7343 80 38.0637 80 48.7223C80 50.3322 80 52.0781 80 53.9713C80 72.7649 65.8701 81.885 57.0048 85.7577C54.6 86.8082 53.3975 87.3334 50 87.3334C46.6025 87.3334 45.4 86.8082 42.9952 85.7577C34.1299 81.885 20 72.7649 20 53.9713C20 52.0781 20 50.3322 20 48.7223Z" stroke="#0C5D56" strokeWidth="1.5"/>
    <path d="M48.3333 67.3334H51.6667C53.5076 67.3334 55 65.841 55 64.0001V59.3289C57.989 57.5999 60 54.3682 60 50.6667C60 45.1439 55.5228 40.6667 50 40.6667C44.4772 40.6667 40 45.1439 40 50.6667C40 54.3682 42.011 57.5999 45 59.3289V64.0001C45 65.841 46.4924 67.3334 48.3333 67.3334Z" stroke="#0C5D56" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

export const DataCollectIcon = ({ className }: { className?: string }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="40" height="40" rx="20" fill="#F0FDFA"/>
    <path d="M20 14C16.6863 14 14 14.8954 14 16C14 17.1046 16.6863 18 20 18C23.3137 18 26 17.1046 26 16C26 14.8954 23.3137 14 20 14Z" stroke="#0C0E0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 16V24C14 25.1046 16.6863 26 20 26C23.3137 26 26 25.1046 26 24V16" stroke="#0C0E0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 20C14 21.1046 16.6863 22 20 22C23.3137 22 26 21.1046 26 20" stroke="#0C0E0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const HowWeUseDataIcon = ({ className }: { className?: string }) => (
 <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="40" height="40" rx="20" fill="#F0FDFA"/>
    <path d="M20 14C16.6863 14 14 14.8954 14 16C14 17.1046 16.6863 18 20 18C23.3137 18 26 17.1046 26 16C26 14.8954 23.3137 14 20 14Z" stroke="#0C0E0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 16V24C14 25.1046 16.6863 26 20 26C23.3137 26 26 25.1046 26 24V16" stroke="#0C0E0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 20C14 21.1046 16.6863 22 20 22C23.3137 22 26 21.1046 26 20" stroke="#0C0E0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const DataSharingIcon = ({ className }: { className?: string }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="40" height="40" rx="20" fill="#F0FDFA"/>
    <circle cx="19" cy="14" r="4" stroke="#0C0E0D" strokeWidth="1.5"/>
    <path d="M25 17C26.6569 17 28 15.6569 28 14C28 12.3431 26.6569 11 25 11" stroke="#0C0E0D" strokeWidth="1.5" strokeLinecap="round"/>
    <ellipse cx="19" cy="25" rx="7" ry="4" stroke="#0C0E0D" strokeWidth="1.5"/>
    <path d="M28 22C29.7542 22.3847 31 23.3589 31 24.5C31 25.5293 29.9863 26.4229 28.5 26.8704" stroke="#0C0E0D" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const DataSecurityIcon = ({ className }: { className?: string }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="40" height="40" rx="20" fill="#F0FDFA"/>
    <path d="M12 24C12 21.1716 12 19.7574 12.8787 18.8787C13.7574 18 15.1716 18 18 18H26C28.8284 18 30.2426 18 31.1213 18.8787C32 19.7574 32 21.1716 32 24C32 26.8284 32 28.2426 31.1213 29.1213C30.2426 30 28.8284 30 26 30H18C15.1716 30 13.7574 30 12.8787 29.1213C12 28.2426 12 26.8284 12 24Z" stroke="#0C0E0D" strokeWidth="1.5"/>
    <path d="M16 18V16C16 12.6863 18.6863 10 22 10C25.3137 10 28 12.6863 28 16V18" stroke="#0C0E0D" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const YourDataIcon = ({ className }: { className?: string }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="40" height="40" rx="20" fill="#F0FDFA"/>
    <circle cx="22" cy="14" r="4" stroke="#0C0E0D" strokeWidth="1.5"/>
    <ellipse cx="22" cy="25" rx="7" ry="4" stroke="#0C0E0D" strokeWidth="1.5"/>
  </svg>
);

export const TransparencyIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="2" transform="rotate(180 12 12)" stroke="#0C0E0D" strokeWidth="1.5"/>
    <circle cx="20" cy="14" r="2" transform="rotate(180 20 14)" stroke="#0C0E0D" strokeWidth="1.5"/>
    <circle cx="2" cy="2" r="2" transform="matrix(-1 8.74228e-08 8.74228e-08 1 6 8)" stroke="#0C0E0D" strokeWidth="1.5"/>
    <path d="M12 8L12 5" stroke="#0C0E0D" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 10L20 5" stroke="#0C0E0D" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4 14L4 19" stroke="#0C0E0D" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 19L12 16" stroke="#0C0E0D" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 19L20 18" stroke="#0C0E0D" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4 5L4 6" stroke="#0C0E0D" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const DangerIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M5.31171 10.7615C8.23007 5.58716 9.68925 3 12 3C14.3107 3 15.7699 5.58716 18.6883 10.7615L19.0519 11.4063C21.4771 15.7061 22.6897 17.856 21.5937 19.428C20.4978 21 17.7864 21 12.3637 21H11.6363C6.21356 21 3.50217 21 2.40626 19.428C1.31034 17.856 2.52291 15.7061 4.94805 11.4063L5.31171 10.7615Z" stroke="#0C5D56" strokeWidth="1.5"/>
    <path d="M12 8V13" stroke="#0C5D56" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="16" r="1" fill="#0C5D56"/>
  </svg>
);

export const ManageDataSettingsIcon = ({ className }: { className?: string }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="40" height="40" rx="20" fill="#F0FDFA"/>
    <path d="M21 18.1145C20.5858 18.1145 20.25 17.7647 20.25 17.3333V14.2083C20.25 13.7768 20.5858 13.427 21 13.427C21.4142 13.427 21.75 13.7768 21.75 14.2083V17.3333C21.75 17.7647 21.4142 18.1145 21 18.1145Z" fill="#0C0E0D"/>
    <path d="M13 21.4999C11.8954 21.4999 11 20.5672 11 19.4166C11 18.266 11.8954 17.3333 13 17.3333C14.1046 17.3333 15 18.266 15 19.4166C15 20.5672 14.1046 21.4999 13 21.4999Z" fill="#0C0E0D"/>
    <path d="M19 21.4999C19 20.3493 19.8954 19.4166 21 19.4166C22.1046 19.4166 23 20.3493 23 21.4999C23 22.6505 22.1046 23.5833 21 23.5833C19.8954 23.5833 19 22.6505 19 21.4999Z" fill="#0C0E0D"/>
    <path d="M27 23.5833C27 22.4327 27.8954 21.4999 29 21.4999C30.1046 21.4999 31 22.4327 31 23.5833C31 24.7338 30.1046 25.6666 29 25.6666C27.8954 25.6666 27 24.7338 27 23.5833Z" fill="#0C0E0D"/>
    <path d="M28.25 19.4166C28.25 19.8481 28.5858 20.1978 29 20.1978C29.4142 20.1978 29.75 19.8481 29.75 19.4166V14.2083C29.75 13.7768 29.4142 13.427 29 13.427C28.5858 13.427 28.25 13.7768 28.25 14.2083V19.4166Z" fill="#0C0E0D"/>
    <path d="M13 22.802C12.5858 22.802 12.25 23.1518 12.25 23.5833L12.25 28.7916C12.25 29.2231 12.5858 29.5728 13 29.5728C13.4142 29.5728 13.75 29.2231 13.75 28.7916L13.75 23.5833C13.75 23.1518 13.4142 22.802 13 22.802Z" fill="#0C0E0D"/>
    <path d="M20.25 28.7916C20.25 29.2231 20.5858 29.5728 21 29.5728C21.4142 29.5728 21.75 29.2231 21.75 28.7916V25.6666C21.75 25.2351 21.4142 24.8853 21 24.8853C20.5858 24.8853 20.25 25.2351 20.25 25.6666V28.7916Z" fill="#0C0E0D"/>
    <path d="M29 29.5728C28.5858 29.5728 28.25 29.2231 28.25 28.7916V27.7499C28.25 27.3184 28.5858 26.9687 29 26.9687C29.4142 26.9687 29.75 27.3184 29.75 27.7499V28.7916C29.75 29.2231 29.4142 29.5728 29 29.5728Z" fill="#0C0E0D"/>
    <path d="M12.25 14.2083C12.25 13.7768 12.5858 13.427 13 13.427C13.4142 13.427 13.75 13.7768 13.75 14.2083V15.2499C13.75 15.6814 13.4142 16.0312 13 16.0312C12.5858 16.0312 12.25 15.6814 12.25 15.2499L12.25 14.2083Z" fill="#0C0E0D"/>
  </svg>
);

export const DeleteIcon = ({ className }: { className?: string }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="40" height="40" rx="20" fill="#F0FDFA"/>
    <path d="M17.1707 13C17.5825 11.8348 18.6937 11 19.9999 11C21.3062 11 22.4174 11.8348 22.8292 13" stroke="#0C0E0D" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M28.5001 15H11.5" stroke="#0C0E0D" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M26.8334 17.5L26.3735 24.3991C26.1965 27.054 26.108 28.3815 25.243 29.1907C24.378 30 23.0476 30 20.3868 30H19.6134C16.9526 30 15.6222 30 14.7572 29.1907C13.8922 28.3815 13.8037 27.054 13.6267 24.3991L13.1667 17.5" stroke="#0C0E0D" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M17.5 20L18 25" stroke="#0C0E0D" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M22.5 20L22 25" stroke="#0C0E0D" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const DownloadIcon = ({ className }: { className?: string }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="40" height="40" rx="20" fill="#F0FDFA"/>
    <path d="M29 23V27C29 27.5304 28.7893 28.0391 28.4142 28.4142C28.0391 28.7893 27.5304 29 27 29H13C12.4696 29 11.9609 28.7893 11.5858 28.4142C11.2107 28.0391 11 27.5304 11 27V23M25 18L20 23L15 18M20 23V11" stroke="#0C0E0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
