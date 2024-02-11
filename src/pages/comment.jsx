import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { PlusSquare } from 'lucide-react';

const CommentsPage = () => {
  return (
    <Card className="w-full h-full" style={{ border: 'none'}}>
      <CardHeader className="flex  flex-row justify-between">
        <div style={{ flex: '0.5' }}>
          <Button variant="ghost"><ArrowLeft /></Button>
        </div>
        <div style={{ flex: '2.5' }}>
          <CardTitle className="text-4xl">Add a Comment</CardTitle>
        </div>
        <div style={{ flex: '7', justifyContent: 'flex-end', display: 'flex' }}>
          <Button variant="ghost" style={{ border: 'none', color: '#5E51FF', fontSize: '1.5rem' }}>Post</Button>
        </div>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4 mb-4">
            <div className="flex flex-col gap-3">
              <hr style={{ width: '100%', height: '2px', backgroundColor: 'white', border: 'none' }} />
              <textarea 
                id="comment" 
                placeholder="Write your comment here" 
                rows={29} 
                style={{
                  backgroundColor: "black", 
                  color: "white", 
                  border: "1px solid white",
                  borderRadius: "10px",
                  padding: "15px", 
                  marginTop: "40px",
                  marginLeft: "40px",
                  marginRight: "40px"
                }} 
              />
            </div>
          </div>
        </form>
      </CardContent>
      <hr style={{ width: '100%', height: '2px', backgroundColor: 'gray', border: 'none' }} />
      <Button variant="ghost" style={{ border: 'none', padding: '3rem'}}><PlusSquare style={{ width: '3rem', height: '3rem' }} /></Button>
    </Card>
  );
};

export default CommentsPage;
