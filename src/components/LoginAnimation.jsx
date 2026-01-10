import Lottie from "lottie-react";
import loginAnimation from "../animations/DATA SECURITY.json";

const LoginAnimation = () => {
  return (
    <div className="w-full max-w-5xl h-[650px] lg:h-[800px] xl:h-[900px]">
      <Lottie
        animationData={loginAnimation}
        loop
        className="w-full h-full"
      />
    </div>
  );
};

export default LoginAnimation;
