import CSelect from './components/CSelect';
import useGetPaymentDetails from './hooks/useGetPaymentDetails';
import { OptionType } from './models';
import { tokensToOptions } from './utils/tokensToOptions';

export default function App() {
  const handleSelectChange = (item: OptionType | null) => {
    console.log(item?.value);
  };

  const data = useGetPaymentDetails('1');

  if (!data) {
    return <p>Loading!</p>;
  }
  const tokens = tokensToOptions(data.settings.tokens);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-normal">Wagent</h1>
      <h1 className="text-3xl font-medium">Wagent</h1>
      <h1 className="text-3xl font-semibold">Wagent</h1>

      <div className="flex justify-between items-center">
        <span>
          <p className="text-xl font-medium"> Select token</p>
          <p className="text-lg text-cadetBlue">
            Choose the token you'd like to make transaction with
          </p>
        </span>
        <div className="w-1/4">
          <CSelect onChange={handleSelectChange} options={tokens} />
        </div>
      </div>
    </div>
  );
}
