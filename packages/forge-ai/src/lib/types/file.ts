export interface FileAttachment {
  id: string;
  filename: string;
  size: number;
  mimeType: string;
  timestamp: number;
  uploading?: boolean;
  progress?: number;
  status?: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
  fileId?: string;
}

export interface UploadedFileMetadata {
  fileId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
}

export interface FileUploadCallbacks {
  updateProgress: (progress: number) => void;
  markComplete: (metadata: UploadedFileMetadata) => void;
  markError: (error: string) => void;
  onAbort: (callback: () => void) => void;
}

export type FileUploadHandler = (file: File, callbacks: FileUploadCallbacks) => Promise<void> | void;

export interface FileRemoveCallbacks {
  onSuccess: () => void;
  onError: (error: string) => void;
}

export interface FileRemoveEvent extends FileRemoveCallbacks {
  fileId: string;
}

export interface FileUploadEvent extends FileUploadCallbacks {
  file: File;
}
