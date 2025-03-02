import Swal from 'sweetalert2';

const ErrorNotification = ({
  text,
  title,
}: {
  text: string;
  title: string;
}) => {
  Swal.fire({
    title: title,
    text: text,
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
};

export default ErrorNotification;
