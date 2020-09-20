export interface INotesProps {
  city: string;
  deleteNote: (city: string, index: number) => Promise<void>;
  notes?: string[];
  saveNotes: (city: string, note: string, index?: number | null) => Promise<void>;
}
