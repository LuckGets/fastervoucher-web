import { ObjectHelper } from '@/utils/object-helper/object-helper';
import { NavigateFunction } from 'react-router-dom';
import Swal, { SweetAlertOptions } from 'sweetalert2';

const SuccessNotification = ({
  text,
  title,
  timer,
  navigateLink,
}: {
  title: string;
  text: string;
  timer?: number;
  navigateLink?: {
    pageName: string;
    link: string;
    navigateFunc: NavigateFunction;
  };
}) => {
  let html: SweetAlertOptions['html'] = '';
  let timerInterval: number;

  let options: SweetAlertOptions = {
    customClass: {
      popup: 'small-popup',
      confirmButton: 'custom-confirm-button',
    },
    icon: 'success',
    title,
    text,
  };

  if (
    !ObjectHelper.isObjectEmpty(navigateLink) &&
    navigateLink?.link &&
    navigateLink?.pageName
  ) {
    html += `<h2>Process success!<h2><p>Will navigate you to <a href=${navigateLink.link}>${navigateLink?.pageName}</a></p>`;
  }

  if (timer && timer > 0) {
    html += (html ? '<br/>' : '') + 'I will close in <b></b> milliseconds.';
    const timerOptions: SweetAlertOptions = {
      timerProgressBar: true,
      timer: 2000,
      didOpen: () => {
        Swal.showLoading();
        const timerEl = Swal.getPopup()?.querySelector('b') || null;
        if (timerEl) {
          timerInterval = window.setInterval(() => {
            timerEl.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        }
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    };
    options = { ...options, ...timerOptions };
  }
  options.html = html;

  Swal.fire(options).then((result) => {
    if (
      navigateLink &&
      navigateLink.navigateFunc &&
      result.dismiss === Swal.DismissReason.timer
    ) {
      navigateLink.navigateFunc(navigateLink.link);
    }
  });
};

export default SuccessNotification;
