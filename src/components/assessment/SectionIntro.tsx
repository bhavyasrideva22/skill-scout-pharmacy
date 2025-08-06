import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Calculator, Target, Lightbulb } from 'lucide-react';

interface SectionIntroProps {
  section: 'psychometric' | 'technical' | 'wiscar' | 'aptitude';
  onContinue: () => void;
}

const sectionInfo = {
  psychometric: {
    icon: Brain,
    title: 'Psychological Fit Assessment',
    description: 'Evaluate your personality traits, work preferences, and psychological alignment with pharmacy technician work.',
    duration: '8-10 minutes',
    whatWeMeasure: [
      'Conscientiousness and attention to detail',
      'Agreeableness and customer service orientation',
      'Stress tolerance and emotional stability',
      'Team collaboration preferences',
      'Ethical decision-making approach'
    ],
    gradient: 'bg-gradient-primary'
  },
  technical: {
    icon: Calculator,
    title: 'Technical & Knowledge Assessment',
    description: 'Test your foundational skills in mathematics, science, and pharmacy-related knowledge.',
    duration: '10-12 minutes',
    whatWeMeasure: [
      'Mathematical calculation abilities',
      'Basic science and anatomy knowledge',
      'Pharmacy terminology understanding',
      'Safety and regulation awareness',
      'Problem-solving with technical scenarios'
    ],
    gradient: 'bg-gradient-success'
  },
  wiscar: {
    icon: Target,
    title: 'WISCAR Framework Analysis',
    description: 'Multi-dimensional evaluation of your readiness across six key areas for career success.',
    duration: '6-8 minutes',
    whatWeMeasure: [
      'Will - Persistence and determination',
      'Interest - Genuine engagement with pharmacy work',
      'Skill - Current interpersonal and communication abilities',
      'Cognitive - Analytical thinking and learning approach',
      'Ability to Learn - Metacognition and feedback receptivity',
      'Real-world Alignment - Understanding of actual work environment'
    ],
    gradient: 'bg-medical-teal'
  },
  aptitude: {
    icon: Lightbulb,
    title: 'General Aptitude Assessment',
    description: 'Evaluate your logical reasoning, pattern recognition, and general problem-solving abilities.',
    duration: '5-7 minutes',
    whatWeMeasure: [
      'Pattern recognition and sequencing',
      'Logical reasoning abilities',
      'Numerical problem-solving',
      'Spatial reasoning skills',
      'Critical thinking application'
    ],
    gradient: 'bg-pharmacy-orange'
  }
};

export function SectionIntro({ section, onContinue }: SectionIntroProps) {
  const info = sectionInfo[section];
  const Icon = info.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className={`text-white ${info.gradient} rounded-t-lg`}>
          <div className="flex items-center gap-3 mb-2">
            <Icon className="h-8 w-8" />
            <CardTitle className="text-2xl">{info.title}</CardTitle>
          </div>
          <p className="text-white/90 text-lg">
            {info.description}
          </p>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">⏱️ {info.duration}</div>
              <div className="text-sm text-muted-foreground">Estimated completion time</div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">What We'll Measure:</h3>
            <ul className="space-y-2">
              {info.whatWeMeasure.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="text-center pt-4 border-t">
            <Button 
              onClick={onContinue}
              size="lg"
              className="px-8"
            >
              Begin {info.title.split(' ')[0]} Questions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}