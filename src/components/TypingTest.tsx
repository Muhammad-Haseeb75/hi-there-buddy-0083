import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { PlayCircle, PauseCircle, RotateCcw, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestResult {
  wpm: number;
  accuracy: number;
  totalKeys: number;
  duration: number;
  timestamp: number;
}

interface TypingTestProps {
  onResultSubmit: (result: TestResult) => void;
}

const paragraphs = {
  easy: [
    "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet. It is often used for typing practice and testing fonts. The fox is very quick and agile.",
    "A journey of a thousand miles begins with a single step. This ancient wisdom reminds us that even the largest tasks can be accomplished by taking small, consistent actions every day.",
    "Technology has changed the way we communicate with each other. From letters to emails to instant messages, we can now connect with people around the world in seconds."
  ],
  medium: [
    "The advancement of artificial intelligence has revolutionized numerous industries, from healthcare to transportation. Machine learning algorithms can now process vast amounts of data to identify patterns and make predictions that were previously impossible for humans to achieve.",
    "Climate change represents one of the most significant challenges facing humanity in the 21st century. Rising global temperatures, melting ice caps, and extreme weather events are forcing us to reconsider our relationship with the environment and develop sustainable solutions.",
    "The human brain contains approximately 86 billion neurons, each connected to thousands of others through synapses. This incredible network allows us to think, feel, remember, and create in ways that continue to amaze scientists and researchers around the world."
  ],
  hard: [
    "Quantum mechanics fundamentally challenges our classical understanding of reality by demonstrating that particles can exist in multiple states simultaneously until observed. This phenomenon, known as superposition, has profound implications for computing, cryptography, and our philosophical understanding of existence itself.",
    "The intricacies of molecular gastronomy have transformed culinary arts by applying scientific principles to create innovative textures, flavors, and presentations. Chefs now utilize liquid nitrogen, spherification techniques, and precision temperature control to deconstruct traditional dishes and reimagine them in extraordinary ways.",
    "Neuroplasticity, the brain's remarkable ability to reorganize itself throughout life, contradicts the long-held belief that adult brains are static. This discovery has revolutionized rehabilitation medicine, educational methodologies, and our understanding of learning, memory formation, and cognitive recovery after injury."
  ]
};

const TypingTest: React.FC<TypingTestProps> = ({ onResultSubmit }) => {
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [timeLeft, setTimeLeft] = useState(selectedDuration);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentParagraph, setCurrentParagraph] = useState('');
  const [userInput, setUserInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalKeyPresses, setTotalKeyPresses] = useState(0);
  const [errors, setErrors] = useState<number[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const generateRandomParagraph = useCallback(() => {
    const paragraphArray = paragraphs[selectedDifficulty];
    const randomIndex = Math.floor(Math.random() * paragraphArray.length);
    return paragraphArray[randomIndex];
  }, [selectedDifficulty]);

  const playKeySound = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.1);
    
    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 0.1);
  }, []);

  const startTest = () => {
    const newParagraph = generateRandomParagraph();
    setCurrentParagraph(newParagraph);
    setUserInput('');
    setCurrentIndex(0);
    setCorrectChars(0);
    setTotalKeyPresses(0);
    setErrors([]);
    setTimeLeft(selectedDuration);
    setIsActive(true);
    setIsPaused(false);
    setTestCompleted(false);
    inputRef.current?.focus();
  };

  const pauseTest = () => {
    setIsPaused(!isPaused);
  };

  const resetTest = () => {
    setIsActive(false);
    setIsPaused(false);
    setUserInput('');
    setCurrentIndex(0);
    setCorrectChars(0);
    setTotalKeyPresses(0);
    setErrors([]);
    setTimeLeft(selectedDuration);
    setTestCompleted(false);
    setCurrentParagraph('');
  };

  const calculateResults = useCallback(() => {
    const timeElapsed = selectedDuration - timeLeft;
    const words = correctChars / 5; // Standard: 5 characters = 1 word
    const wpm = Math.round((words / timeElapsed) * 60);
    const accuracy = Math.round((correctChars / totalKeyPresses) * 100) || 0;
    
    return {
      wpm,
      accuracy,
      totalKeys: totalKeyPresses,
      duration: timeElapsed,
      timestamp: Date.now()
    };
  }, [correctChars, totalKeyPresses, selectedDuration, timeLeft]);

  useEffect(() => {
    if (isActive && !isPaused && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsActive(false);
            setTestCompleted(true);
            const results = calculateResults();
            onResultSubmit(results);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPaused, timeLeft, calculateResults, onResultSubmit]);

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : '';
  }, [isDarkMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive || isPaused) return;

    const value = e.target.value;
    const newTotalKeys = totalKeyPresses + 1;
    setTotalKeyPresses(newTotalKeys);
    playKeySound();

    if (value.length <= currentParagraph.length) {
      setUserInput(value);
      
      let correct = 0;
      const newErrors: number[] = [];
      
      for (let i = 0; i < value.length; i++) {
        if (value[i] === currentParagraph[i]) {
          correct++;
        } else {
          newErrors.push(i);
        }
      }
      
      setCorrectChars(correct);
      setErrors(newErrors);
      setCurrentIndex(value.length);

      if (value === currentParagraph) {
        setIsActive(false);
        setTestCompleted(true);
        const results = calculateResults();
        onResultSubmit(results);
      }
    }
  };

  const renderText = () => {
    return currentParagraph.split('').map((char, index) => {
      let className = 'text-muted-foreground';
      
      if (index < userInput.length) {
        if (errors.includes(index)) {
          className = 'bg-destructive text-destructive-foreground';
        } else {
          className = 'text-foreground bg-accent/20';
        }
      } else if (index === currentIndex) {
        className = 'bg-primary text-primary-foreground animate-pulse';
      }
      
      return (
        <span key={index} className={cn('text-lg', className)}>
          {char}
        </span>
      );
    });
  };

  const progressPercentage = ((selectedDuration - timeLeft) / selectedDuration) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Typing Test</CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4" />
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                />
                <Moon className="h-4 w-4" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (seconds)</Label>
              <Select
                value={selectedDuration.toString()}
                onValueChange={(value) => {
                  setSelectedDuration(parseInt(value));
                  setTimeLeft(parseInt(value));
                }}
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
            
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
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
            
            <div className="space-y-2">
              <Label>Controls</Label>
              <div className="flex gap-2">
                {!isActive ? (
                  <Button onClick={startTest} className="flex-1">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Start
                  </Button>
                ) : (
                  <Button onClick={pauseTest} variant="secondary" className="flex-1">
                    <PauseCircle className="w-4 h-4 mr-2" />
                    {isPaused ? 'Resume' : 'Pause'}
                  </Button>
                )}
                <Button onClick={resetTest} variant="outline">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Timer and Progress */}
          {isActive && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-mono font-bold">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-muted-foreground">Time Remaining</div>
              </div>
              <Progress value={progressPercentage} className="w-full" />
            </div>
          )}

          {/* Typing Area */}
          {currentParagraph && (
            <div className="space-y-4">
              <div className="p-6 bg-muted/50 rounded-lg border min-h-[120px] font-mono leading-relaxed">
                {renderText()}
              </div>
              
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInputChange}
                disabled={!isActive || isPaused || testCompleted}
                className="w-full p-4 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                placeholder={isActive ? "Start typing..." : "Click Start to begin"}
              />
            </div>
          )}

          {/* Live Stats */}
          {isActive && (
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {Math.round(((correctChars / 5) / ((selectedDuration - timeLeft) / 60)) || 0)}
                </div>
                <div className="text-sm text-muted-foreground">WPM</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {Math.round((correctChars / totalKeyPresses) * 100) || 0}%
                </div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{totalKeyPresses}</div>
                <div className="text-sm text-muted-foreground">Keys Pressed</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TypingTest;