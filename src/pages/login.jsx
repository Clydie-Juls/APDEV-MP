import AnimBackground from "@/components/custom/animBackground";
import { LoginForm } from "@/components/custom/loginForm";
import { Button } from "@/components/ui/button";
import React from "react";

const Login = () => {
  return (
    <div>
      <AnimBackground>
        <LoginForm />
      </AnimBackground>
    </div>
  );
};

export default Login;
