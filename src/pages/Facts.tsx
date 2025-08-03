import { useState } from "react";
import { FileText } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";

const Facts = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleAddFact = () => {
    // TODO: Implement add fact functionality
    console.log("Add fact clicked");
  };

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

      <div className="container mx-auto px-6 py-8">
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Facts Section</h3>
          <p className="text-muted-foreground mb-6">
            This section will contain your research facts and data points.
          </p>
          <p className="text-sm text-muted-foreground">
            Coming soon - full implementation with Supabase integration
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Facts;