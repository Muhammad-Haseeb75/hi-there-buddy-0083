import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Target, Clock, Keyboard, TrendingUp, RotateCcw } from 'lucide-react';
import { TestResult } from './TypingTestNew';

interface TestResultsProps {
  result: TestResult;
  bestWpm: number;
  bestAccuracy: number;
  onNewTest: () => void;
}

const TestResultsNew: React.FC<TestResultsProps> = ({ 
  result, 
  bestWpm, 
  bestAccuracy, 
  onNewTest 
}) => {
  const isNewWpmRecord = result.wpm >= bestWpm;
  const isNewAccuracyRecord = result.accuracy >= bestAccuracy;

  const getPerformanceGrade = () => {
    if (result.wpm >= 60 && result.accuracy >= 95) return { grade: 'Excellent', color: 'bg-green-500' };
    if (result.wpm >= 40 && result.accuracy >= 90) return { grade: 'Good', color: 'bg-blue-500' };
    if (result.wpm >= 25 && result.accuracy >= 80) return { grade: 'Average', color: 'bg-yellow-500' };
    return { grade: 'Needs Practice', color: 'bg-red-500' };
  };

  const { grade, color } = getPerformanceGrade();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Test Results</h2>
        <Badge variant="outline" className={`${color} text-white border-0`}>
          {grade}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className={isNewWpmRecord ? 'ring-2 ring-yellow-500' : ''}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Words per Minute</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              {result.wpm}
              {isNewWpmRecord && <Trophy className="h-5 w-5 text-yellow-500" />}
            </div>
            <p className="text-xs text-muted-foreground">
              {isNewWpmRecord ? 'New personal best!' : `Best: ${bestWpm} WPM`}
            </p>
          </CardContent>
        </Card>

        <Card className={isNewAccuracyRecord ? 'ring-2 ring-yellow-500' : ''}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              {result.accuracy}%
              {isNewAccuracyRecord && <Trophy className="h-5 w-5 text-yellow-500" />}
            </div>
            <p className="text-xs text-muted-foreground">
              {isNewAccuracyRecord ? 'New personal best!' : `Best: ${bestAccuracy}%`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{result.duration}s</div>
            <p className="text-xs text-muted-foreground">
              Test duration
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Keystrokes</CardTitle>
            <Keyboard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{result.totalKeys}</div>
            <p className="text-xs text-muted-foreground">
              {result.correctKeys} correct
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Difficulty Level:</span>
                <Badge variant="outline">{result.difficulty.toUpperCase()}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Characters per Minute:</span>
                <span>{Math.round(result.wpm * 5)} CPM</span>
              </div>
              <div className="flex justify-between">
                <span>Error Rate:</span>
                <span>{(100 - result.accuracy).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Correct Keystrokes:</span>
                <span>{result.correctKeys} / {result.totalKeys}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Performance Tips:</div>
              <ul className="text-sm text-muted-foreground space-y-1">
                {result.accuracy < 90 && (
                  <li>• Focus on accuracy before speed</li>
                )}
                {result.wpm < 40 && (
                  <li>• Practice finger placement and touch typing</li>
                )}
                {result.wpm >= 60 && result.accuracy >= 95 && (
                  <li>• Excellent work! Try harder difficulty levels</li>
                )}
                <li>• Take regular breaks to avoid fatigue</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button onClick={onNewTest} size="lg">
          <RotateCcw className="h-4 w-4 mr-2" />
          Take Another Test
        </Button>
      </div>
    </div>
  );
};

export default TestResultsNew;