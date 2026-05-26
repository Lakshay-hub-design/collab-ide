import type {
  ReactNode,
} from "react";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div
      className="
        min-h-screen
        bg-[var(--bg)]
        text-[var(--text)]
        flex
      "
    >
      {children}  
    </div>
  );
}