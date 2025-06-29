// bot_dashboard_frontend/src/components/BotBuilder.tsx

"use client"

import type React from "react"

import { useState, useRef, useEffect, ChangeEvent, DragEvent } from "react"
import { Upload, FileText, Trash2, Database, Download, MoreHorizontal, UserPlus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { toast } from "@/lib/toast"

interface Document {
  id: string
  name: string
  size: string
  role: string
  roleColor: string
  status: string
  progress?: number
}

interface UploadData {
  file: File;
  name: string;
  role: string;
  metadata: string;
}

const ROLE_COLORS = {
  Manager: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
  Assistant: { bg: "bg-green-100", text: "text-green-700", border: "border-green-200" },
  Expert: { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200" },
  Admin: { bg: "bg-red-100", text: "text-red-700", border: "border-red-200" },
  Viewer: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200" },
}

export default function BotBuilder() {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadData, setUploadData] = useState<Partial<UploadData>>({
    name: '',
    role: 'viewer',
    metadata: ''
  });
  const [documents, setDocuments] = useState<Document[]>([])
  const [previewFile, setPreviewFile] = useState<string | null>(null)
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false)
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState("Viewer")
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // New ref for the dropdown menu
  const dropdownRef = useRef<HTMLDivElement>(null); // ADD THIS LINE
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      // Set default name to filename without extension
      const fileName = e.target.files[0].name.replace(/\.[^/.]+$/, '');
      setUploadData(prev => ({
        ...prev,
        name: prev.name || fileName
      }));
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
        const fileName = file.name.replace(/\.[^/.]+$/, '');
        setUploadData(prev => ({
          ...prev,
          name: prev.name || fileName
        }));
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUploadData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (value: string) => {
    setUploadData(prev => ({
      ...prev,
      role: value
    }));
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload', {
        position: 'top-center',
        duration: 3000
      });
      return;
    }
    
    if (!uploadData.name) {
      toast.error('Please enter a name for the file', {
        position: 'top-center',
        duration: 3000
      });
      return;
    }

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('name', uploadData.name);
      formData.append('role', uploadData.role || 'viewer');
      formData.append('metadata', uploadData.metadata || '');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to upload file');
      }
      
      // Refresh the file list from server to include the newly uploaded file
      await fetchFiles();
      
      setSelectedFile(null);
      setUploadData({
        name: '',
        role: 'viewer',
        metadata: ''
      });
      
      toast.success(`File "${selectedFile.name}" uploaded successfully`, {
        position: 'top-center',
        duration: 3000
      });
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload file';
      toast.error(errorMessage, {
        position: 'top-center',
        duration: 3000
      });
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  }

  // Function to fetch files from the server
  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/files');
      if (response.ok) {
        const data = await response.json();
        const docs = data.files.map((filename: string) => ({
          id: filename,
          name: filename,
          size: '??.??mb', // TODO: hardcoded
          role: 'Viewer', // TODO: hardcoded
          roleColor: 'blue', // TODO: hardcoded
          status: 'Processed' // TODO: hardcoded
        }));
        setDocuments(docs);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };  

  // Fetch files on component mount
  useEffect(() => {
    fetchFiles();
  }, []);

  const handleDeleteDoc = async (id: string) => {
    try {
      const response = await fetch(`/api/delete/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setDocuments(prev => prev.filter(doc => doc.id !== id));
        toast.success('File deleted successfully');
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete file');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete file';
      toast.error(errorMessage);
    }
  }

  const handleDialogOpenChange = (open: boolean) => {
    setIsRoleDialogOpen(open);
    if (!open) {
      setSelectedDocId(null);
      setSelectedRole("");
    }
  };

  const handleOpenRoleDialog = (id: string) => {
    setSelectedDocId(id)
    const doc = documents.find((d) => d.id === id)
    if (doc) setSelectedRole(doc.role)
    setIsRoleDialogOpen(true)
  }

  const handleAssignRole = () => {
    if (!selectedDocId || !selectedRole) return

    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === selectedDocId
          ? {
              ...doc,
              role: selectedRole,
              roleColor:
                ROLE_COLORS[selectedRole as keyof typeof ROLE_COLORS]?.text.replace("text-", "").replace("-700", "") ||
                "blue",
            }
          : doc,
      ),
    )
    setIsRoleDialogOpen(false)
  }

  // Effect to handle clicks outside the dropdown
  useEffect(() => { // ADD THIS useEffect BLOCK
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the dropdown is open and if the click is outside the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null); // Close the dropdown
      }
    };

    // Attach the event listener when a dropdown is open
    if (openDropdownId) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      // Clean up the event listener when no dropdown is open
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup function: remove the event listener when the component unmounts
    // or when openDropdownId changes such that no dropdown is open
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdownId]); // Re-run effect when openDropdownId changes


  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-800">
      <main className="flex-grow w-full p-3">
        <div className="grid grid-cols-12 gap-3 mb-3">
          {/* Upload Knowledge Base Form */}
          <div className="col-span-6">
            <Card className="border border-slate-200 bg-white shadow-sm rounded-lg overflow-hidden h-full">
              <CardHeader className="border-b border-slate-200 bg-slate-50 px-4 py-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xs font-semibold text-slate-800 flex items-center">
                      <Upload className="mr-1 h-3 w-3 text-blue-600" />
                      Upload Knowledge base / PDF
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-3 space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="pdfName" className="text-xs font-medium text-slate-700">
                    PDF Name
                  </Label>
                  <Input
                    id="pdfName"
                    name="name"
                    value={uploadData.name || ''}
                    onChange={handleInputChange}
                    className="border-slate-300 text-slate-800 h-7 text-xs"
                    placeholder="Enter PDF name"
                    disabled={isUploading}
                  />
                </div>

                <div className="space-y-1 w-full">
                  <Label htmlFor="role" className="text-xs font-medium text-slate-700">
                    Role
                  </Label>
                  <Select 
                    value={uploadData.role}
                    onValueChange={handleRoleChange}
                    disabled={isUploading}
                  >
                    <SelectTrigger className="border-slate-300 text-slate-800 h-7 text-xs w-full">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="admin" className="hover:bg-slate-100 cursor-pointer">Administrator</SelectItem>
                      <SelectItem value="editor" className="hover:bg-slate-100 cursor-pointer">Editor</SelectItem>
                      <SelectItem value="viewer" className="hover:bg-slate-100 cursor-pointer">Viewer</SelectItem>
                      <SelectItem value="guest" className="hover:bg-slate-100 cursor-pointer">Guest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="metadata" className="text-xs font-medium text-slate-700">
                      Metadata
                    </Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={handleFileUpload}
                      disabled={!selectedFile || isUploading}
                    >
                      {isUploading ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-3 w-3 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Uploading...
                        </span>
                      ) : (
                        "Upload File"
                      )}
                    </Button>
                  </div>
                  <Textarea
                    id="metadata"
                    name="metadata"
                    value={uploadData.metadata || ''}
                    onChange={handleInputChange}
                    className="border-slate-300 text-slate-800 h-16 text-xs resize-none"
                    placeholder="Enter metadata information"
                    disabled={isUploading}
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-medium text-slate-700">Upload Section</Label>
                  <div 
                    className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                      selectedFile 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-slate-300 bg-slate-50 hover:border-blue-400'
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRef.current?.click()}
                    style={{ cursor: 'pointer' }}
                  >
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf"
                      className="hidden"
                      ref={fileInputRef}
                      disabled={isUploading}
                    />
                    <Upload className={`h-4 w-4 mx-auto mb-2 ${selectedFile ? 'text-green-500' : 'text-slate-400'}`} />
                    <h3 className="text-xs font-medium text-slate-800 mb-1">
                      {selectedFile ? selectedFile.name : 'Upload Documents'}
                    </h3>
                    <p className="text-[10px] text-slate-500 mb-2">
                      {selectedFile 
                        ? `Selected: ${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` 
                        : 'Drag and drop files here or click to browse'}
                    </p>
                    <Button 
                      type="button"
                      size="sm" 
                      className="h-6 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3"
                      disabled={isUploading}
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                    >
                      {selectedFile ? 'Change File' : 'Browse Files'}
                    </Button>
                    <p className="text-[10px] text-slate-500 mt-2">Supports PDF, DOCX, TXT, CSV, MD (max 50MB)</p>
                  </div>
                </div>

                <div className="pt-2">
                  <Button 
                    type="button"
                    size="sm" 
                    className="w-full h-7 bg-slate-800 hover:bg-slate-900 text-white text-xs"
                    onClick={handleFileUpload}
                    disabled={!selectedFile || isUploading}
                  >
                    {isUploading ? 'Uploading...' : 'Submit'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Current Knowledge Base List */}
          <div className="col-span-6">
            <Card className="border border-slate-200 bg-white shadow-sm rounded-lg overflow-hidden h-full">
              <CardHeader className="border-b border-slate-200 bg-slate-50 px-4 py-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xs font-semibold text-slate-800 flex items-center">
                      <Database className="mr-1 h-3 w-3 text-blue-600" />
                      Current Knowledgebase / PDF list
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-3 h-full">
                <ScrollArea className="h-full">
                  <div className="space-y-2">
                    {documents.map((doc) => {
                      const roleConfig = ROLE_COLORS[doc.role as keyof typeof ROLE_COLORS] || ROLE_COLORS["Viewer"]
                      return (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <div>
                              <div className="relative group">
                                <p 
                                  className="text-xs font-medium text-slate-800 truncate max-w-[200px] cursor-pointer hover:text-blue-600"
                                  onClick={() => setPreviewFile(doc.name)}
                                  title={doc.name}
                                >
                                  {doc.name}
                                </p>
                                <div className="absolute z-10 hidden group-hover:block bg-slate-800 text-white text-xs p-1 rounded whitespace-nowrap">
                                  {doc.name}
                                </div>
                              </div>
                              <p className="text-[10px] text-slate-500">{doc.size}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Badge
                              className={`${roleConfig.bg} ${roleConfig.text} ${roleConfig.border} text-[10px] px-1.5 py-0.5`}
                            >
                              {doc.role}
                            </Badge>
                            <div className="relative"> {/* This div acts as the container for positioning */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 text-slate-400 hover:text-slate-600 hover:bg-transparent"
                                onClick={(e) => {
                                    e.stopPropagation(); // Stop event from propagating to parent document item click
                                    setOpenDropdownId(openDropdownId === doc.id ? null : doc.id);
                                }}
                            >
                                <MoreHorizontal className="h-3 w-3" />
                            </Button>

                            {openDropdownId === doc.id && (
                                <div
                                    ref={dropdownRef} // ADD THIS LINE
                                    className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 shadow-lg rounded-md z-50 py-1"
                                >
                                    <button
                                        className="flex items-center w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpenRoleDialog(doc.id);
                                            setOpenDropdownId(null); // Close dropdown after action
                                        }}
                                    >
                                        <UserPlus className="mr-2 h-3.5 w-3.5" />
                                        <span>Assign Role</span>
                                    </button>
                                    <button
                                        className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteDoc(doc.id);
                                            setOpenDropdownId(null); // Close dropdown after action
                                        }}
                                    >
                                        <Trash2 className="mr-2 h-3.5 w-3.5" />
                                        <span>Delete</span>
                                    </button>
                                </div>
                            )}
                        </div>

                          </div>
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Role Assignment Dialog */}
      <Dialog open={isRoleDialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Assign Role</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {Object.keys(ROLE_COLORS).map((role) => (
                    <SelectItem key={role} value={role} className="hover:bg-slate-100 cursor-pointer">
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAssignRole}>Save changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* PDF Preview Modal */}
      <Dialog open={!!previewFile} onOpenChange={(open) => !open && setPreviewFile(null)}>
        <DialogContent className="max-w-6xl w-[90vw] h-[90vh] flex flex-col p-0 overflow-hidden bg-white">
          <DialogHeader className="px-6 pt-4 pb-2 border-b">
            <DialogTitle className="text-base font-medium truncate max-w-[80%] mx-auto text-center">
              {previewFile}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto p-4 bg-gray-50">
            {previewFile && (
              <div className="w-full h-full flex items-center justify-center">
                {/* Change object to iframe */}
                <iframe
                  src={`/download/${encodeURIComponent(previewFile)}`}
                  title={previewFile}
                  className="w-full h-full min-h-[70vh] border border-slate-200 rounded bg-white shadow-sm"
                  // Optional: Add allowFullScreen if you want to enable fullscreen for the iframe
                  allowFullScreen
                >
                  {/* Fallback content for browsers that don't support iframes or PDF viewing */}
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <p className="text-slate-500 mb-4">
                      Unable to display PDF preview. Your browser might not support direct PDF embedding, or there was an issue loading the file. You can download the file instead.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => window.open(`/download/${encodeURIComponent(previewFile)}`, '_blank')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </iframe>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center px-6 py-3 border-t bg-white">
            <div className="text-sm text-slate-500">
              {previewFile?.split('.').pop()?.toUpperCase()} Document
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`/download/${encodeURIComponent(previewFile || '')}`, '_blank')}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <DialogClose asChild>
                <Button size="sm">Close</Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}