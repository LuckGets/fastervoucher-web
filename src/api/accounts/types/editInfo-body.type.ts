import { Account } from '@/stores/account-store';

export interface EditInfoBody {
  field: keyof Account;
  value: string | number | null;
}
