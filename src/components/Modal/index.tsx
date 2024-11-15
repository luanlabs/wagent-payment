import { ReactNode } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';

interface CModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const CModal = ({ isOpen, onClose, title, children }: CModalProps) => {
  return (
    <Transition show={isOpen}>
      <Dialog as="div" className="relative !z-[9999]" onClose={onClose}>
        <Transition
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
              <DialogTitle className="text-xl font-semibold text-gray-800">{title}</DialogTitle>
              <div className="mt-4">{children}</div>
            </DialogPanel>
          </Transition>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CModal;
