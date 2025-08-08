import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Calendar, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Suggestion } from "@/types";
import { useState } from "react";

interface SuggestionCardProps {
  suggestion: Suggestion;
  onEdit: (suggestion: Suggestion) => void;
  onDelete: (id: string) => void;
  onClick?: (suggestion: Suggestion) => void;
}

export function SuggestionCard({ suggestion, onEdit, onDelete, onClick }: SuggestionCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    if (onClick) {
      onClick(suggestion);
    } else {
      onEdit(suggestion);
    }
  };

  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  const getPriorityIcon = () => {
    switch (suggestion.priority) {
      case 'high':
        return <AlertCircle className="h-3 w-3 text-destructive" />;
      case 'medium':
        return <Clock className="h-3 w-3 text-orange-500" />;
      case 'low':
        return <CheckCircle className="h-3 w-3 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getPriorityVariant = () => {
    switch (suggestion.priority) {
      case 'high':
        return 'destructive' as const;
      case 'medium':
        return 'secondary' as const;
      case 'low':
        return 'outline' as const;
      default:
        return 'outline' as const;
    }
  };

  const getStatusVariant = () => {
    switch (suggestion.status) {
      case 'implemented':
        return 'default' as const;
      case 'in-progress':
        return 'secondary' as const;
      case 'open':
        return 'outline' as const;
      default:
        return 'outline' as const;
    }
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
              {suggestion.title}
            </CardTitle>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {new Date(suggestion.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getPriorityVariant()} className="text-xs flex items-center gap-1">
                  {getPriorityIcon()}
                  {suggestion.priority}
                </Badge>
                <Badge variant={getStatusVariant()} className="text-xs">
                  {suggestion.status}
                </Badge>
              </div>
            </div>
          </div>
          <div className={`flex gap-1 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => handleActionClick(e, () => onEdit(suggestion))}
              className="hover:bg-primary/10 h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => handleActionClick(e, () => onDelete(suggestion.id))}
              className="hover:bg-destructive/10 hover:text-destructive h-8 w-8 p-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
          {suggestion.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}