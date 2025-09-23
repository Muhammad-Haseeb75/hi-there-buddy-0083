import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, Clock } from 'lucide-react';

interface TestResult {
  wpm: number;
  accuracy: number;
  totalKeys: number;
  duration: number;
  timestamp: number;
}

interface LeaderboardProps {
  results: TestResult[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ results }) => {
  const sortedByWpm = [...results]
    .sort((a, b) => b.wpm - a.wpm)
    .slice(0, 5);

  const sortedByAccuracy = [...results]
    .sort((a, b) => b.accuracy - a.accuracy)
    .slice(0, 5);

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 1:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 2:
        return <Award className="w-5 h-5 text-orange-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{position + 1}</span>;
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const getBadgeVariant = (position: number) => {
    switch (position) {
      case 0:
        return 'default';
      case 1:
        return 'secondary';
      case 2:
        return 'outline';
      default:
        return 'outline';
    }
  };

  if (results.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Session Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No tests completed yet.</p>
            <p className="text-sm">Complete a typing test to see your scores here!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Speed Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Top Speeds (WPM)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sortedByWpm.map((result, index) => (
              <div
                key={`wpm-${result.timestamp}`}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {getPositionIcon(index)}
                  <div>
                    <div className="font-semibold">{result.wpm} WPM</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTimestamp(result.timestamp)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={getBadgeVariant(index)}>
                    {result.accuracy}% accuracy
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">
                    {result.duration}s test
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Accuracy Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Award className="w-5 h-5 text-green-500" />
            Top Accuracy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sortedByAccuracy.map((result, index) => (
              <div
                key={`accuracy-${result.timestamp}`}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {getPositionIcon(index)}
                  <div>
                    <div className="font-semibold">{result.accuracy}% Accuracy</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTimestamp(result.timestamp)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={getBadgeVariant(index)}>
                    {result.wpm} WPM
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">
                    {result.duration}s test
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Session Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Session Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">
                {results.length}
              </div>
              <div className="text-sm text-muted-foreground">Tests Taken</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {Math.round(results.reduce((sum, r) => sum + r.wpm, 0) / results.length) || 0}
              </div>
              <div className="text-sm text-muted-foreground">Avg WPM</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {Math.round(results.reduce((sum, r) => sum + r.accuracy, 0) / results.length) || 0}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {Math.max(...results.map(r => r.wpm), 0)}
              </div>
              <div className="text-sm text-muted-foreground">Best WPM</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;