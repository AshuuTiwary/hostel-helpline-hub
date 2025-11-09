export type ComplaintCategory =
  | "Electricity"
  | "Washroom"
  | "Room Accommodation"
  | "Mess Food"
  | "Mental Health"
  | "Harassment & Violence"
  | "Safety"
  | "Financial"
  | "Academic"
  | "Other";

export type ComplaintPriority = "Low" | "Medium" | "High";

export type ComplaintStatus = 
  | "pending"
  | "inprogress"
  | "resolved"
  | "no-action"
  | "escalated";

export interface ComplaintAttachment {
  id: string;
  filename: string;
  size: number;
  type: string;
  url?: string;
}

export interface ComplaintAction {
  id: string;
  complaintId: string;
  actorName: string;
  actorRole: string;
  actionType: "comment" | "forward" | "status_change" | "resolve";
  comment: string;
  timestamp: Date;
  attachments?: ComplaintAttachment[];
}

export interface Complaint {
  id: string;
  title: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  description: string;
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
  rollNumber: string;
  branch: string;
  semester: number;
  status: ComplaintStatus;
  isAnonymous: boolean;
  attachments: ComplaintAttachment[];
  actions: ComplaintAction[];
  actionCount: number;
  forwardedTo?: string[];
  createdAt: Date;
  updatedAt: Date;
  slaDeadline: Date;
  resolvedAt?: Date;
}
