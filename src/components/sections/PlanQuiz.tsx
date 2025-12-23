'use client';

import { useState, ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';

type Answer = 'basic' | 'premium' | 'commercial';

interface Option {
  label: string;
  value: Answer;
  description?: string;
  icon: ReactNode;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
}

// SVG Icons for options
const icons = {
  newSystem: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  matureSystem: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  oldSystem: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  oneUnit: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  twoUnits: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  commercial: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  standard: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  priority: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  critical: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
};

const questions: Question[] = [
  {
    id: 1,
    question: 'How old is your HVAC system?',
    options: [
      { label: '0-5 years', value: 'basic', description: 'Newer systems need less maintenance', icon: icons.newSystem },
      { label: '5-10 years', value: 'premium', description: 'Prime time for preventive care', icon: icons.matureSystem },
      { label: '10+ years', value: 'premium', description: 'Extra attention keeps it running', icon: icons.oldSystem },
    ],
  },
  {
    id: 2,
    question: 'How many systems do you have?',
    options: [
      { label: '1 residential unit', value: 'basic', description: 'Single home system', icon: icons.oneUnit },
      { label: '2 units (or large home)', value: 'premium', description: 'Multiple zones', icon: icons.twoUnits },
      { label: '3+ units or commercial', value: 'commercial', description: 'Business needs', icon: icons.commercial },
    ],
  },
  {
    id: 3,
    question: 'How important is emergency response?',
    options: [
      { label: 'Standard scheduling', value: 'basic', description: 'Flexible timing works', icon: icons.standard },
      { label: 'Priority response', value: 'premium', description: 'Skip the wait', icon: icons.priority },
      { label: 'Critical uptime', value: 'commercial', description: "Can't afford downtime", icon: icons.critical },
    ],
  },
];

const planDetails = {
  basic: {
    name: 'Basic',
    price: '$19',
    period: '/mo',
    reason: 'Your system is newer and needs just the essentials.',
    color: 'from-blue-500 to-blue-600',
  },
  premium: {
    name: 'Premium',
    price: '$29',
    period: '/mo',
    reason: 'Best value for your situation. Extra tune-ups + no overtime charges.',
    color: 'from-primary to-primary-dark',
  },
  commercial: {
    name: 'Commercial',
    price: 'Custom',
    period: '',
    reason: 'You need a tailored solution for multiple systems or critical uptime.',
    color: 'from-neutral-700 to-neutral-900',
  },
};

export function PlanQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAnswer = (value: Answer, label: string) => {
    setSelectedOption(label);

    // Brief delay to show selection feedback
    setTimeout(() => {
      const newAnswers = [...answers, value];
      setAnswers(newAnswers);
      setIsTransitioning(true);

      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          setShowResult(true);
        }
        setSelectedOption(null);
        setIsTransitioning(false);
      }, 200);
    }, 150);
  };

  const getRecommendation = (): Answer => {
    if (answers.includes('commercial')) return 'commercial';
    const premiumCount = answers.filter((a) => a === 'premium').length;
    if (premiumCount >= 1) return 'premium';
    return 'basic';
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setSelectedOption(null);
  };

  const recommendation = getRecommendation();
  const plan = planDetails[recommendation];

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 md:p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-black dark:text-white">
              Find Your Perfect Plan
            </h3>
          </div>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            Answer 3 quick questions
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/10 dark:bg-secondary/20 text-secondary text-xs font-bold rounded-full">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          30 sec
        </span>
      </div>

      {/* Step Progress */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((step, i) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                showResult || i < currentQuestion
                  ? 'bg-primary text-white'
                  : i === currentQuestion
                  ? 'bg-primary/15 text-primary border-2 border-primary'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500'
              }`}
            >
              {showResult || i < currentQuestion ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step
              )}
            </div>
            {i < 2 && (
              <div
                className={`w-12 md:w-16 h-1 mx-1 rounded-full transition-all duration-500 ${
                  i < currentQuestion || showResult
                    ? 'bg-primary'
                    : 'bg-neutral-200 dark:bg-neutral-700'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {!showResult ? (
        <div className={`transition-all duration-200 ${isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
          {/* Question */}
          <div className="text-center mb-6">
            <div className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2 font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <p className="text-xl md:text-2xl font-bold text-neutral-black dark:text-white">
              {questions[currentQuestion].question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option.label}
                onClick={() => handleAnswer(option.value, option.label)}
                disabled={selectedOption !== null}
                className={`w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-200 group ${
                  selectedOption === option.label
                    ? 'border-primary bg-primary/10 dark:bg-primary/20 scale-[0.98]'
                    : 'border-neutral-200 dark:border-neutral-700 hover:border-primary/50 dark:hover:border-primary/50 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      selectedOption === option.label
                        ? 'bg-primary text-white'
                        : 'bg-primary/10 dark:bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white'
                    }`}
                  >
                    {option.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className={`font-semibold transition-colors ${
                      selectedOption === option.label
                        ? 'text-primary'
                        : 'text-neutral-900 dark:text-white group-hover:text-primary'
                    }`}>
                      {option.label}
                    </div>
                    {option.description && (
                      <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                        {option.description}
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  <svg
                    className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${
                      selectedOption === option.label
                        ? 'text-primary translate-x-1'
                        : 'text-neutral-300 dark:text-neutral-600 group-hover:text-primary group-hover:translate-x-1'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Result */
        <div className="text-center animate-fade-in-up">
          {/* Success badge */}
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-full mb-6 text-sm font-semibold">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Perfect match found!
          </div>

          {/* Plan card */}
          <div className={`bg-gradient-to-br ${plan.color} rounded-2xl p-6 md:p-8 text-white mb-6`}>
            <div className="text-sm text-white/70 uppercase tracking-wider mb-2 font-medium">
              We recommend
            </div>
            <h4 className="text-3xl md:text-4xl font-black mb-2">
              {plan.name} Plan
            </h4>
            <div className="flex items-baseline justify-center gap-1 mb-4">
              <span className="text-4xl md:text-5xl font-black">{plan.price}</span>
              <span className="text-xl text-white/70">{plan.period}</span>
            </div>
            <p className="text-white/80 text-sm max-w-sm mx-auto leading-relaxed">
              {plan.reason}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Get Started Now
              </Button>
            </Link>
            <button
              onClick={resetQuiz}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-primary transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Retake quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
