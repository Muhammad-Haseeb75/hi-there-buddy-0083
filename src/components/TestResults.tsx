import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Clock, Keyboard } from 'lucide-react';

interface TestResult {
  wpm: number;
  accuracy: number;
  totalKeys: number;
  duration: number;
  timestamp: number;
}

interface TestResultsProps {
  result: TestResult;
  bestWpm: number;
  bestAccuracy: number;
}

const TestResults: React.FC<TestResultsProps> = ({ result, bestWpm, bestAccuracy }) => {
  const getWpmRating = (wpm: number) => {
    if (wpm >= 80) return { rating: 'Expert', color: 'bg-yellow-500' };
    if (wpm >= 60) return { rating: 'Advanced', color: 'bg-green-500' };
    if (wpm >= 40) return { rating: 'Intermediate', color: 'bg-blue-500' };
    if (wpm >= 20) return { rating: 'Beginner', color: 'bg-gray-500' };
    return { rating: 'Practice More', color: 'bg-red-500' };
  };

  const getAccuracyRating = (accuracy: number) => {
    if (accuracy >= 95) return { rating: 'Excellent', color: 'bg-green-500' };
    if (accuracy >= 85) return { rating: 'Good', color: 'bg-blue-500' };
    if (accuracy >= 75) return { rating: 'Fair', color: 'bg-yellow-500' };
    return { rating: 'Needs Improvement', color: 'bg-red-500' };
  };

  const wpmRating = getWpmRating(result.wpm);
  const accuracyRating = getAccuracyRating(result.accuracy);

  const isNewWpmRecord = result.wpm > bestWpm;
  const isNewAccuracyRecord = result.accuracy > bestAccuracy;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Test Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Stats */}
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Keyboard className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Words Per Minute</span>
              {isNewWpmRecord && (
                <Badge variant="default" className="text-xs">NEW RECORD!</Badge>
              )}
            </div>
            <div className="text-4xl font-bold text-primary">{result.wpm}</div>
            <Badge className={`${wpmRating.color} text-white`}>
              {wpmRating.rating}
            </Badge>
          </div>
          
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Accuracy</span>
              {isNewAccuracyRecord && (
                <Badge variant="default" className="text-xs">NEW RECORD!</Badge>
              )}
            </div>
            <div className="text-4xl font-bold text-primary">{result.accuracy}%</div>
            <Badge className={`${accuracyRating.color} text-white`}>
              {accuracyRating.rating}
            </Badge>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Speed Progress</span>
              <span>{result.wpm}/100 WPM</span>
            </div>
            <Progress value={(result.wpm / 100) * 100} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Accuracy Progress</span>
              <span>{result.accuracy}/100%</span>
            </div>
            <Progress value={result.accuracy} className="h-2" />
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Duration</span>
            </div>
            <div className="text-xl font-semibold">{result.duration}s</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Keyboard className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Total Keys</span>
            </div>
            <div className="text-xl font-semibold">{result.totalKeys}</div>
          </div>
        </div>

        {/* Performance Tips */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">💡 Performance Tips</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {result.wpm < 40 && <li>• Focus on accuracy before speed - speed will come naturally</li>}
            {result.accuracy < 90 && <li>• Slow down to improve accuracy - mistakes slow you down more than careful typing</li>}
            {result.wpm >= 40 && result.accuracy >= 90 && <li>• Great job! Try increasing difficulty or longer tests</li>}
            <li>• Practice touch typing without looking at the keyboard</li>
            <li>• Maintain proper posture and finger positioning</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestResults;