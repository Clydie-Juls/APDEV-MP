import AnimBackground from "@/components/custom/animBackground";
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

const EditLoginInfo = () => {
  return (
    <div>
      <AnimBackground className="flex items-center justify-center">
        <Card className="w-[420px] self-center justify-self-center">
            <CardHeader>
                <CardTitle className=" text-4xl">Edit Login Info</CardTitle>
                <CardDescription>
                    Replace the information below to edit your login info.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                <div className="grid w-full items-center gap-4 mb-4">
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" value="user1234" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="password">Password</Label>
                        <Input type="text" id="password" value="12345678" />
                    </div>
                </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-6">
                <Button className="w-full" onClick={() => window.location.replace('/user/0')}>
                    Save Changes
                </Button>
            </CardFooter>
        </Card>
      </AnimBackground>
    </div>
  );
};

export default EditLoginInfo;
