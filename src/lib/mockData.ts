import { Complaint, ComplaintAction } from "@/types/complaint";

// Generate mock complaints for demonstration
export const generateMockComplaints = (): Complaint[] => {
  const complaints: Complaint[] = [];
  
  const categories = ["Electricity", "Washroom", "Mess Food", "Room Accommodation", "Safety"];
  const statuses = ["pending", "inprogress", "resolved", "no-action"] as const;
  const priorities = ["Low", "Medium", "High"] as const;
  const branches = ["Computer Science", "Electronics", "Mechanical", "Civil"];

  for (let i = 1; i <= 15; i++) {
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 30));
    
    const slaDeadline = new Date(createdAt);
    slaDeadline.setHours(slaDeadline.getHours() + 48);
    
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const actionCount = Math.floor(Math.random() * 6);

    const actions: ComplaintAction[] = [];
    for (let j = 0; j < actionCount; j++) {
      const actionDate = new Date(createdAt);
      actionDate.setHours(actionDate.getHours() + (j + 1) * 12);
      
      actions.push({
        id: `action-${i}-${j}`,
        complaintId: `COMP-${i.toString().padStart(5, '0')}`,
        actorName: j === 0 ? "System" : ["John Electrician", "Mary Warden", "Bob Staff"][j % 3],
        actorRole: j === 0 ? "system" : ["staff", "warden", "staff"][j % 3],
        actionType: ["comment", "forward", "status_change"][j % 3] as any,
        comment: j === 0 
          ? "Complaint received and assigned to concerned staff"
          : `Action taken: ${["Inspected the issue", "Forwarded to maintenance team", "Work in progress", "Issue resolved"][j % 4]}`,
        timestamp: actionDate,
      });
    }

    complaints.push({
      id: `COMP-${i.toString().padStart(5, '0')}`,
      title: [
        "Power outage in Room 301",
        "Leaking tap in washroom",
        "Food quality issue",
        "Broken window pane",
        "Poor lighting in corridor",
      ][i % 5],
      category: categories[i % categories.length] as any,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      description: `Detailed description of the issue reported. This is a sample complaint for demonstration purposes. The actual issue needs immediate attention from the maintenance team.`,
      studentName: `Student ${i}`,
      studentEmail: `student${i}@college.edu`,
      studentPhone: `+91-9876543${i.toString().padStart(3, '0')}`,
      rollNumber: `20CS${i.toString().padStart(4, '0')}`,
      branch: branches[i % branches.length],
      semester: (i % 8) + 1,
      status,
      isAnonymous: false,
      attachments: [],
      actions,
      actionCount,
      forwardedTo: actionCount > 1 ? ["Maintenance Staff", "Warden"] : undefined,
      createdAt,
      updatedAt: new Date(),
      slaDeadline,
      resolvedAt: status === "resolved" ? new Date() : undefined,
    });
  }

  return complaints;
};

export const mockComplaints = generateMockComplaints();
