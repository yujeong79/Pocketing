import { useToastStore } from '@/store/toastStore';
import Toast from './Toast';

const ToastContainer = () => {
  const { visible, type, message, hideToast } = useToastStore();
  if (!visible) return null;

  return <Toast type={type} message={message} onClose={hideToast} />;
};

export default ToastContainer;
