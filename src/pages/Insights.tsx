import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";

const Insights = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleAddInsight = () => {
    // TODO: Implement add insight functionality
    console.log("Add insight clicked");
  };

  return (
    <Layout>
      <PageHeader
        title="Insights"
        description="Transform facts into meaningful conclusions and patterns"
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onAddClick={handleAddInsight}
        addButtonText="New Insight"
        icon={<Lightbulb className="h-5 w-5 text-primary-foreground" />}
      />

      <div className="container mx-auto px-6 py-8">
        <div className="text-center py-12">
          <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Insights Section</h3>
          <p className="text-muted-foreground mb-6">
            This section will contain your research insights and conclusions.
          </p>
          <p className="text-sm text-muted-foreground">
            Coming soon - full implementation with Supabase integration
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Insights;