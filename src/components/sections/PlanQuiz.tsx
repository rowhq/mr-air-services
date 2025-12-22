'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';

type Answer = 'basic' | 'premium' | 'commercial';

interface Question {
  id: number;
  question: string;
  options: { label: string; value: Answer; description?: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: 'How old is your HVAC system?',
    options: [
      { label: '0-5 years', value: 'basic', description: 'Newer systems need less maintenance' },
      { label: '5-10 years', value: 'premium', description: 'Prime time for preventive care' },
      { label: '10+ years', value: 'premium', description: 'Extra attention keeps it running' },
    ],
  },
  {
    id: 2,
    question: 'How many systems do you have?',
    options: [
      { label: '1 residential unit', value: 'basic' },
      { label: '2 units (or large home)', value: 'premium' },
      { label: '3+ units or commercial', value: 'commercial' },
    ],
  },
  {
    id: 3,
    question: 'How important is emergency response?',
    options: [
      { label: 'Standard scheduling is fine', value: 'basic' },
      { label: 'Priority would be nice', value: 'premium' },
      { label: 'Critical - can\'t afford downtime', value: 'commercial' },
    ],
  },
];

const planDetails = {
  basic: {
    name: 'Basic',
    price: '$19/mo',
    reason: 'Your system is newer and needs just the essentials.',
  },
  premium: {
    name: 'Premium',
    price: '$29/mo',
    reason: 'Best value for your situation. Extra tune-ups + no overtime charges.',
  },
  commercial: {
    name: 'Commercial',
    price: 'Custom pricing',
    reason: 'You need a tailored solution for multiple systems or critical uptime.',
  },
};

export function PlanQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: Answer) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getRecommendation = (): Answer => {
    // If any answer is commercial, recommend commercial
    if (answers.includes('commercial')) return 'commercial';

    // Count premium answers
    const premiumCount = answers.filter((a) => a === 'premium').length;

    // If 2 or more premium answers, recommend premium
    if (premiumCount >= 2) return 'premium';

    // If 1 premium answer, still recommend premium (it's the best value)
    if (premiumCount === 1) return 'premium';

    return 'basic';
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const recommendation = getRecommendation();
  const plan = planDetails[recommendation];
  const progress = ((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-neutral-black dark:text-white mb-2">
          Not sure which plan? Let's figure it out.
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          3 quick questions. 30 seconds.
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {!showResult ? (
        <>
          {/* Question */}
          <div className="mb-6">
            <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <p className="text-lg font-medium text-neutral-black dark:text-white">
              {questions[currentQuestion].question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option.label}
                onClick={() => handleAnswer(option.value)}
                className="w-full text-left p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-primary dark:hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-neutral-black dark:text-white group-hover:text-primary transition-colors">
                      {option.label}
                    </div>
                    {option.description && (
                      <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                        {option.description}
                      </div>
                    )}
                  </div>
                  <svg
                    className="w-5 h-5 text-neutral-400 group-hover:text-primary transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Result */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
              We recommend
            </div>
            <h4 className="text-2xl font-bold text-neutral-black dark:text-white mb-1">
              {plan.name} Plan
            </h4>
            <p className="text-primary font-semibold mb-4">{plan.price}</p>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">{plan.reason}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <Button variant="secondary">
                  Get Started
                </Button>
              </Link>
              <button
                onClick={resetQuiz}
                className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-primary transition-colors"
              >
                Take quiz again
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
