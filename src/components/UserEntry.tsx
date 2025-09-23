import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Keyboard } from 'lucide-react';

interface UserEntryProps {
  onNameSubmit: (name: string) => void;
}

const UserEntry: React.FC<UserEntryProps> = ({ onNameSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onNameSubmit(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Keyboard className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Welcome to Typing Test</CardTitle>
          <CardDescription>
            Enter your name to start improving your typing speed and accuracy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1"
                autoFocus
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={!name.trim()}
            >
              Start Typing Test
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserEntry;