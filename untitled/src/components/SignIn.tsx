// import React from 'react';
// import TextField from '@mui/material/TextField';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';

// const SignIn = () => {
//   const [values, setValues] = React.useState({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = React.useState({
//     email: "",
//     password: "",
//   });

//   // Update input values
//   const handleChange = (field: "email" | "password") =>
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       setValues({ ...values, [field]: event.target.value });
//     };

//   // Validate a single field when user leaves the input box
//   const validateField = (field: "email" | "password", value: string) => {
//     let msg = "";

//     if (field === "email") {
//       if (!value) msg = "Email is required.";
//       else if (!/\S+@\S+\.\S+/.test(value)) msg = "Please enter a valid email address.";
//     }

//     if (field === "password") {
//       if (!value) msg = "Password is required.";
//       else if (value.length < 6) msg = "Password must be at least 6 characters long.";
//     }

//     setErrors((prev) => ({ ...prev, [field]: msg }));
//   };

//   // Validate all fields on submit
//   const validateAll = () => {
//     const fields: ("email" | "password")[] = ["email", "password"];
//     let valid = true;

//     fields.forEach((f) => {
//       validateField(f, values[f]);
//       if (!values[f] || errors[f]) valid = false;
//     });

//     return valid;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateAll()) return;

//     console.log("Submitted:", values);
//   };

//   return (
//     <div className="flex flex-col h-screen w-screen justify-center items-center">
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col h-full w-1/3 justify-center gap-y-8"
//       >
//         <h1 className="text-3xl font-bold text-center mt-10 text-sg-orange">
//           Sign In
//         </h1>

//         {/* Email */}
//         <FormControl>
//           <FormLabel htmlFor="email">Email</FormLabel>
//           <TextField
//             id="email"
//             name="email"
//             type="email"
//             placeholder="your@email.com"
//             value={values.email}
//             onChange={handleChange("email")}
//             onBlur={() => validateField("email", values.email)}
//             error={!!errors.email}
//             helperText={errors.email}
//             fullWidth
//             required
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": { borderColor: "#bcbcbc" },
//                 "&:hover fieldset": { borderColor: "#ff7528" },
//                 "&.Mui-focused fieldset": { borderColor: "#ff7528" },
//               },
//             }}
//           />
//         </FormControl>

//         {/* Password */}
//         <FormControl>
//           <FormLabel htmlFor="password">Password</FormLabel>
//           <TextField
//             id="password"
//             name="password"
//             type="password"
//             placeholder="•••••••••••"
//             value={values.password}
//             onChange={handleChange("password")}
//             onBlur={() => validateField("password", values.password)}
//             error={!!errors.password}
//             helperText={errors.password}
//             fullWidth
//             required
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": { borderColor: "#bcbcbc" },
//                 "&:hover fieldset": { borderColor: "#ff7528" },
//                 "&.Mui-focused fieldset": { borderColor: "#ff7528" },
//               },
//             }}
//           />
//         </FormControl>

//         {/* Submit */}
//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           sx={{
//             backgroundColor: "#ff7528",
//             ":hover": { backgroundColor: "#fc6612" },
//             textTransform: "none",
//             fontWeight: 600,
//           }}
//           disableElevation
//         >
//           Sign In
//         </Button>

//         {/* don't have an account section */}
//         <Typography sx={{ textAlign: "center", color: "#3c414a" }}>
// 					Don&apos;t have an account?{" "}
// 					<Link
// 						href="/signup"
// 						variant="inherit"
// 						sx={{ color: "#ff7528", cursor: "pointer", textDecorationColor: "#ff7528", }}
// 						onClick={(e) => {
// 							e.stopPropagation();
// 						}}
// 					>
// 						Sign Up
// 					</Link>
// 				</Typography>

//       </form>
//     </div>
//   );
// };

// export default SignIn;
// src/components/SignIn.tsx
import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { GoogleLoginButton } from "./GoogleLoginButton";
import type { AuthUser } from "../App";

type SignInProps = {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
};

const SignIn: React.FC<SignInProps> = ({ setToken, setUser }) => {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({
    email: "",
    password: "",
  });

  const handleChange =
    (field: "email" | "password") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [field]: event.target.value });
    };

  const validateField = (field: "email" | "password", value: string) => {
    let msg = "";

    if (field === "email") {
      if (!value) msg = "Email is required.";
      else if (!/\S+@\S+\.\S+/.test(value))
        msg = "Please enter a valid email address.";
    }

    if (field === "password") {
      if (!value) msg = "Password is required.";
      else if (value.length < 6)
        msg = "Password must be at least 6 characters long.";
    }

    setErrors((prev) => ({ ...prev, [field]: msg }));
  };

  const validateAll = () => {
    const fields: ("email" | "password")[] = ["email", "password"];
    let valid = true;

    fields.forEach((f) => {
      validateField(f, values[f]);
      if (!values[f] || errors[f]) valid = false;
    });

    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) return;

    console.log("Submitted:", values);
    // (Optional) wire this to a traditional email/password endpoint later
  };

  // 👇 called when Google login + backend auth succeeds
  const handleGoogleLoginSuccess = (token: string, user: AuthUser) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("jwt", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-full w-1/3 justify-center gap-y-8"
      >
        <h1 className="text-3xl font-bold text-center mt-10 text-sg-orange">
          Sign In
        </h1>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLoginButton onLoginSuccess={handleGoogleLoginSuccess} />
        </div>

        <Typography sx={{ textAlign: "center", color: "#3c414a" }}>
          or sign in with email
        </Typography>

        {/* Email */}
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={values.email}
            onChange={handleChange("email")}
            onBlur={() => validateField("email", values.email)}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#bcbcbc" },
                "&:hover fieldset": { borderColor: "#ff7528" },
                "&.Mui-focused fieldset": { borderColor: "#ff7528" },
              },
            }}
          />
        </FormControl>

        {/* Password */}
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            id="password"
            name="password"
            type="password"
            placeholder="•••••••••••"
            value={values.password}
            onChange={handleChange("password")}
            onBlur={() => validateField("password", values.password)}
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#bcbcbc" },
                "&:hover fieldset": { borderColor: "#ff7528" },
                "&.Mui-focused fieldset": { borderColor: "#ff7528" },
              },
            }}
          />
        </FormControl>

        {/* Submit */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#ff7528",
            ":hover": { backgroundColor: "#fc6612" },
            textTransform: "none",
            fontWeight: 600,
          }}
          disableElevation
        >
          Sign In
        </Button>

        {/* don't have an account section */}
        <Typography sx={{ textAlign: "center", color: "#3c414a" }}>
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            variant="inherit"
            sx={{
              color: "#ff7528",
              cursor: "pointer",
              textDecorationColor: "#ff7528",
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Sign Up
          </Link>
        </Typography>
      </form>
    </div>
  );
};

export default SignIn;
