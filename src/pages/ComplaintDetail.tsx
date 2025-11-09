import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowLeft, Clock, User, Mail, Phone, FileText } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { mockComplaints } from "@/lib/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { format } from "date-fns";

const ComplaintDetail = () => {
  const { id } = useParams();
  const complaint = mockComplaints.find((c) => c.id === id);

  if (!complaint) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Complaint Not Found</h2>
          <p className="text-muted-foreground mt-2">The complaint you're looking for doesn't exist.</p>
          <Button asChild className="mt-4">
            <Link to="/student/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/student/dashboard" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Hostel Portal</span>
          </Link>
          <Button asChild variant="ghost">
            <Link to="/student/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Complaint Summary */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <CardTitle className="text-2xl">{complaint.title}</CardTitle>
                  <CardDescription>Complaint ID: {complaint.id}</CardDescription>
                </div>
                <StatusBadge status={complaint.status} actionCount={complaint.actionCount} />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Category</div>
                  <div className="text-sm">{complaint.category}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Priority</div>
                  <div className="text-sm">{complaint.priority}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Submitted</div>
                  <div className="text-sm flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {format(complaint.createdAt, "PPP p")}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">SLA Deadline</div>
                  <div className="text-sm flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {format(complaint.slaDeadline, "PPP p")}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-2">Description</div>
                <p className="text-sm">{complaint.description}</p>
              </div>

              {!complaint.isAnonymous && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-3">Contact Information</div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{complaint.studentName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{complaint.rollNumber}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{complaint.studentEmail}</span>
                    </div>
                    {complaint.studentPhone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{complaint.studentPhone}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action History */}
          <Card>
            <CardHeader>
              <CardTitle>Action History</CardTitle>
              <CardDescription>
                {complaint.actions.length} action{complaint.actions.length !== 1 ? 's' : ''} recorded
              </CardDescription>
            </CardHeader>
            <CardContent>
              {complaint.actions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No actions recorded yet
                </div>
              ) : (
                <div className="space-y-4">
                  {complaint.actions.map((action, index) => (
                    <div key={action.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Clock className="h-4 w-4" />
                        </div>
                        {index < complaint.actions.length - 1 && (
                          <div className="w-px flex-1 bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{action.actorName}</span>
                          <span className="text-xs text-muted-foreground">
                            • {action.actorRole}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{action.comment}</p>
                        <span className="text-xs text-muted-foreground">
                          {format(action.timestamp, "PPP p")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ComplaintDetail;
