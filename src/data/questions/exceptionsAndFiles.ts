import { RawQuestion } from '../../types/question';

export const EXCEPTIONS_AND_FILES_QUESTIONS: RawQuestion[] = [
  // 1. try-except-else-finally lifecycle
  {
    id: 'exc-001',
    topicId: 'exception-handling',
    subtopic: 'else Clause in try-except',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is printed by running the following try-except-else-finally block?',
    codeSnippet: 'result = []\ntry:\n    val = 10 / 2\nexcept ZeroDivisionError:\n    result.append("except")\nelse:\n    result.append("else")\nfinally:\n    result.append("finally")\n\nprint(" ".join(result))',
    options: ['else finally', 'except finally', 'else', 'finally'],
    correctAnswer: 'else finally',
    expectedOutput: 'else finally',
    explanation: 'In Python, the `else` block executes only if NO exception was raised in the `try` block. Since `10 / 2` succeeds without error, `"else"` is appended. The `finally` block ALWAYS executes regardless of exceptions, appending `"finally"`. Thus `"else finally"` is printed.',
    incorrectExplanations: {
      'except finally': 'No ZeroDivisionError occurred, so the except block was skipped.',
      'else': 'The finally block always executes, even when no exception occurs.',
      'finally': 'The else clause runs whenever the try block succeeds without raising an exception.'
    },
    hint: 'Remember: the else clause executes when no error occurs; finally always executes.',
    tags: ['exceptions', 'try-except', 'else-clause', 'finally'],
    isVerified: true
  },
  // 2. BaseException vs Exception for catching
  {
    id: 'exc-002',
    topicId: 'exception-handling',
    subtopic: 'Hierarchy',
    difficulty: 'intermediate',
    questionType: 'single_choice',
    questionText: 'Why is it recommended in Python to write `except Exception:` instead of `except BaseException:` or bare `except:`?',
    options: [
      'Catching BaseException intercepts KeyboardInterrupt and SystemExit, preventing users from stopping the program with Ctrl+C',
      'BaseException cannot be caught by any try-except statement in Python 3',
      'Exception is a C-level class while BaseException is purely an abstract documentation class',
      'The compiler raises a DeprecationWarning if BaseException is caught'
    ],
    correctAnswer: 'Catching BaseException intercepts KeyboardInterrupt and SystemExit, preventing users from stopping the program with Ctrl+C',
    explanation: '`BaseException` is the common base class of ALL exceptions, including `KeyboardInterrupt` (Ctrl+C) and `SystemExit` (`sys.exit()`). Standard application errors inherit from `Exception`. Catching `Exception` prevents trapping system signals that exit the script.',
    incorrectExplanations: {
      'BaseException cannot be caught by any try-except statement in Python 3': 'BaseException can be caught, which is why broad catching causes issues.',
      'Exception is a C-level class while BaseException is purely an abstract documentation class': 'Both are concrete built-in exception classes in the runtime.',
      'The compiler raises a DeprecationWarning if BaseException is caught': 'No warning is emitted by Python.'
    },
    hint: 'Think about what signal is sent when you press Ctrl+C in your terminal.',
    tags: ['exceptions', 'base-exception', 'best-practices'],
    isVerified: true
  },
  // 3. Custom exception class
  {
    id: 'exc-003',
    topicId: 'exception-handling',
    subtopic: 'Custom Exceptions',
    difficulty: 'beginner',
    questionType: 'single_choice',
    questionText: 'When creating a custom user-defined exception class in Python, which base class should you inherit from?',
    options: [
      'Exception',
      'BaseException',
      'error',
      'Throwable'
    ],
    correctAnswer: 'Exception',
    explanation: 'PEP 8 and the official Python docs dictate that user-defined exceptions should derive from `Exception` (or a relevant standard subclass like `ValueError`), never directly from `BaseException`.',
    incorrectExplanations: {
      'BaseException': 'Reserved for system-exiting exceptions like KeyboardInterrupt and SystemExit.',
      'error': 'There is no built-in lowercase error base class in Python.',
      'Throwable': 'Throwable is a Java language construct, not Python.'
    },
    hint: 'Inherit from the standard class that all application-level errors derive from.',
    tags: ['exceptions', 'custom-exceptions', 'inheritance'],
    isVerified: true
  },
  // 4. File handling with 'with' context manager
  {
    id: 'exc-004',
    topicId: 'file-handling',
    subtopic: 'Context Manager',
    difficulty: 'beginner',
    questionType: 'single_choice',
    questionText: 'What is the primary advantage of using `with open("data.txt", "r") as f:` over manual `f = open(...)` and `f.close()`?',
    options: [
      'The file is guaranteed to be closed automatically even if an exception is raised inside the block',
      'It speeds up read operations by bypassing the operating system buffer cache',
      'It automatically converts all file contents to JSON format',
      'It encrypts file contents during writing'
    ],
    correctAnswer: 'The file is guaranteed to be closed automatically even if an exception is raised inside the block',
    explanation: 'The `with` statement leverages Python\'s context management protocol (`__enter__` and `__exit__`). Even if an unhandled exception or early return occurs inside the block, `__exit__` guarantees the file descriptor is closed properly.',
    incorrectExplanations: {
      'It speeds up read operations by bypassing the operating system buffer cache': 'with statements manage resource lifetimes, not OS disk I/O caching.',
      'It automatically converts all file contents to JSON format': 'Reading still returns raw str or bytes.',
      'It encrypts file contents during writing': 'No encryption is performed automatically.'
    },
    hint: 'Consider what happens to the open file if code crashes inside the block.',
    tags: ['files', 'context-manager', 'with-statement'],
    isVerified: true
  },
  // 5. File modes: 'w' vs 'a'
  {
    id: 'exc-005',
    topicId: 'file-handling',
    subtopic: 'Open Modes',
    difficulty: 'beginner',
    questionType: 'single_choice',
    questionText: 'What happens if you open an existing file in `"w"` mode versus `"a"` mode in Python?',
    options: [
      '"w" truncates (erases) the file contents before writing, whereas "a" appends new data to the end',
      '"w" opens for read-only, while "a" opens for write-only',
      '"a" creates a new file if missing, while "w" raises FileNotFoundError',
      'Both modes behave identically in Python 3'
    ],
    correctAnswer: '"w" truncates (erases) the file contents before writing, whereas "a" appends new data to the end',
    explanation: 'Mode `"w"` opens for writing and truncates existing content to 0 bytes. Mode `"a"` (append) opens for writing and positions the file pointer at the end of the file, preserving existing content.',
    incorrectExplanations: {
      '"w" opens for read-only, while "a" opens for write-only': 'Mode "r" is read-only; "w" is write-only.',
      '"a" creates a new file if missing, while "w" raises FileNotFoundError': 'Both "w" and "a" automatically create the file if it does not already exist.',
      'Both modes behave identically in Python 3': 'They have opposite effects on existing file contents.'
    },
    hint: '"w" stands for write (overwrite), while "a" stands for append.',
    tags: ['files', 'file-modes', 'io'],
    isVerified: true
  },
  // 6. JSON serialization: json.loads vs json.dumps
  {
    id: 'exc-006',
    topicId: 'working-with-json',
    subtopic: 'loads vs dumps',
    difficulty: 'beginner',
    questionType: 'single_choice',
    questionText: 'What is the difference between `json.dumps()` and `json.loads()` in Python\'s `json` module?',
    options: [
      'json.dumps() serializes a Python object into a JSON string; json.loads() parses a JSON string into a Python object',
      'json.dumps() reads from a file; json.loads() writes to a file',
      'json.loads() is for Python 2; json.dumps() is for Python 3',
      'json.dumps() converts dictionaries to XML strings'
    ],
    correctAnswer: 'json.dumps() serializes a Python object into a JSON string; json.loads() parses a JSON string into a Python object',
    explanation: 'The "s" in `dumps` and `loads` stands for "string": `dumps` = "dump to string" (serialization), `loads` = "load from string" (deserialization). `dump` and `load` (without "s") read and write directly to file streams.',
    incorrectExplanations: {
      'json.dumps() reads from a file; json.loads() writes to a file': 'json.dump and json.load operate on file-like objects.',
      'json.loads() is for Python 2; json.dumps() is for Python 3': 'Both functions are standard in Python 2 and Python 3.',
      'json.dumps() converts dictionaries to XML strings': 'The json module handles JSON exclusively.'
    },
    hint: 'Think of "dump string" (object -> string) versus "load string" (string -> object).',
    tags: ['json', 'serialization', 'dumps', 'loads'],
    isVerified: true
  },
  // 7. json.loads output type
  {
    id: 'exc-007',
    topicId: 'working-with-json',
    subtopic: 'Parsing JSON Types',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What is the output of inspecting the type of `data` parsed with `json.loads`?',
    codeSnippet: 'import json\nraw = \'{"active": true, "count": 10}\'\ndata = json.loads(raw)\nprint(data["active"] is True)',
    options: ['True', 'False', '"true"', 'AttributeError'],
    correctAnswer: 'True',
    expectedOutput: 'True',
    explanation: 'Python\'s `json.loads` deserializes the JSON boolean `true` directly into the Python singleton `True`. Therefore, `data["active"] is True` evaluates to `True`.',
    incorrectExplanations: {
      'False': 'JSON true maps to Python True, not False.',
      '"true"': 'JSON booleans are converted to Python bool instances, not strings.',
      'AttributeError': 'data is a standard Python dict with key "active".'
    },
    hint: 'JSON true converts to Python boolean True.',
    tags: ['json', 'data-types', 'parsing'],
    isVerified: true
  }
];
