import { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';

import CButton from '../../components/CButton';
import CancelOrderModal from '../../components/Modals/CancelOrderModal/index.tsx';

import Info from '../../assets/Info';
import wagentLogo from '/images/logoTypeDark.svg';
import ArrowTopRight from '../../assets/ArrowTopRight.ts';

import { StatusType } from '../../models.ts';

type HeaderProps = {
  isExpired?: boolean;
  orderId: string;
  orderStatus: StatusType;
};

const Header = ({ orderId, orderStatus }: HeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const isExpired = orderStatus === 'pending';

  return (
    <header className="flex justify-between px-[50px] py-9 mb-5 w-full mobile:px-4">
      <img src={wagentLogo} alt="wagentLogo" draggable={false} className=" mobile:w-[100px]" />
      <div className="flex justify-center items-center w-[15%] mobile:w-[50%]">
        <Menu>
          <MenuButton>
            <CButton variant="bordered" className="!w-auto h-9">
              <Info fill="#475467" />
            </CButton>
          </MenuButton>
          <Transition
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <MenuItems
              anchor="bottom"
              className="-ml-11 mt-1 bg-white rounded-xl w-[126px] px-1 py-2 space-y-[2px]"
            >
              <MenuItem>
                <a
                  className="block px-2 py-1 rounded-md data-[focus]:bg-[#f3f4f6]"
                  href="https://docs.wagent.app"
                >
                  Need help?
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  className="flex items-center px-2 py-1 rounded-md data-[focus]:bg-[#f3f4f6] text-[#008B5B]"
                  href="/"
                >
                  <p>Buy crypto</p>
                  <ArrowTopRight />
                </a>
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>

        {isExpired ? (
          <>
            <CButton
              variant="bordered"
              text="Cancel order"
              className="whitespace-nowrap ml-3 h-9 center"
              onClick={handleOpenModal}
            />

            <CancelOrderModal isOpen={isModalOpen} onClose={handleClose} orderId={orderId} />
          </>
        ) : (
          ''
        )}
      </div>
    </header>
  );
};

export default Header;
