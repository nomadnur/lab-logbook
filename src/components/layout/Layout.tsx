import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-gradient-subtle">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64">
        {children}
      </main>
    </div>
  );
}