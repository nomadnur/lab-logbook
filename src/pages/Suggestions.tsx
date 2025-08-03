import { useState } from "react";
import { ListChecks } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";

const Suggestions = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleAddSuggestion = () => {
    // TODO: Implement add suggestion functionality
    console.log("Add suggestion clicked");
  };

  return (
    <Layout>
      <PageHeader
        title="Suggestions"
        description="Track improvement recommendations and next steps"
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onAddClick={handleAddSuggestion}
        addButtonText="New Suggestion"
        icon={<ListChecks className="h-5 w-5 text-primary-foreground" />}
      />

      <div className="container mx-auto px-6 py-8">
        <div className="text-center py-12">
          <ListChecks className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Suggestions Section</h3>
          <p className="text-muted-foreground mb-6">
            This section will contain your improvement suggestions and recommendations.
          </p>
          <p className="text-sm text-muted-foreground">
            Coming soon - full implementation with Supabase integration
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Suggestions;