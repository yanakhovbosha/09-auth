export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  createdAt: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}
export type Tags = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
