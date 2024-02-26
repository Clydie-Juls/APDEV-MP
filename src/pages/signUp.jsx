import AnimBackground from "@/components/custom/animBackground";
import SignupForm from "@/components/custom/signupForm";

import { TempState } from '@/lib/placeholder/tempState';

const SignUp = () => {
  const handleSubmit = () => {
    TempState.set('loggedIn', true);
    window.location.replace('/user');
  };

  return (
    <div>
      <AnimBackground className="flex items-center justify-center">
        <SignupForm onSubmit={handleSubmit} />
      </AnimBackground>
    </div>
  );
};

export default SignUp;
