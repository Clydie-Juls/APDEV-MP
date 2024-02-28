import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { TempState } from "@/lib/placeholder/tempState";

const SignupForm = () => {
  const handleSignUp = () => {
    TempState.set("loggedIn", true);
    window.location.replace("/user");
  };

  return (
    <Card className="w-[420px] self-center justify-self-center">
      <CardHeader>
        <CardTitle className=" text-4xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your username below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4 mb-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="e.g. John Doe" />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="********" />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="conf-password">Confirm Password</Label>
              <Input
                type="password"
                id="conf-password"
                placeholder="********"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-6">
        <Button className=" w-full" onClick={handleSignUp}>
          Sign Up
        </Button>
        <p className=" text-muted-foreground mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className=" text-indigo-500">
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
