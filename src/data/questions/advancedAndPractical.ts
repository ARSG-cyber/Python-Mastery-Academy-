import { RawQuestion } from '../../types/question';

export const ADVANCED_AND_PRACTICAL_QUESTIONS: RawQuestion[] = [
  // 1. Generator function and yield
  {
    id: 'adv-001',
    topicId: 'iterators-generators',
    subtopic: 'yield and next()',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is printed by calling `next()` twice on this generator object?',
    codeSnippet: 'def count_up():\n    yield 1\n    yield 2\n    yield 3\n\ngen = count_up()\nprint(next(gen), next(gen))',
    options: ['1 2', '1 1', '2 3', 'StopIteration'],
    correctAnswer: '1 2',
    expectedOutput: '1 2',
    explanation: 'Calling a generator function returns a generator object. Each invocation of `next(gen)` resumes execution until the next `yield` expression is reached. The first call yields 1, pausing the function state; the second call resumes and yields 2.',
    incorrectExplanations: {
      '1 1': 'The generator maintains state between calls; it advances to the second yield.',
      '2 3': 'The first call executes from the top, reaching yield 1 first.',
      'StopIteration': 'StopIteration is raised only after exhaustively consuming all 3 yielded items.'
    },
    hint: 'Generators yield one value at a time and suspend execution at each yield.',
    tags: ['generators', 'yield', 'next', 'iteration'],
    isVerified: true
  },
  // 2. StopIteration protocol
  {
    id: 'adv-002',
    topicId: 'iterators-generators',
    subtopic: 'Iterator Protocol',
    difficulty: 'intermediate',
    questionType: 'single_choice',
    questionText: 'What exception is raised when `next()` is called on an exhausted iterator with no default provided?',
    options: ['StopIteration', 'IndexError', 'GeneratorExit', 'ValueError'],
    correctAnswer: 'StopIteration',
    explanation: 'In Python\'s iterator protocol, when an iterator has no further items to produce, calling `next(iterator)` raises `StopIteration`. For-loops catch this exception automatically to terminate cleanly.',
    incorrectExplanations: {
      'IndexError': 'IndexError is raised when indexing a sequence out of bounds (e.g. lst[99]).',
      'GeneratorExit': 'GeneratorExit is raised inside a generator when its close() method is called.',
      'ValueError': 'ValueError occurs for inappropriate argument values.'
    },
    hint: 'Think about the standard exception that signals the end of an iteration sequence.',
    tags: ['iterators', 'protocol', 'stop-iteration'],
    isVerified: true
  },
  // 3. Decorators and @functools.wraps
  {
    id: 'adv-003',
    topicId: 'decorators',
    subtopic: '@functools.wraps',
    difficulty: 'advanced',
    questionType: 'single_choice',
    questionText: 'When writing a custom decorator in Python, why should you decorate the inner wrapper function with `@functools.wraps(func)`?',
    options: [
      'It preserves the original function\'s name (__name__) and docstring (__doc__)',
      'It compiles the function bytecode to C for faster execution',
      'It allows the decorated function to run asynchronously with asyncio',
      'It enforces that all function arguments are type checked at runtime'
    ],
    correctAnswer: 'It preserves the original function\'s name (__name__) and docstring (__doc__)',
    explanation: 'Without `@functools.wraps`, the decorated function\'s `__name__` and `__doc__` are replaced by the wrapper\'s name (e.g. `"wrapper"`), confounding debugging, inspection, and auto-documentation tools.',
    incorrectExplanations: {
      'It compiles the function bytecode to C for faster execution': 'wraps simply copies metadata attributes; it does not compile to C.',
      'It allows the decorated function to run asynchronously with asyncio': 'wraps does not change the synchronous/asynchronous execution nature.',
      'It enforces that all function arguments are type checked at runtime': 'wraps does not validate argument types.'
    },
    hint: 'Consider what happens to the function\'s metadata (__name__, __doc__) when it gets wrapped.',
    tags: ['decorators', 'functools', 'metadata'],
    isVerified: true
  },
  // 4. Decorator execution
  {
    id: 'adv-004',
    topicId: 'decorators',
    subtopic: 'Decorator Execution',
    difficulty: 'advanced',
    questionType: 'code_output',
    questionText: 'What does this decorated greeting function print?',
    codeSnippet: 'def add_stars(func):\n    def wrapper(*args, **kwargs):\n        return f"*** {func(*args, **kwargs)} ***"\n    return wrapper\n\n@add_stars\ndef greet(name):\n    return f"Hello {name}"\n\nprint(greet("Python"))',
    options: ['*** Hello Python ***', 'Hello Python', '*** greet ***', 'TypeError'],
    correctAnswer: '*** Hello Python ***',
    expectedOutput: '*** Hello Python ***',
    explanation: 'The `@add_stars` syntax is equivalent to `greet = add_stars(greet)`. Calling `greet("Python")` invokes `wrapper("Python")`, which calls the original function, gets `"Hello Python"`, and wraps it with stars.',
    incorrectExplanations: {
      'Hello Python': 'The wrapper alters the return value, adding the surrounding stars.',
      '*** greet ***': 'The wrapper calls func() and formats the returned string, not the function name.',
      'TypeError': 'The decorator accepts *args and **kwargs, so it accepts all parameters cleanly.'
    },
    hint: 'Trace through the wrapper execution: func is called and its result is surrounded by stars.',
    tags: ['decorators', 'closures', 'higher-order-functions'],
    isVerified: true
  },
  // 5. Context Manager __enter__ and __exit__
  {
    id: 'adv-005',
    topicId: 'context-managers',
    subtopic: '__enter__ and __exit__',
    difficulty: 'intermediate',
    questionType: 'single_choice',
    questionText: 'Which two dunder methods must a class implement to support Python\'s `with` statement protocol?',
    options: [
      '__enter__ and __exit__',
      '__open__ and __close__',
      '__start__ and __stop__',
      '__init__ and __del__'
    ],
    correctAnswer: '__enter__ and __exit__',
    explanation: 'The context manager protocol requires `__enter__(self)`, which sets up the context and returns the target for `as target`, and `__exit__(self, exc_type, exc_val, exc_tb)`, which handles cleanup and exception suppression.',
    incorrectExplanations: {
      '__open__ and __close__': 'open and close are standard methods on file objects, not the dunder protocol for with statements.',
      '__start__ and __stop__': 'start and stop are not protocol methods.',
      '__init__ and __del__': '__init__ is object initialization and __del__ is destructor finalization.'
    },
    hint: 'Think about the actions taken when entering and exiting a with-statement block.',
    tags: ['context-managers', 'dunder-methods', 'with-statement'],
    isVerified: true
  },
  // 6. Python 3.10+ Union Type Hints
  {
    id: 'adv-006',
    topicId: 'type-hints',
    subtopic: 'Union Types (PEP 604)',
    difficulty: 'intermediate',
    questionType: 'single_choice',
    questionText: 'In Python 3.10+, which syntax is valid for expressing that a function parameter can be either an `int` or `float`?',
    options: [
      'def calc(val: int | float):',
      'def calc(val: int or float):',
      'def calc(val: (int, float)):',
      'def calc(val: Union[int || float]):'
    ],
    correctAnswer: 'def calc(val: int | float):',
    explanation: 'PEP 604 introduced the `|` (bitwise OR) operator on types in Python 3.10 as clean syntactic sugar for `typing.Union[int, float]`.',
    incorrectExplanations: {
      'def calc(val: int or float):': 'or is a logical operator that evaluates boolean truthiness at runtime, not a type union.',
      'def calc(val: (int, float)):': 'Tuples are used in isinstance checks, but not standard type annotations.',
      'def calc(val: Union[int || float]):': '|| is not valid Python syntax.'
    },
    hint: 'Python 3.10 introduced the single pipe character | for union types.',
    tags: ['type-hints', 'pep-604', 'python-3.10'],
    isVerified: true
  },
  // 7. Python 3.10+ match-case with wildcard
  {
    id: 'adv-007',
    topicId: 'match-case',
    subtopic: 'Structural Pattern Matching',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is the output of this Python 3.10+ `match-case` statement?',
    codeSnippet: 'code = 404\nmatch code:\n    case 200:\n        msg = "OK"\n    case 404:\n        msg = "Not Found"\n    case _:\n        msg = "Other"\n\nprint(msg)',
    options: ['Not Found', 'OK', 'Other', 'SyntaxError'],
    correctAnswer: 'Not Found',
    expectedOutput: 'Not Found',
    explanation: 'In Python 3.10+ structural pattern matching, `code = 404` matches `case 404:`, assigning `"Not Found"` to `msg`. The wildcard `case _:` acts as a default catch-all when no prior cases match.',
    incorrectExplanations: {
      'OK': '200 does not equal 404.',
      'Other': '404 is matched explicitly before reaching the wildcard case.',
      'SyntaxError': 'match and case are standard syntax in Python 3.10+.'
    },
    hint: 'The pattern matching engine evaluates cases in order; check if 404 matches a specific case.',
    tags: ['match-case', 'pattern-matching', 'python-3.10'],
    isVerified: true
  },
  // 8. Shallow copy pitfall
  {
    id: 'adv-008',
    topicId: 'classes-objects',
    subtopic: 'Shallow vs Deep Copy',
    difficulty: 'advanced',
    questionType: 'code_output',
    questionText: 'What is printed after modifying a nested list inside a shallow copy?',
    codeSnippet: 'original = [[1, 2], [3, 4]]\nshallow = list(original)\nshallow[0].append(99)\nprint(original[0])',
    options: ['[1, 2, 99]', '[1, 2]', '[99]', 'AttributeError'],
    correctAnswer: '[1, 2, 99]',
    expectedOutput: '[1, 2, 99]',
    explanation: 'A shallow copy (via `list()`, `copy()`, or `[:]`) creates a new outer list container, but does NOT recursively duplicate nested compound objects. Both `original[0]` and `shallow[0]` point to the identical inner list in memory, so appending to one affects both.',
    incorrectExplanations: {
      '[1, 2]': 'This would only remain unmodified if a deep copy (copy.deepcopy()) had been made.',
      '[99]': 'append() adds to the end of [1, 2], not replacing the list.',
      'AttributeError': 'Lists support the append method.'
    },
    hint: 'Shallow copies duplicate the outer list, but reference the same inner objects.',
    tags: ['copy', 'shallow-copy', 'mutability', 'references'],
    isVerified: true
  }
];
