import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, RotateCcw, Clock, Target, Keyboard as KeyboardIcon } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export interface TestResult {
  wpm: number;
  accuracy: number;
  totalKeys: number;
  correctKeys: number;
  duration: number;
  timestamp: number;
  difficulty: string;
  userName: string;
}

interface TypingTestProps {
  onResultSubmit: (result: TestResult) => void;
  userName: string;
}

const paragraphs = {
  easy: [
    "The sun shines bright in the clear blue sky. Birds sing happy songs in the tall green trees. Children play games in the warm summer park. Ice cream trucks play music down the quiet street.",
    "Cats like to sleep in sunny spots by windows. Dogs wag their tails when they see friends. Fish swim around in clean water tanks. Rabbits hop quickly across the soft grass.",
    "Books tell amazing stories about faraway places. Movies show us worlds we have never seen. Music makes people feel happy and sad. Art helps us share our feelings with others."
  ],
  medium: [
    "Technology has revolutionized the way we communicate and interact with each other. Social media platforms connect people across continents, enabling instant sharing of ideas and experiences. However, this digital transformation also presents challenges regarding privacy and authentic human connection.",
    "Climate change represents one of the most pressing challenges of our generation. Rising global temperatures affect weather patterns, ocean levels, and biodiversity worldwide. Scientists emphasize the importance of sustainable practices and renewable energy sources to mitigate environmental damage.",
    "Education systems worldwide are adapting to incorporate digital learning tools and methodologies. Online platforms provide access to knowledge for students in remote areas, while interactive technologies enhance traditional classroom experiences. This evolution requires teachers to develop new skills and approaches."
  ],
  hard: [
    "Quantum computing leverages the principles of quantum mechanics to process information in fundamentally different ways than classical computers. By utilizing quantum bits or 'qubits' that can exist in superposition states, these systems potentially solve complex computational problems exponentially faster than traditional binary systems.",
    "Neuroplasticity demonstrates the brain's remarkable ability to reorganize neural pathways throughout an individual's lifetime. This phenomenon enables recovery from traumatic injuries, adaptation to environmental changes, and continuous learning. Research indicates that specific cognitive exercises can enhance neuroplastic responses significantly.",
    "Cryptocurrency protocols utilize cryptographic techniques to secure decentralized financial transactions without requiring traditional banking intermediaries. Blockchain technology maintains transparent, immutable ledgers that record all network activities, creating trustless systems that operate through mathematical consensus algorithms rather than centralized authorities."
  ]
};

const TypingTestNew: React.FC<TypingTestProps> = ({ onResultSubmit, userName }) => {
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [timeLeft, setTimeLeft] = useState(selectedDuration);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState<number[]>([]);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const audioContext = useRef<AudioContext | null>(null);

  const generateRandomText = useCallback(() => {
    const textArray = paragraphs[selectedDifficulty];
    const randomIndex = Math.floor(Math.random() * textArray.length);
    return textArray[randomIndex];
  }, [selectedDifficulty]);

  useEffect(() => {
    setCurrentText(generateRandomText());
    setTimeLeft(selectedDuration);
  }, [selectedDuration, selectedDifficulty, generateRandomText]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && !isPaused && timeLeft > 0 && !isTestCompleted) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsActive(false);
            completeTest();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 || isTestCompleted) {
      setIsActive(false);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, timeLeft, isTestCompleted]);

  const playKeySound = useCallback(() => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.1);
    
    oscillator.start(audioContext.current.currentTime);
    oscillator.stop(audioContext.current.currentTime + 0.1);
  }, []);

  const startTest = () => {
    setIsActive(true);
    setIsPaused(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const pauseTest = () => {
    setIsPaused(!isPaused);
  };

  const resetTest = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(selectedDuration);
    setUserInput('');
    setCurrentIndex(0);
    setErrors([]);
    setTotalKeystrokes(0);
    setCorrectKeystrokes(0);
    setIsTestCompleted(false);
    setCurrentText(generateRandomText());
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const completeTest = () => {
    setIsTestCompleted(true);
    setIsActive(false);
    
    const timeTaken = (selectedDuration - timeLeft) / 60; // in minutes
    const wpm = Math.round((userInput.length / 5) / timeTaken);
    const accuracy = totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 0;
    
    const result: TestResult = {
      wpm: wpm || 0,
      accuracy,
      totalKeys: totalKeystrokes,
      correctKeys: correctKeystrokes,
      duration: selectedDuration - timeLeft,
      timestamp: Date.now(),
      difficulty: selectedDifficulty,
      userName
    };
    
    onResultSubmit(result);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    if (!isActive && !isPaused) {
      startTest();
    }
    
    playKeySound();
    
    // Prevent input beyond the text length
    if (value.length > currentText.length) {
      return;
    }
    
    setUserInput(value);
    setCurrentIndex(value.length);
    
    // Count keystrokes and accuracy
    if (value.length > userInput.length) {
      const newKeystrokes = totalKeystrokes + 1;
      setTotalKeystrokes(newKeystrokes);
      
      const lastCharIndex = value.length - 1;
      if (value[lastCharIndex] === currentText[lastCharIndex]) {
        setCorrectKeystrokes(correctKeystrokes + 1);
        // Remove from errors if it was previously wrong
        setErrors(prev => prev.filter(index => index !== lastCharIndex));
      } else {
        // Add to errors
        setErrors(prev => [...prev, lastCharIndex]);
      }
    }
    
    // Check if test is completed (all text typed correctly)
    if (value === currentText) {
      completeTest();
    }
  };

  const renderText = () => {
    return currentText.split('').map((char, index) => {
      let className = 'text-muted-foreground';
      
      if (index < userInput.length) {
        if (userInput[index] === char) {
          className = 'text-foreground bg-secondary';
        } else {
          className = 'text-destructive bg-destructive/20';
        }
      } else if (index === currentIndex) {
        className = 'text-foreground bg-primary/20 border-l-2 border-primary';
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  const calculateCurrentStats = () => {
    const timeTaken = (selectedDuration - timeLeft) / 60;
    const currentWpm = timeTaken > 0 ? Math.round((userInput.length / 5) / timeTaken) : 0;
    const currentAccuracy = totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 100;
    return { currentWpm, currentAccuracy };
  };

  const { currentWpm, currentAccuracy } = calculateCurrentStats();
  const progress = ((selectedDuration - timeLeft) / selectedDuration) * 100;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Typing Test</h1>
            <p className="text-muted-foreground">Welcome, {userName}!</p>
          </div>
          <ThemeToggle />
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Test Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Duration</label>
                <Select 
                  value={selectedDuration.toString()} 
                  onValueChange={(value) => setSelectedDuration(Number(value))}
                  disabled={isActive}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 seconds</SelectItem>
                    <SelectItem value="60">60 seconds</SelectItem>
                    <SelectItem value="120">2 minutes</SelectItem>
                    <SelectItem value="180">3 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Difficulty</label>
                <Select 
                  value={selectedDifficulty} 
                  onValueChange={(value: 'easy' | 'medium' | 'hard') => setSelectedDifficulty(value)}
                  disabled={isActive}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Live Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold">{currentWpm}</div>
                  <div className="text-sm text-muted-foreground">WPM</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{currentAccuracy}%</div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{timeLeft}s</div>
                  <div className="text-sm text-muted-foreground">Time Left</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{totalKeystrokes}</div>
                  <div className="text-sm text-muted-foreground">Keystrokes</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <KeyboardIcon className="h-5 w-5" />
                Timer & Progress
              </CardTitle>
              <Badge variant={selectedDifficulty === 'easy' ? 'secondary' : selectedDifficulty === 'medium' ? 'default' : 'destructive'}>
                {selectedDifficulty.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={progress} className="w-full" />
              <div className="flex gap-2">
                <Button 
                  onClick={startTest} 
                  disabled={isActive && !isPaused}
                  variant="default"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </Button>
                <Button 
                  onClick={pauseTest} 
                  disabled={!isActive}
                  variant="outline"
                >
                  <Pause className="h-4 w-4 mr-2" />
                  {isPaused ? 'Resume' : 'Pause'}
                </Button>
                <Button 
                  onClick={resetTest}
                  variant="outline"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Type the text below</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg text-lg leading-relaxed font-mono min-h-[120px]">
                {renderText()}
              </div>
              <textarea
                ref={inputRef}
                value={userInput}
                onChange={handleInputChange}
                disabled={isTestCompleted || (isActive && isPaused) || timeLeft === 0}
                placeholder={isActive ? "Start typing..." : "Click Start or begin typing to start the test"}
                className="w-full p-4 text-lg font-mono bg-background border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                rows={4}
              />
              <div className="text-sm text-muted-foreground">
                {isTestCompleted ? 'Test completed!' : 
                 isPaused ? 'Test paused. Click Resume to continue.' : 
                 isActive ? 'Type the text above as accurately as possible.' : 
                 'Click Start or begin typing to start the test.'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TypingTestNew;