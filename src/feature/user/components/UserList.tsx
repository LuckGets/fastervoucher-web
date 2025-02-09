import { Key, LogOut, Pencil } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { paths } from '@/config/path';
import useAuthStore from '@/stores/auth-store';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';
import useCartStore from '@/stores/cart-store';

const UserList = () => {
  const { actionLogout } = useAuthStore();
  const { clearCart } = useCartStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await actionLogout();
      clearCart();
      Swal.fire({
        title: 'Logout Successful!',
        icon: 'success',
        width: '80%',
        padding: '20px',
        confirmButtonText: 'Ok',
        buttonsStyling: false,
        customClass: {
          popup: 'small-popup',
          confirmButton: 'custom-confirm-button',
        },
      });
      navigate(paths.auth.login.path);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const errorMessage =
        err.response?.data?.message ||
        'An error occurred while logging out. Please try again.';
      Swal.fire({
        title: 'Logout Failed!',
        text: errorMessage,
        icon: 'error',
        width: '80%',
        padding: '20px',
        confirmButtonText: 'Ok',
        buttonsStyling: false,
        customClass: {
          popup: 'small-popup',
          confirmButton: 'custom-confirm-button',
        },
      });
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="mt-6 flex w-full flex-col items-start">
      <Link
        to={paths.user.edit.path}
        className="flex w-full gap-2 rounded-full p-4 py-3 active:bg-[#00000038]"
      >
        <Pencil />
        <p>Edit Profile</p>
      </Link>

      <Link
        to={paths.user.changePassword.path}
        className="flex w-full gap-2 rounded-full p-4 py-3 active:bg-[#00000038]"
      >
        <Key />
        <p>Change Password</p>
      </Link>
      <button
        onClick={handleLogout}
        className="flex w-full gap-2 rounded-full p-4 py-3 active:bg-[#00000038]"
      >
        <LogOut />
        <p>Logout</p>
      </button>
    </div>
  );
};

export default UserList;
