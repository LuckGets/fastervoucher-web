export interface EditInfoBody {
  field: string;
  value: string | number | File | null;
  fileName?: string;
}
