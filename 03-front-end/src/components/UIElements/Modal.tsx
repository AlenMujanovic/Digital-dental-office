import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  className?: string;
  title: string;
}

const Modal = ({ children, open, onClose, className, title }: ModalProps) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="max-w-2xl mx-auto">
      <div className={`${className} fixed h-full top-0 left-0 right-0 md:inset-0 z-50 justify-center items-center bg-[rgba(75,75,75,0.1)]`}>
        <div className="relative w-full max-w-4xl px-4 h-full md:h-auto mx-auto top-[20%]">
          <div className="bg-white rounded-lg shadow relative">
            <div className="flex items-start justify-between p-5 border-b rounded-t">
              <h1 className="font-medium text-2xl">{title}</h1>
              <button
                onClick={onClose}
                type="button"
                className="rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="default-modal">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="px-5 sm:px-16 py-5 space-y-6">{children}</div>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector('#modal')!
  );
};

export default Modal;
