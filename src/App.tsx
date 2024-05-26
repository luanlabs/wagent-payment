import CSelect from './components/CSelect';

export default function App() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-normal">Wagent</h1>
      <h1 className="text-3xl font-medium">Wagent</h1>
      <h1 className="text-3xl font-semibold">Wagent</h1>

      <div className="flex justify-between items-center">
        <span>
          <p className="text-2xl font-medium"> Select token</p>
          <p className="text-xl text-cadetBlue">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </span>
        <div className="w-1/4">
          <CSelect />
        </div>
      </div>
    </div>
  );
}
