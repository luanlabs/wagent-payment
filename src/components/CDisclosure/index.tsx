import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from '@headlessui/react';
import BottomArrowIcon from '../../assets/BottomArrowIcon';

interface CDisclosureProps {
  title: string;
  subTitle?: string;
  content: React.ReactNode | string;
  icon?: string | undefined;
  label?: string;
}

const CDisclosure = ({ title, subTitle, content, icon, label }: CDisclosureProps) => {
  return (
    <div>
      {label && <h2 className="mb-4 text-2xl font-medium text-darkBlue">{label}</h2>}
      <div className="w-full rounded-xl bg-offWhite border border-1 border-customGray">
        <Disclosure as="div" className="py-6">
          {({ open }) => (
            <>
              <DisclosureButton className="group w-full flex items-center px-4">
                <div className="flex w-full bg-lightGray border rounded-lg border-customGray p-2.5">
                  {icon && (
                    <div className="flex items-center justify-center mr-3">
                      <img src={icon} alt={title} className="rounded-lg" height={40} width={40} />
                    </div>
                  )}
                  <div className="w-full flex flex-col justify-center">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-lg mobile:text-base !font-[Aeonik-m] transition-colors group-data-[hover]:text-darkBlue/80">
                        {title}
                      </span>
                      <BottomArrowIcon fill={open ? '#05DC91' : '#475467'} />
                    </div>
                    {subTitle && <p className="text-mediumGray text-base text-left">{subTitle}</p>}
                  </div>
                </div>
              </DisclosureButton>
              <Transition
                enter="duration-500 ease-in-out"
                enterFrom="max-h-0 opacity-0 -translate-y-4 overflow-hidden"
                enterTo="max-h-screen opacity-100 translate-y-0 overflow-hidden"
                leave="duration-500 ease-in-out"
                leaveFrom="max-h-screen opacity-100 translate-y-0 overflow-hidden"
                leaveTo="max-h-0 opacity-0 -translate-y-4 overflow-hidden"
              >
                <DisclosurePanel className="text-sm text-darkBlue px-4">
                  <div className="mt-4 ">{content}</div>
                </DisclosurePanel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default CDisclosure;
