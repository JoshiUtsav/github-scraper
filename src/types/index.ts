export interface ProjectData {
  id: string;
  name: string;
  description: string;
  url: string;
  stars: number;
  topics: string[];
  lastUpdated: string;
  language: string;
  owner: string;
}

export interface DatabaseAdapter {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  upsertProjects(projects: ProjectData[]): Promise<void>;
  getProjects(): Promise<ProjectData[]>;
}
