import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

// form fields type
type FormField =
  | "firstname"
  | "lastname"
  | "email"
  | "password"
  | "address"
  | "city"
  | "state"
  | "zipCode"
  | "country";

const SignUp = () => {
  const [step, setStep] = React.useState(1);

  // unified form state
  const [form, setForm] = React.useState<Record<FormField, string>>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  // unified error messages
  const [errors, setErrors] = React.useState<Record<FormField, string>>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  // validation rules
  const validators: Record<FormField, (v: string) => string> = {
    firstname: (v) => (!v ? "First name is required." : ""),
    lastname: (v) => (!v ? "Last name is required." : ""),
    email: (v) =>
      !v || !/\S+@\S+\.\S+/.test(v) ? "Please enter a valid email." : "",
    password: (v) =>
      !v || v.length < 6 ? "Password must be at least 6 characters." : "",
    address: (v) => (!v ? "Address is required." : ""),
    city: (v) => (!v ? "City is required." : ""),
    state: (v) => (!v ? "State is required." : ""),
    zipCode: (v) => (!v ? "Zip code is required." : ""),
    country: (v) => (!v ? "Country is required." : ""),
  };

  // field change handler (no live validation)
  const handleChange = (field: FormField, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // field blur handler (validate on blur)
  const handleBlur = (field: FormField) => {
    const err = validators[field](form[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  // validation
  const validateFields = (fields: FormField[]) => {
    let isValid = true;
    const updatedErrors: Partial<Record<FormField, string>> = {};

    fields.forEach((field) => {
      const err = validators[field](form[field]);
      updatedErrors[field] = err;
      if (err) isValid = false;
    });

    setErrors((prev) => ({ ...prev, ...updatedErrors }));
    return isValid;
  };

  const validateStep1 = () =>
    validateFields(["firstname", "lastname", "email", "password"]);

  const validateStep2 = () =>
    validateFields(["address", "city", "state", "zipCode", "country"]);

  // navigation
  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleBack = () => setStep(1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep1() || !validateStep2()) return;

    console.log("Submitted:", form);
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#bcbcbc" },
      "&:hover fieldset": { borderColor: "#ff7528" },
      "&.Mui-focused fieldset": { borderColor: "#ff7528" },
    },
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <form
        className="flex flex-col h-full w-1/3 justify-center gap-y-8 overflow-y-auto"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-center mt-10 text-sg-orange">
          Sign Up
        </h1>

        {/* first page */}
        {step === 1 && (
          <>
            <div className="flex flex-row w-full gap-x-4">
              <FormControl fullWidth>
                <FormLabel>First Name</FormLabel>
                <TextField
                  placeholder="First Name"
                  sx={inputSx}
                  value={form.firstname}
                  onChange={(e) => handleChange("firstname", e.target.value)}
                  onBlur={() => handleBlur("firstname")}
                  error={!!errors.firstname}
                  helperText={errors.firstname}
                  required
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel>Last Name</FormLabel>
                <TextField
                  placeholder="Last Name"
                  sx={inputSx}
                  value={form.lastname}
                  onChange={(e) => handleChange("lastname", e.target.value)}
                  onBlur={() => handleBlur("lastname")}
                  error={!!errors.lastname}
                  helperText={errors.lastname}
                  required
                />
              </FormControl>
            </div>

            <FormControl fullWidth>
              <FormLabel>Email</FormLabel>
              <TextField
                type="email"
                placeholder="your@email.com"
                sx={inputSx}
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                error={!!errors.email}
                helperText={errors.email}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Password</FormLabel>
              <TextField
                type="password"
                placeholder="••••••••"
                sx={inputSx}
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                onBlur={() => handleBlur("password")}
                error={!!errors.password}
                helperText={errors.password}
              />
            </FormControl>

            <div className="flex justify-end">
              <Button
                type="button"
                variant="contained"
                onClick={handleNext}
                sx={{
                  backgroundColor: "#ff7528",
                  ":hover": { backgroundColor: "#fc6612" },
                  textTransform: "none",
                  fontWeight: 600,
                  width: "30%",
                }}
                disableElevation
              >
                Next
              </Button>
            </div>
          </>
        )}

        {/* second page */}
        {step === 2 && (
          <>
            <FormControl fullWidth>
              <FormLabel>Address</FormLabel>
              <TextField
                placeholder="116th and Broadway"
                sx={inputSx}
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                onBlur={() => handleBlur("address")}
                error={!!errors.address}
                helperText={errors.address}
              />
            </FormControl>

            <div className="flex flex-row w-full gap-x-4">
              <FormControl fullWidth>
                <FormLabel>City</FormLabel>
                <TextField
                  placeholder="New York"
                  sx={inputSx}
                  value={form.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  onBlur={() => handleBlur("city")}
                  error={!!errors.city}
                  helperText={errors.city}
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel>State</FormLabel>
                <TextField
                  placeholder="New York"
                  sx={inputSx}
                  value={form.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  onBlur={() => handleBlur("state")}
                  error={!!errors.state}
                  helperText={errors.state}
                />
              </FormControl>
            </div>

            <div className="flex flex-row w-full gap-x-4">
              <FormControl fullWidth>
                <FormLabel>Zip Code</FormLabel>
                <TextField
                  placeholder="10027"
                  sx={inputSx}
                  value={form.zipCode}
                  onChange={(e) => handleChange("zipCode", e.target.value)}
                  onBlur={() => handleBlur("zipCode")}
                  error={!!errors.zipCode}
                  helperText={errors.zipCode}
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel>Country</FormLabel>
                <TextField
                  placeholder="United States"
                  sx={inputSx}
                  value={form.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  onBlur={() => handleBlur("country")}
                  error={!!errors.country}
                  helperText={errors.country}
                />
              </FormControl>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outlined"
                onClick={handleBack}
                sx={{
                  color: "#ff7528",
                  borderColor: "#ff7528",
                  ":hover": { backgroundColor: "#fcf2eb" },
                  textTransform: "none",
                  fontWeight: 600,
                  width: "30%",
                }}
                disableElevation
              >
                Back
              </Button>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#ff7528",
                  ":hover": { backgroundColor: "#fc6612" },
                  textTransform: "none",
                  fontWeight: 600,
                  width: "70%",
                }}
                disableElevation
              >
                Submit
              </Button>
            </div>
          </>
        )}

        {/* Already have an account section */}
        <Typography sx={{ textAlign: "center", color: "#3c414a"}}>
          Already have an account?{" "}
          <Link
            href="/signin"
            variant="inherit"
            sx={{ color: "#ff7528", cursor: "pointer", textDecorationColor: "#ff7528", }}
          >
            Sign In
          </Link>
        </Typography>
      </form>
    </div>
  );
};

export default SignUp;
