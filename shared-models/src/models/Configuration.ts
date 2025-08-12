interface AuditSection {
  dateCreated: string; // ISO date string
  dateModified: string; // ISO date string
  modifiedBy: string | null; // có thể null
}

export interface Approver {
  id: number;
  approverEmail: string;
  order: number;
  auditSection: AuditSection;
}

export interface SystemConfiguration {
  id: number;
  key: string;
  totalApprovers: number;
  min: number;
  max: number;
  approvers: Approver[];
  auditSection: AuditSection;
  value: string;
}
