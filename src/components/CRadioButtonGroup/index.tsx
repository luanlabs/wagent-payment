import { useState } from 'react';
import clsx from 'clsx';

import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

interface CRadioButtonGroupProps {
  tabs: string[];
  defaultSelectedTab: string;
  selectableTabs: string[];
  onChange?: (value: string) => void;
}

const CRadioButtonGroup = ({
  tabs,
  defaultSelectedTab,
  selectableTabs,
  onChange,
}: CRadioButtonGroupProps) => {
  const [selectedTab, setSelectedTab] = useState<string>(defaultSelectedTab);

  const handleTabChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = value.target;
    if (selectableTabs.includes(id)) {
      setSelectedTab(id);

      if (onChange) {
        onChange(id);
      }
    }
  };

  return (
    <div>
      <div className={`relative w-full bg-lightGray p-1 flex space-x-1 rounded-[10px]`}>
        {tabs.map((tab) => (
          <label key={tab} className="flex-1 text-center">
            <input
              type="radio"
              id={tab}
              name="tabs"
              className="hidden"
              aria-checked
              onChange={handleTabChange}
            />

            <div
              className={clsx(
                'py-2 cursor-pointer rounded-[7px] transition-background duration-100 select-none text-base border-2 border-transparent',
                {
                  'bg-white font-medium border-2 !border-customGray transition-all duration-300':
                    selectableTabs.includes(tab) && tab === selectedTab,
                  'text-gray': !selectableTabs.includes(tab),
                },
                {
                  'w-full': tabs.length >= 2,
                  'w-[116px]': tabs.length < 2,
                },
              )}
            >
              {capitalizeFirstLetter(tab)}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CRadioButtonGroup;
