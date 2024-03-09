import React from "react";
import { Navigate } from "react-router-dom";
import Auth from "../components/Auth";
import ErrorMessage from "../components/ErrorMessage";
import EmailSent from "../components/EmailSent";

const AuthPage = ({ AuthPageType, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/poll" />;
  }
  // console.log(AuthPageType);
  return (
    <div>
      <ErrorMessage authType={AuthPageType} />
      <EmailSent />
      <Auth authType={AuthPageType} />
    </div>
  );
};

export default AuthPage;
