import React from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Transition } from '@headlessui/react';

interface ModalProps {
  isOpen: boolean;
  className?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const CModal = ({ isOpen, onClose, children, className }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Transition
            show
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-15 backdrop-blur-sm" />
          </Transition>

          <motion.div
            className="fixed inset-0 flex items-center justify-center !z-[9999]"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: {
                type: 'spring',
                stiffness: 200,
                damping: 20,
              },
            }}
            exit={{
              scale: 0.5,
              opacity: 0,
              transition: {
                duration: 0.2,
              },
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                onClose();
              }
            }}
          >
            <div
              className={clsx(`relative p-6 bg-white rounded-2xl shadow-lg max-w-lg`, className)}
            >
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
export default CModal;
