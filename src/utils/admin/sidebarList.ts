import { paths } from '../../config/path';
import {
  LayoutDashboard,
  ListOrdered,
  LucideIcon,
  Settings,
  Ticket,
  Users,
} from 'lucide-react';

export interface sideBarList {
  path: string;
  icon: LucideIcon;
  label: string;
}

export const sideBarList: sideBarList[] = [
  {
    path: paths.admin.dashboard.path,
    icon: LayoutDashboard,
    label: paths.admin.dashboard.label,
  },
  {
    path: paths.admin.manage.path,
    icon: ListOrdered,
    label: paths.admin.manage.label,
  },
  {
    path: paths.admin.affiliate.path,
    icon: Users,
    label: paths.admin.affiliate.label,
  },
  {
    path: paths.admin.voucher.path,
    icon: Ticket,
    label: paths.admin.voucher.label,
  },
  {
    path: paths.admin.setting.path,
    icon: Settings,
    label: paths.admin.setting.label,
  },
];
