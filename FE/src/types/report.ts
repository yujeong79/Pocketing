export interface ReportRequest {
  type: string;
  groupId: number;
  memberId?: number;
  albumId?: number;
  missingTitle?: string;
  image?: File;
}
