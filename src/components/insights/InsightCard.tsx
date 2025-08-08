import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Calendar, Link2 } from "lucide-react";
import { Insight } from "@/types";
import { useState } from "react";

interface InsightCardProps {
  insight: Insight;
  onEdit: (insight: Insight) => void;
  onDelete: (id: string) => void;
  onClick?: (insight: Insight) => void;
}

export function InsightCard({ insight, onEdit, onDelete, onClick }: InsightCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    if (onClick) {
      onClick(insight);
    } else {
      onEdit(insight);
    }
  };

  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <Card 
      className="bg-gradient-card hover:shadow-card transition-all duration-300 hover:scale-[1.02] border-border/50 cursor-pointer group"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {insight.title}
            </CardTitle>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {new Date(insight.createdAt).toLocaleDateString()}
              </div>
              {insight.relatedFacts && insight.relatedFacts.length > 0 && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Link2 className="h-3 w-3" />
                  <span className="text-xs">{insight.relatedFacts.length} facts linked</span>
                </div>
              )}
            </div>
          </div>
          <div className={`flex gap-1 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => handleActionClick(e, () => onEdit(insight))}
              className="hover:bg-primary/10 h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => handleActionClick(e, () => onDelete(insight.id))}
              className="hover:bg-destructive/10 hover:text-destructive h-8 w-8 p-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
          {insight.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}