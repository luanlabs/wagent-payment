import counterClockwise from '/images/counterClockwise.svg';
import rolling from '/images/rolling.svg';

interface IExpiredBox {
  redirectUrl: string;
}

const ExpiredBox = ({ redirectUrl }: IExpiredBox) => {
  setInterval(() => {
    window.location.href = redirectUrl;
  }, 4000);

  return (
    <div className="desktop:w-[410px] mobile:w-full mobile:mx-4 h-[278px] px-4 bg-white shadow-box rounded-2xl">
      <div className="center flex-col justify-center items-center h-full">
        <img src={counterClockwise} alt="canceled" draggable={false} />
        <p className="text-2xl mobile:text-xl text-[#D92D20] mt-4">Order Expired</p>
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
