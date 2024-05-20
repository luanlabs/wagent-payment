import { useState } from 'react';

export type CRadioTab = {
  value: string;
  label: string;
};

interface CRadioTabsProps {
  tabs: CRadioTab[];
  defaultSelectedTab: string;
  className?: string;
  onChange?: (value: string) => void;
}

const CRadioTab = ({ tabs, defaultSelectedTab, className, onChange }: CRadioTabsProps) => {
  const [selectedTab, setSelectedTab] = useState<string>(defaultSelectedTab);

  const handleTabChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = value.target;
    setSelectedTab(id);

    if (onChange) {
      onChange(id);
    }
  };

  return (
    <div>
      <div className={`relative bg-lightGray p-1 flex space-x-1 rounded-[10px] ${className}`}>
        {tabs.map((tab) => (
          <label key={tab.value} className="flex-1 text-center">
            <input
              type="radio"
              id={tab.value}
              name="tabs"
              className="hidden"
              onChange={handleTabChange}
            />

            <div
              className={`px-8 py-2 cursor-pointer rounded-[10px] transition-all text-base border border-transparent ${
                selectedTab === tab.value
                  ? 'bg-white border border-1 !border-customGray'
                  : 'text-lightGrayishBlue'
              }`}
            >
              {tab.label}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CRadioTab;
