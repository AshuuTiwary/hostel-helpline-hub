import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, ArrowLeft, ArrowRight, Check, Upload, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ComplaintCategory, ComplaintPriority } from "@/types/complaint";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

const SubmitComplaint = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedId, setGeneratedId] = useState("");

  const [formData, setFormData] = useState({
    category: "" as ComplaintCategory | "",
    priority: "Medium" as ComplaintPriority,
    title: "",
    description: "",
    name: "",
    email: "",
    phone: "",
    rollNumber: "",
    branch: "",
    semester: "",
    isAnonymous: false,
    attachments: [] as File[],
  });

  const categories: ComplaintCategory[] = [
    "Electricity",
    "Washroom",
    "Room Accommodation",
    "Mess Food",
    "Mental Health",
    "Harassment & Violence",
    "Safety",
    "Financial",
    "Academic",
    "Other",
  ];

  const handleNext = () => {
    if (step === 1 && !formData.category) {
      toast.error("Please select a category");
      return;
    }
    if (step === 2 && (!formData.name || !formData.email || !formData.rollNumber)) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (step === 3 && (!formData.title || !formData.description)) {
      toast.error("Please provide title and description");
      return;
    }
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 5);
      setFormData({ ...formData, attachments: files });
    }
  };

  const removeFile = (index: number) => {
    const newAttachments = formData.attachments.filter((_, i) => i !== index);
    setFormData({ ...formData, attachments: newAttachments });
  };

  const handleSubmit = () => {
    // Generate complaint ID
    const id = `COMP-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;
    setGeneratedId(id);
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate("/student/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
        <div className="mx-auto max-w-3xl">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center flex-1">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      i <= step
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground"
                    }`}
                  >
                    {i < step ? <Check className="h-5 w-5" /> : i}
                  </div>
                  {i < 4 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 ${
                        i < step ? "bg-primary" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Category</span>
              <span>Personal Info</span>
              <span>Details</span>
              <span>Review</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 && "Select Category"}
                {step === 2 && "Personal Information"}
                {step === 3 && "Complaint Details"}
                {step === 4 && "Review & Submit"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Choose the category that best describes your issue"}
                {step === 2 && "Provide your contact information"}
                {step === 3 && "Describe the issue in detail"}
                {step === 4 && "Review your complaint before submitting"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Step 1: Category */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setFormData({ ...formData, category })}
                        className={`p-4 text-left rounded-lg border-2 transition-all ${
                          formData.category === category
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="font-medium">{category}</div>
                      </button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value: ComplaintPriority) =>
                        setFormData({ ...formData, priority: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 2: Personal Info */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rollNumber">Roll Number *</Label>
                      <Input
                        id="rollNumber"
                        value={formData.rollNumber}
                        onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                        placeholder="e.g., 20CS1234"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">College Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="student@college.edu"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91-9876543210"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="branch">Branch</Label>
                      <Input
                        id="branch"
                        value={formData.branch}
                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                        placeholder="e.g., Computer Science"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="semester">Semester</Label>
                      <Input
                        id="semester"
                        type="number"
                        value={formData.semester}
                        onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                        placeholder="1-8"
                        min="1"
                        max="8"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Details */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Complaint Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Brief summary of the issue"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Provide detailed information about the issue"
                      className="min-h-[150px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="attachments">Attachments (Max 5 files, 10MB each)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="attachments"
                        type="file"
                        multiple
                        accept=".jpg,.jpeg,.png,.pdf,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("attachments")?.click()}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Choose Files
                      </Button>
                    </div>
                    {formData.attachments.length > 0 && (
                      <div className="space-y-2 mt-2">
                        {formData.attachments.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 rounded-md border"
                          >
                            <span className="text-sm truncate flex-1">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Category & Priority</h3>
                      <p className="text-sm text-muted-foreground">
                        {formData.category} • {formData.priority} Priority
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Personal Information</h3>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>{formData.name} ({formData.rollNumber})</p>
                        <p>{formData.email}</p>
                        {formData.phone && <p>{formData.phone}</p>}
                        <p>{formData.branch} • Semester {formData.semester}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Complaint Details</h3>
                      <p className="font-medium text-sm mb-1">{formData.title}</p>
                      <p className="text-sm text-muted-foreground">{formData.description}</p>
                    </div>
                    {formData.attachments.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2">Attachments</h3>
                        <p className="text-sm text-muted-foreground">
                          {formData.attachments.length} file(s) attached
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                )}
                {step < 4 ? (
                  <Button type="button" onClick={handleNext} className="ml-auto">
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="button" onClick={handleSubmit} className="ml-auto">
                    <Check className="mr-2 h-4 w-4" />
                    Submit Complaint
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Check className="h-8 w-8 text-primary" />
              </div>
            </div>
            <DialogTitle className="text-center">Complaint Submitted Successfully!</DialogTitle>
            <DialogDescription className="text-center space-y-2">
              <p>Your complaint has been registered with ID:</p>
              <p className="text-lg font-semibold text-foreground">{generatedId}</p>
              <p className="text-sm">
                You will receive updates via email and can track the status from your dashboard.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 mt-4">
            <Button asChild variant="outline" className="flex-1">
              <Link to={`/student/complaint/${generatedId}`}>View Complaint</Link>
            </Button>
            <Button onClick={handleSuccessClose} className="flex-1">
              Go to Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubmitComplaint;
