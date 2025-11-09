import { Badge } from "@/components/ui/badge";
import { ComplaintStatus } from "@/types/complaint";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: ComplaintStatus;
  actionCount?: number;
  className?: string;
}

export const StatusBadge = ({ status, actionCount = 0, className }: StatusBadgeProps) => {
  const getStatusDisplay = () => {
    if (status === "resolved") {
      return {
        label: "Resolved",
        className: "bg-status-resolved text-status-resolved-foreground hover:bg-status-resolved/90",
      };
    }
    
    if (status === "no-action" || actionCount === 0) {
      return {
        label: "No Action",
        className: "bg-status-no-action text-status-no-action-foreground hover:bg-status-no-action/90",
      };
    }
    
    if (actionCount >= 1 && actionCount <= 3) {
      return {
        label: "Few Actions",
        className: "bg-status-few-actions text-status-few-actions-foreground hover:bg-status-few-actions/90",
      };
    }
    
    if (actionCount > 3) {
      return {
        label: "Many Actions",
        className: "bg-status-many-actions text-status-many-actions-foreground hover:bg-status-many-actions/90",
      };
    }
    
    if (status === "escalated") {
      return {
        label: "Escalated",
        className: "bg-status-escalated text-status-escalated-foreground hover:bg-status-escalated/90",
      };
    }
    
    if (status === "inprogress") {
      return {
        label: "In Progress",
        className: "bg-status-inprogress text-status-inprogress-foreground hover:bg-status-inprogress/90",
      };
    }
    
    return {
      label: "Pending",
      className: "bg-status-pending text-status-pending-foreground hover:bg-status-pending/90",
    };
  };

  const { label, className: statusClassName } = getStatusDisplay();

  return (
    <Badge className={cn(statusClassName, className)}>
      {label}
    </Badge>
  );
};
