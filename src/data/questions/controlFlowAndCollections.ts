import { RawQuestion } from '../../types/question';

export const CONTROL_FLOW_AND_COLLECTIONS_QUESTIONS: RawQuestion[] = [
  // 1. Ternary conditional expression
  {
    id: 'cf-001',
    topicId: 'if-elif-else',
    subtopic: 'Conditional Expressions',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What is the value of `status` after running this code?',
    codeSnippet: 'age = 17\nstatus = "adult" if age >= 18 else "minor"\nprint(status)',
    options: ['minor', 'adult', 'True', 'SyntaxError'],
    correctAnswer: 'minor',
    expectedOutput: 'minor',
    explanation: 'Python\'s ternary conditional expression syntax is `true_val if condition else false_val`. Since `age >= 18` is `False` (17 < 18), the `else` expression `"minor"` is evaluated and assigned.',
    incorrectExplanations: {
      'adult': 'age is 17, which is strictly less than 18.',
      'True': 'The ternary expression returns either "adult" or "minor", not a boolean.',
      'SyntaxError': '`x if cond else y` is standard Python ternary syntax.'
    },
    hint: 'Evaluate whether the condition between if and else is met to see which branch executes.',
    tags: ['ternary', 'conditions', 'if-else'],
    isVerified: true
  },
  // 2. range() step and bounds
  {
    id: 'cf-002',
    topicId: 'range-function',
    subtopic: 'Sequences',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What does `list(range(2, 10, 3))` produce?',
    codeSnippet: 'print(list(range(2, 10, 3)))',
    options: ['[2, 5, 8]', '[2, 5, 8, 11]', '[3, 6, 9]', '[2, 4, 6, 8]'],
    correctAnswer: '[2, 5, 8]',
    expectedOutput: '[2, 5, 8]',
    explanation: '`range(start, stop, step)` generates integers starting at `start` (2), stepping by 3, up to but not including `stop` (10). 2, 2+3=5, 5+3=8. The next step (11) is >= 10, so it terminates.',
    incorrectExplanations: {
      '[2, 5, 8, 11]': '11 is greater than the stop value 10.',
      '[3, 6, 9]': 'The sequence starts at 2, not 3.',
      '[2, 4, 6, 8]': 'The step is 3, not 2.'
    },
    hint: 'Recall how range handles the start value, upper bound exclusion, and step increment.',
    tags: ['range', 'loops', 'arithmetic'],
    isVerified: true
  },
  // 3. List append vs extend
  {
    id: 'col-001',
    topicId: 'lists',
    subtopic: 'Methods',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What is the output of the following list operations?',
    codeSnippet: 'a = [1, 2]\na.append([3, 4])\nb = [1, 2]\nb.extend([3, 4])\nprint(len(a), len(b))',
    options: ['3 4', '4 4', '3 3', '4 3'],
    correctAnswer: '3 4',
    expectedOutput: '3 4',
    explanation: '`append(x)` adds its argument as a single element, so `a` becomes `[1, 2, [3, 4]]` (length 3). `extend(iterable)` unpacks the iterable and appends each element individually, so `b` becomes `[1, 2, 3, 4]` (length 4).',
    incorrectExplanations: {
      '4 4': 'append adds the list [3, 4] as one nested item.',
      '3 3': 'extend adds both 3 and 4, increasing length to 4.',
      '4 3': 'a has length 3 and b has length 4.'
    },
    hint: 'Consider whether each method adds its argument as a single element or unpacks its items.',
    tags: ['lists', 'append', 'extend'],
    isVerified: true
  },
  // 4. List comprehension with condition
  {
    id: 'col-002',
    topicId: 'comprehensions',
    subtopic: 'Comprehensions',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What is the output of this list comprehension?',
    codeSnippet: 'squares = [x * x for x in range(5) if x % 2 == 0]\nprint(squares)',
    options: ['[0, 4, 16]', '[1, 9]', '[0, 1, 4, 9, 16]', '[4, 16]'],
    correctAnswer: '[0, 4, 16]',
    expectedOutput: '[0, 4, 16]',
    explanation: '`range(5)` generates 0, 1, 2, 3, 4. The filter `if x % 2 == 0` keeps even numbers: 0, 2, 4. Squaring them yields 0*0=0, 2*2=4, and 4*4=16.',
    incorrectExplanations: {
      '[1, 9]': 'Those are odd numbers squared.',
      '[0, 1, 4, 9, 16]': 'This would be without the if filter.',
      '[4, 16]': '0 is even (0 % 2 == 0), so 0*0=0 is included.'
    },
    hint: 'Trace which numbers in the range meet the modulus condition before the expression is computed.',
    tags: ['comprehensions', 'lists', 'filtering'],
    isVerified: true
  },
  // 5. Dictionary get with default
  {
    id: 'col-003',
    topicId: 'dictionaries',
    subtopic: 'Safe Access',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What does this code print?',
    codeSnippet: 'config = {"timeout": 30}\nprint(config.get("retries", 3), config.get("timeout", 10))',
    options: ['3 30', 'None 30', '3 10', 'KeyError: retries'],
    correctAnswer: '3 30',
    expectedOutput: '3 30',
    explanation: '`dict.get(key, default)` returns the value if `key` exists in the dict; otherwise it returns `default`. "retries" is missing so it returns 3. "timeout" exists with value 30, so its existing value 30 is returned (ignoring the fallback 10).',
    incorrectExplanations: {
      'None 30': 'A default value of 3 was specified for retries, so 3 is returned instead of None.',
      '3 10': '"timeout" exists in the dictionary, so 30 is used, not the fallback 10.',
      'KeyError: retries': 'get() never raises KeyError for missing keys.'
    },
    hint: 'Look at whether the requested keys are already defined in the dictionary or require the fallback.',
    tags: ['dictionaries', 'get', 'defaults'],
    isVerified: true
  },
  // 6. Set operations
  {
    id: 'col-004',
    topicId: 'sets',
    subtopic: 'Set Mathematics',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What is the result of set intersection `a & b`?',
    codeSnippet: 'a = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\nprint(sorted(list(a & b)))',
    options: ['[3, 4]', '[1, 2, 3, 4, 5, 6]', '[1, 2]', '[5, 6]'],
    correctAnswer: '[3, 4]',
    expectedOutput: '[3, 4]',
    explanation: 'The `&` operator computes set intersection (elements present in BOTH set `a` and set `b`). The numbers present in both sets are 3 and 4.',
    incorrectExplanations: {
      '[1, 2, 3, 4, 5, 6]': 'That would be union `a | b`.',
      '[1, 2]': 'That would be difference `a - b`.',
      '[5, 6]': 'That would be difference `b - a`.'
    },
    hint: 'Think about which mathematical set operation the ampersand represents.',
    tags: ['sets', 'intersection', 'operators'],
    isVerified: true
  },
  // 7. Tuples single element comma
  {
    id: 'col-005',
    topicId: 'tuples',
    subtopic: 'Syntax',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What are the types of `x` and `y` in this code?',
    codeSnippet: 'x = (42)\ny = (42,)\nprint(type(x).__name__, type(y).__name__)',
    options: ['int tuple', 'tuple tuple', 'int int', 'tuple int'],
    correctAnswer: 'int tuple',
    expectedOutput: 'int tuple',
    explanation: 'Parentheses alone do not create a tuple—they denote operator grouping. To create a single-element tuple in Python, a trailing comma is required: `(42,)`. Without the comma, `(42)` is simply the integer `42`.',
    incorrectExplanations: {
      'tuple tuple': '(42) without a comma is just an integer surrounded by parentheses.',
      'int int': 'The comma in (42,) makes y a tuple.',
      'tuple int': 'x is the int, y is the tuple.'
    },
    hint: 'Consider what punctuation distinguishes parentheses used for grouping from parentheses creating a tuple.',
    tags: ['tuples', 'syntax', 'types'],
    isVerified: true
  },
  // 8. Tuple immutability error
  {
    id: 'col-006',
    topicId: 'tuples',
    subtopic: 'Immutability',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What error occurs when attempting item assignment on a tuple?',
    codeSnippet: 'point = (10, 20)\npoint[0] = 15',
    options: [
      'TypeError: \'tuple\' object does not support item assignment',
      'AttributeError: tuple has no write attribute',
      'ValueError: cannot reassign immutable coordinate',
      'IndexError: tuple index out of range'
    ],
    correctAnswer: 'TypeError: \'tuple\' object does not support item assignment',
    expectedOutput: 'TypeError: \'tuple\' object does not support item assignment',
    explanation: 'Tuples are immutable sequence objects in Python. Attempting to assign to an element index raises `TypeError: \'tuple\' object does not support item assignment`.',
    incorrectExplanations: {
      'AttributeError: tuple has no write attribute': 'Item assignment uses __setitem__, which raises TypeError for tuples.',
      'ValueError: cannot reassign immutable coordinate': 'Python raises TypeError.',
      'IndexError: tuple index out of range': 'Index 0 is valid, but the object is immutable.'
    },
    hint: 'Recall what exception Python raises when attempting to alter an element of an immutable sequence.',
    tags: ['tuples', 'immutability', 'TypeError'],
    isVerified: true
  },
  // 9. Unpacking with asterisk
  {
    id: 'col-007',
    topicId: 'tuples',
    subtopic: 'Unpacking',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What does this extended sequence unpacking produce?',
    codeSnippet: 'first, *middle, last = [1, 2, 3, 4, 5]\nprint(middle)',
    options: ['[2, 3, 4]', '(2, 3, 4)', '[1, 2, 3, 4]', 'SyntaxError'],
    correctAnswer: '[2, 3, 4]',
    expectedOutput: '[2, 3, 4]',
    explanation: 'In Python 3 extended iterable unpacking (PEP 3132), `*middle` captures all intermediate elements as a list. `first` captures 1, `last` captures 5, and `middle` is `[2, 3, 4]`.',
    incorrectExplanations: {
      '(2, 3, 4)': 'The starred target in unpacking is always assigned a list, not a tuple.',
      '[1, 2, 3, 4]': 'first captures 1.',
      'SyntaxError': 'Extended iterable unpacking has been supported since Python 3.0.'
    },
    hint: 'Think about what sequence type Python constructs to collect items marked with an unpacking asterisk.',
    tags: ['unpacking', 'asterisk', 'python3'],
    isVerified: true
  },
  // 10. *args and **kwargs
  {
    id: 'func-001',
    topicId: 'parameters-arguments',
    subtopic: 'Variable Arguments',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What types are received by `args` and `kwargs` inside a function body?',
    codeSnippet: 'def demo(*args, **kwargs):\n    print(type(args).__name__, type(kwargs).__name__)\n\ndemo(1, 2, a=3, b=4)',
    options: ['tuple dict', 'list dict', 'tuple list', 'list list'],
    correctAnswer: 'tuple dict',
    expectedOutput: 'tuple dict',
    explanation: 'In Python function signatures, `*args` packs variable positional arguments into a `tuple`, while `**kwargs` packs variable keyword arguments into a `dict`.',
    incorrectExplanations: {
      'list dict': 'args is packed into an immutable tuple, not a list.',
      'tuple list': 'kwargs is a dictionary of name-value pairs, not a list.',
      'list list': 'args is a tuple, and kwargs is a dict.'
    },
    hint: 'Recall the collection types Python uses to gather arbitrary positional arguments versus named keyword arguments.',
    tags: ['functions', 'args', 'kwargs'],
    isVerified: true
  }
];
