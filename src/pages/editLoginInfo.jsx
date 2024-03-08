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
                <CardTitle className="text-4xl">Edit Login Info</CardTitle>
                <CardDescription>
                    Replace the information below to edit your login info.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4 mb-4">
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          name="username"
                          value={userData.username}
                          onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          type="password"
                          id="password"
                          name="password"
                          value={userData.password}
                          onChange={handleChange}
                        />
                    </div>
                </div>
                <Button type="submit" className="w-full">
                    Save Changes
                </Button>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-6">
                <Button
                  className="w-full"
                  onClick={() => window.location.replace('/')} 
                >
                    Cancel
                </Button>
            </CardFooter>
        </Card>
      </AnimBackground>
    </div>
  );
};

export default EditLoginInfo;
