import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { TestResult } from './TypingTestNew';

interface LeaderboardProps {
  results: TestResult[];
}

const LeaderboardNew: React.FC<LeaderboardProps> = ({ results }) => {
  const leaderboardData = useMemo(() => {
    if (results.length === 0) return [];

    // Sort by WPM descending, then by accuracy descending
    const sortedResults = [...results]
      .sort((a, b) => {
        if (b.wpm !== a.wpm) return b.wpm - a.wpm;
        return b.accuracy - a.accuracy;
      })
      .slice(0, 10); // Top 10 results

    return sortedResults;
  }, [results]);

  const getStats = () => {
    if (results.length === 0) return null;

    const totalTests = results.length;
    const avgWpm = Math.round(results.reduce((sum, r) => sum + r.wpm, 0) / totalTests);
    const avgAccuracy = Math.round(results.reduce((sum, r) => sum + r.accuracy, 0) / totalTests);
    const bestWpm = Math.max(...results.map(r => r.wpm));
    const bestAccuracy = Math.max(...results.map(r => r.accuracy));

    return { totalTests, avgWpm, avgAccuracy, bestWpm, bestAccuracy };
  };

  const stats = getStats();

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 2:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{index + 1}</span>;
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (results.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No test results yet. Complete a typing test to see your scores!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {stats && (
        <div className="grid gap-4 md:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTests}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best WPM</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.bestWpm}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best Accuracy</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.bestAccuracy}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg WPM</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgWpm}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Accuracy</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgAccuracy}%</div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Top Performances
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboardData.map((result, index) => (
              <div 
                key={`${result.timestamp}-${index}`}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  index < 3 ? 'bg-muted/50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  {getRankIcon(index)}
                  <div>
                    <div className="font-medium">{result.userName}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(result.timestamp)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-bold">{result.wpm} WPM</div>
                    <div className="text-sm text-muted-foreground">{result.accuracy}% accuracy</div>
                  </div>
                  <Badge 
                    variant={result.difficulty === 'easy' ? 'secondary' : 
                            result.difficulty === 'medium' ? 'default' : 'destructive'}
                  >
                    {result.difficulty}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardNew;