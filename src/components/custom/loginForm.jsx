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
import { Checkbox } from "@/components/ui/checkbox";

export function LoginForm() {
 return (
    <Card className="w-[420px] self-center justify-self-center">
      <CardHeader>
        <CardTitle className=" text-4xl">Log in</CardTitle>
        <CardDescription>
          Enter your username below to log in your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="loginForm" method="post" action="/api/account/login">
          <div className="grid w-full items-center gap-4 mb-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" placeholder="e.g. John Doe" required />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" name="password" placeholder="********" required />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="keep-logged-in" />
              <label
                htmlFor="keep-logged-in"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Keep me logged in
              </label>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-6">
        <Button className=" w-full" form="loginForm">Log in</Button>
        <p className=" text-muted-foreground mt-6 text-sm">
          Don`t have an account?{" "}
          <Link to="/signup" className=" text-indigo-500">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
