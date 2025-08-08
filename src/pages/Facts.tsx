import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";

const Facts = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleAddFact = () => {
    // TODO: Implement add fact functionality
    console.log("Add fact clicked");
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        handleAddFact();
      }
      
      if (e.key === '/' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
        searchInput?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Layout>
      <PageHeader
        title="Facts"
        description="Collect and organize research findings and data points"
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onAddClick={handleAddFact}
        addButtonText="New Fact"
        icon={<FileText className="h-5 w-5 text-primary-foreground" />}
      />

      <div className="container mx-auto px-6 pb-8">
        <EmptyState
          icon={<FileText className="h-12 w-12" />}
          title="Facts Section"
          description="Collect and organize research findings and data points. Use 'N' to quickly add new facts when this feature is ready."
          action={{
            label: "Get Started with Facts",
            onClick: handleAddFact
          }}
        />
      </div>
    </Layout>
  );
};

export default Facts;