import { useState, useEffect } from 'react';
import { WelcomeSection } from '@/components/assessment/WelcomeSection';
import { SectionIntro } from '@/components/assessment/SectionIntro';
import { QuestionCard } from '@/components/assessment/QuestionCard';
import { ProgressBar } from '@/components/assessment/ProgressBar';
import { ResultsSection } from '@/components/assessment/ResultsSection';
import { AssessmentResponse, UserProgress, AssessmentResults } from '@/types/assessment';
import { 
  psychometricQuestions, 
  technicalQuestions, 
  wiscarQuestions, 
  aptitudeQuestions 
} from '@/data/assessmentQuestions';
import { calculateScores } from '@/utils/scoring';

type AssessmentPhase = 'welcome' | 'intro' | 'questions' | 'results';
type SectionType = 'psychometric' | 'technical' | 'wiscar' | 'aptitude';

export default function Assessment() {
  const [phase, setPhase] = useState<AssessmentPhase>('welcome');
  const [currentSection, setCurrentSection] = useState<SectionType>('psychometric');
  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [results, setResults] = useState<AssessmentResults | null>(null);

  const sections: SectionType[] = ['psychometric', 'technical', 'wiscar', 'aptitude'];
  const questionSets = {
    psychometric: psychometricQuestions,
    technical: technicalQuestions,
    wiscar: wiscarQuestions,
    aptitude: aptitudeQuestions
  };

  const currentQuestions = questionSets[currentSection];
  const totalQuestions = Object.values(questionSets).flat().length;
  const completedQuestions = responses.length;

  const handleStart = () => {
    setPhase('intro');
  };

  const handleSectionStart = () => {
    setPhase('questions');
  };

  const handleAnswer = (value: number | string) => {
    const currentQuestion = currentQuestions[questionIndex];
    const newResponse: AssessmentResponse = {
      questionId: currentQuestion.id,
      value
    };

    const updatedResponses = [...responses, newResponse];
    setResponses(updatedResponses);

    // Move to next question or section
    if (questionIndex < currentQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      // Section complete
      if (sectionIndex < sections.length - 1) {
        // Move to next section
        setSectionIndex(sectionIndex + 1);
        setCurrentSection(sections[sectionIndex + 1]);
        setQuestionIndex(0);
        setPhase('intro');
      } else {
        // Assessment complete
        const assessmentResults = calculateScores(updatedResponses);
        setResults(assessmentResults);
        setPhase('results');
      }
    }
  };

  const handleRestart = () => {
    setPhase('welcome');
    setCurrentSection('psychometric');
    setSectionIndex(0);
    setQuestionIndex(0);
    setResponses([]);
    setResults(null);
  };

  const getSectionName = (section: SectionType) => {
    const names = {
      psychometric: 'Psychological Fit',
      technical: 'Technical Knowledge',
      wiscar: 'WISCAR Analysis',
      aptitude: 'General Aptitude'
    };
    return names[section];
  };

  if (phase === 'welcome') {
    return <WelcomeSection onStart={handleStart} />;
  }

  if (phase === 'intro') {
    return (
      <SectionIntro 
        section={currentSection} 
        onContinue={handleSectionStart} 
      />
    );
  }

  if (phase === 'questions') {
    const currentQuestion = currentQuestions[questionIndex];
    const globalQuestionNumber = completedQuestions + 1;

    return (
      <div className="min-h-screen">
        {/* Progress bar at top */}
        <div className="bg-white border-b shadow-sm p-4">
          <div className="max-w-4xl mx-auto">
            <ProgressBar 
              current={completedQuestions + 1}
              total={totalQuestions}
              sectionName={`${getSectionName(currentSection)} (${questionIndex + 1}/${currentQuestions.length})`}
            />
          </div>
        </div>
        
        <QuestionCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          questionNumber={globalQuestionNumber}
          totalQuestions={totalQuestions}
        />
      </div>
    );
  }

  if (phase === 'results' && results) {
    return <ResultsSection results={results} onRestart={handleRestart} />;
  }

  return null;
}