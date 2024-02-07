import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const CardList = ({ children }) => {
    return (
        <div className='flex flex-col gap-3'>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-3'>
                {children}
            </div>

            {/* TODO: Based on the number of child posts, populate the pagination
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

export default CardList;