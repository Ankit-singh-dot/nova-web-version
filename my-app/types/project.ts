export interface ProjectMessage {
  id: string;
  sender: "user" | "nova";
  text: string;
  timestamp: string;
  files?: { name: string; lines: number; type?: string }[];
}

export interface ProjectFile {
  name: string;
  code: string;
}

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  status: "live" | "draft" | "building";
  timestamp: string;
  lastMessage: string;
  tags: string[];
  url: string;
  previewType: "agency" | "saas" | "fintech" | "minimal" | "custom";
  messages: ProjectMessage[];
  files: ProjectFile[];
}
