import React from 'react';
import Header from '@/components/custom/header';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThumbsUp, ThumbsDown, MessageCircle, Send, MoreVertical } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Tag from '@/components/custom/tag';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import AnimBackground from '@/components/custom/animBackground';

const Post = () => {
  return (
    <AnimBackground className="h-screen bg-background flex flex-col">
      <Header />

      <div className="max-w-[100vw] px-16 py-5 flex flex-col gap-3">
        <div className='mb-4 flex items-end gap-6'>
          <h2 className="text-4xl font-bold">Placeholder Post Title</h2>
          <p className='flex items-center gap-4'>
            By 

            <a href="/user" className='flex items-center gap-2'>
              <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              user1234
            </a>
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-0 flex flex-row gap-6">
            <div className='flex gap-2'>
              <Tag name="tag1" />
              <Tag name="tag2" />
            </div>

            <div className='flex gap-2'>
              <MessageCircle style={{ width: '1.5rem', height: '1.5rem' }} />
              <span>10</span>
            </div>
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

          <CardFooter className="flex justify-start gap-5">
            <div className="flex items-center">
                <Button variant="ghost" style={{ border: 'none' }}><ThumbsUp /></Button>
                <span>50</span>
                <Button variant="ghost" style={{ border: 'none' }}><ThumbsDown /></Button>
                <span>10</span>
            </div>
            <div>
                <Button variant="ghost" style={{ width: '180px' }}>
                    <Send style={{ width: '1.5rem', height: '1.5rem' }} />
                    <a href="/comment">Add a comment</a>
                </Button>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger variant="ghost">
                  <MoreVertical style={{ width: '1.5rem', height: '1.5rem' }} />
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem>Edit post</DropdownMenuItem>
                  <DropdownMenuItem>Delete post</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardFooter>
        </Card>

        {/* Normal Comment */}
        <Card>
          <CardHeader className="flex flex-row">
            <a href="/user" className='flex items-center gap-2'>
              <Avatar>
                  <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxdV8cuxP4Q5cg_x2ofSk6thIgUUlxMnuqIM6z4OPSvl-k4GA6UUS6GM5JXP_cTU2FvQI&usqp=CAU" />
                  <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              user#4251
            </a>
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
        <Card>
          <CardHeader className="flex flex-row">
            <a href="/user" className='flex items-center gap-2'>
              <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              user1234
            </a>
          </CardHeader>

          <CardContent>
              <Card className="p-4">
                <CardHeader className="p-0 space-y-0 flex flex-row">
                  <div className='flex items-center gap-4'>
                    Replying to

                    <a href="/user" className='flex items-center gap-2'>
                      <Avatar>
                          <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxdV8cuxP4Q5cg_x2ofSk6thIgUUlxMnuqIM6z4OPSvl-k4GA6UUS6GM5JXP_cTU2FvQI&usqp=CAU" />
                          <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      user#4251
                    </a>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0 mt-2 text-zinc-400 text-ellipsis text-nowrap overflow-hidden">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                  sunt in culpa qui officia deserunt mollit anim id est laborum. 
                </CardContent>
              </Card>

              {/* Reply */}
              <div className="mt-6 grid w-full items-center">
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

              <DropdownMenu>
                <DropdownMenuTrigger variant="ghost" className="ml-[15px]">
                  <MoreVertical style={{ width: '1.5rem', height: '1.5rem' }} />
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem>Edit comment</DropdownMenuItem>
                  <DropdownMenuItem>Delete comment</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </CardFooter>
        </Card>

        {/* TODO: Based on the number of child posts, populate the pagination
            numberings accordingly. */}
        <Pagination className="mt-4">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                    {/* TODO: Make shown posts link based (item no. as param). */}
                    <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
      </div>
    </AnimBackground>
  );
};

export default Post;
