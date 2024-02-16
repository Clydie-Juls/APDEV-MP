import React from "react";
import Header from '@/components/custom/header';
import { CardTitle } from '@/components/ui/card';
import PostCard from '@/components/custom/postCard';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { TempUsers } from "@/lib/placeholder/mockReq";
import { Posts } from "@/lib/placeholder/posts";
import AnimBackground from "@/components/custom/animBackground";

const Search = ({ query }) => {
  return (
    <AnimBackground>
      <div className="h-screen w-screen bg-background flex flex-col">
        <Header />
          <div className="flex justify-start flex-col">
            <CardTitle className="text-3xl" style={{ padding: '40px', paddingLeft: '4rem' }}>120 results containing "{query}"</CardTitle>
            
            <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                {/* Make shown posts link based (item no. as param). */}
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
        </div>
    </AnimBackground>
  );
};

export default Search;