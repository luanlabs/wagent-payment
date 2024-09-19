import notFound from '../../../public/images/404.png';

const NotFound = () => {
  return (
    <div className="h-screen w-screen bg-white grid place-content-center select-none mobile:px-4">
      <img src={notFound} alt="404" draggable={false} />
      <div className="-mt-2 text-center space-y-4">
        <p className="text-2xl font-medium mobile:text-xl">Page not found</p>
        <p className="text-lg mobile:text-sm text-[#000000B2]">
          Sorry, but we cannot locate your requested page
        </p>
      </div>
    </div>
  );
};

export default NotFound;
