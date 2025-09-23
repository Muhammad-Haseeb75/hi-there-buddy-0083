import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { TestResult } from './TypingTestNew';

interface PerformanceChartProps {
  results: TestResult[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ results }) => {
  if (results.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance Chart
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Complete more tests to see your progress chart!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = results
    .slice(-10) // Last 10 results
    .map((result, index) => ({
      test: `Test ${index + 1}`,
      wpm: result.wpm,
      accuracy: result.accuracy,
      date: new Date(result.timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    }));

  const difficultyData = [
    {
      difficulty: 'Easy',
      tests: results.filter(r => r.difficulty === 'easy').length,
      avgWpm: Math.round(
        results.filter(r => r.difficulty === 'easy')
          .reduce((sum, r) => sum + r.wpm, 0) / 
        Math.max(1, results.filter(r => r.difficulty === 'easy').length)
      )
    },
    {
      difficulty: 'Medium', 
      tests: results.filter(r => r.difficulty === 'medium').length,
      avgWpm: Math.round(
        results.filter(r => r.difficulty === 'medium')
          .reduce((sum, r) => sum + r.wpm, 0) / 
        Math.max(1, results.filter(r => r.difficulty === 'medium').length)
      )
    },
    {
      difficulty: 'Hard',
      tests: results.filter(r => r.difficulty === 'hard').length,
      avgWpm: Math.round(
        results.filter(r => r.difficulty === 'hard')
          .reduce((sum, r) => sum + r.wpm, 0) / 
        Math.max(1, results.filter(r => r.difficulty === 'hard').length)
      )
    }
  ].filter(item => item.tests > 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Progress Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="test" 
                  className="text-muted-foreground"
                  fontSize={12}
                />
                <YAxis className="text-muted-foreground" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="wpm" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                  name="WPM"
                />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="hsl(var(--secondary-foreground))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--secondary-foreground))', strokeWidth: 2 }}
                  name="Accuracy %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {difficultyData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance by Difficulty
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={difficultyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="difficulty" 
                    className="text-muted-foreground"
                    fontSize={12}
                  />
                  <YAxis className="text-muted-foreground" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar 
                    dataKey="avgWpm" 
                    fill="hsl(var(--primary))"
                    name="Average WPM"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PerformanceChart;