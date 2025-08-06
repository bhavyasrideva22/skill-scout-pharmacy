export interface AssessmentQuestion {
  id: string;
  type: 'likert' | 'multiple-choice' | 'scenario' | 'true-false' | 'numeric';
  question: string;
  options?: string[];
  category: 'psychometric' | 'technical' | 'wiscar' | 'aptitude';
  construct?: string;
  weight?: number;
}

export interface AssessmentResponse {
  questionId: string;
  value: number | string;
}

export interface WiscarScores {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
}

export interface AssessmentResults {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: WiscarScores;
  overallScore: number;
  recommendation: 'yes' | 'maybe' | 'no';
  recommendationText: string;
  strengths: string[];
  improvements: string[];
  nextSteps: string[];
  careerAlternatives?: string[];
}

export interface UserProgress {
  currentSection: number;
  completedQuestions: number;
  totalQuestions: number;
  timeStarted: Date;
  responses: AssessmentResponse[];
}