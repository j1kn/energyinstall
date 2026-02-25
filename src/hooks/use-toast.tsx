import { useState, useEffect } from 'react';

interface Toast {
  id: string;
  title: string;
  description?: string;
}

let toastListeners: ((toasts: Toast[]) => void)[] = [];
let toasts: Toast[] = [];

const notifyListeners = () => {
  toastListeners.forEach((listener) => listener([...toasts]));
};

export const showToast = ({ title, description }: { title: string; description?: string }) => {
  const id = Math.random().toString(36).substring(2, 9);
  const newToast = { id, title, description };
  toasts = [...toasts, newToast];
  notifyListeners();

  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    notifyListeners();
  }, 5000);
};

export const useToast = () => {
  return {
    toast: showToast,
  };
};

export const Toaster = () => {
  const [localToasts, setLocalToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const listener = (newToasts: Toast[]) => setLocalToasts([...newToasts]);
    toastListeners.push(listener);
    setLocalToasts([...toasts]);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== listener);
    };
  }, []);

  if (localToasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {localToasts.map((t) => (
        <div
          key={t.id}
          className="bg-[#242424] border border-[#f2c500]/30 rounded-lg p-4 shadow-xl min-w-[300px]"
        >
          <h4 className="text-white font-semibold">{t.title}</h4>
          {t.description && <p className="text-[#c2c2c2] text-sm mt-1">{t.description}</p>}
        </div>
      ))}
    </div>
  );
};
