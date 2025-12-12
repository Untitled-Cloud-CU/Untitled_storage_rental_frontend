// import { useEffect } from "react";
// import { usersApi } from "../api/client";

// const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

// declare global {
//   interface Window {
//     google?: any;
//   }
// }

// type Props = {
//   onLoginSuccess: (data: { access_token: string; user: any }) => void;
// };

// export function GoogleLoginButton({ onLoginSuccess }: Props) {
//   useEffect(() => {
//     // Load Google Identity script
//     const script = document.createElement("script");
//     script.src = "https://accounts.google.com/gsi/client";
//     script.async = true;
//     script.defer = true;
//     document.body.appendChild(script);

//     script.onload = () => {
//       if (!window.google) return;

//       window.google.accounts.id.initialize({
//         client_id: GOOGLE_CLIENT_ID,
//         callback: handleCredentialResponse,
//       });

//       window.google.accounts.id.renderButton(
//         document.getElementById("google-signin-btn"),
//         { theme: "outline", size: "large", width: 250 }
//       );
//     };

//     return () => {
//       // cleanup if needed
//     };
//   }, []);

//   async function handleCredentialResponse(response: any) {
//     const idToken = response.credential; // Google ID token

//     try {
//       const res = await usersApi.post("/api/v1/auth/google", {
//         id_token: idToken,
//       });

//       const { access_token, user } = res.data;

//       // persist for later
//       localStorage.setItem("jwt", access_token);
//       localStorage.setItem("user", JSON.stringify(user));

//       onLoginSuccess({ access_token, user });
//     } catch (err) {
//       console.error("Login failed", err);
//       alert("Google login failed – check console for details.");
//     }
//   }

//   return <div id="google-signin-btn" />;
// }
// src/components/GoogleLoginButton.tsx
import { useEffect } from "react";
import { usersApi } from "../api/client";
import type { AuthUser } from "../App";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

declare global {
  interface Window {
    google?: any;
  }
}

type Props = {
  onLoginSuccess: (token: string, user: AuthUser) => void;
};

export function GoogleLoginButton({ onLoginSuccess }: Props) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (!window.google) return;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-btn"),
        { theme: "outline", size: "large", width: 250 }
      );
    };

    return () => {
      // could remove script if you want
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCredentialResponse(response: any) {
    const idToken = response.credential;

    try {
      const res = await usersApi.post("/api/v1/auth/google", {
        id_token: idToken,
      });

      const { access_token, user } = res.data as {
        access_token: string;
        user: AuthUser;
      };

      localStorage.setItem("jwt", access_token);
      localStorage.setItem("user", JSON.stringify(user));

      onLoginSuccess(access_token, user);
    } catch (err) {
      console.error("Login failed", err);
      alert("Google login failed – check console for details.");
    }
  }

  return <div id="google-signin-btn" />;
}
