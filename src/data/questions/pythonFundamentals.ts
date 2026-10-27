import { Question } from '../../types/question';

export const FUNDAMENTALS_QUESTIONS: Question[] = [
  // 1. Guido van Rossum
  {
    id: 'fund-001',
    topicId: 'python-intro-history',
    subtopic: 'History',
    difficulty: 'beginner',
    questionType: 'single_choice',
    questionText: 'Who is the original creator and designer of the Python programming language?',
    options: ['Guido van Rossum', 'Bjarne Stroustrup', 'James Gosling', 'Brendan Eich'],
    correctAnswer: 'Guido van Rossum',
    explanation: 'Python was created by Dutch programmer Guido van Rossum in the late 1980s at Centrum Wiskunde & Informatica (CWI) in the Netherlands. For many years, he was recognized as Python\'s "Benevolent Dictator For Life" (BDFL).',
    incorrectExplanations: {
      'Bjarne Stroustrup': 'Bjarne Stroustrup created C++ at Bell Labs.',
      'James Gosling': 'James Gosling is known as the father of Java at Sun Microsystems.',
      'Brendan Eich': 'Brendan Eich created JavaScript at Netscape in 1995.'
    },
    hint: 'He is a Dutch programmer affectionately known for decades as Python\'s BDFL.',
    tags: ['history', 'creator', 'guido'],
    isVerified: true
  },
  // 2. First public release in 1991
  {
    id: 'fund-002',
    topicId: 'python-intro-history',
    subtopic: 'History',
    difficulty: 'beginner',
    questionType: 'single_choice',
    questionText: 'In which year was Python first released to the public (version 0.9.0 posted to alt.sources)?',
    options: ['1991', '1989', '1995', '2000'],
    correctAnswer: '1991',
    explanation: 'Implementation of Python began in December 1989, but Python was first released publicly in February 1991 as version 0.9.0 on the alt.sources Usenet newsgroup.',
    incorrectExplanations: {
      '1989': 'December 1989 is when Guido began writing Python during Christmas break, but the first public release occurred in 1991.',
      '1995': '1995 is when Java and JavaScript were first released.',
      '2000': 'Python 2.0 was released in October 2000.'
    },
    hint: 'Development started in 1989, but the first public release happened in early 1991.',
    tags: ['history', 'release-year', '1991'],
    isVerified: true
  },
  // 3. Name origin: Monty Python
  {
    id: 'fund-003',
    topicId: 'python-intro-history',
    subtopic: 'History',
    difficulty: 'beginner',
    questionType: 'single_choice',
    questionText: 'Where does the name "Python" originate from according to Guido van Rossum?',
    options: [
      'The British comedy series "Monty Python\'s Flying Circus"',
      'The non-venomous constrictor snake',
      'An ancient Greek mythological serpent of Delphi',
      'An acronym for "Portable Yield-Threaded Heuristic Object Network"'
    ],
    correctAnswer: 'The British comedy series "Monty Python\'s Flying Circus"',
    explanation: 'Guido van Rossum chose the name because he was reading published scripts from the BBC comedy television show "Monty Python\'s Flying Circus". He wanted a name that was short, unique, and slightly mysterious.',
    incorrectExplanations: {
      'The non-venomous constrictor snake': 'The snake is the logo and mascot, but the language was explicitly named after the comedy troupe.',
      'An ancient Greek mythological serpent of Delphi': 'While the snake name has mythological roots, the language creator was reading Monty Python comedy scripts.',
      'An acronym for "Portable Yield-Threaded Heuristic Object Network"': 'Python is not an acronym.'
    },
    hint: 'Think of British comedy sketches featuring Spam and Dead Parrots.',
    tags: ['history', 'name-origin', 'monty-python'],
    isVerified: true
  },
  // 4. Interpreted vs Compiled
  {
    id: 'fund-004',
    topicId: 'python-intro-history',
    subtopic: 'Execution Model',
    difficulty: 'intermediate',
    questionType: 'single_choice',
    questionText: 'How is Python code typically executed by the standard CPython runtime?',
    options: [
      'Source code (.py) is compiled into bytecode (.pyc) which is then executed by the Python Virtual Machine (PVM)',
      'Source code is directly compiled ahead-of-time into native machine code (like C/C++)',
      'Source code is read and interpreted line-by-line as raw text without any intermediate bytecode',
      'Source code is converted to JavaScript and run in V8'
    ],
    correctAnswer: 'Source code (.py) is compiled into bytecode (.pyc) which is then executed by the Python Virtual Machine (PVM)',
    explanation: 'CPython first compiles source text into an intermediate platform-independent bytecode (stored in .pyc files inside __pycache__). This bytecode is then executed by a virtual machine loop (the PVM).',
    incorrectExplanations: {
      'Source code is directly compiled ahead-of-time into native machine code (like C/C++)': 'Standard Python does not compile to native machine binaries ahead of time.',
      'Source code is read and interpreted line-by-line as raw text without any intermediate bytecode': 'Python always compiles to bytecode first; it does not parse raw text on every loop iteration.',
      'Source code is converted to JavaScript and run in V8': 'Transpilers like Brython exist, but CPython executes via bytecode on the PVM.'
    },
    hint: 'Look for the two-step process involving bytecode and the virtual machine.',
    tags: ['execution', 'bytecode', 'pvm'],
    isVerified: true
  },
  // 5. Dynamic Typing
  {
    id: 'fund-005',
    topicId: 'python-intro-history',
    subtopic: 'Type System',
    difficulty: 'beginner',
    questionType: 'single_choice',
    questionText: 'What does it mean that Python is "dynamically and strongly typed"?',
    options: [
      'Variables hold object references whose types are determined at runtime, and implicit incompatible type conversions (like "5" + 2) are not permitted',
      'Variable types must be explicitly declared before use, and types can be automatically cast to anything',
      'Types are only checked during compile time, and all variables can be changed into numbers',
      'Variables can hold only one type throughout their entire lifetime'
    ],
    correctAnswer: 'Variables hold object references whose types are determined at runtime, and implicit incompatible type conversions (like "5" + 2) are not permitted',
    explanation: '"Dynamically typed" means variable names are dynamically bound to objects of any type at runtime. "Strongly typed" means Python will not perform unexpected implicit type coercions between incompatible types (e.g., adding a string and an integer raises TypeError rather than coercing).',
    incorrectExplanations: {
      'Variable types must be explicitly declared before use, and types can be automatically cast to anything': 'That describes static, weakly-typed languages.',
      'Types are only checked during compile time, and all variables can be changed into numbers': 'Python checks types at runtime.',
      'Variables can hold only one type throughout their entire lifetime': 'In Python, a variable name can be rebound to an object of a different type at any time.'
    },
    hint: 'Dynamic = runtime binding. Strong = no silent implicit type confusion.',
    tags: ['typing', 'dynamic', 'strong-typing'],
    isVerified: true
  },
  // 6. Indentation and Syntax
  {
    id: 'fund-006',
    topicId: 'python-syntax',
    subtopic: 'Indentation',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What error is produced by the following invalid Python code?',
    codeSnippet: 'def greet():\nprint("Hello")\n\ngreet()',
    options: [
      'IndentationError: expected an indented block after function definition on line 1',
      'SyntaxError: missing braces {}',
      'NameError: name greet is not defined',
      'TypeError: function missing body'
    ],
    correctAnswer: 'IndentationError: expected an indented block after function definition on line 1',
    expectedOutput: 'IndentationError: expected an indented block after function definition on line 1',
    explanation: 'In Python, statement blocks (such as function bodies, loops, and conditionals) are delineated strictly by whitespace indentation following a colon `:`. Omitting indentation raises an `IndentationError` (a subclass of `SyntaxError`).',
    incorrectExplanations: {
      'SyntaxError: missing braces {}': 'Python does not use curly braces to define code blocks.',
      'NameError: name greet is not defined': 'The error occurs during parsing before greet() is called.',
      'TypeError: function missing body': 'Python raises IndentationError, not TypeError.'
    },
    hint: 'Python enforces indentation for code blocks.',
    tags: ['syntax', 'indentation', 'IndentationError'],
    isVerified: true
  },
  // 7. Variable Naming Rules
  {
    id: 'fund-007',
    topicId: 'variables-naming',
    subtopic: 'Identifiers',
    difficulty: 'beginner',
    questionType: 'single_choice',
    questionText: 'Which of the following is a VALID variable name in Python?',
    options: ['_total_count_2', '2nd_score', 'user-name', 'class'],
    correctAnswer: '_total_count_2',
    explanation: 'Python identifier names may contain letters, digits, and underscores, but CANNOT start with a digit (`2nd_score` is invalid), cannot contain hyphens (`user-name` is subtraction), and cannot be a reserved keyword (`class` is a keyword). `_total_count_2` begins with an underscore and is completely valid.',
    incorrectExplanations: {
      '2nd_score': 'Variable names cannot start with a digit in Python.',
      'user-name': 'The hyphen is parsed as the subtraction operator (-), not part of an identifier.',
      'class': 'class is a reserved keyword in Python used to define classes.'
    },
    hint: 'Identifiers can start with a letter or underscore, but never a digit or keyword.',
    tags: ['naming', 'variables', 'identifiers'],
    isVerified: true
  },
  // 8. Equality (==) vs Identity (is)
  {
    id: 'fund-008',
    topicId: 'operators',
    subtopic: 'Identity vs Equality',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What does this code output?',
    codeSnippet: 'a = [1, 2, 3]\nb = [1, 2, 3]\nprint(a == b, a is b)',
    options: ['True False', 'True True', 'False True', 'False False'],
    correctAnswer: 'True False',
    expectedOutput: 'True False',
    explanation: 'The `==` operator tests for equality of value (both lists have equal elements [1, 2, 3], so `a == b` is `True`). The `is` operator tests object identity (whether `a` and `b` reference the exact same memory address in heap). Since two distinct list literals were created, `a is b` is `False`.',
    incorrectExplanations: {
      'True True': 'a and b are separate list objects allocated at different memory addresses.',
      'False True': 'a == b is True because their contents match.',
      'False False': 'The contents are equal, so a == b is True.'
    },
    hint: '== checks values, is checks memory identity (id).',
    tags: ['operators', 'identity', 'equality', 'is'],
    isVerified: true
  },
  // 9. Integer Division (//) vs True Division (/)
  {
    id: 'fund-009',
    topicId: 'numbers-type-conversion',
    subtopic: 'Arithmetic',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What is the output of the following division operations in Python 3?',
    codeSnippet: 'print(7 / 2, 7 // 2)',
    options: ['3.5 3', '3.5 3.5', '3 3', '3.5 4'],
    correctAnswer: '3.5 3',
    expectedOutput: '3.5 3',
    explanation: 'In Python 3, `/` always performs true division and returns a floating-point number (`3.5`). The `//` operator performs floor division (integer division) and truncates towards negative infinity, returning integer `3`.',
    incorrectExplanations: {
      '3.5 3.5': '// discards the fractional part, yielding 3.',
      '3 3': 'Python 3 always returns float 3.5 for true division /.',
      '3.5 4': '// floors towards negative infinity, not ceiling.'
    },
    hint: '/ gives a float, // floors to an integer.',
    tags: ['arithmetic', 'division', 'operators'],
    isVerified: true
  },
  // 10. Exponentiation Operator
  {
    id: 'fund-010',
    topicId: 'operators',
    subtopic: 'Arithmetic',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What is the output of the following exponentiation expression in Python?',
    codeSnippet: 'print(2 ** 3 ** 2)',
    options: ['512', '64', '36', '12'],
    correctAnswer: '512',
    expectedOutput: '512',
    explanation: 'In Python, the exponentiation operator `**` has right-to-left associativity. Therefore, `2 ** 3 ** 2` is evaluated as `2 ** (3 ** 2) = 2 ** 9 = 512` (not `(2 ** 3) ** 2 = 8 ** 2 = 64`).',
    incorrectExplanations: {
      '64': 'This would be (2 ** 3) ** 2 if associativity were left-to-right. Exponentiation in Python binds from right to left.',
      '36': 'Check the powers: 3 ** 2 = 9, 2 ** 9 = 512.',
      '12': 'Multiplication is *, exponentiation is **.'
    },
    hint: 'Exponentiation ** evaluates from right to left: 2 ** (3 ** 2).',
    tags: ['operators', 'precedence', 'associativity'],
    isVerified: true
  },
  // 11. Mutable vs Immutable Types
  {
    id: 'fund-011',
    topicId: 'data-types',
    subtopic: 'Mutability',
    difficulty: 'intermediate',
    questionType: 'multiple_choice',
    questionText: 'Which of the following built-in Python data types are IMMUTABLE? (Select all that apply)',
    options: ['int', 'str', 'tuple', 'list', 'dict'],
    correctAnswer: ['int', 'str', 'tuple'],
    explanation: 'In Python, numbers (int, float), strings (str), tuples (tuple), and frozensets are immutable; their values cannot be changed after creation. Lists (list), dictionaries (dict), and sets (set) are mutable containers.',
    incorrectExplanations: {
      'list': 'Lists can be mutated in-place via append, pop, slice assignment, etc.',
      'dict': 'Dictionaries can be modified in-place by adding or updating keys.'
    },
    hint: 'Which types cannot be changed once created?',
    tags: ['mutability', 'types', 'immutable'],
    isVerified: true
  },
  // 12. None and NoneType
  {
    id: 'fund-012',
    topicId: 'data-types',
    subtopic: 'NoneType',
    difficulty: 'beginner',
    questionType: 'single_choice',
    questionText: 'What is the recommended, idiomatic PEP 8 way to test if a variable `x` is None?',
    options: ['if x is None:', 'if x == None:', 'if x is not not None:', 'if x.is_none():'],
    correctAnswer: 'if x is None:',
    explanation: 'PEP 8 specifies that comparisons to singletons like `None` should always be done with `is` or `is not`, never the equality operators (`==`). This is faster (pointer comparison) and cannot be fooled by classes that override `__eq__`.',
    incorrectExplanations: {
      'if x == None:': 'While it runs, PEP 8 advises against this because custom classes can override __eq__ to return unexpected results.',
      'if x is not not None:': 'Double negation is unnecessarily convoluted.',
      'if x.is_none():': 'None is an object singleton; there is no is_none() method.'
    },
    hint: 'Use the identity operator is for checking the None singleton.',
    tags: ['None', 'PEP8', 'identity'],
    isVerified: true
  },
  // 13. for...else loop construct
  {
    id: 'fund-013',
    topicId: 'for-loops',
    subtopic: 'Control Flow',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is the output of this code with a for...else loop?',
    codeSnippet: 'for n in [2, 4, 6]:\n    if n % 2 != 0:\n        break\nelse:\n    print("All even!")',
    options: ['All even!', '(No output)', 'SyntaxError: else cannot follow for', '2 4 6'],
    correctAnswer: 'All even!',
    expectedOutput: 'All even!',
    explanation: 'In Python, an `else` block attached to a `for` or `while` loop executes if and only if the loop completes normally without encountering a `break` statement. Since all numbers are even, `break` never triggers, so "All even!" is printed.',
    incorrectExplanations: {
      '(No output)': 'The else branch executes because no break occurred.',
      'SyntaxError: else cannot follow for': 'for...else and while...else are standard, valid Python constructs.',
      '2 4 6': 'The print statement inside the else clause prints "All even!".'
    },
    hint: 'A for...else block executes when the loop finishes without hitting a break statement.',
    tags: ['loops', 'for-else', 'control-flow'],
    isVerified: true
  },
  // 14. Dictionary Key Requirements
  {
    id: 'fund-014',
    topicId: 'dictionaries',
    subtopic: 'Hashability',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What happens when using a list as a dictionary key?',
    codeSnippet: 'd = {}\nd[[1, 2]] = "coordinates"',
    options: [
      'TypeError: unhashable type: \'list\'',
      'It creates key [1, 2] with value "coordinates"',
      'ValueError: list cannot be converted to hash',
      'KeyError: [1, 2]'
    ],
    correctAnswer: 'TypeError: unhashable type: \'list\'',
    expectedOutput: 'TypeError: unhashable type: \'list\'',
    explanation: 'Dictionary keys in Python must be hashable (meaning they have a hash value that never changes during their lifetime and implement `__hash__()`). Lists are mutable and therefore unhashable. Using a list as a key raises `TypeError: unhashable type: \'list\'`. (Use a tuple `(1, 2)` instead).',
    incorrectExplanations: {
      'It creates key [1, 2] with value "coordinates"': 'Lists cannot be used as dictionary keys because they are mutable and unhashable.',
      'ValueError: list cannot be converted to hash': 'Python raises TypeError, not ValueError.',
      'KeyError: [1, 2]': 'KeyError happens when reading an absent key, not when setting an unhashable key.'
    },
    hint: 'Can mutable objects like lists be used as dictionary keys in Python?',
    tags: ['dictionaries', 'hashability', 'TypeError'],
    isVerified: true
  },
  // 15. Default Mutable Argument Trap
  {
    id: 'fund-015',
    topicId: 'parameters-arguments',
    subtopic: 'Functions',
    difficulty: 'advanced',
    questionType: 'code_output',
    questionText: 'What is the output of the following function calls with a default mutable argument?',
    codeSnippet: 'def append_item(val, items=[]):\n    items.append(val)\n    return items\n\nprint(append_item(1))\nprint(append_item(2))',
    options: [
      '[1]\n[1, 2]',
      '[1]\n[2]',
      '[1]\n[1]',
      '[1, 2]\n[1, 2]'
    ],
    correctAnswer: '[1]\n[1, 2]',
    expectedOutput: '[1]\n[1, 2]',
    explanation: 'In Python, default parameter expressions are evaluated ONCE when the function definition is executed, NOT each time the function is called. The same list object `items` is retained across subsequent calls. Appending 1 makes it `[1]`, and the second call appends 2 to the same list, giving `[1, 2]`.',
    incorrectExplanations: {
      '[1]\n[2]': 'This is what beginners expect, but default mutable arguments persist across calls in Python.',
      '[1]\n[1]': 'The second call appends 2 to the existing list.',
      '[1, 2]\n[1, 2]': 'The first call prints [1] before the second call happens.'
    },
    hint: 'Default argument expressions in Python are evaluated once when the function is defined.',
    tags: ['functions', 'mutable-defaults', 'gotcha'],
    isVerified: true
  }
];
