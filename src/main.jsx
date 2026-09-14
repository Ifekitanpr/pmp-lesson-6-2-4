import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Calendar,
  Check,
  CheckSquare,
  ChevronDown,
  DollarSign,
  FileText,
  Map,
  MessageSquare,
  ShieldAlert,
  Target,
  Users,
  Volume2,
  VolumeX,
  X
} from 'lucide-react';
import { useLessonAudio } from '../../shared/useLessonAudio';
import './styles.css';

import hookArt from './assets/illustrations/hook-approved-bookkeeping.png';
import hookModalArt from './assets/illustrations/modal-bookkeeping-start.png';
import eightDocsArt from './assets/illustrations/eight-docs-ripple.png';
import rebaselineArt from './assets/illustrations/rebaseline-governance.png';
import gearsArt from './assets/illustrations/config-mgmt-gears.png';
import lessonsArt from './assets/illustrations/lessons-learned-midproject.png';
import lessonsModalArt from './assets/illustrations/modal-lessons-sharing.png';
import examArt from './assets/illustrations/exam-synchronized-docs.png';

// Custom 8-document illustrations
import docScopeArt from './assets/illustrations/doc-scope-wbs.png';
import docScheduleArt from './assets/illustrations/doc-schedule-baseline.png';
import docCostArt from './assets/illustrations/doc-cost-budget.png';
import docRiskArt from './assets/illustrations/doc-risk-register.png';
import docQualityArt from './assets/illustrations/doc-quality-plan.png';
import docStakeholderArt from './assets/illustrations/doc-stakeholder-register.png';
import docCommArt from './assets/illustrations/doc-communication-plan.png';
import docPmArt from './assets/illustrations/doc-pm-roadmap.png';

const tabs = [
  'Approval is not the finish',
  'Eight key documents',
  'Re-baselining rules',
  'Configuration management',
  'Lessons learned register',
  'Exam lens'
];

const documentTypes = [
  {
    title: 'Scope Baseline, WBS, or Backlog',
    tag: 'DOC 01',
    text: 'The actual definition of the work to be done. In predictive work, the scope statement and WBS; in agile, the product backlog.',
    detail: 'The scope baseline defines what work is committed and what is strictly out of scope. When a change is approved, tasks must be added, modified, or retired in the Work Breakdown Structure (WBS) and WBS dictionary. In agile or hybrid setups, the Product Backlog must be updated, stories re-estimated, and acceptance criteria refined so engineers never build discarded features.',
    icon: FileText,
    image: docScopeArt
  },
  {
    title: 'Schedule Baseline & Milestones',
    tag: 'DOC 02',
    text: 'New tasks, adjusted durations, changed dependencies, or revised milestone dates.',
    detail: 'Approved changes frequently shift activity sequences, lead/lag times, critical path dependencies, and contractual milestones. The schedule model must reflect reality immediately so team velocity and resource contention can be accurately forecasted. Any re-baselining must adhere to formal governance approval.',
    icon: Calendar,
    image: docScheduleArt
  },
  {
    title: 'Cost Baseline & Budget',
    tag: 'DOC 03',
    text: 'Budget adjustments, contingency reserve allocations, or changed cash-flow expectations.',
    detail: 'Financial impacts require adjustments to work package budgets, management reserves, and drawdown schedules. Updating the cost baseline prevents artificial cost variance from masking actual expenditure health and protects future funding rounds.',
    icon: DollarSign,
    image: docCostArt
  },
  {
    title: 'Risk Register',
    tag: 'DOC 04',
    text: 'New risks introduced by the change, or existing risks retired or modified because of it.',
    detail: 'Every change introduces new uncertainties or renders existing assumptions invalid. The risk register must immediately log newly discovered secondary risks, update probability/impact scorings, assign risk owners, and adjust contingency reserves.',
    icon: ShieldAlert,
    image: docRiskArt
  },
  {
    title: 'Quality Management Plan',
    tag: 'DOC 05',
    text: 'Changed standards, new acceptance criteria, or revised inspection routines.',
    detail: 'New deliverables or modified architectural scopes require updated quality metrics, verification checklists, and testing protocols. Keeping the quality plan synchronized prevents defects, rework, and costly compliance audit failures down the line.',
    icon: CheckSquare,
    image: docQualityArt
  },
  {
    title: 'Stakeholder Register',
    tag: 'DOC 06',
    text: 'New stakeholders involved, changed engagement strategies, or revised communication needs.',
    detail: 'Scope shifts or newly brought-in vendor partners bring new stakeholders with unique expectations, authorities, and risks. Updating the register ensures their influence and interest are proactively managed before misunderstandings arise.',
    icon: Users,
    image: docStakeholderArt
  },
  {
    title: 'Communications Management Plan',
    tag: 'DOC 07',
    text: 'New reporting channels, changed cadences, or added distribution lists.',
    detail: 'Modifications to project governance or stakeholder tiers require revised distribution channels, updated briefing cadence, and clear escalation protocols. Obsolete lists must be retired to protect confidential and accurate project telemetry.',
    icon: MessageSquare,
    image: docCommArt
  },
  {
    title: 'Project Management Plan / Roadmap',
    tag: 'DOC 08',
    text: 'The overarching plan or roadmap needs to reflect the new agreed direction.',
    detail: 'The integrated Project Management Plan coordinates all subsidiary baselines. Keeping the overarching roadmap synchronized provides organizational leadership with an accurate, unified picture of milestones, dependencies, and strategic commitments.',
    icon: Map,
    image: docPmArt
  }
];

const reveals = {
  hook: {
    image: hookModalArt,
    title: 'Approving a change does not finish the work; it starts the next round of bookkeeping.',
    text: 'Approving a change does not finish the work; it starts the next round of bookkeeping. The project documentation has to reflect the new reality, or the team will be working from one set of assumptions while reporting against another.'
  },
  rebaseline: {
    image: rebaselineArt,
    title: 'Re-baselining requires the same governance authority that approved the change.',
    text: 'Once an approved change affects the agreed cost, schedule, or scope baseline, the project manager re-baselines so future variance reports compare against the new agreement. Without re-baselining, every status report shows the same growing variance, which obscures whether current execution is actually on track. Re-baselining requires the same governance authority that approved the change in the first place — project managers do not unilaterally adjust baselines because the variance numbers look bad.'
  },
  gears: {
    image: gearsArt,
    title: 'Change control decides whether; configuration management tracks what version.',
    text: 'Changes also flow through configuration management to keep deliverable versions, related documentation, and approval records aligned. The two systems have distinct jobs: change control decides whether something gets done, and configuration management tracks what version is in play once the change is implemented.'
  },
  lessons: {
    image: lessonsModalArt,
    title: 'Capture significant lessons during the project, not only at closure.',
    text: 'Significant changes are usually rich material for the Lessons Learned Register. Why did the change occur? Was it preventable, or was it exploiting a great opportunity? What signal did the project miss earlier that would have surfaced this need sooner? Capturing these lessons during the project, rather than only at closure, makes them useful to the current team and to other projects in the organization — not just a historical footnote nobody reads until it’s too late to help anyone.'
  },
  exam: {
    image: examArt,
    title: 'Approving a change starts the next round of bookkeeping.',
    text: 'Approving a change starts the next round of bookkeeping. Documentation that typically needs updating includes the scope statement, WBS, or backlog; schedule and baselines; cost baseline and budget; the risk register; the quality management plan; the stakeholder register; the communication plan; and the project management plan or roadmap. Once a change touches an agreed baseline, the project manager re-baselines — with the same governance authority that approved the change, never unilaterally. On product-heavy projects, configuration management tracks what version is in play once change control has decided what gets done. And significant changes are lessons learned material worth capturing during the project, not saved for closure.',
    bullets: [
      'Eight document types commonly affected: scope/WBS/backlog, schedule/baselines, cost baseline/budget, risk register, quality management plan, stakeholder register, communication plan, PM plan/roadmap',
      'Re-baselining requires the same governance authority that approved the change — never a unilateral PM adjustment, especially not to improve how variance looks',
      'Change control decides whether something gets done; configuration management tracks what version is in play once it’s implemented',
      'Significant changes belong in the Lessons Learned Register during the project, not only at closure'
    ]
  }
};

const quizzes = {
  rebaseline: {
    question:
      'Scenario: Three months after a scope change is formally approved, a project manager notices that status reports keep showing a large, growing schedule variance. Frustrated by how this looks to the sponsor, the project manager quietly adjusts the schedule baseline on their own to make the numbers look better, without going back to the governance body that approved the original change. What is the issue with this action?',
    answers: [
      'There is no issue — project managers are expected to keep variance numbers looking reasonable',
      'Re-baselining requires the same governance authority that approved the change — a PM adjusting the baseline unilaterally, especially to improve how numbers look, bypasses that authority',
      'The issue is that re-baselining should have happened immediately upon approval, not three months later, regardless of who approves it',
      'There is no issue, since re-baselining is a routine administrative task that doesn’t require approval'
    ],
    correct: 1,
    good: 'Correct! Re-baselining isn’t a PM’s unilateral administrative choice — it requires the same governance authority that approved the underlying change, precisely because adjusting a baseline to make variance "look better" is exactly the kind of manipulation that authority exists to prevent.',
    bad: 'Reconsider — keeping numbers looking good isn’t a legitimate reason to skip governance, and while timely re-baselining matters, the core issue here is doing it unilaterally, not simply the timing.'
  },
  lessons: {
    question:
      'Scenario: A significant, costly change is approved partway through a project. The project manager plans to document the reasons for the change and what could have been done differently, but decides to wait until project closure to add anything to the Lessons Learned Register, reasoning that "we’ll capture everything at the end anyway." What is the drawback of this approach?',
    answers: [
      'There is no drawback — lessons learned are always meant to be captured only at closure',
      'Waiting until closure means the lesson isn’t available to help the current team or other projects while the change is still fresh and relevant — capturing it during the project makes it useful now, not just historically',
      'The drawback is that the change itself should have been prevented, which is a separate issue from when lessons are recorded',
      'There is no drawback, since a Lessons Learned Register only has value once a project is fully closed'
    ],
    correct: 1,
    good: 'Correct! Capturing significant lessons during the project — not just at closure — is what makes them actually useful to the current team and to other projects happening at the same time, rather than becoming a historical record nobody can act on until it’s too late.',
    bad: 'Reconsider — this isn’t about whether the change should have been prevented, and a Lessons Learned Register that’s only useful at closure misses most of its value; capturing it during the project is exactly the point.'
  }
};

function Modal({ data, onClose, onDone }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <motion.section
        className="focus-modal"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-x" onClick={onClose} aria-label="Close">
          <X />
        </button>
        {step === 0 ? (
          <>
            <img className="modal-illustration" src={data.image} alt="" />
            <h3>{data.title}</h3>
            <div className="modal-copy">
              <p>{data.text}</p>
            </div>
          </>
        ) : (
          <div className="memory-step">
            <p className="eyebrow">EXAM-RELEVANT ENABLERS TO REMEMBER</p>
            <h3>Update documentation, re-baseline formally, and track versions.</h3>
            <ul>
              {data.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {data.bullets && step === 0 ? (
          <button className="modal-action" onClick={() => setStep(1)}>
            Next <ArrowRight />
          </button>
        ) : (
          <button className="modal-action" onClick={onDone}>
            Mark as read <Check />
          </button>
        )}
      </motion.section>
    </div>,
    document.body
  );
}

function Quiz({ data, onFinish }) {
  const [picked, setPicked] = useState(null);

  return createPortal(
    <div className="knowledge-backdrop">
      <section className="knowledge-modal">
        <p className="quiz-label">
          <Target /> MICRO KNOWLEDGE CHECK
        </p>
        <h3>{data.question}</h3>
        <div className="answers">
          {data.answers.map((answer, i) => (
            <button
              key={answer}
              className={picked === i ? (i === data.correct ? 'correct' : 'wrong') : ''}
              onClick={() => setPicked(i)}
            >
              <span>{String.fromCharCode(65 + i)}</span>
              {answer}
            </button>
          ))}
        </div>
        {picked !== null && (
          <>
            <p className={`feedback ${picked === data.correct ? 'good' : 'bad'}`}>
              {picked === data.correct ? data.good : data.bad}
            </p>
            <button className="finish-check" onClick={onFinish}>
              Finish check <ArrowRight />
            </button>
          </>
        )}
      </section>
    </div>,
    document.body
  );
}

function DocModal({ doc, onClose, onMarkRead }) {
  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <motion.section
        className="focus-modal"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-x" onClick={onClose} aria-label="Close">
          <X />
        </button>
        <img className="modal-illustration" src={doc.image} alt={doc.title} />
        <h3>{doc.title}</h3>
        <div className="modal-copy">
          <p>{doc.detail}</p>
        </div>
        <button
          className="modal-action"
          onClick={() => {
            onMarkRead();
            onClose();
          }}
        >
          Understood & Marked as Read <Check />
        </button>
      </motion.section>
    </div>,
    document.body
  );
}

function DocumentMatrixPage({
  eyebrow,
  title,
  lead,
  items,
  read,
  onOpenDoc,
  after
}) {
  return (
    <div className="wide-page">
      <div className="header-clean">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="lead">{lead}</p>
      </div>

      <div className="card-grid four">
        {items.map((item, i) => {
          const Icon = item.icon;
          const isRead = read[i];
          return (
            <button
              key={item.title}
              className={`click-card ${isRead ? 'read' : ''}`}
              onClick={() => onOpenDoc(i)}
            >
              <span className="card-icon">
                <Icon size={28} />
              </span>
              <strong>{item.title}</strong>
              {isRead ? (
                <Check className="card-arrow check" size={20} />
              ) : (
                <ArrowRight className="card-arrow" size={20} />
              )}
            </button>
          );
        })}
      </div>

      {read.every(Boolean) && after}
    </div>
  );
}

function App() {
  const [page, setPage] = useState(0);
  const [done, setDone] = useState(Array(6).fill(false));
  const [modal, setModal] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [sound, setSound] = useState(true);

  const [activeDoc, setActiveDoc] = useState(null);
  const [docRead, setDocRead] = useState(Array(8).fill(false));

  useLessonAudio(sound);

  const mark = (i) =>
    setDone((values) => values.map((value, index) => (index === i ? true : value)));

  const go = (i) => {
    if (i >= 0 && i < 6 && (i <= page + 1 || done[i - 1])) {
      setPage(i);
    }
  };

  const finishModal = () => {
    const currentModal = modal;
    setModal(null);
    if (currentModal === 'rebaseline') {
      setQuiz('rebaseline');
    } else if (currentModal === 'lessons') {
      setQuiz('lessons');
    } else {
      mark(page);
    }
  };

  const finishQuiz = () => {
    mark(page);
    setQuiz(null);
  };

  let content;

  if (page === 0) {
    content = (
      <div className="hero-layout">
        <div>
          <p className="eyebrow">LESSON 6.2.4 · UPDATE PROJECT DOCUMENTATION TO REFLECT CHANGES</p>
          <h1>
            Approving a change does not finish the work. <span>It starts the bookkeeping.</span>
          </h1>
          <p className="lead">
            Picture this: a change to consolidate two vendor contracts gets approved in a Tuesday
            steering meeting. By Thursday, the delivery team is still estimating tasks against the
            old WBS, the risk register still lists a risk that no longer applies, and nobody’s ever
            heard of the new vendor’s account manager — because the stakeholder register was never
            updated either.
          </p>
          <button
            className="primary-cta"
            disabled={done[0]}
            onClick={() => setModal('hook')}
          >
            {done[0] ? 'Bookkeeping principle reviewed' : 'Reveal the bookkeeping principle'}{' '}
            <ArrowRight />
          </button>
        </div>
        <img className="lesson-art" src={hookArt} alt="" />
      </div>
    );
  }

  if (page === 1) {
    content = (
      <DocumentMatrixPage
        eyebrow="THE DOCUMENTS THAT NEED UPDATING"
        title="Eight areas touched by a single approved change."
        lead="A single approved change can ripple through far more of the documentation set than it first appears to touch. Click each card to inspect the affected document and required updates."
        items={documentTypes}
        read={docRead}
        onOpenDoc={(idx) => {
          setActiveDoc(idx);
          setDocRead((values) => values.map((v, j) => (j === idx ? true : v)));
        }}
        after={
          <button
            className="primary-cta centered"
            disabled={done[1]}
            onClick={() => !done[1] && mark(1)}
          >
            {done[1] ? (
              <><Check /> Documentation review completed</>
            ) : (
              <>Mark documentation review complete <ArrowRight /></>
            )}
          </button>
        }
      />
    );
  }

  if (page === 2) {
    content = (
      <div className="hero-layout">
        <div>
          <p className="eyebrow">RE-BASELINING</p>
          <h2>Variance reports must reflect the new reality.</h2>
          <p className="lead">
            Once a change touches the agreed cost, schedule, or scope baseline, one specific
            correction has to happen — and it isn’t the project manager’s call to make alone.
          </p>
          <button
            className="primary-cta"
            disabled={done[2]}
            onClick={() => setModal('rebaseline')}
          >
            {done[2] ? 'Re-baselining rule reviewed' : 'Reveal the re-baselining rule'}{' '}
            <ArrowRight />
          </button>
        </div>
        <img className="lesson-art" src={rebaselineArt} alt="" />
      </div>
    );
  }

  if (page === 3) {
    content = (
      <div className="hero-layout">
        <div>
          <p className="eyebrow">CONFIGURATION MANAGEMENT</p>
          <h2>Change control decides whether. Configuration tracks what version.</h2>
          <p className="lead">
            On product-heavy projects, an approved change needs one more system working alongside
            change control.
          </p>
          <button
            className="primary-cta"
            disabled={done[3]}
            onClick={() => setModal('gears')}
          >
            {done[3] ? 'Two-gear system reviewed' : 'Reveal the two-gear system'} <ArrowRight />
          </button>
        </div>
        <img className="lesson-art" src={gearsArt} alt="" />
      </div>
    );
  }

  if (page === 4) {
    content = (
      <div className="hero-layout">
        <div>
          <p className="eyebrow">THE LESSONS LEARNED REGISTER</p>
          <h2>Capture the lesson while it is fresh.</h2>
          <p className="lead">
            A significant change isn’t just administrative overhead. It’s usually some of the
            richest material a project produces.
          </p>
          <button
            className="primary-cta"
            disabled={done[4]}
            onClick={() => setModal('lessons')}
          >
            {done[4] ? 'Lessons learned reviewed' : 'Reveal the mid-flight lesson discipline'}{' '}
            <ArrowRight />
          </button>
        </div>
        <img className="lesson-art" src={lessonsArt} alt="" />
      </div>
    );
  }

  if (page === 5) {
    content = (
      <div className="exam-layout">
        <div className="exam-visual">
          <img src={examArt} alt="" />
        </div>
        <div>
          <p className="eyebrow">SYNTHESIS (EXAM LENS)</p>
          <h2>Back to that Tuesday steering meeting one more time —</h2>
          <p className="lead">
            because the approval was never the finish line. It was the start of a checklist.
          </p>
          <button
            className="primary-cta"
            disabled={done[5]}
            onClick={() => setModal('exam')}
          >
            {done[5] ? 'Exam lens reviewed' : 'Reveal the exam lens'} <ArrowRight />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="course-select">
          <Award />
          <span>PMP Project Management Professional</span>
          <ChevronDown />
        </button>
        <div className="module-progress">
          <div>
            {Array.from({ length: 10 }, (_, i) => (
              <span
                className={`progress-dot ${i < 5 ? 'done' : i === 5 ? 'active' : ''}`}
                key={i}
              >
                {i < 5 ? <Check size={10} /> : <span />}
              </span>
            ))}
          </div>
        </div>
        <div className="top-actions">
          <button className="ghost-button" onClick={() => setSound((v) => !v)}>
            {sound ? <Volume2 /> : <VolumeX />}
            <span>{sound ? 'Sound on' : 'Sound off'}</span>
          </button>
          <button className="ghost-button">
            <X />
            <span>Quit</span>
          </button>
        </div>
      </header>
      <main className="workspace">
        <section className="lesson-stage">
          <article className="lesson-card">
            <div className="section-tabs">
              <p>SECTION {page + 1} OF 6</p>
              <div>
                {tabs.map((tab, i) => (
                  <button
                    key={tab}
                    className={`${done[i] ? 'done' : ''} ${page === i ? 'active' : ''}`}
                    onClick={() => go(i)}
                  >
                    {done[i] && <Check />}
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="lesson-content">{content}</div>
            {done[page] && (
              <p className="completion">
                <Check /> Interaction complete — continue when ready.
              </p>
            )}
            <footer className="nav-footer">
              <button
                className="secondary-button"
                disabled={!page}
                onClick={() => go(page - 1)}
              >
                <ArrowLeft /> Previous
              </button>
              <button
                className={`primary-button ${done[page] ? 'unlocked' : ''}`}
                disabled={!done[page]}
                onClick={() => page < 5 && go(page + 1)}
              >
                {page === 5 ? 'Continue to next lesson' : 'Continue'} <ArrowRight />
              </button>
            </footer>
          </article>
        </section>
      </main>
      {modal && (
        <Modal data={reveals[modal]} onClose={() => setModal(null)} onDone={finishModal} />
      )}
      {activeDoc !== null && (
        <DocModal
          doc={documentTypes[activeDoc]}
          onClose={() => setActiveDoc(null)}
          onMarkRead={() => {
            setDocRead((values) => values.map((v, j) => (j === activeDoc ? true : v)));
            setActiveDoc(null);
          }}
        />
      )}
      {quiz && <Quiz data={quizzes[quiz]} onFinish={finishQuiz} />}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
