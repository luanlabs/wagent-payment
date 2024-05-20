import CRadioButtons from './Components/CRadioTab';

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

      <CRadioButtons tabs={tabs} defaultSelectedTab={tabs[1].value} className="w-[300px]" />
    </>
  );
}
