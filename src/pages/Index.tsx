import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TypingTest from '@/components/TypingTest';
import TestResults from '@/components/TestResults';
import Leaderboard from '@/components/Leaderboard';

interface TestResult {
  wpm: number;
  accuracy: number;
  totalKeys: number;
  duration: number;
  timestamp: number;
}

const Index = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [lastResult, setLastResult] = useState<TestResult | null>(null);
  const [activeTab, setActiveTab] = useState('test');

  const handleResultSubmit = (result: TestResult) => {
    setTestResults(prev => [...prev, result]);
    setLastResult(result);
    setActiveTab('results');
  };

  const getBestWpm = () => {
    return testResults.length > 0 ? Math.max(...testResults.map(r => r.wpm)) : 0;
  };

  const getBestAccuracy = () => {
    return testResults.length > 0 ? Math.max(...testResults.map(r => r.accuracy)) : 0;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Typing Test</h1>
          <p className="text-xl text-muted-foreground">Improve your typing speed and accuracy</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="test">Typing Test</TabsTrigger>
            <TabsTrigger value="results" disabled={!lastResult}>Results</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>
          
          <TabsContent value="test" className="mt-6">
            <TypingTest onResultSubmit={handleResultSubmit} />
          </TabsContent>
          
          <TabsContent value="results" className="mt-6">
            {lastResult && (
              <TestResults 
                result={lastResult} 
                bestWpm={getBestWpm()}
                bestAccuracy={getBestAccuracy()}
              />
            )}
          </TabsContent>
          
          <TabsContent value="leaderboard" className="mt-6">
            <Leaderboard results={testResults} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
