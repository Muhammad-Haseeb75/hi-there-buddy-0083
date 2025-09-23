import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserEntry from '@/components/UserEntry';
import TypingTestNew from '@/components/TypingTestNew';
import TestResultsNew from '@/components/TestResultsNew';
import LeaderboardNew from '@/components/LeaderboardNew';
import PerformanceChart from '@/components/PerformanceChart';
import { ThemeProvider } from '@/components/ThemeProvider';
import { TestResult } from '@/components/TypingTestNew';

const Index = () => {
  const [userName, setUserName] = useState<string>('');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [lastResult, setLastResult] = useState<TestResult | null>(null);
  const [activeTab, setActiveTab] = useState('test');

  // Load results from localStorage on component mount
  useEffect(() => {
    const savedResults = localStorage.getItem('typingTestResults');
    const savedUserName = localStorage.getItem('typingTestUserName');
    
    if (savedResults) {
      setTestResults(JSON.parse(savedResults));
    }
    if (savedUserName) {
      setUserName(savedUserName);
    }
  }, []);

  // Save results to localStorage whenever they change
  useEffect(() => {
    if (testResults.length > 0) {
      localStorage.setItem('typingTestResults', JSON.stringify(testResults));
    }
  }, [testResults]);

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    localStorage.setItem('typingTestUserName', name);
  };

  const handleResultSubmit = (result: TestResult) => {
    setTestResults(prev => [...prev, result]);
    setLastResult(result);
    setActiveTab('results');
  };

  const handleNewTest = () => {
    setActiveTab('test');
  };

  const getBestWpm = () => {
    return testResults.length > 0 ? Math.max(...testResults.map(r => r.wpm)) : 0;
  };

  const getBestAccuracy = () => {
    return testResults.length > 0 ? Math.max(...testResults.map(r => r.accuracy)) : 0;
  };

  if (!userName) {
    return (
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <UserEntry onNameSubmit={handleNameSubmit} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="test">Typing Test</TabsTrigger>
          <TabsTrigger value="results" disabled={!lastResult}>Results</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="test" className="mt-6">
          <TypingTestNew onResultSubmit={handleResultSubmit} userName={userName} />
        </TabsContent>
        
        <TabsContent value="results" className="mt-6">
          {lastResult && (
            <TestResultsNew 
              result={lastResult} 
              bestWpm={getBestWpm()}
              bestAccuracy={getBestAccuracy()}
              onNewTest={handleNewTest}
            />
          )}
        </TabsContent>
        
        <TabsContent value="leaderboard" className="mt-6">
          <LeaderboardNew results={testResults} />
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <PerformanceChart results={testResults} />
        </TabsContent>
      </Tabs>
    </ThemeProvider>
  );
};

export default Index;
