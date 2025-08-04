
export interface ImprovementPoint {
  point: string;
  isVisualizable: boolean;
}

export interface AuditSection {
  title: string;
  explanation: string;
  score: number;
  positivePoints: string[];
  areasForImprovement: ImprovementPoint[];
}

export interface AuditReport {
  overallScore: number;
  summary: string;
  sections: AuditSection[];
}

export interface GroundingSource {
  web: {
    uri: string;
    title: string;
  };
}

export interface AuditData {
    audit: AuditReport;
    sources: GroundingSource[];
}