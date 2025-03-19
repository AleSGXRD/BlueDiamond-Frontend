export interface HistoryClient{
  clientId: number;
  date: Date;
  active:boolean;
  note?: string;
}
export interface CreateHistoryClient{
  clientId?: number;
  date?: Date;
  active:boolean;
  note?: string;
}
