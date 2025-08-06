import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AssessmentQuestion } from '@/types/assessment';
import { ChevronRight } from 'lucide-react';

interface QuestionCardProps {
  question: AssessmentQuestion;
  onAnswer: (value: number | string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionCard({ question, onAnswer, questionNumber, totalQuestions }: QuestionCardProps) {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [numericValue, setNumericValue] = useState<string>('');

  const handleSubmit = () => {
    if (question.type === 'numeric') {
      if (numericValue.trim()) {
        onAnswer(parseFloat(numericValue));
      }
    } else {
      if (selectedValue) {
        onAnswer(question.type === 'likert' ? parseInt(selectedValue) : parseInt(selectedValue));
      }
    }
  };

  const canSubmit = question.type === 'numeric' ? numericValue.trim() !== '' : selectedValue !== '';

  const renderLikertScale = () => (
    <RadioGroup value={selectedValue} onValueChange={setSelectedValue} className="space-y-4">
      {[
        { value: '1', label: 'Strongly Disagree' },
        { value: '2', label: 'Disagree' },
        { value: '3', label: 'Neutral' },
        { value: '4', label: 'Agree' },
        { value: '5', label: 'Strongly Agree' }
      ].map((option) => (
        <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <RadioGroupItem value={option.value} id={option.value} />
          <Label htmlFor={option.value} className="flex-1 cursor-pointer">
            {option.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );

  const renderMultipleChoice = () => (
    <RadioGroup value={selectedValue} onValueChange={setSelectedValue} className="space-y-3">
      {question.options?.map((option, index) => (
        <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <RadioGroupItem value={index.toString()} id={`option-${index}`} />
          <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );

  const renderNumericInput = () => (
    <div className="space-y-4">
      <Input
        type="number"
        value={numericValue}
        onChange={(e) => setNumericValue(e.target.value)}
        placeholder="Enter your answer"
        className="text-lg p-4"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center border-b">
          <div className="text-sm text-muted-foreground mb-2">
            Question {questionNumber} of {totalQuestions}
          </div>
          <CardTitle className="text-xl md:text-2xl leading-relaxed">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {question.type === 'likert' && renderLikertScale()}
          {(question.type === 'multiple-choice' || question.type === 'scenario') && renderMultipleChoice()}
          {question.type === 'numeric' && renderNumericInput()}
          
          <div className="flex justify-end pt-4 border-t">
            <Button 
              onClick={handleSubmit}
              disabled={!canSubmit}
              size="lg"
              className="px-8"
            >
              Next Question
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}