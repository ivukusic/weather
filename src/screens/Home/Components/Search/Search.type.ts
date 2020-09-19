export interface ISearchProps {
  className?: string;
  onSelect: (data: { city?: string; lat?: number; long?: number }) => Promise<{ success: boolean }>;
}
