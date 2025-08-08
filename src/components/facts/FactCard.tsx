import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Calendar, Link2 } from "lucide-react";
import { Fact } from "@/types";
import { useState } from "react";

interface FactCardProps {
  fact: Fact;
  onEdit: (fact: Fact) => void;
  onDelete: (id: string) => void;
  onClick?: (fact: Fact) => void;
}

export function FactCard({ fact, onEdit, onDelete, onClick }: FactCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    if (onClick) {
      onClick(fact);
    } else {
      onEdit(fact);
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
              {fact.title}
            </CardTitle>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {new Date(fact.createdAt).toLocaleDateString()}
              </div>
              {fact.category && (
                <Badge variant="outline" className="text-xs">
                  {fact.category}
                </Badge>
              )}
              {fact.relatedExperiments && fact.relatedExperiments.length > 0 && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Link2 className="h-3 w-3" />
                  <span className="text-xs">{fact.relatedExperiments.length} linked</span>
                </div>
              )}
            </div>
          </div>
          <div className={`flex gap-1 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => handleActionClick(e, () => onEdit(fact))}
              className="hover:bg-primary/10 h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => handleActionClick(e, () => onDelete(fact.id))}
              className="hover:bg-destructive/10 hover:text-destructive h-8 w-8 p-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
          {fact.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}