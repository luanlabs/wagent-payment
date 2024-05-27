import CSelect from './components/CSelect';
import { OptionType } from './models';

export default function App() {
  const handleSelectChange = (item: OptionType | null) => {
    console.log(item?.value);
  };
  return (
    <div className="p-4">
      <h1 className="text-3xl font-normal">Wagent</h1>
      <h1 className="text-3xl font-medium">Wagent</h1>
      <h1 className="text-3xl font-semibold">Wagent</h1>

      <div className="flex justify-between items-center">
        <span>
          <p className="text-xl font-medium"> Select token</p>
          <p className="text-lg text-cadetBlue">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </span>
        <div className="w-1/4">
          <CSelect onChange={handleSelectChange} />
        </div>
      </div>
    </div>
  );
}
