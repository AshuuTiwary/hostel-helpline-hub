import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Shield, LogOut, Search, Filter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { mockComplaints } from "@/lib/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const handleLogout = async () => {
    const { supabase } = await import("@/integrations/supabase/client");
    await supabase.auth.signOut();
    navigate("/");
  };

  const filteredComplaints = useMemo(() => {
    return mockComplaints.filter((complaint) => {
      const matchesSearch =
        complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        complaint.studentName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || complaint.status === statusFilter;

      const matchesCategory =
        categoryFilter === "all" || complaint.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchQuery, statusFilter, categoryFilter]);

  const stats = {
    total: mockComplaints.length,
    pending: mockComplaints.filter((c) => c.status === "pending").length,
    inProgress: mockComplaints.filter((c) => c.status === "inprogress").length,
    resolved: mockComplaints.filter((c) => c.status === "resolved").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Admin Dashboard</span>
          </Link>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Complaints
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inProgress}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Resolved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.resolved}</div>
            </CardContent>
          </Card>
        </div>

        {/* Complaints Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>All Complaints</CardTitle>
                  <CardDescription>Manage and track all hostel complaints</CardDescription>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search complaints..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inprogress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="escalated">Escalated</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Electricity">Electricity</SelectItem>
                    <SelectItem value="Washroom">Washroom</SelectItem>
                    <SelectItem value="Mess Food">Mess Food</SelectItem>
                    <SelectItem value="Room Accommodation">Room Accommodation</SelectItem>
                    <SelectItem value="Safety">Safety</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-3 text-left text-sm font-medium">ID</th>
                      <th className="p-3 text-left text-sm font-medium">Title</th>
                      <th className="p-3 text-left text-sm font-medium">Student</th>
                      <th className="p-3 text-left text-sm font-medium">Category</th>
                      <th className="p-3 text-left text-sm font-medium">Status</th>
                      <th className="p-3 text-left text-sm font-medium">Date</th>
                      <th className="p-3 text-left text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredComplaints.map((complaint) => (
                      <tr key={complaint.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="p-3 text-sm font-mono">{complaint.id}</td>
                        <td className="p-3 text-sm max-w-xs truncate">{complaint.title}</td>
                        <td className="p-3 text-sm">
                          {complaint.isAnonymous ? "Anonymous" : complaint.studentName}
                        </td>
                        <td className="p-3 text-sm">{complaint.category}</td>
                        <td className="p-3">
                          <StatusBadge 
                            status={complaint.status} 
                            actionCount={complaint.actionCount} 
                          />
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">
                          {format(complaint.createdAt, "MMM d, yyyy")}
                        </td>
                        <td className="p-3">
                          <Button asChild variant="ghost" size="sm">
                            <Link to={`/admin/complaint/${complaint.id}`}>View</Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
