import { AssessmentQuestion } from '@/types/assessment';

export const psychometricQuestions: AssessmentQuestion[] = [
  {
    id: 'psych_1',
    type: 'likert',
    category: 'psychometric',
    construct: 'conscientiousness',
    question: 'I prefer working in highly organized, structured environments.',
    weight: 1.2
  },
  {
    id: 'psych_2',
    type: 'likert',
    category: 'psychometric',
    construct: 'agreeableness',
    question: 'I enjoy helping people and making a positive impact on their health.',
    weight: 1.3
  },
  {
    id: 'psych_3',
    type: 'multiple-choice',
    category: 'psychometric',
    construct: 'holland_conventional',
    question: 'Which work environment appeals to you most?',
    options: [
      'Structured, rule-based environment with clear procedures',
      'Creative, flexible environment with minimal constraints',
      'High-energy, unpredictable environment with constant change',
      'Independent environment where I work mostly alone'
    ],
    weight: 1.1
  },
  {
    id: 'psych_4',
    type: 'scenario',
    category: 'psychometric',
    construct: 'stress_tolerance',
    question: 'A customer is upset because their prescription isn\'t ready. How would you handle this?',
    options: [
      'Calmly explain the delay and offer solutions',
      'Get the pharmacist immediately',
      'Apologize repeatedly until they calm down',
      'Explain it\'s not your fault and there\'s nothing you can do'
    ],
    weight: 1.4
  },
  {
    id: 'psych_5',
    type: 'likert',
    category: 'psychometric',
    construct: 'attention_detail',
    question: 'I naturally notice small details that others might miss.',
    weight: 1.5
  },
  {
    id: 'psych_6',
    type: 'multiple-choice',
    category: 'psychometric',
    construct: 'motivation',
    question: 'What motivates you most about working in healthcare?',
    options: [
      'Helping people feel better and supporting their health',
      'Working with advanced technology and systems',
      'Having job security and stable income',
      'Being part of a respected profession'
    ],
    weight: 1.2
  },
  {
    id: 'psych_7',
    type: 'likert',
    category: 'psychometric',
    construct: 'teamwork',
    question: 'I work well as part of a healthcare team.',
    weight: 1.1
  },
  {
    id: 'psych_8',
    type: 'scenario',
    category: 'psychometric',
    construct: 'ethics',
    question: 'You notice a coworker made an error in medication dispensing. What do you do?',
    options: [
      'Report it immediately to prevent patient harm',
      'Fix it quietly without mentioning it',
      'Ask the coworker about it privately first',
      'Wait to see if someone else notices'
    ],
    weight: 1.6
  }
];

export const technicalQuestions: AssessmentQuestion[] = [
  {
    id: 'tech_1',
    type: 'multiple-choice',
    category: 'technical',
    construct: 'math_skills',
    question: 'If a patient needs 2.5 mg of medication and each tablet contains 0.5 mg, how many tablets should they take?',
    options: ['2 tablets', '3 tablets', '5 tablets', '6 tablets'],
    weight: 1.3
  },
  {
    id: 'tech_2',
    type: 'multiple-choice',
    category: 'technical',
    construct: 'pharmacy_knowledge',
    question: 'What does "PRN" mean on a prescription?',
    options: [
      'Take as needed',
      'Take with food',
      'Take at bedtime',
      'Take three times daily'
    ],
    weight: 1.2
  },
  {
    id: 'tech_3',
    type: 'numeric',
    category: 'technical',
    construct: 'calculations',
    question: 'Convert 2000 mg to grams:',
    weight: 1.1
  },
  {
    id: 'tech_4',
    type: 'multiple-choice',
    category: 'technical',
    construct: 'anatomy',
    question: 'Which organ is primarily responsible for filtering medications from the blood?',
    options: ['Heart', 'Liver', 'Kidneys', 'Lungs'],
    weight: 1.0
  },
  {
    id: 'tech_5',
    type: 'multiple-choice',
    category: 'technical',
    construct: 'safety',
    question: 'What is the most important step before dispensing any medication?',
    options: [
      'Verify patient identity and prescription accuracy',
      'Count the pills',
      'Check insurance coverage',
      'Print the label'
    ],
    weight: 1.4
  },
  {
    id: 'tech_6',
    type: 'multiple-choice',
    category: 'technical',
    construct: 'terminology',
    question: 'What does "QID" mean?',
    options: [
      'Four times a day',
      'Every four hours',
      'Twice daily',
      'Once daily'
    ],
    weight: 1.1
  },
  {
    id: 'tech_7',
    type: 'multiple-choice',
    category: 'technical',
    construct: 'regulations',
    question: 'Controlled substances are regulated by which agency?',
    options: ['FDA', 'DEA', 'CDC', 'OSHA'],
    weight: 1.2
  }
];

export const wiscarQuestions: AssessmentQuestion[] = [
  {
    id: 'wiscar_will_1',
    type: 'likert',
    category: 'wiscar',
    construct: 'will',
    question: 'I persist through challenges even when progress is slow.',
    weight: 1.0
  },
  {
    id: 'wiscar_will_2',
    type: 'scenario',
    category: 'wiscar',
    construct: 'will',
    question: 'You\'re struggling with a complex pharmacy calculation. What do you do?',
    options: [
      'Keep practicing until I master it',
      'Ask for help and practice more',
      'Focus on easier tasks for now',
      'Consider if this is right for me'
    ],
    weight: 1.1
  },
  {
    id: 'wiscar_interest_1',
    type: 'likert',
    category: 'wiscar',
    construct: 'interest',
    question: 'I find pharmaceutical science and drug interactions fascinating.',
    weight: 1.2
  },
  {
    id: 'wiscar_interest_2',
    type: 'multiple-choice',
    category: 'wiscar',
    construct: 'interest',
    question: 'In your free time, you prefer:',
    options: [
      'Reading about health and science topics',
      'Organizing and planning activities',
      'Helping friends and family with problems',
      'Watching TV or relaxing'
    ],
    weight: 1.0
  },
  {
    id: 'wiscar_skill_1',
    type: 'likert',
    category: 'wiscar',
    construct: 'skill',
    question: 'I have strong communication skills and can explain complex information simply.',
    weight: 1.1
  },
  {
    id: 'wiscar_cognitive_1',
    type: 'multiple-choice',
    category: 'wiscar',
    construct: 'cognitive',
    question: 'When learning something new, I prefer to:',
    options: [
      'Break it down into steps and practice systematically',
      'Jump in and learn through trial and error',
      'Watch others do it first',
      'Read about it thoroughly before trying'
    ],
    weight: 1.1
  },
  {
    id: 'wiscar_ability_1',
    type: 'likert',
    category: 'wiscar',
    construct: 'ability',
    question: 'I actively seek feedback to improve my performance.',
    weight: 1.0
  },
  {
    id: 'wiscar_real_1',
    type: 'scenario',
    category: 'wiscar',
    construct: 'realWorld',
    question: 'Pharmacy techs often work weekends, holidays, and handle insurance issues. How does this sound to you?',
    options: [
      'Acceptable - healthcare is essential',
      'Challenging but manageable',
      'Concerning but worth it for the career',
      'This might not be for me'
    ],
    weight: 1.3
  }
];

export const aptitudeQuestions: AssessmentQuestion[] = [
  {
    id: 'apt_1',
    type: 'multiple-choice',
    category: 'aptitude',
    construct: 'pattern_recognition',
    question: 'Which number comes next in this sequence: 2, 6, 18, 54, ?',
    options: ['108', '162', '216', '270'],
    weight: 1.0
  },
  {
    id: 'apt_2',
    type: 'multiple-choice',
    category: 'aptitude',
    construct: 'logical_reasoning',
    question: 'If all pharmacy technicians must be certified, and Sarah is a pharmacy technician, then:',
    options: [
      'Sarah must be certified',
      'Sarah might be certified',
      'Sarah is probably certified',
      'We cannot determine if Sarah is certified'
    ],
    weight: 1.1
  },
  {
    id: 'apt_3',
    type: 'numeric',
    category: 'aptitude',
    construct: 'numerical_ability',
    question: 'A prescription costs $120. Insurance covers 80%. What is the patient\'s copay?',
    weight: 1.2
  },
  {
    id: 'apt_4',
    type: 'multiple-choice',
    category: 'aptitude',
    construct: 'spatial_reasoning',
    question: 'How many different ways can you arrange 4 different medications on a shelf?',
    options: ['12', '16', '20', '24'],
    weight: 1.0
  }
];

export const allQuestions = [
  ...psychometricQuestions,
  ...technicalQuestions,
  ...wiscarQuestions,
  ...aptitudeQuestions
];