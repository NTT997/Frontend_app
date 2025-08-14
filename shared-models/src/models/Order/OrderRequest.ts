export interface OrderRequestApproval {
    id: number;
    approvedBy: string | null;
    orders: number;
    status: ApprovalStatus;
    approvedTime: string | null;
    approvedNotes: string | null;
};

export interface ApproverRequestItem {
    id: number;
    code: string;
    createdBy: string | null;
    orderId: number;
    createdAt: string;
    listOrderRequestApproval: OrderRequestApproval[];
    configId: number;
    status: ApprovalStatus;
};

export const ApprovalStatus = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
} as const;

export type ApprovalStatus = (typeof ApprovalStatus)[keyof typeof ApprovalStatus];