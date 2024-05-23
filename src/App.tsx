import CConnectWallet from './Components/CConnetWallet';
import MySorobanReactProvider from './Components/CConnetWallet/MySorobanReactProvider';

export default function App() {
  return (
    <>
      <h1 className="text-3xl font-normal">Wagent</h1>
      <h1 className="text-3xl font-medium">Wagent</h1>
      <h1 className="text-3xl font-semibold">Wagent</h1>
      <div className="w-[247px]">
        <MySorobanReactProvider>
          <CConnectWallet />
        </MySorobanReactProvider>
      </div>
    </>
  );
}
