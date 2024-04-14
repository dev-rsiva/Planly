import backgroundImg from "./Planly-login-bg-image2.jpg";
import planlyLogo from "../../Planly-workflow-organiser.png";

const Login = () => {
  return (
    <div className="relative">
      {/* <div className="w-full h-full bg-black absolute bg-opacity-20" /> */}

      <div className="h-[100vh]">
        <img className="w-full h-full object-cover" src={backgroundImg} />
      </div>

      <div className="absolute h-12 left-0 top-0 z-30 text-black font-bold text-3xl flex justify-start bg-gradient-to-b from-white to-transparent items-center w-full px-6 py-10">
        <img className="w-10 mr-2" src={planlyLogo} />
        <div>
          <p className="font-sans">Planly</p>
          <p className="font-sans font-normal text-xs py-1 pl-[1px]">
            Your Workflow organizer
          </p>
        </div>
      </div>

      <div className="max-w-[350px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-spread rounded-lg p-6 ">
        <form>
          {/* <h1 className="pl-1 py-4 text-base font-medium text-black text-center my-1">
            Sign In To Continue
          </h1> */}
          <h1 className="text-2xl font-bold pl-1 py-2">Sign In</h1>

          <div className="my-3">
            <input
              type="text"
              className="w-full px-4 py-2 my-1 focus:outline-none border-2 rounded border-slate-300"
              placeholder="Full name"
            />
            <p className="text-xs">At least 5 characters long.</p>
          </div>

          <div className="my-3">
            <input
              type="text"
              className="w-full px-4 py-2 my-1 focus:outline-none border-2 rounded border-slate-300 "
              placeholder="Email Address"
            />
            <p className="text-xs">Eg. example@example.com</p>
          </div>

          <div className="my-3">
            <input
              type="text"
              className="w-full px-4 py-2 my-1 focus:outline-none border-2 rounded border-slate-300"
              placeholder="Email Address"
            />
            <p className="text-xs">
              At least 8 characters, one uppercase letter, one lowercase letter,
              one special character and one number.
            </p>
          </div>

          <div className="my-3">
            <button className="w-full bg-blue-700 text-xl text-white px-4 py-3 font-base my-1 rounded">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
