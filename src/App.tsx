import CButton from './components/CButton';
import CConnectWallet from './components/CConnectWallet';

export default function App() {
  return (
    <>
      <h1 className="text-3xl font-normal">Wagent</h1>
      <h1 className="text-3xl font-medium">Wagent</h1>
      <h1 className="text-3xl font-semibold">Wagent</h1>

      <div className="p-4">
        <div className="w-[247px]">
          <CConnectWallet />
        </div>

        <div className="flex w-[50%] space-x-2 mt-2">
          <CButton variant="bordered" text="Cancel Order" className="w-[50%]" />
          <CButton variant="confirm" text="Confirm Payment" />
        </div>
      </div>
    </>
  );
}
