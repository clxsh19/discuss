import { toast } from 'react-toastify';

// General success toast
export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: 'bottom-left',
    autoClose: 3000,
  });
};

// General error toast
export const showErrorToast = (message: string) => {
  toast.error(message, {
    className: 'p-2 text-white rounded-2xl bg-red-600'
  });
};


export const showPromiseToast = (promise: Promise<any>, messages: {
  pending: string;
  success: string;
  error: string;
}) => {
  return toast.promise(promise, {
    pending: {
      render: messages.pending,
      className: 'p-2 rounded-2xl'
    },
    success: {
      render: messages.success,
      className: 'p-2 text-white rounded-2xl bg-green-600'
    },
    error: {
      render: messages.error,
      className: 'p-2 text-white rounded-2xl bg-red-600',
     
    },
  });
};

