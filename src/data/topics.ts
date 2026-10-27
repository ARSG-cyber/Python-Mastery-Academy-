import { Topic } from '../types/topic';

export const TOPICS: Topic[] = [
  // --- BEGINNER ---
  {
    id: 'python-intro-history',
    order: 1,
    title: 'Python Introduction and History',
    description: 'Origins of Python, Guido van Rossum, design philosophy, release history, and core characteristics.',
    category: 'BEGINNER',
    difficulty: 'beginner',
    learningObjectives: [
      'Know who created Python and when it was first released',
      'Understand the origin of the Python name',
      'Explain key characteristics like interpreted execution and readability',
      'Identify major milestones in Python evolution'
    ],
    isAvailable: true,
    iconName: 'BookOpen'
  },
  {
    id: 'python-use-cases',
    order: 2,
    title: 'What Python Is Used For',
    description: 'Explore the modern domains powered by Python: web, data science, AI, automation, and scripting.',
    category: 'BEGINNER',
    difficulty: 'beginner',
    learningObjectives: [
      'Recognize primary industry domains that rely on Python',
      'Identify popular libraries and frameworks in each domain',
      'Understand Python strengths and performance trade-offs'
    ],
    isAvailable: true,
    iconName: 'Compass'
  },
  {
    id: 'python-syntax',
    order: 3,
    title: 'Python Syntax',
    description: 'Statement structure, indentation rules, colon syntax, line continuation, and readability standards.',
    category: 'BEGINNER',
    difficulty: 'beginner',
    learningObjectives: [
      'Understand meaningful indentation in Python blocks',
      'Recognize valid and invalid indentation errors',
      'Use colons properly after compound statement headers'
    ],
    isAvailable: true,
    iconName: 'FileCode'
  },
  {
    id: 'variables-naming',
    order: 4,
    title: 'Variables and Naming Rules',
    description: 'Variable declaration, dynamic binding, identifier rules, PEP 8 snake_case, and reserved keywords.',
    category: 'BEGINNER',
    difficulty: 'beginner',
    learningObjectives: [
      'Assign and reassign variables in Python',
      'Recognize valid and invalid identifier names',
      'Identify reserved Python keywords (def, class, if, etc.)'
    ],
    isAvailable: true,
    iconName: 'Tag'
  },
  {
    id: 'data-types',
    order: 5,
    title: 'Data Types',
    description: 'Fundamental types (int, float, complex, str, bool, NoneType), type() function, and mutability concepts.',
    category: 'BEGINNER',
    difficulty: 'beginner',
    learningObjectives: [
      'Distinguish between primitive and collection types',
      'Understand mutable vs immutable objects',
      'Use type() and isinstance() to inspect types'
    ],
    isAvailable: true,
    iconName: 'Layers'
  },
  {
    id: 'strings',
    order: 6,
    title: 'Strings',
    description: 'String creation, quotes, immutability, escape characters, raw strings, f-strings, and string operators.',
    category: 'BEGINNER',
    difficulty: 'beginner',
    learningObjectives: [
      'Work with single, double, and triple-quoted strings',
      'Understand that Python strings are strictly immutable',
      'Master string concatenation (+), repetition (*), and membership (in)',
      'Use f-strings for concise expression interpolation'
    ],
    isAvailable: true,
    iconName: 'Type'
  },
  {
    id: 'string-methods',
    order: 7,
    title: 'String Methods',
    description: 'Deep dive into Python\'s 47 standard string methods, case conversions, transformations, validation, and search.',
    category: 'BEGINNER',
    difficulty: 'beginner',
    learningObjectives: [
      'Master case methods: upper, lower, title, capitalize, swapcase, casefold',
      'Use search and inspection: find, index, rfind, count, startswith, endswith',
      'Transform text: strip, split, join, replace, partition, removeprefix, removesuffix',
      'Validate contents: isalpha, isdigit, isdecimal, isnumeric, isspace, isidentifier',
      'Format and align: center, ljust, rjust, zfill, format, expandtabs'
    ],
    isAvailable: true,
    iconName: 'Cpu'
  },
  {
    id: 'numbers-type-conversion',
    order: 8,
    title: 'Numbers and Type Conversion',
    description: 'Integers, floats, complex numbers, arithmetic operations, implicit vs explicit type casting (int, float, str).',
    category: 'BEGINNER',
    difficulty: 'beginner',
    learningObjectives: [
      'Perform arithmetic operations and handle floating-point precision',
      'Convert between int, float, and str safely',
      'Understand integer division (//) vs true division (/)'
    ],
    isAvailable: true,
    iconName: 'Hash'
  },
  {
    id: 'booleans',
    order: 9,
    title: 'Booleans',
    description: 'True, False, bool() evaluation, truthy and falsy values in Python, and short-circuit logic.',
    category: 'BEGINNER',
    difficulty: 'beginner',
    learningObjectives: [
      'Evaluate truthiness of numbers, empty containers, and None',
      'Understand short-circuit evaluation of and / or',
      'Avoid common boolean comparison pitfalls'
    ],
    isAvailable: true,
    iconName: 'CheckCircle2'
  },
  {
    id: 'operators',
    order: 10,
    title: 'Operators',
    description: 'Arithmetic, comparison, assignment, logical, identity (is), and membership (in) operators.',
    category: 'BEGINNER',
    difficulty: 'beginner',
    learningObjectives: [
      'Distinguish equality (==) from object identity (is)',
      'Use augmented assignment operators (+=, *=)',
      'Understand operator precedence in complex expressions'
    ],
    isAvailable: true,
    iconName: 'Divide'
  },
  {
    id: 'input-output',
    order: 11,
    title: 'Input and Output',
    description: 'Reading user input with input(), formatting output with print(), sep, end, and file arguments.',
    category: 'BEGINNER',
    difficulty: 'beginner',
    learningObjectives: [
      'Handle input() always returning a string',
      'Customize print() using sep and end parameters',
      'Format console output cleanly'
    ],
    isAvailable: true,
    iconName: 'Terminal'
  },
  {
    id: 'comments',
    order: 12,
    title: 'Comments',
    description: 'Single-line comments (#), multi-line comments, docstrings, PEP 8 comment guidelines, and documentation best practices.',
    category: 'BEGINNER',
    difficulty: 'beginner',
    learningObjectives: [
      'Write effective inline and block comments',
      'Distinguish comments from docstrings accessible via __doc__',
      'Follow PEP 8 guidelines for readable documentation'
    ],
    isAvailable: true,
    iconName: 'MessageSquare'
  },

  // --- CONTROL FLOW ---
  {
    id: 'if-elif-else',
    order: 13,
    title: 'if, elif, and else',
    description: 'Conditional execution, nested conditions, ternary conditional expressions, and logical branching.',
    category: 'CONTROL FLOW',
    difficulty: 'beginner',
    learningObjectives: [
      'Construct multi-branch conditional statements',
      'Use ternary expressions: x if condition else y',
      'Avoid common indentation and logic branch errors'
    ],
    isAvailable: true,
    iconName: 'GitFork'
  },
  {
    id: 'for-loops',
    order: 14,
    title: 'for Loops',
    description: 'Iterating over sequences, range(), enumerate(), zip(), and for...else blocks.',
    category: 'CONTROL FLOW',
    difficulty: 'beginner',
    learningObjectives: [
      'Iterate through strings, lists, tuples, and dictionaries',
      'Use enumerate() for index-value pairs',
      'Understand the unique behavior of for...else'
    ],
    isAvailable: true,
    iconName: 'Repeat'
  },
  {
    id: 'while-loops',
    order: 15,
    title: 'while Loops',
    description: 'Condition-based repetition, infinite loops prevention, sentinel values, and while...else constructs.',
    category: 'CONTROL FLOW',
    difficulty: 'beginner',
    learningObjectives: [
      'Implement while loops with terminating conditions',
      'Prevent unintentional infinite loops',
      'Utilize while...else for search loops'
    ],
    isAvailable: true,
    iconName: 'RotateCcw'
  },
  {
    id: 'break-continue-pass',
    order: 16,
    title: 'break, continue, and pass',
    description: 'Loop flow control: early termination with break, skipping iterations with continue, and null statements with pass.',
    category: 'CONTROL FLOW',
    difficulty: 'beginner',
    learningObjectives: [
      'Exit loops immediately using break',
      'Skip to the next loop cycle with continue',
      'Use pass as a syntactic placeholder in empty blocks'
    ],
    isAvailable: true,
    iconName: 'FastForward'
  },
  {
    id: 'range-function',
    order: 17,
    title: 'range()',
    description: 'Creating arithmetic sequences with range(stop), range(start, stop), and range(start, stop, step).',
    category: 'CONTROL FLOW',
    difficulty: 'beginner',
    learningObjectives: [
      'Understand 0-indexed start and exclusive stop bounds',
      'Generate reverse sequences using negative steps',
      'Explain lazy evaluation of range objects in Python 3'
    ],
    isAvailable: true,
    iconName: 'Sliders'
  },
  {
    id: 'match-case',
    order: 18,
    title: 'match and case in Python 3.10+',
    description: 'Structural Pattern Matching introduced in Python 3.10: literals, wildcards, or-patterns, and guards.',
    category: 'CONTROL FLOW',
    difficulty: 'intermediate',
    learningObjectives: [
      'Write clean match-case statements',
      'Use the wildcard _ for default cases',
      'Apply if guards to case conditions'
    ],
    isAvailable: true,
    iconName: 'Shuffle'
  },

  // --- COLLECTIONS ---
  {
    id: 'lists',
    order: 19,
    title: 'Lists',
    description: 'Ordered, mutable sequences in Python. Creation, indexing, common methods: append, extend, insert, pop, remove, sort.',
    category: 'COLLECTIONS',
    difficulty: 'beginner',
    learningObjectives: [
      'Create and mutate lists in-place',
      'Distinguish append() from extend()',
      'Understand list copying vs shallow reference assignment'
    ],
    isAvailable: true,
    iconName: 'List'
  },
  {
    id: 'tuples',
    order: 20,
    title: 'Tuples',
    description: 'Immutable ordered collections, single-element tuple syntax, packing, unpacking, and tuple immutability nuances.',
    category: 'COLLECTIONS',
    difficulty: 'beginner',
    learningObjectives: [
      'Create tuples including single-item tuples (x,)',
      'Unpack sequences into variables',
      'Explain when to choose tuples over lists'
    ],
    isAvailable: true,
    iconName: 'Shield'
  },
  {
    id: 'dictionaries',
    order: 21,
    title: 'Dictionaries',
    description: 'Key-value mapping data structures, hashable keys requirement, get(), keys(), values(), items(), and dict comprehension.',
    category: 'COLLECTIONS',
    difficulty: 'beginner',
    learningObjectives: [
      'Store and retrieve items by unique hashable keys',
      'Safely access values using get() with default fallbacks',
      'Iterate over key-value pairs using .items()'
    ],
    isAvailable: true,
    iconName: 'Book'
  },
  {
    id: 'sets',
    order: 22,
    title: 'Sets',
    description: 'Unordered collections of unique elements. Set operations: union, intersection, difference, symmetric difference.',
    category: 'COLLECTIONS',
    difficulty: 'beginner',
    learningObjectives: [
      'Eliminate duplicates using sets',
      'Perform mathematical set operations (| & - ^)',
      'Understand set element mutability and hashability'
    ],
    isAvailable: true,
    iconName: 'CircleDot'
  },
  {
    id: 'frozen-sets',
    order: 23,
    title: 'Frozen Sets',
    description: 'Immutable counterpart to sets (frozenset), usable as dictionary keys or elements of other sets.',
    category: 'COLLECTIONS',
    difficulty: 'intermediate',
    learningObjectives: [
      'Create and use frozenset instances',
      'Use frozensets as dictionary keys',
      'Compare set and frozenset capabilities'
    ],
    isAvailable: false,
    iconName: 'Lock'
  },
  {
    id: 'collection-operations',
    order: 24,
    title: 'Collection Operations',
    description: 'Universal collection operations: len(), min(), max(), sum(), sorted(), any(), all(), and concatenation.',
    category: 'COLLECTIONS',
    difficulty: 'beginner',
    learningObjectives: [
      'Apply built-in aggregation functions to any collection',
      'Use any() and all() for condition checking',
      'Understand sorted() returning a new list vs .sort() in-place'
    ],
    isAvailable: true,
    iconName: 'Boxes'
  },
  {
    id: 'indexing-slicing',
    order: 25,
    title: 'Indexing and Slicing',
    description: 'Positive and negative indexing, slice step parameter [start:stop:step], reversing sequences [::-1], and slice assignment.',
    category: 'COLLECTIONS',
    difficulty: 'beginner',
    learningObjectives: [
      'Master positive and negative index offsets',
      'Extract sub-sequences cleanly with slice syntax',
      'Handle out-of-bounds slice behaviors gracefully'
    ],
    isAvailable: true,
    iconName: 'Scissors'
  },
  {
    id: 'comprehensions',
    order: 26,
    title: 'Comprehensions',
    description: 'List, dictionary, and set comprehensions: concise syntax, filtering with if, nested comprehensions.',
    category: 'COLLECTIONS',
    difficulty: 'intermediate',
    learningObjectives: [
      'Write clean list comprehensions to transform data',
      'Build dictionary and set comprehensions',
      'Balance comprehension readability with complexity'
    ],
    isAvailable: true,
    iconName: 'Sparkles'
  },

  // --- FUNCTIONS AND MODULES ---
  {
    id: 'functions',
    order: 27,
    title: 'Functions',
    description: 'Defining functions with def, docstrings, calling conventions, modular decomposition, and first-class functions.',
    category: 'FUNCTIONS AND MODULES',
    difficulty: 'beginner',
    learningObjectives: [
      'Define reusable functions using def',
      'Document functions with docstrings',
      'Understand functions as first-class objects'
    ],
    isAvailable: true,
    iconName: 'Code'
  },
  {
    id: 'parameters-arguments',
    order: 28,
    title: 'Parameters and Arguments',
    description: 'Positional arguments, keyword arguments, default values, mutable default argument pitfall, *args, and **kwargs.',
    category: 'FUNCTIONS AND MODULES',
    difficulty: 'intermediate',
    learningObjectives: [
      'Distinguish positional from keyword parameters',
      'Avoid mutable default parameter traps (def fn(x=[]))',
      'Capture variable arguments using *args and **kwargs'
    ],
    isAvailable: true,
    iconName: 'Settings'
  },
  {
    id: 'return-values',
    order: 29,
    title: 'Return Values',
    description: 'Returning values with return, implicit None returns, returning multiple values as tuples, and early returns.',
    category: 'FUNCTIONS AND MODULES',
    difficulty: 'beginner',
    learningObjectives: [
      'Return single or multiple values from functions',
      'Recognize implicit None when no return statement exists',
      'Use guard clauses with early returns'
    ],
    isAvailable: true,
    iconName: 'CornerDownLeft'
  },
  {
    id: 'lambda-functions',
    order: 30,
    title: 'Lambda Functions',
    description: 'Anonymous inline functions with lambda, single-expression syntax, usage with map(), filter(), and sort key.',
    category: 'FUNCTIONS AND MODULES',
    difficulty: 'intermediate',
    learningObjectives: [
      'Write anonymous one-liner functions',
      'Provide custom sort keys with lambdas',
      'Know when to prefer def over lambda for clarity'
    ],
    isAvailable: true,
    iconName: 'Zap'
  },
  {
    id: 'scope',
    order: 31,
    title: 'Scope',
    description: 'LEGB rule (Local, Enclosing, Global, Built-in), global keyword, nonlocal keyword, and variable shadowing.',
    category: 'FUNCTIONS AND MODULES',
    difficulty: 'intermediate',
    learningObjectives: [
      'Explain how Python resolves names via LEGB',
      'Modify global variables with global cautiously',
      'Understand nonlocal in nested closures'
    ],
    isAvailable: true,
    iconName: 'Eye'
  },
  {
    id: 'built-in-functions',
    order: 32,
    title: 'Built-in Functions',
    description: 'Essential Python built-ins: print, len, type, range, sum, min, max, zip, enumerate, sorted, map, filter.',
    category: 'FUNCTIONS AND MODULES',
    difficulty: 'beginner',
    learningObjectives: [
      'Leverage built-in functions without importing',
      'Combine zip() and enumerate() for clean loops',
      'Differentiate built-in functions from object methods'
    ],
    isAvailable: true,
    iconName: 'Tool'
  },
  {
    id: 'modules-imports',
    order: 33,
    title: 'Modules and Imports',
    description: 'Importing modules (import x, from x import y), module search path sys.path, __name__ == "__main__" idiom.',
    category: 'FUNCTIONS AND MODULES',
    difficulty: 'intermediate',
    learningObjectives: [
      'Organize Python code into reusable .py modules',
      'Understand import styles and avoid circular imports',
      'Use the __name__ == "__main__" entry point pattern'
    ],
    isAvailable: true,
    iconName: 'Package'
  },
  {
    id: 'packages',
    order: 34,
    title: 'Packages',
    description: 'Hierarchical module namespace, __init__.py role, relative imports, and organizing large applications.',
    category: 'FUNCTIONS AND MODULES',
    difficulty: 'intermediate',
    learningObjectives: [
      'Structure multi-file directory packages',
      'Understand __init__.py purpose',
      'Use explicit relative imports'
    ],
    isAvailable: false,
    iconName: 'FolderArchive'
  },

  // --- INTERMEDIATE ---
  {
    id: 'exception-handling',
    order: 35,
    title: 'Exception Handling',
    description: 'try, except, else, finally blocks, raising exceptions, built-in exception hierarchy, and custom exceptions.',
    category: 'INTERMEDIATE',
    difficulty: 'intermediate',
    learningObjectives: [
      'Catch and handle specific exceptions gracefully',
      'Understand the else and finally execution lifecycle',
      'Create custom exception classes derived from Exception'
    ],
    isAvailable: true,
    iconName: 'AlertTriangle'
  },
  {
    id: 'file-handling',
    order: 36,
    title: 'File Handling',
    description: 'Opening files with open(), modes (r, w, a, b), reading and writing lines, and with statement automatic cleanup.',
    category: 'INTERMEDIATE',
    difficulty: 'intermediate',
    learningObjectives: [
      'Safely read and write text files using with open(...)',
      'Differentiate read(), readline(), and readlines()',
      'Handle file encodings (UTF-8) properly'
    ],
    isAvailable: true,
    iconName: 'FileText'
  },
  {
    id: 'oop-concepts',
    order: 37,
    title: 'Object-Oriented Programming',
    description: 'Core OOP pillars: Encapsulation, Abstraction, Inheritance, and Polymorphism in Python design.',
    category: 'INTERMEDIATE',
    difficulty: 'intermediate',
    learningObjectives: [
      'Understand Python\'s object model ("everything is an object")',
      'Explain OOP principles with real-world analogies',
      'Know when OOP is appropriate vs procedural style'
    ],
    isAvailable: true,
    iconName: 'Box'
  },
  {
    id: 'classes-objects',
    order: 38,
    title: 'Classes and Objects',
    description: 'Class definition, __init__ constructor, self parameter, instance vs class attributes, and instance methods.',
    category: 'INTERMEDIATE',
    difficulty: 'intermediate',
    learningObjectives: [
      'Define classes with constructors and methods',
      'Understand the self reference to instances',
      'Distinguish instance variables from class variables'
    ],
    isAvailable: true,
    iconName: 'Component'
  },
  {
    id: 'inheritance',
    order: 39,
    title: 'Inheritance',
    description: 'Single and multiple inheritance, super() call, Method Resolution Order (MRO), and method overriding.',
    category: 'INTERMEDIATE',
    difficulty: 'intermediate',
    learningObjectives: [
      'Create subclass hierarchies extending base classes',
      'Call parent initializers cleanly using super().__init__()',
      'Understand Python\'s C3 linearization MRO'
    ],
    isAvailable: true,
    iconName: 'Network'
  },
  {
    id: 'iterators-generators',
    order: 40,
    title: 'Iterators and Generators',
    description: 'Iterator protocol (__iter__, __next__), generator functions with yield, generator expressions, and memory savings.',
    category: 'INTERMEDIATE',
    difficulty: 'intermediate',
    learningObjectives: [
      'Implement custom iterators with __iter__ and __next__',
      'Produce values lazily using yield generators',
      'Compare memory usage of lists vs generator expressions'
    ],
    isAvailable: true,
    iconName: 'RefreshCw'
  },
  {
    id: 'decorators',
    order: 41,
    title: 'Decorators',
    description: 'Function decorators, closure wrappers, functools.wraps, decorators with arguments, and practical use cases.',
    category: 'INTERMEDIATE',
    difficulty: 'advanced',
    learningObjectives: [
      'Understand function wrapping and closure mechanics',
      'Preserve function metadata with @functools.wraps',
      'Write decorators for logging, timing, and validation'
    ],
    isAvailable: true,
    iconName: 'Wand2'
  },
  {
    id: 'context-managers',
    order: 42,
    title: 'Context Managers',
    description: 'Resource management with with statements, __enter__ and __exit__ dunder methods, and contextlib.contextmanager.',
    category: 'INTERMEDIATE',
    difficulty: 'intermediate',
    learningObjectives: [
      'Ensure deterministic resource cleanup (files, locks, connections)',
      'Implement __enter__ and __exit__ on custom classes',
      'Create quick context managers using contextlib generator syntax'
    ],
    isAvailable: true,
    iconName: 'Key'
  },
  {
    id: 'virtual-environments',
    order: 43,
    title: 'Virtual Environments',
    description: 'Isolated Python environments using venv, avoiding dependency conflicts, activation, and deactivation.',
    category: 'INTERMEDIATE',
    difficulty: 'beginner',
    learningObjectives: [
      'Create virtual environments using python -m venv',
      'Activate and deactivate virtual environments across OSs',
      'Prevent global package pollution'
    ],
    isAvailable: false,
    iconName: 'Server'
  },
  {
    id: 'pip-packages',
    order: 44,
    title: 'pip and Package Management',
    description: 'Installing third-party packages from PyPI, requirements.txt, pinning versions, and pip commands.',
    category: 'INTERMEDIATE',
    difficulty: 'beginner',
    learningObjectives: [
      'Install, upgrade, and remove packages via pip',
      'Generate and install requirements.txt files',
      'Inspect package dependencies safely'
    ],
    isAvailable: false,
    iconName: 'Download'
  },

  // --- ADVANCED INTRODUCTION ---
  {
    id: 'type-hints',
    order: 45,
    title: 'Type Hints',
    description: 'PEP 484 static typing annotations, typing module, Union, Optional, List, Dict, and static checkers like mypy.',
    category: 'ADVANCED INTRODUCTION',
    difficulty: 'intermediate',
    learningObjectives: [
      'Annotate variables, parameter types, and return values',
      'Use modern Python 3.10+ union types (X | Y)',
      'Run static type checking to catch bugs before execution'
    ],
    isAvailable: true,
    iconName: 'CheckSquare'
  },
  {
    id: 'dataclasses',
    order: 46,
    title: 'Dataclasses',
    description: 'The @dataclass decorator from Python 3.7+, automatic __init__, __repr__, and __eq__ generation, field defaults.',
    category: 'ADVANCED INTRODUCTION',
    difficulty: 'intermediate',
    learningObjectives: [
      'Create clean data containers with @dataclass',
      'Configure frozen (immutable) dataclasses',
      'Use field(default_factory=...) for mutable defaults'
    ],
    isAvailable: true,
    iconName: 'Database'
  },
  {
    id: 'regex',
    order: 47,
    title: 'Regular Expressions',
    description: 'Pattern matching with the re module: search, match, findall, sub, metacharacters, character classes, and flags.',
    category: 'ADVANCED INTRODUCTION',
    difficulty: 'advanced',
    learningObjectives: [
      'Formulate regex patterns with raw strings r"..."',
      'Differentiate re.match() from re.search()',
      'Capture groups and perform text substitutions with re.sub()'
    ],
    isAvailable: false,
    iconName: 'Binary'
  },
  {
    id: 'unit-testing',
    order: 48,
    title: 'Unit Testing',
    description: 'Automated testing with unittest and pytest, test cases, assertions, fixtures, and test-driven fundamentals.',
    category: 'ADVANCED INTRODUCTION',
    difficulty: 'intermediate',
    learningObjectives: [
      'Write TestCase classes and assertion methods',
      'Structure clean test suites with pytest conventions',
      'Test for expected exceptions with assertRaises or pytest.raises'
    ],
    isAvailable: false,
    iconName: 'CheckCheck'
  },
  {
    id: 'working-with-json',
    order: 49,
    title: 'Working with JSON',
    description: 'Serializing and deserializing JSON with the json module: dumps, loads, dump, load, and custom encoders.',
    category: 'ADVANCED INTRODUCTION',
    difficulty: 'intermediate',
    learningObjectives: [
      'Parse JSON strings into Python dictionaries with json.loads()',
      'Serialize Python data to formatted JSON with json.dumps()',
      'Read and write JSON files directly with load() and dump()'
    ],
    isAvailable: true,
    iconName: 'Braces'
  },
  {
    id: 'basic-algorithms',
    order: 50,
    title: 'Basic Algorithms and Problem Solving',
    description: 'Fundamental problem solving: linear and binary search, bubble sort, recursion basics, and Big-O intuition.',
    category: 'ADVANCED INTRODUCTION',
    difficulty: 'advanced',
    learningObjectives: [
      'Implement standard searching and sorting algorithms',
      'Reason about time and space complexity with Big-O notation',
      'Apply algorithmic patterns to real programming problems'
    ],
    isAvailable: false,
    iconName: 'Activity'
  }
];

export const TOPIC_CATEGORIES: Topic['category'][] = [
  'BEGINNER',
  'CONTROL FLOW',
  'COLLECTIONS',
  'FUNCTIONS AND MODULES',
  'INTERMEDIATE',
  'ADVANCED INTRODUCTION',
];
