import React from 'react';
import Header from '@/components/custom/header';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, MessageCircle, Send, MoreVertical } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Mention } from '@/components/ui/mention';

const Post = () => {
  return (
    <div className="h-screen bg-background flex flex-col">
      <Header />
      <div className="flex justify-start">
        <CardTitle className="text-5xl" style={{ padding: '40px', paddingLeft: '80px' }}>Post Title</CardTitle>
      </div>
      <div style={{ paddingLeft: '80px' }}>
        <Card style={{ width: '90%' }}>
          <CardHeader className="flex  flex-row">
            <Button style={{ fontWeight: 'bold', borderRadius: '20px', background: 'gray', color: 'white' }}>#Tag1</Button>
            <Button style={{ fontWeight: 'bold', marginLeft: '20px', marginTop: '-1px', borderRadius: '20px', background: 'gray', color: 'white' }}>#Tag2</Button>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center">
                <div className="flex flex-col">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                    in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
                    officia deserunt mollit anim id est laborum. 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                    in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
                    officia deserunt mollit anim id est laborum. 
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex">
            <div className="flex items-center">
                <Button variant="ghost" style={{ border: 'none' }}><ThumbsUp /></Button>
                <span>50</span>
                <Button variant="ghost" style={{ border: 'none' }}><ThumbsDown /></Button>
                <span>10</span>
            </div>
            <div style={{ marginLeft: '20px'}}>
                <Button variant="ghost" style={{ width: '100px' }}>
                    <MessageCircle style={{ width: '1.5rem', height: '1.5rem' }} />
                    <span>10</span>
                </Button>
            </div>
            <div style={{ marginLeft: '20px'}}>
                <Button variant="ghost" style={{ width: '180px' }}>
                    <Send style={{ width: '1.5rem', height: '1.5rem' }} />
                    <span>Add a comment</span>
                </Button>
            </div>
            <div style={{ marginLeft: '15px'}}>
                <Button variant="ghost" style={{ border: 'none' }}>
                    <MoreVertical style={{ width: '1.5rem', height: '1.5rem' }} />
                </Button>
            </div>
        </CardFooter>
        </Card>

        {/* Normal Comment */}
        <Card style={{ width: '90%', marginTop: '8px' }}>
          <CardHeader className="flex  flex-row">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>
                User#4251
            </span>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center">
                <div className="flex flex-col">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                    in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
                    officia deserunt mollit anim id est laborum. 
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex">
            <div className="flex items-center">
                <Button variant="ghost" style={{ border: 'none' }}><ThumbsUp /></Button>
                <span>50</span>
                <Button variant="ghost" style={{ border: 'none' }}><ThumbsDown /></Button>
                <span>10</span>
            </div>
        </CardFooter>
        </Card>

        {/* Nested Comment */}
        <Card style={{ width: '90%', marginTop: '8px'}}>
        <CardHeader className="flex flex-row">
            <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>User#1234</span>
        </CardHeader>
        <CardContent>
            <Card style={{ marginTop: '8px' }}>
            <CardHeader className="flex flex-row">
                <Avatar>
                <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxdV8cuxP4Q5cg_x2ofSk6thIgUUlxMnuqIM6z4OPSvl-k4GA6UUS6GM5JXP_cTU2FvQI&usqp=CAU" />
                <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span>User#4321</span>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col">
                    <Mention>@User#1234</Mention> This is a nested comment
                </div>
            </CardContent>
            </Card>

            {/* Reply */}
            <div className="grid w-full items-center">
            <div className="flex flex-col">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum. 
            </div>
            </div>
        </CardContent>
        <CardFooter className="flex">
            <div className="flex items-center">
            <Button variant="ghost" style={{ border: 'none' }}>
                <ThumbsUp />
            </Button>
            <span>50</span>
            <Button variant="ghost" style={{ border: 'none' }}>
                <ThumbsDown />
            </Button>
            <span>10</span>
            </div>
            <div style={{ marginLeft: '15px'}}>
                <Button variant="ghost" style={{ border: 'none' }}>
                    <MoreVertical style={{ width: '1.5rem', height: '1.5rem' }} />
                </Button>
            </div>
        </CardFooter>
        </Card>

      </div>
    </div>
  );
};

export default Post;
