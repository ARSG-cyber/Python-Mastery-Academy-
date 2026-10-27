import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Sparkles,
  Cpu,
  Globe,
  Layers,
  CheckCircle2,
  AlertCircle,
  Play,
  ArrowRight
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto pb-8">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#0b1329] via-[#111e3f] to-[#1e2a4a] border border-slate-800 rounded-3xl p-6 sm:p-10 text-white shadow-lg space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-semibold">
          <span>📚 Educational Reference</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          About the Python Language
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          From a Christmas break hobby project in 1989 to the world's most popular programming language powering artificial intelligence, web infrastructure, and scientific discovery.
        </p>
        <div className="pt-2">
          <Button
            size="md"
            variant="primary"
            onClick={() => navigate('/quiz-setup?topic=python-intro-history')}
            icon={<Play className="w-4 h-4 fill-current" />}
          >
            Quiz on Python History & Fundamentals
          </Button>
        </div>
      </div>

      {/* 1. What is Python and Who Created It */}
      <Card className="p-6 sm:p-8 space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-brand-500" />
          <span>Origins and Guido van Rossum</span>
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Python is a high-level, general-purpose, interpreted programming language designed with an emphasis on code readability and clean syntax. It was conceived in December 1989 by Dutch programmer <strong>Guido van Rossum</strong> at <em>Centrum Wiskunde & Informatica (CWI)</em> in Amsterdam, Netherlands.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Guido started Python as a holiday project to build a successor to the <strong>ABC programming language</strong> that could interface with the Amoeba distributed operating system and handle exceptions gracefully. Python was first released publicly in <strong>February 1991</strong> as version 0.9.0 on the Usenet newsgroup <code>alt.sources</code>.
        </p>
      </Card>

      {/* 2. The Name Origin */}
      <Card className="p-6 sm:p-8 space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
          <span>🎭</span>
          <span>Where Did the Name Come From?</span>
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Contrary to common belief, Python was <strong>not named after the constrictor snake</strong>. When Guido van Rossum began implementing the language, he was reading published scripts from the acclaimed BBC 1970s television comedy series <strong>"Monty Python's Flying Circus"</strong>.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Seeking a name that was short, unique, and slightly irreverent, he chose "Python". The Python community frequently pays homage to Monty Python sketches in documentation (e.g., using <code>spam</code> and <code>eggs</code> instead of traditional <code>foo</code> and <code>bar</code>).
        </p>
      </Card>

      {/* 3. The Zen of Python */}
      <Card className="p-6 sm:p-8 space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
          <BookOpen className="w-5 h-5 text-emerald-500" />
          <span>The Zen of Python (PEP 20)</span>
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Python’s design philosophy emphasizes simplicity and clarity, captured famously by Tim Peters in <em>The Zen of Python</em> (accessible in any Python terminal by typing <code>import this</code>):
        </p>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs sm:text-sm leading-relaxed space-y-1">
          <div>Beautiful is better than ugly.</div>
          <div>Explicit is better than implicit.</div>
          <div>Simple is better than complex.</div>
          <div>Complex is better than complicated.</div>
          <div>Readability counts.</div>
          <div>There should be one—and preferably only one—obvious way to do it.</div>
        </div>
      </Card>

      {/* 4. How the Python Interpreter Works */}
      <Card className="p-6 sm:p-8 space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
          <Cpu className="w-5 h-5 text-indigo-500" />
          <span>How Does the Python Interpreter Work?</span>
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Standard Python (CPython) is both compiled and interpreted:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block text-sm mb-1">
              1. Compilation to Bytecode
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-400">
              Your source code (<code>.py</code>) is parsed into an Abstract Syntax Tree (AST) and compiled into platform-independent intermediate bytecode (<code>.pyc</code>).
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block text-sm mb-1">
              2. Python Virtual Machine
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-400">
              The PVM (a stack-based virtual machine written in C) reads and executes each bytecode instruction sequentially.
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block text-sm mb-1">
              3. Automatic Memory
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-400">
              Memory is automatically managed via reference counting combined with a generational cyclic garbage collector.
            </span>
          </div>
        </div>
      </Card>

      {/* 5. Where Python is Used in Industry */}
      <Card className="p-6 sm:p-8 space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
          <Globe className="w-5 h-5 text-brand-500" />
          <span>Primary Industry Use Cases</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">
              🤖 Artificial Intelligence & Machine Learning
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-400">
              PyTorch, TensorFlow, scikit-learn, Hugging Face, OpenAI APIs. Python is the undisputed lingua franca of modern AI.
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">
              🌐 Web Backend Development
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-400">
              FastAPI, Django, Flask. Powering robust backends and APIs at Instagram, Netflix, Spotify, and Pinterest.
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">
              📊 Data Science & Analytics
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-400">
              pandas, NumPy, SciPy, Matplotlib, Polars, Jupyter notebooks for scientific visualization and data pipelines.
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">
              ⚙️ Automation, DevOps, & Scripting
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-400">
              Ansible, fabric, web scrapers (Playwright/BeautifulSoup), cloud infrastructure orchestration, and CLI tools.
            </span>
          </div>
        </div>
      </Card>

      {/* 6. Strengths and Limitations */}
      <Card className="p-6 sm:p-8 space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
          <Layers className="w-5 h-5 text-amber-500" />
          <span>Strengths & Trade-Offs</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="space-y-2">
            <div className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Python Strengths
            </div>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 list-disc list-inside">
              <li>Exceptional developer velocity and concise syntax</li>
              <li>Vast standard library ("batteries included")</li>
              <li>Largest open-source package ecosystem via PyPI</li>
              <li>Seamless C/C++ extensions for high-performance computing</li>
              <li>Multi-paradigm: procedural, OOP, and functional</li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> Trade-offs & Considerations
            </div>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 list-disc list-inside">
              <li>Interpreted CPU execution is slower than native compiled languages (C, Rust, Go)</li>
              <li>Global Interpreter Lock (GIL) historically limited multi-core CPU threads (addressed in PEP 703)</li>
              <li>Higher memory overhead compared to manual memory management</li>
              <li>Runtime type checking means some bugs emerge only when code is executed</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* 7. What to Learn After Basics */}
      <Card className="p-6 sm:p-8 space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
          <ArrowRight className="w-5 h-5 text-brand-500" />
          <span>Roadmap: What to Learn Next</span>
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Once you have mastered string manipulation, control flow, functions, and collections, progress along these intermediate and advanced milestones:
        </p>
        <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <strong>1. Object-Oriented Architecture:</strong> Classes, dunder methods (<code>__repr__</code>, <code>__getitem__</code>), inheritance, and dataclasses.
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <strong>2. Functional Idioms & Iterators:</strong> Generators (<code>yield</code>), list/dict comprehensions, closures, and decorators (<code>@functools.wraps</code>).
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <strong>3. Production Engineering:</strong> Type hinting with <code>mypy</code>, automated testing with <code>pytest</code>, packaging, and virtual environments.
          </div>
        </div>
      </Card>
    </div>
  );
};
