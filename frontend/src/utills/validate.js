export const checkValidData = (email, password, fullname, isSignInForm) => {
  const isFullNameValid = (fullname) => {
    return fullname?.length > 4;
  };

  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  //   const isPasswordValid =
  //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[a-zA-Z]).{8,}$/.test(
      password
    );

  if (!isSignInForm && !isFullNameValid(fullname))
    return "Full name is not valid";

  if (!isEmailValid) return "Email ID is not valid";

  if (!isPasswordValid) return "Password is not valid";

  return null;
};
