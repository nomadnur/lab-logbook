import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Calendar } from "lucide-react";
import { Experiment } from "@/types";
import { useState } from "react";

interface ExperimentCardProps {
  experiment: Experiment;
  onEdit: (experiment: Experiment) => void;
  onDelete: (id: string) => void;
  onClick?: (experiment: Experiment) => void;
}

export function ExperimentCard({ experiment, onEdit, onDelete, onClick }: ExperimentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    if (onClick) {
      onClick(experiment);
    } else {
      onEdit(experiment);
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
              {experiment.title}
            </CardTitle>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {new Date(experiment.createdAt).toLocaleDateString()}
              </div>
              {experiment.status && (
                <Badge 
                  variant={experiment.status === 'completed' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {experiment.status}
                </Badge>
              )}
            </div>
          </div>
          <div className={`flex gap-1 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => handleActionClick(e, () => onEdit(experiment))}
              className="hover:bg-primary/10 h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => handleActionClick(e, () => onDelete(experiment.id))}
              className="hover:bg-destructive/10 hover:text-destructive h-8 w-8 p-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {experiment.description}
        </CardDescription>
        
        {experiment.methodology && (
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Methodology</h4>
            <p className="text-xs text-muted-foreground line-clamp-2">{experiment.methodology}</p>
          </div>
        )}
        
        {experiment.results && (
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Results</h4>
            <p className="text-xs text-muted-foreground line-clamp-2">{experiment.results}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}