import counterClockwise from '/images/counterClockwise.svg';
import rolling from '/images/rolling.svg';

const ExpiredBox = () => {
  return (
    <div className="desktop:w-[404px] mobile:w-full mobile:mx-4 h-[278px]">
      <div className="center flex-col">
        <img src={counterClockwise} alt="canceled" draggable={false} />
        <p className="text-2xl mobile:text-xl text-[#D92D20] font-[Aeonik-m] mt-4">Order Expired</p>
        <p className="text-[#475467] text-center text-base my-2">
          Your order expired as the time to complete it has ended. You’ll be redirected to the main
          website shortly.
        </p>
        <img src={rolling} alt="loading" draggable={false} />
      </div>
    </div>
  );
};

export default ExpiredBox;
