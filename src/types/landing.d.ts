export type Step = {
  Icon: ({ stroke }: { stroke: string }) => React.ReactNode;
  stroke: string;
  iconBg: string;
  iconBorder: string;
  title: string;
  description: string;
};


export type Card = {
  title: string;
  description: string;
  chip: string;
  variant: "light" | "dark";
  icon: React.ReactNode;
};
