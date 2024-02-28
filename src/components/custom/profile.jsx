import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { TempState } from "@/lib/placeholder/tempState";

const profile = () => {
  const handleLogOutClick = () => {
    TempState.set("loggedIn", false);
    window.location.replace("/");
  };

  return (
    <div className="flex gap-4 items-center">
      {TempState.get("loggedIn") ? (
        <>
          <a href="/user/0" className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <p className="font-bold">user0</p>
          </a>

          <Button onClick={handleLogOutClick}>Log Out</Button>
        </>
      ) : (
        <>
          <Button asChild>
            <a href="/login">Log In</a>
          </Button>

          <Button asChild>
            <a href="/signUp">Sign Up</a>
          </Button>
        </>
      )}
    </div>
  );
};

export default profile;
