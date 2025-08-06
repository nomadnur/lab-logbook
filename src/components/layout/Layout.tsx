import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Sidebar />
      <div className="md:ml-64">
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}