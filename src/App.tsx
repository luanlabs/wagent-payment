import CRadioButtonGroup from './Components/CRadioButtonGroup';

export default function App() {
  const tabs = [
    { value: 'stream', label: 'Stream' },
    { value: 'single', label: 'Single' },
    { value: 'vesting', label: 'Vesting' },
  ];
  return (
    <>
      <h1 className="text-3xl font-normal">Wagent</h1>
      <h1 className="text-3xl font-medium">Wagent</h1>
      <h1 className="text-3xl font-semibold">Wagent</h1>

      <div className="w-[300px]">
        <CRadioButtonGroup tabs={tabs} defaultSelectedTab={tabs[0].value} />
      </div>
    </>
  );
}
