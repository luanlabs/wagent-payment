import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from '@headlessui/react';
import BottomArrowIcon from '../../assets/BottomArrowIcon';

interface CDisclosureProps {
  title: string;
  subTitle?: string;
  content: React.ReactNode | string;
  icon?: React.ReactNode | string;
  label?: string;
}

const CDisclosure = ({ title, subTitle, content, icon, label }: CDisclosureProps) => {
  return (
    <div>
      {label && <h2 className="mb-4 text-2xl font-medium text-darkBlue">{label}</h2>}
      <div className="w-full rounded-xl bg-offWhite border border-1 border-lightGray">
        <Disclosure as="div" className="py-6" defaultOpen>
          <DisclosureButton className="group w-full flex items-center px-4">
            <div className="flex w-full">
              {icon && (
                <div className="bg-lightGray flex items-center justify-center w-[57px] h-[50px] rounded-[10px] mr-3">
                  {icon}
                </div>
              )}

              <div className="w-full flex flex-col justify-center">
                <div className="flex items-center justify-between w-full">
                  <span className="text-lg font-medium text-red transition-colors group-data-[hover]:text-darkBlue/80">
                    {title}
                  </span>
                  <BottomArrowIcon fill="#000" />
                </div>
                {subTitle && <p className="text-mediumGray text-base text-left">{subTitle}</p>}
              </div>
            </div>
          </DisclosureButton>
          <Transition
            enter="duration-200 ease-out"
            enterFrom="opacity-0 -translate-y-6"
            enterTo="opacity-100 translate-y-0"
            leave="duration-200 ease-out"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-6"
          >
            <DisclosurePanel className="mt-4 text-sm text-darkBlue px-2">{content}</DisclosurePanel>
          </Transition>
        </Disclosure>
      </div>
    </div>
  );
};

export default CDisclosure;
