import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Calendar } from "lucide-react";
import { Experiment } from "@/types";

interface ExperimentCardProps {
  experiment: Experiment;
  onEdit: (experiment: Experiment) => void;
  onDelete: (id: string) => void;
}

export function ExperimentCard({ experiment, onEdit, onDelete }: ExperimentCardProps) {
  return (
    <Card className="bg-gradient-card hover:shadow-card transition-all duration-300 hover:scale-[1.02] border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold text-foreground">
              {experiment.title}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {new Date(experiment.createdAt).toLocaleDateString()}
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(experiment)}
              className="hover:bg-primary/10"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(experiment.id)}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="text-sm text-muted-foreground leading-relaxed">
          {experiment.description}
        </CardDescription>
        
        {experiment.methodology && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Methodology</h4>
            <p className="text-sm text-muted-foreground">{experiment.methodology}</p>
          </div>
        )}
        
        {experiment.results && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Results</h4>
            <p className="text-sm text-muted-foreground">{experiment.results}</p>
          </div>
        )}

        {experiment.status && (
          <div className="flex items-center gap-2">
            <Badge 
              variant={experiment.status === 'completed' ? 'default' : 'secondary'}
              className="text-xs"
            >
              {experiment.status}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}