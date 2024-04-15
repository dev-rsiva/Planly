import backgroundImg from "./Planly-login-bg-image2.jpg";
import planlyLogo from "../../Planly-workflow-organiser.png";
import img1 from "./8451586_3914790.jpg";
import img2 from "./12085888_20944370.jpg";
import { useState, useEffect, useRef } from "react";
import { checkValidData } from "../utills/validate";
import { auth } from "../utills/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { randomAvatar } from "../utills/avatarGenerator";

const Login = ({ setIsUserAuthenticated }) => {
  const [isSignInForm, setIsSignInForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({});
  console.log("userData", userData);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("outhState running");
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log("outhStateChanged", user);
        setIsUserAuthenticated(true);
      } else {
        // User is signed out
        // ...
        console.log("User is signed out");
      }
    });
  }, []);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  console.log(randomAvatar);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleSignInClick = () => {
    //email and password validation
    const message = checkValidData(
      email.current.value,
      password.current.value,
      name.current?.value,
      isSignInForm
    );
    console.log(message);
    //updating the error message, message return null if validation success else return the validation error message when validation fails
    setErrorMessage(message);

    //if message returns null, then validation success and allow code execution futher. If message returns validation error message(Eg.Email ID is not valid) then do not allow code execution further
    if (message) return;

    if (!isSignInForm) {
      //sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);

          // Update user profile
          return updateProfile(user, {
            displayName: name.current.value,
            photoURL: randomAvatar,
          });
        })
        .then(() => {
          // Profile updated successfully
          console.log("Profile updated!");
          const user = auth.currentUser;
          const { uid, email, displayName, photoURL } = user;
          console.log(uid, email, displayName, photoURL);
          setUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          });
        })
        .catch((error) => {
          // Handle errors
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });

      // createUserWithEmailAndPassword(
      //   auth,
      //   email.current.value,
      //   password.current.value
      // )
      //   .then((userCredential) => {
      //     // Signed up
      //     const user = userCredential.user;
      //     console.log(user);
      //     // Profile updated!
      //     updateProfile(auth.currentUser, {
      //       displayName: name.current.value,
      //       photoURL: randomAvatar,
      //     });
      //   })
      //   .then(() => {
      //     console.log("Profile updated!");
      //     console.log(auth.currentUser);
      //     const { uid, email, displayName, photoURL } = auth.currentUser;
      //     console.log(uid, email, displayName, photoURL);
      //     setUser({
      //       uid: uid,
      //       email: email,
      //       displayName: displayName,
      //       photoURL: photoURL,
      //     });
      //   })
      //   .catch((error) => {
      //     const errorCode = error.code;
      //     const errorMessage = error.message;
      //     setErrorMessage(errorCode + "-" + errorMessage);
      //   });
    } else if (isSignInForm) {
      //sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div className="relative">
      {/* <div className="w-full h-full bg-black absolute bg-opacity-20" /> */}

      <div className="h-[100vh]">
        {/* <img className="w-full h-full object-cover" src={backgroundImg} /> */}
        <div className="">
          <img className="w-96 absolute left-10 bottom-0" src={img1} />
          <img className="w-96 absolute right-10 bottom-0" src={img2} />
        </div>
      </div>

      <div className="absolute h-12 left-0 top-0 z-30 text-black font-bold text-2xl flex justify-start bg-gradient-to-b from-white to-transparent items-center w-full px-6 py-10">
        <img className="w-8 mr-2" src={planlyLogo} />
        <div>
          <p className="font-sans">Planly</p>
          <p className="font-sans font-normal text-xs py-1 pl-[1px]">
            Your Workflow organizer
          </p>
        </div>
      </div>

      <div className="max-w-[350px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-spread rounded-sm p-6 ">
        <form onSubmit={(e) => e.preventDefault()}>
          <h1 className="text-2xl font-bold pl-1 py-2">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <div className="my-3">
              <input
                ref={name}
                type="text"
                className="w-full px-4 py-2 my-1 focus:outline-none border-2 focus:border-2 rounded border-slate-00 focus:border-blue-600"
                placeholder="Full name"
              />
              <p className="text-xs text-custom font-semibold pl-[2px]">
                At least 5 characters long.
              </p>
            </div>
          )}
          <div className="my-3">
            <input
              ref={email}
              type="text"
              className="w-full px-4 py-2 my-1 focus:outline-none border-2 focus:border-2 rounded border-slate-00 focus:border-blue-600"
              placeholder="Email Address"
            />
            <p className="text-xs text-custom font-semibold pl-[2px]">
              Eg. example@example.com
            </p>
          </div>

          <div className="my-3">
            <input
              ref={password}
              type="text"
              className="w-full px-4 py-2 my-1 focus:outline-none border-2 focus:border-2 rounded border-slate-00 focus:border-blue-600"
              placeholder="Password"
            />
            <p className="text-xs text-custom font-semibold pl-[2px]">
              At least 8 characters, one uppercase letter, one lowercase letter,
              one special character and one number.
            </p>
          </div>

          <div className="my-3">
            <button
              className="w-full bg-blue-700 text-base text-white px-4 py-3 font-medium my-1 rounded"
              onClick={() => handleSignInClick()}
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
          </div>
          <p className="text-red-500">{errorMessage}</p>
          <p
            className="cursor-pointer text-sm text-custom font-semibold pl-[2px]"
            onClick={() => toggleSignInForm()}
          >
            {isSignInForm
              ? "New to Planly? Sign up form"
              : "Already registered, Sign In Now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
