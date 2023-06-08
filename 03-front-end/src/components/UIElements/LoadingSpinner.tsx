interface LoadingSpinnerProps {
  noOverlay?: boolean;
}

const LoadingSpinner = ({ noOverlay }: LoadingSpinnerProps) => {
  if (noOverlay) {
    return (
      <div className="h-full w-full flex items-center justify-center m-[0.625rem]">
        <div className="flex items-center justify-center space-x-2 animate-bounce">
          <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
          <div className="w-8 h-8 bg-green-400 rounded-full"></div>
          <div className="w-8 h-8 bg-black rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
      <div className="flex items-center justify-center space-x-2 animate-bounce">
        <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
        <div className="w-8 h-8 bg-green-400 rounded-full"></div>
        <div className="w-8 h-8 bg-black rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
