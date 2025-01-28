import counterClockwise from '/images/counterClockwise.svg';

const CanceledBox = () => {
  return (
    <div className="desktop:w-[410px] mobile:w-full mobile:mx-4 py-10 px-6 bg-white shadow-box rounded-2xl flex flex-col items-center justify-center">
      <img src={counterClockwise} alt="Order Canceled" draggable={false} className="mb-4" />
      <h2 className="text-[#D92D20] text-2xl mobile:text-xl font-[Aeonik-m] mb-2">
        Order Canceled
      </h2>
      <p className="text-[#475467] text-center text-sm mobile:text-xs leading-6">
        Unfortunately, your order has been canceled. If you need more information, please contact
        support.
      </p>
    </div>
  );
};

export default CanceledBox;
