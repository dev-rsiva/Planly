import { useNavigate } from "react-router-dom";
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
import generateUniqueNumber from "../utills/generateUniqueNum";
import { randomGradientColor } from "../utills/randomGradientColor";
import { randomColor } from "../utills/randomGradientColor";
import { data } from "../utills/utills";
import { cardData } from "../utills/cardData";
import allTemplatesData from "../utills/allTemplatesData";
import {
  doc,
  collection,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  arrayUnion,
  query,
} from "firebase/firestore";
import { db } from "../utills/firebase";
import acceptInvitation from "../utills/acceptInvitation";

const Login = ({
  setIsUserAuthenticated,
  user,
  setUser,
  isSignInForm,
  setIsSignInForm,
  workspaceData,
  setWorkspaceData,
  globalWorkspaceData,
  setGlobalWorkspaceData,
  // setAllCardData,
  setTemplatesData,
}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.log("outhStateChanged", user);
        setIsUserAuthenticated(true);
        console.log("workspaces in outhState changed:", globalWorkspaceData);
        // if (performance.getEntriesByType("navigation").length === 1) {
        const { uid, email, displayName, photoURL } = user;
        console.log(uid, email, displayName, photoURL);
        setUser({
          uid: uid,
          email: email,
          displayName: displayName,
          photoURL: user?.photoURL,
        });
        // }
        // setTimeout(() => {
        //   acceptInvitation(user);
        // }, 500);

        console.log(user);
      } else {
        // User is signed out
        // ...
        console.log("User is signed out");
      }
    });
    console.log(auth.currentUser);

    return () => unsubscribe();
  }, []);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  console.log(
    name?.current?.value,
    email?.current?.value,
    password?.current?.value
  );
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  // const initializeData = async (user) => {
  //   //Initialize Workspace data
  //   console.log("data initialization started");
  //   console.log(user?.photoURL);
  //   try {
  //     const workspacesDocRef = doc(db, "workspaces", "workspaceData");
  //     console.log(workspacesDocRef);
  //     let firstTwoChar = "Default Workspace";

  //     const newWorkspaceData = {
  //       // id: "Default Workspace",
  //       id: generateUniqueNumber(firstTwoChar, 5),
  //       name: user?.displayName + " Default Workspace",
  //       shortname: generateUniqueNumber("Default", 5),
  //       website: "",
  //       description: "",
  //       businessType: "",
  //       iconColors: {
  //         color1: randomGradientColor(),
  //         color2: randomGradientColor(),
  //       },
  //       isPremium: false,
  //       admins: [
  //         {
  //           userId: user?.uid,
  //           role: "admin",
  //           name: user?.displayName,
  //           email: user?.email,
  //           photoURL: user?.photoURL,
  //         },
  //       ],
  //       members: [
  //         {
  //           userId: user?.uid,
  //           role: "admin",
  //           name: user?.displayName,
  //           email: user?.email,
  //           photoURL: user?.photoURL,
  //         },
  //       ], // also role - normal exists.
  //       settings: {
  //         visibility: "private",
  //         membershipRestrictions: "anybody",
  //         allowedDomains: [], // No domains by default since "anybody" is the default
  //         boardCreationRestrictions: {
  //           public: "onlyAdmins",
  //           workspace: "anyMember",
  //           private: "anyMember",
  //         },
  //         boardDeletionRestrictions: {
  //           public: "onlyAdmins",
  //           workspace: "onlyAdmins",
  //           private: "onlyAdmins",
  //         },
  //         guestInvitations: "workspaceMembers",
  //       },

  //       // settings: {
  //       //   visibility: "private" / "public",
  //       //   membershipRestrictions: "anybody" / "specificDomains",
  //       //   allowedDomains: ["example.com", "example2.com"], // Array of allowed email domains for specificDomains
  //       //   boardCreationRestrictions: {
  //       //     public: "anyMember" / "onlyAdmins" / "nobody",
  //       //     workspace: "anyMember" / "onlyAdmins" / "nobody",
  //       //     private: "anyMember" / "onlyAdmins" / "nobody",
  //       //   },
  //       //   boardDeletionRestrictions: {
  //       //     public: "anyMember" / "onlyAdmins" / "nobody",
  //       //     workspace: "anyMember" / "onlyAdmins" / "nobody",
  //       //     private: "anyMember" / "onlyAdmins" / "nobody",
  //       //   },
  //       //   guestInvitations: "anybody" / "workspaceMembers",
  //       // },

  //       boards: [],
  //     };
  //     console.log(newWorkspaceData);
  //     const workspacesCollectionRef = collection(db, "workspaces");
  //     const querySnapshot = await getDocs(workspacesCollectionRef);
  //     console.log(querySnapshot);

  //     if (querySnapshot.empty) {
  //       //Create new doc for workspaces & add new workspaceData for this user
  //       await setDoc(workspacesDocRef, { workspaces: [newWorkspaceData] });
  //       // setGlobalWorkspaceData((prev) => {
  //       let updatedWorkspaceData = { workspaces: [newWorkspaceData] };
  //       console.log(updatedWorkspaceData);
  //       setWorkspaceData(updatedWorkspaceData);
  //       // return updatedWorkspaceData;
  //       // });
  //     } else {
  //       console.log("Existing workspaces found, updating document");
  //       const workspacesDocRef2 = doc(db, "workspaces", "workspaceData");
  //       const queryExistingData = await getDoc(workspacesDocRef2);
  //       console.log("queryExistingData:", queryExistingData);
  //       const existingWorkspaces = queryExistingData.data().workspaces;
  //       console.log("existingWorkspaces:", existingWorkspaces);

  //       const newCopyOfExistingWorkspaces = existingWorkspaces.map(
  //         (eachWorkspace) => ({
  //           ...eachWorkspace,
  //         })
  //       );
  //       console.log(
  //         "newCopyOfExistingWorkspaces:",
  //         newCopyOfExistingWorkspaces
  //       );

  //       const updatedWorkspaces = [
  //         ...newCopyOfExistingWorkspaces,
  //         newWorkspaceData,
  //       ];
  //       console.log("updatedWorkspaces:", updatedWorkspaces);

  //       // setTimeout(async () => {
  //       await updateDoc(workspacesDocRef2, {
  //         workspaces: updatedWorkspaces,
  //       });
  //       console.log("Document updated successfully");
  //       // }, 50);

  //       setWorkspaceData((prev) => {
  //         const updatedWorkspaceData = updatedWorkspaces.filter(
  //           (eachWorkspace) => {
  //             console.log(eachWorkspace);
  //             const condition1 =
  //               eachWorkspace?.settings.visibility === "private" ||
  //               eachWorkspace?.settings.visibility === "public";

  //             const condition2 = eachWorkspace?.members.some((member) => {
  //               console.log(member.userId);
  //               console.log(user?.uid);
  //               console.log(member.userId === user?.uid);
  //               return member.userId === user?.uid;
  //             });
  //             console.log(condition1);
  //             console.log(condition2);
  //             console.log(condition1 && condition2);

  //             return condition1 & condition2;
  //           }
  //         );
  //         console.log(updatedWorkspaceData);
  //         const permittedWorkspaceData = {
  //           workspaces: updatedWorkspaceData,
  //         };
  //         console.log(permittedWorkspaceData);
  //         // setGlobalWorkspaceData(permittedWorkspaceData);
  //         return permittedWorkspaceData;
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error updating Workspaces data in Firestore:", error);
  //   }

  //   //Initializes templates data
  //   try {
  //     const templatesDocRef = doc(db, "templates", "templatesData");
  //     console.log(templatesDocRef);
  //     const templatesCollectionRef = collection(db, "templates");
  //     const querySnapshot = await getDocs(templatesCollectionRef);
  //     setTemplatesData(allTemplatesData);

  //     if (querySnapshot.empty) {
  //       await setDoc(templatesDocRef, allTemplatesData);
  //     }
  //   } catch (error) {
  //     console.error("Error updating Templates data in Firestore:", error);
  //   }
  // };

  // const initializeData = async (user) => {
  //   console.log("Data initialization started for user:", user?.email);

  //   try {
  //     const workspacesDocRef = doc(db, "workspaces", "workspaceData");
  //     console.log(workspacesDocRef);

  //     const newWorkspaceData = {
  //       id: generateUniqueNumber("Default Workspace", 5),
  //       name: `${user?.displayName} Default Workspace`,
  //       shortname: generateUniqueNumber("Default", 5),
  //       website: "",
  //       description: "",
  //       businessType: "",
  //       iconColors: {
  //         color1: randomGradientColor(),
  //         color2: randomGradientColor(),
  //       },
  //       isPremium: false,
  //       admins: [
  //         {
  //           userId: user?.uid,
  //           role: "admin",
  //           name: user?.displayName,
  //           email: user?.email,
  //           photoURL: user?.photoURL,
  //         },
  //       ],
  //       members: [
  //         {
  //           userId: user?.uid,
  //           role: "admin",
  //           name: user?.displayName,
  //           email: user?.email,
  //           photoURL: user?.photoURL,
  //         },
  //       ],
  //       settings: {
  //         visibility: "private",
  //         membershipRestrictions: "anybody",
  //         allowedDomains: [],
  //         boardCreationRestrictions: {
  //           public: "onlyAdmins",
  //           workspace: "anyMember",
  //           private: "anyMember",
  //         },
  //         boardDeletionRestrictions: {
  //           public: "onlyAdmins",
  //           workspace: "onlyAdmins",
  //           private: "onlyAdmins",
  //         },
  //         guestInvitations: "workspaceMembers",
  //       },
  //       boards: [],
  //     };
  //     console.log(newWorkspaceData);

  //     const querySnapshot = await getDocs(collection(db, "workspaces"));
  //     console.log(querySnapshot);

  //     if (querySnapshot.empty) {
  //       await setDoc(workspacesDocRef, { workspaces: [newWorkspaceData] });
  //       console.log("New workspace created and data initialized");

  //       setWorkspaceData({ workspaces: [newWorkspaceData] });
  //     } else {
  //       const workspacesDoc = await getDoc(workspacesDocRef);
  //       const existingWorkspaces = workspacesDoc.data().workspaces;

  //       const updatedWorkspaces = [...existingWorkspaces, newWorkspaceData];
  //       console.log("Updated workspaces:", updatedWorkspaces);

  //       await updateDoc(workspacesDocRef, { workspaces: updatedWorkspaces });

  //       setWorkspaceData((prev) => ({
  //         workspaces: updatedWorkspaces.filter((workspace) => {
  //           return (
  //             (workspace?.settings.visibility === "private" ||
  //               workspace?.settings.visibility === "public") &&
  //             workspace?.members.some((member) => member.userId === user?.uid)
  //           );
  //         }),
  //       }));
  //     }
  //   } catch (error) {
  //     console.error("Error updating Workspaces data in Firestore:", error);
  //   }

  //   // Initialize templates data
  //   try {
  //     const templatesDocRef = doc(db, "templates", "templatesData");
  //     const templatesCollectionRef = collection(db, "templates");
  //     const querySnapshot = await getDocs(templatesCollectionRef);

  //     if (querySnapshot.empty) {
  //       await setDoc(templatesDocRef, allTemplatesData);
  //     }
  //     setTemplatesData(allTemplatesData);
  //   } catch (error) {
  //     console.error("Error updating Templates data in Firestore:", error);
  //   }
  // };

  // const fetchDataFromFirestore = async (user) => {
  //   //fetch workspace data
  //   try {
  //     const workspaceCollectionRef = collection(db, "workspaces");
  //     const querySnapshot = await getDocs(workspaceCollectionRef);

  //     if (!querySnapshot.empty) {
  //       // setTimeout(() => {
  //       const updatedWorkspaceDataFromFirestore =
  //         querySnapshot.docs[0].data().workspaces;
  //       console.log(updatedWorkspaceDataFromFirestore);
  //       // setGlobalWorkspaceData(updatedWorkspaceDataFromFirestore);

  //       setWorkspaceData((prev) => {
  //         const updatedWorkspaceData = updatedWorkspaceDataFromFirestore.filter(
  //           (eachWorkspace) => {
  //             console.log(eachWorkspace);
  //             const condition1 =
  //               eachWorkspace?.settings.visibility === "private" ||
  //               eachWorkspace?.settings.visibility === "public";

  //             const condition2 = eachWorkspace?.members.some((member) => {
  //               console.log(member.userId);
  //               console.log(user?.uid);
  //               console.log(member.userId === user?.uid);
  //               return member.userId === user?.uid;
  //             });
  //             console.log(condition1);
  //             console.log(condition2);
  //             console.log(condition1 && condition2);

  //             return condition1 & condition2;
  //           }
  //         );
  //         console.log(updatedWorkspaceData);
  //         const permittedWorkspaceData = {
  //           workspaces: updatedWorkspaceData,
  //         };
  //         console.log(permittedWorkspaceData);

  //         return permittedWorkspaceData;
  //       });
  //       // }, 1200);
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Error updating Workspaces data in local state variable:",
  //       error
  //     );
  //   }

  //   //fetch templates data
  //   try {
  //     const templatesCollectionRef = collection(db, "templates");
  //     const querySnapshot = await getDocs(templatesCollectionRef);

  //     if (!querySnapshot.empty) {
  //       console.log(querySnapshot.docs[0].empty);
  //       setTemplatesData(querySnapshot.docs[0].data());
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Error updating Templates data in local state variable:",
  //       error
  //     );
  //   }
  // };

  // const handleSignInClick = () => {
  //   //email and password validation
  //   const message = checkValidData(
  //     email.current.value,
  //     password.current.value,
  //     name.current?.value,
  //     isSignInForm
  //   );
  //   console.log(message);
  //   //updating the error message, message return null if validation success else return the validation error message when validation fails
  //   setErrorMessage(message);

  //   //if message returns null, then validation success and allow code execution futher. If message returns validation error message(Eg.Email ID is not valid) then do not allow code execution further
  //   if (message) return;

  //   if (!isSignInForm) {
  //     //sign up logic
  //     createUserWithEmailAndPassword(
  //       auth,
  //       email.current.value,
  //       password.current.value
  //     )
  //       .then((userCredential) => {
  //         // Signed up
  //         const user = userCredential.user;
  //         console.log(user);

  //         const obj = {
  //           displayName: name.current.value,
  //           photoURL: randomAvatar,
  //         };
  //         console.log(obj);
  //         // Update user profile
  //         return updateProfile(user, obj);
  //       })
  //       .then(() => {
  //         // Profile updated successfully
  //         console.log("Profile updated!");
  //         const userInfo = auth.currentUser;
  //         console.log(userInfo);
  //         const { uid, email, displayName, photoURL } = userInfo;
  //         console.log(uid, email, displayName, photoURL);
  //         setUser({
  //           uid: uid,
  //           email: email,
  //           displayName: displayName,
  //           photoURL: photoURL,
  //         });

  //         // Call update functions for each data type
  //         console.log(user);
  //         console.log(userInfo);

  //         if (userInfo) {
  //           console.log("user is available", userInfo);
  //           initializeData(userInfo);
  //           // acceptInvitation(userInfo);
  //         }

  //         navigate("/");
  //       })
  //       .catch((error) => {
  //         // Handle errors
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //         setErrorMessage(errorCode + "-" + errorMessage);
  //       });
  //   } else if (isSignInForm) {
  //     //sign in logic
  //     signInWithEmailAndPassword(
  //       auth,
  //       email.current.value,
  //       password.current.value
  //     )
  //       .then((userCredential) => {
  //         // Signed in
  //         const user = userCredential.user;
  //         console.log(user);

  //         const { uid, email, displayName, photoURL } = user;
  //         console.log(uid, email, displayName, photoURL);
  //         setUser({
  //           uid: uid,
  //           email: email,
  //           displayName: displayName,
  //           photoURL: photoURL,
  //         });

  //         // Call update functions for each data type
  //         if (user) {
  //           fetchDataFromFirestore(user, email);
  //           // acceptInvitation(user);
  //         }

  //         navigate("/");
  //       })
  //       .catch((error) => {
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //         setErrorMessage(errorCode + "-" + errorMessage);
  //       });
  //   }
  // };

  // Function to initialize data
  const initializeData = async (user) => {
    console.log("Data initialization started for user:", user?.email);

    try {
      const workspacesDocRef = doc(db, "workspaces", "workspaceData");
      console.log(workspacesDocRef);

      const newWorkspaceData = {
        id: generateUniqueNumber("Default Workspace", 5),
        name: `${user?.displayName} Default Workspace`,
        shortname: generateUniqueNumber("Default", 5),
        website: "",
        description: "",
        businessType: "",
        iconColors: {
          color1: randomGradientColor(),
          color2: randomGradientColor(),
        },
        isPremium: false,
        admins: [
          {
            userId: user?.uid,
            role: "admin",
            name: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL,
          },
        ],
        members: [
          {
            userId: user?.uid,
            role: "admin",
            name: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL,
          },
        ],
        settings: {
          visibility: "private",
          membershipRestrictions: "anybody",
          allowedDomains: [],
          boardCreationRestrictions: {
            public: "onlyAdmins",
            workspace: "anyMember",
            private: "anyMember",
          },
          boardDeletionRestrictions: {
            public: "onlyAdmins",
            workspace: "onlyAdmins",
            private: "onlyAdmins",
          },
          guestInvitations: "workspaceMembers",
        },
        boards: [],
      };
      console.log(newWorkspaceData);

      const querySnapshot = await getDocs(collection(db, "workspaces"));
      console.log(querySnapshot);

      if (querySnapshot.empty) {
        await setDoc(workspacesDocRef, { workspaces: [newWorkspaceData] });
        console.log("New workspace created and data initialized");

        setWorkspaceData({ workspaces: [newWorkspaceData] });
      } else {
        const workspacesDoc = await getDoc(workspacesDocRef);
        const existingWorkspaces = workspacesDoc.data().workspaces;

        const updatedWorkspaces = [...existingWorkspaces, newWorkspaceData];
        console.log("Updated workspaces:", updatedWorkspaces);

        await updateDoc(workspacesDocRef, { workspaces: updatedWorkspaces });

        setWorkspaceData((prev) => ({
          workspaces: updatedWorkspaces.filter((workspace) => {
            return (
              (workspace?.settings.visibility === "private" ||
                workspace?.settings.visibility === "public") &&
              workspace?.members.some((member) => member.userId === user?.uid)
            );
          }),
        }));
      }
    } catch (error) {
      console.error("Error updating Workspaces data in Firestore:", error);
    }

    // Initialize templates data
    try {
      const templatesDocRef = doc(db, "templates", "templatesData");
      const templatesCollectionRef = collection(db, "templates");
      const querySnapshot = await getDocs(templatesCollectionRef);

      if (querySnapshot.empty) {
        await setDoc(templatesDocRef, allTemplatesData);
      } else {
        setTemplatesData(allTemplatesData);
      }
    } catch (error) {
      console.error("Error updating Templates data in Firestore:", error);
    }
  };

  // Function to fetch data from Firestore
  const fetchDataFromFirestore = async (user) => {
    try {
      const workspaceCollectionRef = collection(db, "workspaces");
      const querySnapshot = await getDocs(workspaceCollectionRef);

      if (!querySnapshot.empty) {
        const updatedWorkspaceDataFromFirestore =
          querySnapshot.docs[0].data().workspaces;
        console.log(updatedWorkspaceDataFromFirestore);

        setWorkspaceData((prev) => ({
          workspaces: updatedWorkspaceDataFromFirestore.filter((workspace) => {
            return (
              (workspace?.settings.visibility === "private" ||
                workspace?.settings.visibility === "public") &&
              workspace?.members.some((member) => member.userId === user?.uid)
            );
          }),
        }));
      }
    } catch (error) {
      console.error("Error fetching Workspaces data from Firestore:", error);
    }

    try {
      const templatesCollectionRef = collection(db, "templates");
      const querySnapshot = await getDocs(templatesCollectionRef);

      if (!querySnapshot.empty) {
        setTemplatesData(querySnapshot.docs[0].data());
      }
    } catch (error) {
      console.error("Error fetching Templates data from Firestore:", error);
    }
  };

  // const handleSignInClick = () => {
  //   const message = checkValidData(
  //     email.current.value,
  //     password.current.value,
  //     name.current?.value,
  //     isSignInForm
  //   );
  //   console.log(message);
  //   setErrorMessage(message);

  //   if (message) return;

  //   if (!isSignInForm) {
  //     // Sign up logic
  //     createUserWithEmailAndPassword(
  //       auth,
  //       email.current.value,
  //       password.current.value
  //     )
  //       .then(async (userCredential) => {
  //         const user = userCredential.user;
  //         console.log(user);

  //         const obj = {
  //           displayName: name.current.value,
  //           photoURL: randomAvatar,
  //         };
  //         await updateProfile(user, obj);
  //         console.log("Profile updated!");

  //         const userInfo = auth.currentUser;
  //         console.log(userInfo);

  //         setUser({
  //           uid: userInfo.uid,
  //           email: userInfo.email,
  //           displayName: userInfo.displayName,
  //           photoURL: userInfo.photoURL,
  //         });

  //         const hasPendingInvitations = await acceptInvitation(userInfo);
  //         if (!hasPendingInvitations) {
  //           await initializeData(userInfo);
  //         }
  //         navigate("/");
  //       })
  //       .catch((error) => {
  //         console.error("Error during sign-up:", error);
  //         setErrorMessage(`${error.code} - ${error.message}`);
  //       });
  //   } else if (isSignInForm) {
  //     // Sign in logic
  //     signInWithEmailAndPassword(
  //       auth,
  //       email.current.value,
  //       password.current.value
  //     )
  //       .then(async (userCredential) => {
  //         const user = userCredential.user;
  //         console.log(user);

  //         setUser({
  //           uid: user.uid,
  //           email: user.email,
  //           displayName: user.displayName,
  //           photoURL: user.photoURL,
  //         });

  //         const hasPendingInvitations = await acceptInvitation(user);
  //         if (!hasPendingInvitations) {
  //           await fetchDataFromFirestore(user);
  //         }
  //         navigate("/");
  //       })
  //       .catch((error) => {
  //         console.error("Error during sign-in:", error);
  //         setErrorMessage(`${error.code} - ${error.message}`);
  //       });
  //   }
  // };

  const handleSignInClick = () => {
    const message = checkValidData(
      email.current.value,
      password.current.value,
      name.current?.value,
      isSignInForm
    );
    console.log(message);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      // Sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(async (userCredential) => {
          const user = userCredential.user;
          console.log(user);

          const obj = {
            displayName: name.current.value,
            photoURL: randomAvatar,
          };
          await updateProfile(user, obj);
          console.log("Profile updated!");

          const userInfo = auth.currentUser;
          console.log(userInfo);

          setUser({
            uid: userInfo.uid,
            email: userInfo.email,
            displayName: userInfo.displayName,
            photoURL: userInfo.photoURL,
          });

          // Initialize the default workspace data
          await initializeData(userInfo);

          // Check for and accept pending invitations
          const hasPendingInvitations = await acceptInvitation(userInfo);

          // Navigate to the main page after processing
          navigate("/");
        })
        .catch((error) => {
          console.error("Error during sign-up:", error);
          setErrorMessage(`${error.code} - ${error.message}`);
        });
    } else {
      // Sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(async (userCredential) => {
          const user = userCredential.user;
          console.log(user);

          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });

          // Initialize the default workspace data
          // await initializeData(user);

          // Check for and accept pending invitations
          const hasPendingInvitations = await acceptInvitation(user);

          // Fetch data from Firestore and update local state
          await fetchDataFromFirestore(user);

          // Navigate to the main page after processing
          navigate("/");
        })
        .catch((error) => {
          console.error("Error during sign-in:", error);
          setErrorMessage(`${error.code} - ${error.message}`);
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
