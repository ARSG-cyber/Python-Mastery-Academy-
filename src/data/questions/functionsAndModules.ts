import { RawQuestion } from '../../types/question';

export const FUNCTIONS_AND_MODULES_QUESTIONS: RawQuestion[] = [
  // 1. Mutable default argument pitfall
  {
    id: 'fn-001',
    topicId: 'parameters-arguments',
    subtopic: 'Default Arguments',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is the output of calling this function twice as shown?',
    codeSnippet: 'def add_item(val, items=[]):\n    items.append(val)\n    return items\n\nprint(add_item(1))\nprint(add_item(2))',
    options: ['[1] and [1, 2]', '[1] and [2]', '[1] and [[1], 2]', 'TypeError'],
    correctAnswer: '[1] and [1, 2]',
    expectedOutput: '[1]\n[1, 2]',
    explanation: 'Default parameter values in Python are evaluated once when the function definition is executed, NOT each time the function is called. Because the default list `items` is a mutable object created once, subsequent calls without providing an argument mutate the exact same list instance.',
    incorrectExplanations: {
      '[1] and [2]': 'This would only occur if a new list were instantiated on every call, which requires `items=None` idiom.',
      '[1] and [[1], 2]': 'append(2) places the number 2 at the end of the existing list [1], producing [1, 2].',
      'TypeError': 'Default arguments are valid Python syntax.'
    },
    hint: 'Think about when default parameter values are created in Python: at definition time or at call time?',
    tags: ['functions', 'mutable-default', 'parameters', 'pitfall'],
    isVerified: true
  },
  // 2. Unpacking *args and **kwargs
  {
    id: 'fn-002',
    topicId: 'parameters-arguments',
    subtopic: 'Variable Arguments',
    difficulty: 'beginner',
    questionType: 'single_choice',
    questionText: 'Inside a function definition `def calc(*args, **kwargs):`, what are the data types of `args` and `kwargs`?',
    options: [
      'args is a tuple, kwargs is a dict',
      'args is a list, kwargs is a dict',
      'args is a list, kwargs is a tuple',
      'Both args and kwargs are lists'
    ],
    correctAnswer: 'args is a tuple, kwargs is a dict',
    explanation: 'Python packs positional arguments collected by `*args` into an immutable `tuple`. Keyword arguments collected by `**kwargs` are packed into a standard `dict` mapping argument names to values.',
    incorrectExplanations: {
      'args is a list, kwargs is a dict': 'args is an immutable tuple, not a mutable list.',
      'args is a list, kwargs is a tuple': 'kwargs receives key-value keyword bindings, making dict the natural container.',
      'Both args and kwargs are lists': 'Python uses tuple for positional args and dict for keyword args.'
    },
    hint: 'Positional arguments form an immutable sequence, while keyword arguments map keys to values.',
    tags: ['functions', 'args', 'kwargs', 'parameters'],
    isVerified: true
  },
  // 3. Return multiple values
  {
    id: 'fn-003',
    topicId: 'return-values',
    subtopic: 'Multiple Returns',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What is the type of the value returned by `get_coords()`?',
    codeSnippet: 'def get_coords():\n    x = 10\n    y = 20\n    return x, y\n\nresult = get_coords()\nprint(type(result).__name__)',
    options: ['tuple', 'list', 'int', 'generator'],
    correctAnswer: 'tuple',
    expectedOutput: 'tuple',
    explanation: 'In Python, separating expressions with commas in a return statement (e.g. `return x, y`) automatically constructs and returns a tuple (tuple packing).',
    incorrectExplanations: {
      'list': 'Lists require explicit square brackets `[x, y]`.',
      'int': 'Comma separation produces a composite tuple, not an individual integer.',
      'generator': 'Generators are created with `yield`, not comma-separated returns.'
    },
    hint: 'Recall what Python creates when you separate values with commas without brackets.',
    tags: ['functions', 'return', 'tuple-packing'],
    isVerified: true
  },
  // 4. Default return value when omitted
  {
    id: 'fn-004',
    topicId: 'return-values',
    subtopic: 'Implicit Return',
    difficulty: 'beginner',
    questionType: 'single_choice',
    questionText: 'If a Python function does not encounter an explicit `return` statement, what does it return by default?',
    options: ['None', '0', 'False', 'An empty string ""'],
    correctAnswer: 'None',
    explanation: 'Python functions that fall off the end without hitting a `return` statement or that use a bare `return` implicitly return the singleton object `None`.',
    incorrectExplanations: {
      '0': 'Python does not return numeric zero by default.',
      'False': 'None evaluates to falsy in boolean contexts, but the returned value is explicitly None.',
      'An empty string ""': 'No string is returned.'
    },
    hint: 'Python has a unique singleton representing the absence of a value.',
    tags: ['functions', 'return', 'none'],
    isVerified: true
  },
  // 5. LEGB Scope resolution
  {
    id: 'fn-005',
    topicId: 'scope',
    subtopic: 'LEGB Rule',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is printed by running the following code?',
    codeSnippet: 'x = "global"\ndef outer():\n    x = "enclosing"\n    def inner():\n        x = "local"\n        return x\n    return inner()\n\nprint(outer())',
    options: ['local', 'enclosing', 'global', 'UnboundLocalError'],
    correctAnswer: 'local',
    expectedOutput: 'local',
    explanation: 'Python resolves names using the LEGB rule (Local -> Enclosing -> Global -> Built-in). Inside `inner()`, `x` is defined locally, so the local binding `"local"` is returned immediately.',
    incorrectExplanations: {
      'enclosing': 'The enclosing scope is checked only if `x` is not defined locally.',
      'global': 'The global scope is checked after Local and Enclosing scopes.',
      'UnboundLocalError': 'x is assigned locally before being returned, so no UnboundLocalError occurs.'
    },
    hint: 'Follow the LEGB resolution order starting from the innermost scope.',
    tags: ['scope', 'legb', 'functions'],
    isVerified: true
  },
  // 6. Global keyword
  {
    id: 'fn-006',
    topicId: 'scope',
    subtopic: 'Global Keyword',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is the output of running this script?',
    codeSnippet: 'count = 0\ndef increment():\n    global count\n    count += 1\n\nincrement()\nincrement()\nprint(count)',
    options: ['2', '0', '1', 'UnboundLocalError'],
    correctAnswer: '2',
    expectedOutput: '2',
    explanation: 'The `global count` statement informs the compiler that `count` refers to the module-level global variable. Modifying `count` within `increment()` updates the global variable from 0 to 1, then to 2.',
    incorrectExplanations: {
      '0': 'Without global count, modifying count would fail, but with global it mutates the global variable.',
      '1': 'increment() is called twice, incrementing count twice.',
      'UnboundLocalError': 'UnboundLocalError would happen if global count were omitted.'
    },
    hint: 'Notice the global statement at the top of the function.',
    tags: ['scope', 'global', 'variables'],
    isVerified: true
  },
  // 7. Lambda expression syntax
  {
    id: 'fn-007',
    topicId: 'lambda-functions',
    subtopic: 'Syntax',
    difficulty: 'beginner',
    questionType: 'single_choice',
    questionText: 'Which statement correctly defines an anonymous lambda function that squares a number `x`?',
    options: [
      'lambda x: x ** 2',
      'def lambda(x): return x ** 2',
      'lambda (x) -> x ** 2',
      'x => x ** 2'
    ],
    correctAnswer: 'lambda x: x ** 2',
    explanation: 'Python lambdas use the syntax `lambda arguments: expression`. The return keyword is implicit; the single evaluated expression is returned automatically.',
    incorrectExplanations: {
      'def lambda(x): return x ** 2': 'def and lambda cannot be combined, and lambda is a reserved keyword.',
      'lambda (x) -> x ** 2': 'Python uses colons rather than arrow operators -> for lambdas.',
      'x => x ** 2': '=> is JavaScript arrow function syntax, not valid Python.'
    },
    hint: 'Python lambda syntax begins with the keyword lambda followed by parameters, a colon, and the expression.',
    tags: ['lambda', 'functions', 'syntax'],
    isVerified: true
  },
  // 8. sorted() with lambda key
  {
    id: 'fn-008',
    topicId: 'lambda-functions',
    subtopic: 'Sorting Key',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is the output of sorting this list of tuples by the second element?',
    codeSnippet: 'data = [(1, "b"), (2, "a"), (3, "c")]\nresult = sorted(data, key=lambda item: item[1])\nprint([x[0] for x in result])',
    options: ['[2, 1, 3]', '[1, 2, 3]', '[3, 2, 1]', '[2, 3, 1]'],
    correctAnswer: '[2, 1, 3]',
    expectedOutput: '[2, 1, 3]',
    explanation: 'The sort key extracts the second element (`item[1]`): "a", "b", "c". Sorting by this key orders the tuples as `(2, "a")`, `(1, "b")`, `(3, "c")`. Extracting `x[0]` gives `[2, 1, 3]`.',
    incorrectExplanations: {
      '[1, 2, 3]': 'This is the order if sorted by the first element item[0], not item[1].',
      '[3, 2, 1]': 'This would be reverse sorting.',
      '[2, 3, 1]': '"b" precedes "c" alphabetically, so (1, "b") comes before (3, "c").'
    },
    hint: 'Compare the alphabetical ordering of the letters at index 1: "b", "a", "c".',
    tags: ['lambda', 'sorting', 'key-function'],
    isVerified: true
  },
  // 9. __name__ == '__main__' idiom
  {
    id: 'fn-009',
    topicId: 'modules-imports',
    subtopic: 'Entry Point',
    difficulty: 'intermediate',
    questionType: 'single_choice',
    questionText: 'What is the purpose of the `if __name__ == "__main__":` idiom in a Python script?',
    options: [
      'It allows code to execute when run as the top-level script, but not when imported as a module',
      'It defines the main() entry point required by the Python interpreter for all programs',
      'It registers the module in sys.modules before any imports occur',
      'It prevents any functions in the file from being called by other modules'
    ],
    correctAnswer: 'It allows code to execute when run as the top-level script, but not when imported as a module',
    explanation: 'When a Python file is run directly (e.g. `python script.py`), Python sets the built-in variable `__name__` to `"__main__"`. When imported by another module, `__name__` is set to the module\'s name instead, preventing the conditional block from executing during imports.',
    incorrectExplanations: {
      'It defines the main() entry point required by the Python interpreter for all programs': 'Python scripts run line-by-line from top to bottom; a main() function is conventional but never required.',
      'It registers the module in sys.modules before any imports occur': 'Python handles sys.modules registration automatically.',
      'It prevents any functions in the file from being called by other modules': 'Functions defined in the file remain fully accessible when imported.'
    },
    hint: 'Think about how a script behaves when executed directly versus when another file imports it.',
    tags: ['modules', 'imports', 'dunder-name'],
    isVerified: true
  },
  // 10. zip() and dict creation
  {
    id: 'fn-010',
    topicId: 'built-in-functions',
    subtopic: 'zip()',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What is the output of combining two lists with `zip()` into a dictionary?',
    codeSnippet: 'keys = ["a", "b", "c"]\nvals = [1, 2, 3]\nd = dict(zip(keys, vals))\nprint(d["b"])',
    options: ['2', '1', '3', 'KeyError'],
    correctAnswer: '2',
    expectedOutput: '2',
    explanation: '`zip(keys, vals)` pairs elements at corresponding indices into tuples `("a", 1), ("b", 2), ("c", 3)`. Passing this iterable of key-value pairs into `dict()` creates `{"a": 1, "b": 2, "c": 3}`. Accessing `d["b"]` returns `2`.',
    incorrectExplanations: {
      '1': 'd["a"] is 1.',
      '3': 'd["c"] is 3.',
      'KeyError': '"b" is present as a key in the created dictionary.'
    },
    hint: 'zip pairs up elements by position: keys[1] pairs with vals[1].',
    tags: ['builtins', 'zip', 'dict'],
    isVerified: true
  }
];
