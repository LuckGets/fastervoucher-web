import { paths } from '@/config/path';
import {
  History,
  House,
  ShoppingCart,
  UserRound,
  LucideIcon,
} from 'lucide-react';

interface FooterLink {
  href: string;
  icon: LucideIcon;
  label: string;
}

export const footerLinks: FooterLink[] = [
  {
    href: paths.main.home.path,
    icon: House,
    label: 'Home',
  },
  {
    href: paths.main.cart.path,
    icon: ShoppingCart,
    label: 'Cart',
  },
  {
    href: paths.main.history.path,
    icon: History,
    label: 'History',
  },
  {
    href: paths.main.user.path,
    icon: UserRound,
    label: 'User',
  },
];
