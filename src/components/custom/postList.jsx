import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";

import PostCard from './postCard';

// eslint-disable-next-line no-unused-vars, react/prop-types
const PostList = ({ by }) => {
    // TODO: Based on the value of `by`, query the relevant post data.
    return (
        <div className='flex flex-col gap-3'>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-3'>
                {/* TODO: Display all visible posts here. */}
                <PostCard 
                    title="Post Title"
                    author="user1432"
                    body="A very epic description."
                    uploadDate="1/1/2024"
                    views={12345}
                    tags={['tag1', 'tag2']}
                />
            </div>

            {/* TODO: Based on the number of queried posts, populate the pagination
                numberings accordingly. */}
            <Pagination>
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
    );
};

export default PostList;