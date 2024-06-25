import React from 'react';

type CItemFieldProps = {
  title: string;
  description: string;
  component: React.ReactNode;
};

const CItemField = ({ title, description, component }: CItemFieldProps) => {
  return (
    <div className="between mobile:flex-col mobile:items-start gap-2">
      <span className="select-none">
        <p className="text-base font-medium">{title}</p>
        <p className="text-sm text-cadetBlue">{description}</p>
      </span>
      <div className="mobile:w-full w-1/3">{component}</div>
    </div>
  );
};

export default CItemField;
