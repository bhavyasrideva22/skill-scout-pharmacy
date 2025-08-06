import { AssessmentResponse, AssessmentResults, WiscarScores } from '@/types/assessment';
import { allQuestions } from '@/data/assessmentQuestions';

export function calculateScores(responses: AssessmentResponse[]): AssessmentResults {
  const responseMap = new Map(responses.map(r => [r.questionId, r.value]));
  
  // Calculate psychometric score
  const psychometricScore = calculateCategoryScore(responseMap, 'psychometric');
  
  // Calculate technical score
  const technicalScore = calculateCategoryScore(responseMap, 'technical');
  
  // Calculate WISCAR scores
  const wiscarScores = calculateWiscarScores(responseMap);
  
  // Calculate overall score
  const overallScore = calculateOverallScore(psychometricScore, technicalScore, wiscarScores);
  
  // Generate recommendation
  const recommendation = generateRecommendation(overallScore, psychometricScore, technicalScore, wiscarScores);
  
  return {
    psychometricScore,
    technicalScore,
    wiscarScores,
    overallScore,
    ...recommendation
  };
}

function calculateCategoryScore(responseMap: Map<string, number | string>, category: string): number {
  const categoryQuestions = allQuestions.filter(q => q.category === category);
  let totalScore = 0;
  let totalWeight = 0;
  
  categoryQuestions.forEach(question => {
    const response = responseMap.get(question.id);
    if (response !== undefined) {
      const weight = question.weight || 1;
      let score = 0;
      
      if (question.type === 'likert') {
        score = Number(response) * 20; // Convert 1-5 scale to 0-100
      } else if (question.type === 'multiple-choice' || question.type === 'scenario') {
        score = calculateMultipleChoiceScore(question.id, Number(response));
      } else if (question.type === 'numeric') {
        score = calculateNumericScore(question.id, response);
      }
      
      totalScore += score * weight;
      totalWeight += weight;
    }
  });
  
  return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
}

function calculateWiscarScores(responseMap: Map<string, number | string>): WiscarScores {
  const constructs = ['will', 'interest', 'skill', 'cognitive', 'ability', 'realWorld'];
  const scores: WiscarScores = {
    will: 0,
    interest: 0,
    skill: 0,
    cognitive: 0,
    ability: 0,
    realWorld: 0
  };
  
  constructs.forEach(construct => {
    const constructQuestions = allQuestions.filter(q => q.construct === construct);
    let totalScore = 0;
    let count = 0;
    
    constructQuestions.forEach(question => {
      const response = responseMap.get(question.id);
      if (response !== undefined) {
        let score = 0;
        
        if (question.type === 'likert') {
          score = Number(response) * 20;
        } else if (question.type === 'multiple-choice' || question.type === 'scenario') {
          score = calculateMultipleChoiceScore(question.id, Number(response));
        }
        
        totalScore += score;
        count++;
      }
    });
    
    scores[construct as keyof WiscarScores] = count > 0 ? Math.round(totalScore / count) : 0;
  });
  
  return scores;
}

function calculateMultipleChoiceScore(questionId: string, responseIndex: number): number {
  // Scoring logic for specific questions
  const scoringMap: Record<string, number[]> = {
    'psych_3': [100, 40, 20, 60], // Structured environment preference
    'psych_4': [100, 70, 50, 20], // Customer service scenario
    'psych_6': [100, 80, 60, 70], // Healthcare motivation
    'psych_8': [100, 30, 70, 10], // Ethics scenario
    'tech_1': [0, 0, 100, 0], // Math calculation
    'tech_2': [100, 0, 0, 0], // PRN meaning
    'tech_4': [0, 0, 100, 0], // Kidney function
    'tech_5': [100, 40, 60, 30], // Safety priority
    'tech_6': [100, 0, 0, 0], // QID meaning
    'tech_7': [0, 100, 0, 0], // DEA regulation
    'wiscar_will_2': [100, 80, 40, 20], // Persistence scenario
    'wiscar_interest_2': [80, 70, 60, 30], // Interest preferences
    'wiscar_cognitive_1': [100, 60, 70, 80], // Learning style
    'wiscar_real_1': [100, 80, 60, 20], // Reality expectations
    'apt_1': [0, 100, 0, 0], // Pattern recognition: 162
    'apt_2': [100, 0, 0, 0], // Logical reasoning
    'apt_4': [0, 0, 0, 100] // Spatial reasoning: 24
  };
  
  const scores = scoringMap[questionId];
  return scores ? scores[responseIndex] || 0 : responseIndex === 0 ? 100 : 50;
}

function calculateNumericScore(questionId: string, response: number | string): number {
  const numResponse = Number(response);
  
  switch (questionId) {
    case 'tech_3': // Convert 2000mg to grams
      return numResponse === 2 ? 100 : 0;
    case 'apt_3': // Insurance copay calculation
      return Math.abs(numResponse - 24) <= 1 ? 100 : 0;
    default:
      return 50;
  }
}

function calculateOverallScore(
  psychometric: number,
  technical: number,
  wiscar: WiscarScores
): number {
  const wiscarAverage = Object.values(wiscar).reduce((sum, val) => sum + val, 0) / 6;
  return Math.round((psychometric * 0.3 + technical * 0.4 + wiscarAverage * 0.3));
}

function generateRecommendation(
  overall: number,
  psychometric: number,
  technical: number,
  wiscar: WiscarScores
): {
  recommendation: 'yes' | 'maybe' | 'no';
  recommendationText: string;
  strengths: string[];
  improvements: string[];
  nextSteps: string[];
  careerAlternatives?: string[];
} {
  const strengths: string[] = [];
  const improvements: string[] = [];
  const nextSteps: string[] = [];
  let careerAlternatives: string[] | undefined;
  
  // Identify strengths
  if (psychometric >= 75) strengths.push('Strong psychological fit for healthcare');
  if (technical >= 75) strengths.push('Solid technical foundation');
  if (wiscar.will >= 80) strengths.push('High persistence and determination');
  if (wiscar.interest >= 80) strengths.push('Genuine interest in pharmacy work');
  if (wiscar.skill >= 75) strengths.push('Good interpersonal skills');
  
  // Identify improvements
  if (psychometric < 60) improvements.push('Develop customer service and teamwork skills');
  if (technical < 60) improvements.push('Strengthen math and science fundamentals');
  if (wiscar.cognitive < 60) improvements.push('Improve analytical thinking abilities');
  if (wiscar.realWorld < 60) improvements.push('Learn more about pharmacy work environment');
  
  if (overall >= 75) {
    return {
      recommendation: 'yes',
      recommendationText: 'You show excellent potential for a career as a Pharmacy Technician. Your profile indicates strong alignment with the role requirements.',
      strengths,
      improvements,
      nextSteps: [
        'Enroll in a pharmacy technician training program',
        'Begin studying for PTCB certification',
        'Consider shadowing a pharmacy technician',
        'Start building pharmaceutical terminology knowledge'
      ]
    };
  } else if (overall >= 50) {
    return {
      recommendation: 'maybe',
      recommendationText: 'You show potential but would benefit from skill development before pursuing pharmacy technician training.',
      strengths,
      improvements,
      nextSteps: [
        'Take foundational math and science courses',
        'Gain customer service experience',
        'Research pharmacy work environment more thoroughly',
        'Consider entry-level healthcare positions first'
      ]
    };
  } else {
    careerAlternatives = [
      'Medical Administrative Assistant',
      'Healthcare Data Entry Clerk',
      'Medical Insurance Specialist',
      'Laboratory Support Technician',
      'Medical Equipment Technician'
    ];
    
    return {
      recommendation: 'no',
      recommendationText: 'Your current profile suggests pharmacy technician work may not be the best fit. Consider exploring alternative healthcare careers.',
      strengths,
      improvements,
      nextSteps: [
        'Explore alternative healthcare careers',
        'Consider healthcare administration roles',
        'Develop foundational skills through general courses',
        'Gain healthcare exposure through volunteering'
      ],
      careerAlternatives
    };
  }
}