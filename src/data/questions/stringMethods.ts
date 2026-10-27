import { Question } from '../../types/question';

export const STRING_QUESTIONS: Question[] = [
  // 1. Immutability
  {
    id: 'str-001',
    topicId: 'string-methods',
    subtopic: 'Immutability',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What is the output of the following Python code?',
    codeSnippet: 'text = "python"\ntext.upper()\nprint(text)',
    options: ['PYTHON', 'python', 'None', 'AttributeError'],
    correctAnswer: 'python',
    expectedOutput: 'python',
    explanation: 'Python strings are strictly immutable. Calling `text.upper()` returns a new string "PYTHON", but it does NOT modify the original `text` variable in-place. Because the return value was not reassigned, `text` remains "python".',
    incorrectExplanations: {
      'PYTHON': 'This would only be true if strings were mutable or if the line was `text = text.upper()`.',
      'None': 'Methods like list.sort() return None because they mutate in place, but string methods return new strings.',
      'AttributeError': 'upper() is a valid string method, so no error is raised.'
    },
    hint: 'Remember that all string methods in Python return a new string rather than modifying the original.',
    tags: ['immutability', 'upper', 'basics'],
    isVerified: true
  },
  // 2. len() vs .len()
  {
    id: 'str-002',
    topicId: 'string-methods',
    subtopic: 'Built-in vs Method',
    difficulty: 'beginner',
    questionType: 'single_choice',
    questionText: 'Which of the following is the correct, valid Python syntax to obtain the length of a string `s = "hello"`?',
    options: ['len(s)', 's.len()', 's.length()', 's.size()'],
    correctAnswer: 'len(s)',
    explanation: 'In Python, length is obtained via the built-in function `len()`, which calls the object\'s `__len__()` special method. Strings do not have a `.len()`, `.length()`, or `.size()` method.',
    incorrectExplanations: {
      's.len()': 'str has no `len()` method; calling this raises an AttributeError.',
      's.length()': 'JavaScript and Java use .length, but Python uses the built-in len() function.',
      's.size()': 'Libraries like pandas or NumPy use .size or .shape, but standard Python strings do not have a .size() method.'
    },
    hint: 'Think about whether length is a built-in function or an object method in Python.',
    tags: ['len', 'built-in', 'syntax'],
    isVerified: true
  },
  // 3. find() when substring is NOT found
  {
    id: 'str-003',
    topicId: 'string-methods',
    subtopic: 'Search Methods',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What is the output of this code snippet?',
    codeSnippet: 's = "banana"\nprint(s.find("z"))',
    options: ['-1', 'False', 'None', 'ValueError: substring not found'],
    correctAnswer: '-1',
    expectedOutput: '-1',
    explanation: 'The `str.find()` method returns the lowest index where the substring is found. If the substring is not found in the string, it returns `-1`.',
    incorrectExplanations: {
      'False': 'find() returns an integer index, not a boolean.',
      'None': 'find() returns -1 on failure, not None.',
      'ValueError: substring not found': 'That is the behavior of str.index(), not str.find().'
    },
    hint: 'find() returns an integer index or a special sentinel integer if missing.',
    tags: ['find', 'search', 'return-value'],
    isVerified: true
  },
  // 4. index() vs find() difference
  {
    id: 'str-004',
    topicId: 'string-methods',
    subtopic: 'Search Methods',
    difficulty: 'intermediate',
    questionType: 'single_choice',
    questionText: 'How does `str.index()` behave differently from `str.find()` when the searched substring is NOT present?',
    options: [
      'index() raises a ValueError, whereas find() returns -1',
      'find() raises a ValueError, whereas index() returns -1',
      'index() returns None, whereas find() returns False',
      'There is no difference; index() is just an alias for find()'
    ],
    correctAnswer: 'index() raises a ValueError, whereas find() returns -1',
    explanation: 'Both methods search for the first occurrence of a substring. However, when the substring is absent, `find()` safely returns `-1`, while `index()` raises a `ValueError: substring not found`. This makes `find()` ideal when checking presence without exception handling.',
    incorrectExplanations: {
      'find() raises a ValueError, whereas index() returns -1': 'This is the exact opposite of reality.',
      'index() returns None, whereas find() returns False': 'Neither method returns None or False.',
      'There is no difference; index() is just an alias for find()': 'They differ fundamentally in their error handling.'
    },
    hint: 'One method raises an exception when the item is missing, while the other returns -1.',
    tags: ['index', 'find', 'exceptions'],
    isVerified: true
  },
  // 5. rfind() and rindex()
  {
    id: 'str-005',
    topicId: 'string-methods',
    subtopic: 'Search Methods',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What does this code print?',
    codeSnippet: 'phrase = "apple pie and apple tart"\nprint(phrase.rfind("apple"))',
    options: ['14', '0', '2', '-1'],
    correctAnswer: '14',
    expectedOutput: '14',
    explanation: '`rfind()` searches from the right (returns the highest index where the substring is found). The first "apple" starts at index 0, and the second "apple" starts at index 14. `rfind()` returns 14.',
    incorrectExplanations: {
      '0': '0 is the result of `phrase.find("apple")`, which finds the first occurrence from the left.',
      '2': '2 is the count of occurrences, not the index returned by rfind().',
      '-1': '"apple" does exist in the string, so rfind() finds it.'
    },
    hint: 'The "r" prefix in rfind stands for "right".',
    tags: ['rfind', 'search', 'indexing'],
    isVerified: true
  },
  // 6. count() method
  {
    id: 'str-006',
    topicId: 'string-methods',
    subtopic: 'Search Methods',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What is the output of the following code?',
    codeSnippet: 'word = "banana"\nprint(word.count("an"))',
    options: ['2', '3', '1', '0'],
    correctAnswer: '2',
    expectedOutput: '2',
    explanation: '`word.count("an")` counts the number of non-overlapping occurrences of the substring "an". In "banana", "an" occurs at index 1 ("b[an]ana") and index 3 ("ban[an]a"), for a total of 2.',
    incorrectExplanations: {
      '3': 'There are only 2 occurrences of "an" in "banana".',
      '1': '"an" appears twice, not once.',
      '0': '"an" is definitely present in "banana".'
    },
    hint: 'Count how many times the exact two-letter sequence "an" appears without overlapping.',
    tags: ['count', 'search'],
    isVerified: true
  },
  // 7. count() non-overlapping rule
  {
    id: 'str-007',
    topicId: 'string-methods',
    subtopic: 'Search Methods',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What does the following code print?',
    codeSnippet: 'dna = "AAAA"\nprint(dna.count("AA"))',
    options: ['2', '3', '4', '1'],
    correctAnswer: '2',
    expectedOutput: '2',
    explanation: 'In Python, `str.count()` counts non-overlapping occurrences. In "AAAA", the first "AA" is at indices 0-1, and the second non-overlapping "AA" is at indices 2-3. It does not count the overlapping occurrence at indices 1-2, so the result is 2.',
    incorrectExplanations: {
      '3': 'If overlapping substrings were counted, it would be 3. Python\'s count() strictly counts non-overlapping occurrences.',
      '4': 'There are 4 characters total, not 4 occurrences of "AA".',
      '1': 'There are two full non-overlapping pairs of "AA".'
    },
    hint: 'Python string count() never overlaps matching substrings.',
    tags: ['count', 'edge-case'],
    isVerified: true
  },
  // 8. startswith() with tuple of prefixes
  {
    id: 'str-008',
    topicId: 'string-methods',
    subtopic: 'Inspection Methods',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is the output of this code?',
    codeSnippet: 'url = "https://python.org"\nprint(url.startswith(("http://", "https://")))',
    options: ['True', 'False', 'TypeError', 'SyntaxError'],
    correctAnswer: 'True',
    expectedOutput: 'True',
    explanation: '`str.startswith()` and `str.endswith()` can take a tuple of strings as the prefix/suffix argument. If the string starts with any of the prefixes in the tuple, it returns `True`. Here, "https://python.org" starts with "https://", so it returns `True`.',
    incorrectExplanations: {
      'False': 'The string clearly begins with "https://", which is in the tuple.',
      'TypeError': 'Passing a tuple of prefixes to startswith() is fully supported in standard Python.',
      'SyntaxError': 'The syntax is completely valid.'
    },
    hint: 'startswith() accepts a tuple of candidates.',
    tags: ['startswith', 'tuple-arguments', 'inspection'],
    isVerified: true
  },
  // 9. endswith()
  {
    id: 'str-009',
    topicId: 'string-methods',
    subtopic: 'Inspection Methods',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What is the output of this code snippet?',
    codeSnippet: 'filename = "report.final.PDF"\nprint(filename.endswith(".pdf"))',
    options: ['False', 'True', 'None', 'AttributeError'],
    correctAnswer: 'False',
    expectedOutput: 'False',
    explanation: 'Python string methods are case-sensitive by default. "report.final.PDF" ends with uppercase ".PDF", which does not match lowercase ".pdf". Therefore, `endswith(".pdf")` evaluates to `False`.',
    incorrectExplanations: {
      'True': 'endswith() is case-sensitive, so ".PDF" does not match ".pdf".',
      'None': 'endswith() returns a boolean True or False.',
      'AttributeError': 'endswith() is a valid string method.'
    },
    hint: 'Is Python string comparison case-sensitive?',
    tags: ['endswith', 'case-sensitive'],
    isVerified: true
  },
  // 10. strip() character set behavior
  {
    id: 'str-010',
    topicId: 'string-methods',
    subtopic: 'Transformation Methods',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is the output of this code snippet?',
    codeSnippet: 'raw = "www.example.com"\nprint(raw.strip("cmow."))',
    options: ['example', 'example.com', '.example.', 'www.example'],
    correctAnswer: 'example',
    expectedOutput: 'example',
    explanation: 'The argument to `strip()` is treated as a set of characters to strip from both ends until a character not in the set is encountered. The set {\'c\', \'m\', \'o\', \'w\', \'.\'} strips \'w\', \'w\', \'w\', and \'.\' from the left, and \'m\', \'o\', \'c\', and \'.\' from the right, leaving "example".',
    incorrectExplanations: {
      'example.com': 'The characters \'c\', \'o\', \'m\' and \'.\' are in the argument, so they are stripped from the right end.',
      '.example.': 'The dots are in the strip set, so they are also removed.',
      'www.example': 'The \'w\' and \'.\' characters are stripped from the left end.'
    },
    hint: 'strip() treats its argument as a set of characters, not an exact substring prefix or suffix.',
    tags: ['strip', 'character-set', 'pitfall'],
    isVerified: true
  },
  // 11. lstrip() and rstrip()
  {
    id: 'str-011',
    topicId: 'string-methods',
    subtopic: 'Transformation Methods',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What is the output of the following code?',
    codeSnippet: 'text = "   Python Mastery   "\nprint(f"[{text.lstrip()}]")',
    options: ['[Python Mastery   ]', '[   Python Mastery]', '[Python Mastery]', '[   Python Mastery   ]'],
    correctAnswer: '[Python Mastery   ]',
    expectedOutput: '[Python Mastery   ]',
    explanation: '`lstrip()` only strips whitespace from the left (leading) side of the string. The trailing whitespace on the right remains untouched.',
    incorrectExplanations: {
      '[   Python Mastery]': 'That would be the result of `rstrip()`, which strips from the right.',
      '[Python Mastery]': 'That would be the result of `strip()`, which strips both sides.',
      '[   Python Mastery   ]': 'lstrip() removes the leading whitespace.'
    },
    hint: 'lstrip operates only on the leading (left) characters.',
    tags: ['lstrip', 'whitespace'],
    isVerified: true
  },
  // 12. removeprefix() vs strip()
  {
    id: 'str-012',
    topicId: 'string-methods',
    subtopic: 'Transformation Methods',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is the output of this Python 3.9+ code?',
    codeSnippet: 'url = "https://example.com"\nprint(url.removeprefix("https://"))',
    options: ['example.com', '//example.com', 'https://example.com', 'AttributeError'],
    correctAnswer: 'example.com',
    expectedOutput: 'example.com',
    explanation: '`str.removeprefix(prefix)` was introduced in Python 3.9 to safely remove an exact prefix string without the character-set stripping pitfalls of `lstrip()`. If the string begins with the prefix, it returns the rest of the string.',
    incorrectExplanations: {
      '//example.com': 'The full prefix "https://" includes the slashes, so they are removed as well.',
      'https://example.com': 'Because the string starts with "https://", it is removed.',
      'AttributeError': 'removeprefix is a standard str method in Python 3.9+.'
    },
    hint: 'removeprefix removes the exact prefix sequence if present.',
    tags: ['removeprefix', 'python3.9', 'transformation'],
    isVerified: true
  },
  // 13. removesuffix() behavior when suffix is NOT present
  {
    id: 'str-013',
    topicId: 'string-methods',
    subtopic: 'Transformation Methods',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What does this code output?',
    codeSnippet: 'name = "data_analysis.py"\nprint(name.removesuffix(".txt"))',
    options: ['data_analysis.py', 'data_analysis', 'ValueError', 'None'],
    correctAnswer: 'data_analysis.py',
    expectedOutput: 'data_analysis.py',
    explanation: 'If the string does not end with the specified suffix, `removesuffix()` returns a copy of the original string unchanged. It does not raise an error.',
    incorrectExplanations: {
      'data_analysis': 'The suffix ".txt" was not present, so nothing is stripped.',
      'ValueError': 'removesuffix does not raise an exception when the suffix is missing.',
      'None': 'String methods return strings, not None.'
    },
    hint: 'If the suffix does not match, what should happen to the original string?',
    tags: ['removesuffix', 'python3.9', 'safety'],
    isVerified: true
  },
  // 14. replace() with count parameter
  {
    id: 'str-014',
    topicId: 'string-methods',
    subtopic: 'Transformation Methods',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What is the output of the following code?',
    codeSnippet: 'text = "one fish, two fish, red fish"\nprint(text.replace("fish", "cat", 2))',
    options: [
      'one cat, two cat, red fish',
      'one cat, two cat, red cat',
      'one fish, two fish, red cat',
      'TypeError: replace takes at most 2 arguments'
    ],
    correctAnswer: 'one cat, two cat, red fish',
    expectedOutput: 'one cat, two cat, red fish',
    explanation: '`str.replace(old, new, count)` replaces at most `count` occurrences of the substring from left to right. Specifying `2` replaces only the first two instances of "fish" with "cat".',
    incorrectExplanations: {
      'one cat, two cat, red cat': 'Without the third argument (count=2), all occurrences would be replaced. With count=2, only the first two are replaced.',
      'one fish, two fish, red cat': 'Replacements proceed from left to right, not right to left.',
      'TypeError: replace takes at most 2 arguments': 'replace() takes up to 3 arguments: old, new, and count.'
    },
    hint: 'The third parameter to replace() limits the maximum number of occurrences replaced from left to right.',
    tags: ['replace', 'count-parameter'],
    isVerified: true
  },
  // 15. split() default behavior (whitespace)
  {
    id: 'str-015',
    topicId: 'string-methods',
    subtopic: 'Splitting and Joining',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is the output of this code snippet?',
    codeSnippet: 's = "  Python   Mastery   Academy  "\nprint(s.split())',
    options: [
      "['Python', 'Mastery', 'Academy']",
      "['', '', 'Python', '', '', 'Mastery', '', '', 'Academy', '', '']",
      "['  Python', 'Mastery', 'Academy  ']",
      "['Python Mastery Academy']"
    ],
    correctAnswer: "['Python', 'Mastery', 'Academy']",
    expectedOutput: "['Python', 'Mastery', 'Academy']",
    explanation: 'When `split()` is called with no arguments (or `sep=None`), any consecutive whitespace characters are treated as a single delimiter, and leading/trailing whitespace is discarded. Thus, it cleanly extracts non-whitespace words.',
    incorrectExplanations: {
      "['', '', 'Python', '', '', 'Mastery', '', '', 'Academy', '', '']": 'This occurs when splitting on an explicit single space `s.split(" ")`, not default `s.split()`.',
      "['  Python', 'Mastery', 'Academy  ']": 'Default split discards leading and trailing whitespace completely.',
      "['Python Mastery Academy']": 'split() divides the string into separate elements.'
    },
    hint: 'When no separator is passed to split(), how are runs of consecutive whitespace handled?',
    tags: ['split', 'whitespace', 'delimiter'],
    isVerified: true
  },
  // 16. split(" ") vs split()
  {
    id: 'str-016',
    topicId: 'string-methods',
    subtopic: 'Splitting and Joining',
    difficulty: 'intermediate',
    questionType: 'single_choice',
    questionText: 'What is the crucial difference between `text.split()` and `text.split(" ")` in Python?',
    options: [
      '`split()` groups consecutive whitespace and ignores leading/trailing spaces, while `split(" ")` splits on every single space and includes empty strings',
      '`split()` only splits on spaces, while `split(" ")` also splits on newlines and tabs',
      '`split()` returns a tuple, while `split(" ")` returns a list',
      'There is no difference; they produce identical results for all inputs'
    ],
    correctAnswer: '`split()` groups consecutive whitespace and ignores leading/trailing spaces, while `split(" ")` splits on every single space and includes empty strings',
    explanation: 'With `sep=None` (the default for `split()`), runs of whitespace (spaces, tabs, newlines) are grouped together, and empty strings are never included. When an explicit `" "` delimiter is given, every single space splits the string, which produces empty strings `\'\'` for adjacent spaces.',
    incorrectExplanations: {
      '`split()` only splits on spaces, while `split(" ")` also splits on newlines and tabs': 'Default split() handles all whitespace characters (spaces, tabs, newlines); " " only splits on spaces.',
      '`split()` returns a tuple, while `split(" ")` returns a list': 'Both methods return lists.',
      'There is no difference; they produce identical results for all inputs': 'They produce very different lists when consecutive spaces or leading spaces exist.'
    },
    hint: 'Think about how multiple adjacent spaces and tabs are treated.',
    tags: ['split', 'whitespace', 'subtle-difference'],
    isVerified: true
  },
  // 17. rsplit() with maxsplit
  {
    id: 'str-017',
    topicId: 'string-methods',
    subtopic: 'Splitting and Joining',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is the output of the following code?',
    codeSnippet: 'path = "users/admin/documents/report.pdf"\nprint(path.rsplit("/", 1))',
    options: [
      "['users/admin/documents', 'report.pdf']",
      "['users', 'admin/documents/report.pdf']",
      "['report.pdf', 'users/admin/documents']",
      "['users', 'admin', 'documents', 'report.pdf']"
    ],
    correctAnswer: "['users/admin/documents', 'report.pdf']",
    expectedOutput: "['users/admin/documents', 'report.pdf']",
    explanation: '`rsplit(sep, maxsplit)` splits from the right side. With `maxsplit=1`, it splits at the rightmost occurrence of "/", yielding the directory path and the filename.',
    incorrectExplanations: {
      "['users', 'admin/documents/report.pdf']": 'This is what `path.split("/", 1)` would produce (splitting once from the left).',
      "['report.pdf', 'users/admin/documents']": 'The elements in the resulting list remain in their original left-to-right order.',
      "['users', 'admin', 'documents', 'report.pdf']": 'maxsplit=1 limits the number of splits to 1.'
    },
    hint: 'rsplit starts splitting from the right, but list elements maintain left-to-right order.',
    tags: ['rsplit', 'maxsplit'],
    isVerified: true
  },
  // 18. splitlines() with keepends
  {
    id: 'str-018',
    topicId: 'string-methods',
    subtopic: 'Splitting and Joining',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is the output of this code snippet?',
    codeSnippet: 'poem = "Roses are red\\nViolets are blue\\n"\nprint(poem.splitlines(keepends=True))',
    options: [
      "['Roses are red\\n', 'Violets are blue\\n']",
      "['Roses are red', 'Violets are blue']",
      "['Roses are red', 'Violets are blue', '']",
      "TypeError: splitlines does not accept keepends"
    ],
    correctAnswer: "['Roses are red\\n', 'Violets are blue\\n']",
    expectedOutput: "['Roses are red\\n', 'Violets are blue\\n']",
    explanation: '`splitlines(keepends=True)` retains the newline characters (`\\n`, `\\r\\n`, etc.) at the end of each line element. When `keepends=False` (default), the line breaks are stripped.',
    incorrectExplanations: {
      "['Roses are red', 'Violets are blue']": 'That is the output when keepends is False (the default).',
      "['Roses are red', 'Violets are blue', '']": 'Unlike split("\\n"), splitlines() does not add an empty trailing string for a final newline.',
      'TypeError: splitlines does not accept keepends': 'keepends is a standard parameter of splitlines.'
    },
    hint: 'keepends=True keeps line break characters in each list item.',
    tags: ['splitlines', 'newlines', 'keepends'],
    isVerified: true
  },
  // 19. join() syntax and delimiter
  {
    id: 'str-019',
    topicId: 'string-methods',
    subtopic: 'Splitting and Joining',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What is the output of the following code?',
    codeSnippet: 'words = ["Python", "is", "awesome"]\nprint("-".join(words))',
    options: [
      'Python-is-awesome',
      '-Python-is-awesome-',
      '["Python", "-", "is", "-", "awesome"]',
      'TypeError: join must be called on the list'
    ],
    correctAnswer: 'Python-is-awesome',
    expectedOutput: 'Python-is-awesome',
    explanation: 'In Python, `join()` is a method of the delimiter string, not the list. The delimiter string `"-"` is inserted between elements of the iterable, resulting in `"Python-is-awesome"`. Delimiters are not added at the beginning or end.',
    incorrectExplanations: {
      '-Python-is-awesome-': 'Delimiters are only inserted between elements, not before the first or after the last.',
      '["Python", "-", "is", "-", "awesome"]': 'join() returns a single combined string, not a list.',
      'TypeError: join must be called on the list': 'In Python, join is a string method called as delimiter.join(iterable).'
    },
    hint: 'The delimiter is placed between adjacent items of the iterable.',
    tags: ['join', 'delimiter', 'list-to-string'],
    isVerified: true
  },
  // 20. join() on non-strings raises TypeError
  {
    id: 'str-020',
    topicId: 'string-methods',
    subtopic: 'Splitting and Joining',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What happens when this code is executed?',
    codeSnippet: 'numbers = [1, 2, 3]\nprint(", ".join(numbers))',
    options: [
      'TypeError: sequence item 0: expected str instance, int found',
      '1, 2, 3',
      '[1, 2, 3]',
      '"1, 2, 3"'
    ],
    correctAnswer: 'TypeError: sequence item 0: expected str instance, int found',
    expectedOutput: 'TypeError: sequence item 0: expected str instance, int found',
    explanation: '`str.join()` requires all elements of the iterable to be string instances (`str`). If any element is an `int`, `float`, or other non-string, Python raises a `TypeError`. To join numbers, convert them first: `", ".join(str(n) for n in numbers)`.',
    incorrectExplanations: {
      '1, 2, 3': 'Python does not automatically convert integers to strings inside join().',
      '[1, 2, 3]': 'join() never returns a list.',
      '"1, 2, 3"': 'No automatic type conversion is performed; an error is raised.'
    },
    hint: 'Does join() automatically coerce numbers to strings, or does it enforce types?',
    tags: ['join', 'TypeError', 'type-coercion'],
    isVerified: true
  },
  // 21. partition() return type and structure
  {
    id: 'str-021',
    topicId: 'string-methods',
    subtopic: 'Partitioning',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is the output of the following code?',
    codeSnippet: 'email = "alice@example.com"\nprint(email.partition("@"))',
    options: [
      "('alice', '@', 'example.com')",
      "['alice', 'example.com']",
      "('alice', 'example.com')",
      "{'user': 'alice', 'domain': 'example.com'}"
    ],
    correctAnswer: "('alice', '@', 'example.com')",
    expectedOutput: "('alice', '@', 'example.com')",
    explanation: '`str.partition(sep)` searches for the separator and splits the string at the first occurrence, returning a 3-tuple containing: (1) part before the separator, (2) the separator itself, and (3) the part after the separator.',
    incorrectExplanations: {
      "['alice', 'example.com']": 'partition returns a 3-element tuple that includes the separator.',
      "('alice', 'example.com')": 'The separator itself is always included as the middle element of the 3-tuple.',
      "{'user': 'alice', 'domain': 'example.com'}": 'partition returns a tuple, not a dictionary.'
    },
    hint: 'partition always returns a 3-element tuple containing the prefix, the separator, and the suffix.',
    tags: ['partition', '3-tuple'],
    isVerified: true
  },
  // 22. partition() when separator is NOT found
  {
    id: 'str-022',
    topicId: 'string-methods',
    subtopic: 'Partitioning',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is returned when the separator is NOT found in `partition()`?',
    codeSnippet: 'text = "hello world"\nprint(text.partition("#"))',
    options: [
      "('hello world', '', '')",
      "('', '', 'hello world')",
      "ValueError: separator not found",
      "('hello world',)"
    ],
    correctAnswer: "('hello world', '', '')",
    expectedOutput: "('hello world', '', '')",
    explanation: 'If the separator is not found, `str.partition()` returns a 3-tuple containing the original string followed by two empty strings: `(text, \'\', \'\')`. (Contrast this with `rpartition()`, which returns `(\'\', \'\', text)`).',
    incorrectExplanations: {
      "('', '', 'hello world')": 'This is what `rpartition()` returns when the separator is not found.',
      'ValueError: separator not found': 'partition() never raises an error if the separator is missing.',
      "('hello world',)": 'partition() strictly always returns a 3-tuple.'
    },
    hint: 'When separator is missing, partition puts the original string first, followed by two empty strings.',
    tags: ['partition', 'fallback', 'edge-case'],
    isVerified: true
  },
  // 23. rpartition() when separator is NOT found
  {
    id: 'str-023',
    topicId: 'string-methods',
    subtopic: 'Partitioning',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What does `rpartition()` return when the separator is NOT found?',
    codeSnippet: 'text = "python"\nprint(text.rpartition(":"))',
    options: [
      "('', '', 'python')",
      "('python', '', '')",
      "('python', ':', '')",
      "('', ':', 'python')"
    ],
    correctAnswer: "('', '', 'python')",
    expectedOutput: "('', '', 'python')",
    explanation: 'When the separator is not found, `rpartition()` returns a 3-tuple with two empty strings followed by the original string: `(\'\', \'\', text)`.',
    incorrectExplanations: {
      "('python', '', '')": 'That is the behavior of partition(), not rpartition().',
      "('python', ':', '')": 'If the separator is not found, the separator in the tuple is the empty string.',
      "('', ':', 'python')": 'The middle element is empty string when not found.'
    },
    hint: 'rpartition places the original string as the third element when the separator is absent.',
    tags: ['rpartition', 'edge-case'],
    isVerified: true
  },
  // 24. casefold() vs lower()
  {
    id: 'str-024',
    topicId: 'string-methods',
    subtopic: 'Case Conversion',
    difficulty: 'intermediate',
    questionType: 'single_choice',
    questionText: 'Why is `casefold()` preferred over `lower()` for caseless string comparisons in internationalized software?',
    options: [
      '`casefold()` implements Unicode full case-folding which handles characters like German "ß" (becoming "ss"), whereas `lower()` only handles simple lowercasing',
      '`casefold()` runs faster in CPython than `lower()`',
      '`casefold()` mutates strings in-place to save memory',
      '`lower()` is deprecated in Python 3.10+'
    ],
    correctAnswer: '`casefold()` implements Unicode full case-folding which handles characters like German "ß" (becoming "ss"), whereas `lower()` only handles simple lowercasing',
    explanation: '`casefold()` is a more aggressive lowercasing algorithm designed for caseless matching per the Unicode standard. For instance, the German lowercase letter "ß" remains "ß" under `.lower()`, but `.casefold()` converts it to "ss", allowing "der fluß".casefold() == "der fluss".casefold().',
    incorrectExplanations: {
      '`casefold()` runs faster in CPython than `lower()`': 'casefold is not about raw speed; it does more work for Unicode compatibility.',
      '`casefold()` mutates strings in-place to save memory': 'Strings are never mutated in-place in Python.',
      '`lower()` is deprecated in Python 3.10+': 'lower() is definitely not deprecated and remains widely used.'
    },
    hint: 'Think about Unicode characters in international alphabets.',
    tags: ['casefold', 'lower', 'unicode'],
    isVerified: true
  },
  // 25. capitalize() vs title()
  {
    id: 'str-025',
    topicId: 'string-methods',
    subtopic: 'Case Conversion',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What is the output of the following code?',
    codeSnippet: 'title_str = "hello WORLD"\nprint(title_str.capitalize())',
    options: ['Hello world', 'Hello WORLD', 'Hello World', 'HELLO WORLD'],
    correctAnswer: 'Hello world',
    expectedOutput: 'Hello world',
    explanation: '`str.capitalize()` capitalizes the FIRST character of the entire string and turns ALL remaining characters into lowercase. Therefore, "hello WORLD" becomes "Hello world".',
    incorrectExplanations: {
      'Hello WORLD': 'capitalize() converts all characters after the first to lowercase.',
      'Hello World': 'That would be title(), which capitalizes each word.',
      'HELLO WORLD': 'That would be upper().'
    },
    hint: 'capitalize() makes only the first character uppercase and forces all other characters to lowercase.',
    tags: ['capitalize', 'case-conversion'],
    isVerified: true
  },
  // 26. swapcase()
  {
    id: 'str-026',
    topicId: 'string-methods',
    subtopic: 'Case Conversion',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What is the output of the following code?',
    codeSnippet: 'text = "PyThOn 3.11!"\nprint(text.swapcase())',
    options: ['pYtHoN 3.11!', 'PYTHON 3.11!', 'python 3.11!', 'PYtHoN 3.11!'],
    correctAnswer: 'pYtHoN 3.11!',
    expectedOutput: 'pYtHoN 3.11!',
    explanation: '`swapcase()` inverts the case of every alphabetic character: uppercase characters become lowercase, and lowercase characters become uppercase. Non-alphabetic characters (digits, punctuation, spaces) remain unchanged.',
    incorrectExplanations: {
      'PYTHON 3.11!': 'upper() would uppercase everything, but swapcase() inverts each letter\'s case.',
      'python 3.11!': 'lower() would lowercase everything.',
      'PYtHoN 3.11!': 'Notice the first character "P" becomes lowercase "p".'
    },
    hint: 'Every uppercase letter becomes lowercase, and every lowercase letter becomes uppercase.',
    tags: ['swapcase', 'case-conversion'],
    isVerified: true
  },
  // 27. isdecimal() vs isdigit() vs isnumeric()
  {
    id: 'str-027',
    topicId: 'string-methods',
    subtopic: 'Validation Methods',
    difficulty: 'intermediate',
    questionType: 'single_choice',
    questionText: 'Which hierarchy correctly describes the relationship between `isdecimal()`, `isdigit()`, and `isnumeric()` in Python?',
    options: [
      'isdecimal() ⊆ isdigit() ⊆ isnumeric() (isdecimal is the strictest, isnumeric is the broadest)',
      'isnumeric() ⊆ isdigit() ⊆ isdecimal() (isnumeric is the strictest)',
      'isdigit() ⊆ isdecimal() ⊆ isnumeric()',
      'They are aliases for the same function and always return identical values'
    ],
    correctAnswer: 'isdecimal() ⊆ isdigit() ⊆ isnumeric() (isdecimal is the strictest, isnumeric is the broadest)',
    explanation: '`isdecimal()` only returns True for characters in decimal radix-10 (0-9). `isdigit()` also includes subscripts and superscripts (e.g. "²"). `isnumeric()` includes all digits plus Unicode numeric characters like fractions (e.g. "½") and Roman numerals.',
    incorrectExplanations: {
      'isnumeric() ⊆ isdigit() ⊆ isdecimal() (isnumeric is the strictest)': 'isnumeric is the most permissive/broadest, not the strictest.',
      'isdigit() ⊆ isdecimal() ⊆ isnumeric()': 'isdecimal is strictly contained within isdigit, not vice-versa.',
      'They are aliases for the same function and always return identical values': 'They differ significantly for superscript numbers, fractions, and exotic digits.'
    },
    hint: 'Decimal digits (0-9) are a subset of digits (including superscripts), which are a subset of numeric characters (including vulgar fractions).',
    tags: ['isdecimal', 'isdigit', 'isnumeric', 'unicode'],
    isVerified: true
  },
  // 28. isdigit() vs isdecimal() with superscript
  {
    id: 'str-028',
    topicId: 'string-methods',
    subtopic: 'Validation Methods',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is the output of this code with Unicode superscript "2"?',
    codeSnippet: 's = "\\u00b2" # Unicode for superscript 2: \u00b2\nprint(s.isdecimal(), s.isdigit(), s.isnumeric())',
    options: [
      'False True True',
      'True True True',
      'False False True',
      'False False False'
    ],
    correctAnswer: 'False True True',
    expectedOutput: 'False True True',
    explanation: 'A superscript number like "²" cannot be directly parsed as a standard base-10 integer literal in Python (so `isdecimal()` is `False`). However, it represents a digit, so `isdigit()` is `True`, and it represents a number, so `isnumeric()` is `True`.',
    incorrectExplanations: {
      'True True True': 'Superscript digits are not decimal digits in standard base-10 representation.',
      'False False True': 'isdigit() returns True for superscripts.',
      'False False False': 'Superscript 2 is both a digit and numeric.'
    },
    hint: 'Superscripts return False for isdecimal(), but True for isdigit() and isnumeric().',
    tags: ['isdecimal', 'isdigit', 'superscript'],
    isVerified: true
  },
  // 29. isalpha() and spaces
  {
    id: 'str-029',
    topicId: 'string-methods',
    subtopic: 'Validation Methods',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What is the output of the following code?',
    codeSnippet: 'name = "John Doe"\nprint(name.isalpha())',
    options: ['False', 'True', 'None', 'AttributeError'],
    correctAnswer: 'False',
    expectedOutput: 'False',
    explanation: '`str.isalpha()` returns True ONLY if ALL characters in the string are alphabetic and there is at least one character. The space character `" "` in "John Doe" is whitespace, not an alphabetic letter, causing `isalpha()` to return `False`.',
    incorrectExplanations: {
      'True': 'The space character is not alphabetic, so isalpha() returns False.',
      'None': 'Validation methods return True or False.',
      'AttributeError': 'isalpha() is a valid string method.'
    },
    hint: 'Does isalpha() consider space characters to be alphabetic letters?',
    tags: ['isalpha', 'spaces', 'validation'],
    isVerified: true
  },
  // 30. isalnum()
  {
    id: 'str-030',
    topicId: 'string-methods',
    subtopic: 'Validation Methods',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What is the output of this code snippet?',
    codeSnippet: 'code = "Agent007"\nprint(code.isalnum())',
    options: ['True', 'False', 'None', 'ValueError'],
    correctAnswer: 'True',
    expectedOutput: 'True',
    explanation: '`str.isalnum()` returns `True` if all characters in the string are alphanumeric (either alphabetic or numeric digits) and there is at least one character. "Agent007" contains only letters and digits.',
    incorrectExplanations: {
      'False': 'All characters in "Agent007" are letters or numbers.',
      'None': 'isalnum() returns a boolean.',
      'ValueError': 'No error is raised.'
    },
    hint: 'isalnum checks whether all characters are letters OR digits.',
    tags: ['isalnum', 'validation'],
    isVerified: true
  },
  // 31. isascii()
  {
    id: 'str-031',
    topicId: 'string-methods',
    subtopic: 'Validation Methods',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What does this code print?',
    codeSnippet: 'print("café".isascii(), "coffee".isascii())',
    options: ['False True', 'True True', 'False False', 'True False'],
    correctAnswer: 'False True',
    expectedOutput: 'False True',
    explanation: '`str.isascii()` returns True if all characters in the string are in the ASCII range (ordinal value 0 to 127). The accented character "é" has code point 233 (> 127), so "café".isascii() is `False`, while "coffee" contains only ASCII characters (`True`).',
    incorrectExplanations: {
      'True True': '"é" is not an ASCII character.',
      'False False': '"coffee" contains only standard 7-bit ASCII characters.',
      'True False': 'The order is café then coffee.'
    },
    hint: 'ASCII characters have ordinals between 0 and 127.',
    tags: ['isascii', 'unicode'],
    isVerified: true
  },
  // 32. isidentifier()
  {
    id: 'str-032',
    topicId: 'string-methods',
    subtopic: 'Validation Methods',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is the output of the following code?',
    codeSnippet: 'print("2nd_variable".isidentifier(), "second_var".isidentifier())',
    options: ['False True', 'True True', 'False False', 'True False'],
    correctAnswer: 'False True',
    expectedOutput: 'False True',
    explanation: '`str.isidentifier()` returns `True` if the string is a syntactically valid identifier according to the Python language definition. Identifiers cannot start with a digit, so "2nd_variable" is `False`, while "second_var" is valid (`True`).',
    incorrectExplanations: {
      'True True': 'Python identifiers cannot start with a number.',
      'False False': '"second_var" is a perfectly valid identifier.',
      'True False': 'The first string starts with a digit.'
    },
    hint: 'Can a Python variable name start with a number?',
    tags: ['isidentifier', 'naming-rules'],
    isVerified: true
  },
  // 33. isidentifier() and reserved keywords
  {
    id: 'str-033',
    topicId: 'string-methods',
    subtopic: 'Validation Methods',
    difficulty: 'intermediate',
    questionType: 'single_choice',
    questionText: 'What does `"def".isidentifier()` return in Python, and why?',
    options: [
      'True, because "def" matches lexical identifier syntax even though it is a reserved keyword (use keyword.iskeyword() to check for keywords)',
      'False, because "def" is a reserved keyword and cannot be used as an identifier',
      'None, because Python does not evaluate keywords',
      'SyntaxError, because "def" cannot appear as a string'
    ],
    correctAnswer: 'True, because "def" matches lexical identifier syntax even though it is a reserved keyword (use keyword.iskeyword() to check for keywords)',
    explanation: '`str.isidentifier()` tests whether the string matches the lexical grammar of an identifier (e.g. letters, underscores, and digits, not starting with a digit). It returns `True` for reserved keywords like "def", "class", or "if". To check if an identifier is a reserved keyword, use `keyword.iskeyword()`.',
    incorrectExplanations: {
      'False, because "def" is a reserved keyword and cannot be used as an identifier': 'isidentifier() checks lexical pattern syntax, not keyword reservation.',
      'None, because Python does not evaluate keywords': 'isidentifier() returns a boolean.',
      'SyntaxError, because "def" cannot appear as a string': '"def" is a perfectly valid string.'
    },
    hint: 'isidentifier() checks lexical syntax only; the keyword module checks if it is reserved.',
    tags: ['isidentifier', 'keywords', 'subtle'],
    isVerified: true
  },
  // 34. islower(), isupper(), and non-alphabetic characters
  {
    id: 'str-034',
    topicId: 'string-methods',
    subtopic: 'Validation Methods',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is the output of this code snippet?',
    codeSnippet: 'print("hello 123!".islower(), "123!".islower())',
    options: ['True False', 'True True', 'False False', 'False True'],
    correctAnswer: 'True False',
    expectedOutput: 'True False',
    explanation: '`str.islower()` requires that all cased characters in the string are lowercase, AND that there is AT LEAST ONE cased character. "hello 123!" has cased characters and all are lowercase (`True`). "123!" contains zero cased characters, so it returns `False`.',
    incorrectExplanations: {
      'True True': '"123!" has no cased characters, so islower() returns False.',
      'False False': '"hello 123!" is lower because all of its letters are lowercase.',
      'False True': 'Reversed output.'
    },
    hint: 'islower() requires at least one cased character in the string.',
    tags: ['islower', 'cased-characters'],
    isVerified: true
  },
  // 35. istitle()
  {
    id: 'str-035',
    topicId: 'string-methods',
    subtopic: 'Validation Methods',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What does the following code print?',
    codeSnippet: 'print("Python Mastery Academy".istitle(), "Python mastery academy".istitle())',
    options: ['True False', 'True True', 'False True', 'False False'],
    correctAnswer: 'True False',
    expectedOutput: 'True False',
    explanation: '`str.istitle()` returns True if uppercase characters may only follow uncased characters (e.g. whitespace or punctuation) and lowercase characters may only follow cased ones. "Python Mastery Academy" is titlecased (`True`), whereas the second string has lowercase "mastery" and "academy" (`False`).',
    incorrectExplanations: {
      'True True': 'The second string does not have all words capitalized.',
      'False True': 'The first string is properly titlecased.',
      'False False': 'The first string returns True.'
    },
    hint: 'istitle checks if each word starts with an uppercase letter followed by lowercase letters.',
    tags: ['istitle', 'validation'],
    isVerified: true
  },
  // 36. isspace() on empty string vs spaces
  {
    id: 'str-036',
    topicId: 'string-methods',
    subtopic: 'Validation Methods',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What does this code output?',
    codeSnippet: 'print(" \\t\\n ".isspace(), "".isspace())',
    options: ['True False', 'True True', 'False False', 'False True'],
    correctAnswer: 'True False',
    expectedOutput: 'True False',
    explanation: '`str.isspace()` returns True if all characters in the string are whitespace and there is at least one character. An empty string `""` has length 0, so it returns `False`.',
    incorrectExplanations: {
      'True True': 'An empty string returns False because isspace() requires at least one character.',
      'False False': 'Spaces, tabs, and newlines are all whitespace characters.',
      'False True': 'Empty strings return False.'
    },
    hint: 'Does isspace() return True or False for an empty string with no characters?',
    tags: ['isspace', 'empty-string'],
    isVerified: true
  },
  // 37. isprintable()
  {
    id: 'str-037',
    topicId: 'string-methods',
    subtopic: 'Validation Methods',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is the output of the following code?',
    codeSnippet: 'print("Hello World".isprintable(), "Hello\\nWorld".isprintable())',
    options: ['True False', 'True True', 'False False', 'False True'],
    correctAnswer: 'True False',
    expectedOutput: 'True False',
    explanation: '`str.isprintable()` returns False if the string contains non-printable characters such as ASCII control characters (including newline `\\n`, tab `\\t`, carriage return `\\r`, etc.).',
    incorrectExplanations: {
      'True True': 'The newline character \\n is considered a non-printable control character.',
      'False False': 'Standard text with spaces is printable.',
      'False True': 'Standard text is printable.'
    },
    hint: 'Control characters like newline \\n are not considered printable by isprintable().',
    tags: ['isprintable', 'control-characters'],
    isVerified: true
  },
  // 38. center()
  {
    id: 'str-038',
    topicId: 'string-methods',
    subtopic: 'Formatting and Alignment',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What is the output of this code snippet?',
    codeSnippet: 'text = "cat"\nprint(text.center(7, "*"))',
    options: ['**cat**', '***cat*', '*cat***', '***cat***'],
    correctAnswer: '**cat**',
    expectedOutput: '**cat**',
    explanation: '`center(width, fillchar)` pads the string to the specified total width. "cat" has length 3, and width is 7, so 4 padding characters are needed: 2 on the left and 2 on the right, giving "**cat**".',
    incorrectExplanations: {
      '***cat*': 'The padding is balanced on both sides when possible.',
      '*cat***': 'The padding is balanced on both sides.',
      '***cat***': 'That would have a total length of 9, not 7.'
    },
    hint: 'Total width is 7, original length is 3. Remaining characters are distributed equally.',
    tags: ['center', 'alignment'],
    isVerified: true
  },
  // 39. ljust() and rjust()
  {
    id: 'str-039',
    topicId: 'string-methods',
    subtopic: 'Formatting and Alignment',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What does this code output?',
    codeSnippet: 'code = "42"\nprint(code.ljust(5, "-"))',
    options: ['42---', '---42', '-42--', '42'],
    correctAnswer: '42---',
    expectedOutput: '42---',
    explanation: '`ljust(width, fillchar)` left-justifies the string within a field of the specified width, placing the fill characters on the right.',
    incorrectExplanations: {
      '---42': 'That would be the result of `rjust(5, "-")`.',
      '-42--': 'That would be center().',
      '42': 'The string is padded up to width 5.'
    },
    hint: 'Left justification keeps the content on the left and appends padding on the right.',
    tags: ['ljust', 'alignment'],
    isVerified: true
  },
  // 40. zfill()
  {
    id: 'str-040',
    topicId: 'string-methods',
    subtopic: 'Formatting and Alignment',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is the output of the following code with a signed number string?',
    codeSnippet: 'val = "-42"\nprint(val.zfill(6))',
    options: ['-00042', '000-42', '-00420', '00-042'],
    correctAnswer: '-00042',
    expectedOutput: '-00042',
    explanation: '`zfill(width)` pads the string with ASCII \'0\' on the left until the total length is `width`. Crucially, if the string starts with a sign prefix (`+` or `-`), the leading zeros are inserted AFTER the sign character, producing `"-00042"`.',
    incorrectExplanations: {
      '000-42': 'zfill is sign-aware; it places zeros after the leading sign.',
      '-00420': 'Zeros are inserted on the left, not the right.',
      '00-042': 'Zeros are placed after the sign, not split around it.'
    },
    hint: 'zfill() knows about positive and negative signs at the beginning of the string.',
    tags: ['zfill', 'sign-aware', 'formatting'],
    isVerified: true
  },
  // 41. format() positional vs named
  {
    id: 'str-041',
    topicId: 'string-methods',
    subtopic: 'Formatting and Alignment',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What is the output of this string formatting code?',
    codeSnippet: 'msg = "{1} loves {0}".format("Python", "Guido")\nprint(msg)',
    options: ['Guido loves Python', 'Python loves Guido', '{1} loves {0}', 'IndexError'],
    correctAnswer: 'Guido loves Python',
    expectedOutput: 'Guido loves Python',
    explanation: 'Positional index `{1}` refers to the second argument passed to `format()` ("Guido"), while `{0}` refers to the first argument ("Python"). Hence, "{1} loves {0}" becomes "Guido loves Python".',
    incorrectExplanations: {
      'Python loves Guido': '{0} is "Python" and {1} is "Guido". The template puts {1} first.',
      '{1} loves {0}': 'The placeholders are evaluated and replaced.',
      'IndexError': 'Both indices 0 and 1 exist in the arguments list.'
    },
    hint: '0-indexed positional arguments: index 0 is "Python", index 1 is "Guido".',
    tags: ['format', 'placeholders'],
    isVerified: true
  },
  // 42. format_map()
  {
    id: 'str-042',
    topicId: 'string-methods',
    subtopic: 'Formatting and Alignment',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is the output of the following code?',
    codeSnippet: 'person = {"name": "Ada", "role": "Pioneer"}\nprint("{name}: {role}".format_map(person))',
    options: [
      'Ada: Pioneer',
      '{name}: {role}',
      'TypeError: format_map takes keyword arguments only',
      'KeyError: name'
    ],
    correctAnswer: 'Ada: Pioneer',
    expectedOutput: 'Ada: Pioneer',
    explanation: '`str.format_map(mapping)` takes a mapping object (like a dict) directly without unpacking it with `**person`. It looks up keys directly from the mapping, producing "Ada: Pioneer".',
    incorrectExplanations: {
      '{name}: {role}': 'The keys are replaced with corresponding values from the mapping.',
      'TypeError: format_map takes keyword arguments only': 'format_map takes a single mapping argument directly.',
      'KeyError: name': 'Both keys "name" and "role" exist in the dictionary.'
    },
    hint: 'format_map accepts a dictionary directly without unpacking.',
    tags: ['format_map', 'dictionary'],
    isVerified: true
  },
  // 43. expandtabs()
  {
    id: 'str-043',
    topicId: 'string-methods',
    subtopic: 'Formatting and Alignment',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What does `expandtabs(tabsize=4)` do to the tab character in `"A\\tB"`?',
    codeSnippet: 's = "A\\tB"\nprint(len(s.expandtabs(4)))',
    options: ['5', '4', '2', '8'],
    correctAnswer: '5',
    expectedOutput: '5',
    explanation: '`expandtabs(4)` expands tab stops at multiples of 4 columns (0, 4, 8, ...). Since "A" occupies column 0, the tab advances to column 4, requiring 3 spaces. Then "B" is at column 4. The result is `"A   B"` which has length 1 + 3 + 1 = 5 characters.',
    incorrectExplanations: {
      '4': 'The tab itself pads to column 4, and "B" follows, making total length 5.',
      '2': 'The tab is replaced by multiple spaces.',
      '8': 'It aligns to the next tab stop (4), not 8.'
    },
    hint: 'Tabs align to column tab stops (multiples of tabsize).',
    tags: ['expandtabs', 'tabs'],
    isVerified: true
  },
  // 44. maketrans() and translate()
  {
    id: 'str-044',
    topicId: 'string-methods',
    subtopic: 'Translation Methods',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What does this code output using `str.maketrans()` and `translate()`?',
    codeSnippet: 'table = str.maketrans("aeiou", "12345")\nprint("hello".translate(table))',
    options: ['h2ll4', 'h1ll4', 'h3ll4', 'hello'],
    correctAnswer: 'h2ll4',
    expectedOutput: 'h2ll4',
    explanation: 'In the mapping "aeiou" -> "12345", \'e\' maps to \'2\' and \'o\' maps to \'4\'. Therefore, "hello" translates to "h2ll4".',
    incorrectExplanations: {
      'h1ll4': '\'e\' is the 2nd vowel in "aeiou", so it maps to \'2\', not \'1\'.',
      'h3ll4': '\'e\' maps to \'2\', \'i\' maps to \'3\'.',
      'hello': 'The characters are translated by the table.'
    },
    hint: 'Track the character mapping: a->1, e->2, i->3, o->4, u->5.',
    tags: ['maketrans', 'translate', 'cipher'],
    isVerified: true
  },
  // 45. maketrans() deletion third argument
  {
    id: 'str-045',
    topicId: 'string-methods',
    subtopic: 'Translation Methods',
    difficulty: 'advanced',
    questionType: 'code_output',
    questionText: 'What does the third argument of `str.maketrans(x, y, z)` specify?',
    codeSnippet: 'table = str.maketrans("", "", "aeiou")\nprint("python mastery".translate(table))',
    options: [
      'pythn mstry',
      'python mastery',
      'pyth1n m2st3ry',
      'TypeError: maketrans requires at least 1 argument'
    ],
    correctAnswer: 'pythn mstry',
    expectedOutput: 'pythn mstry',
    explanation: 'The optional 3rd argument to `str.maketrans()` is a string of characters to be deleted during translation (mapped to `None`). Passing `"aeiou"` as the 3rd argument deletes all vowels, leaving `"pythn mstry"`.',
    incorrectExplanations: {
      'python mastery': 'The vowels are removed during translation.',
      'pyth1n m2st3ry': 'No replacement string was provided for vowels; they were marked for deletion.',
      'TypeError: maketrans requires at least 1 argument': 'maketrans can take three string arguments: from, to, and delete.'
    },
    hint: 'Characters in the 3rd argument of maketrans are mapped to None (deleted).',
    tags: ['maketrans', 'translate', 'deletion'],
    isVerified: true
  },
  // 46. encode()
  {
    id: 'str-046',
    topicId: 'string-methods',
    subtopic: 'Encoding',
    difficulty: 'intermediate',
    questionType: 'single_choice',
    questionText: 'What type is returned by calling `"hello".encode("utf-8")` in Python 3?',
    options: ['bytes', 'str', 'bytearray', 'memoryview'],
    correctAnswer: 'bytes',
    explanation: 'In Python 3, calling `.encode()` on a `str` instance encodes Unicode code points into raw byte sequences and returns an immutable `bytes` object (e.g. `b\'hello\'`).',
    incorrectExplanations: {
      'str': 'A string is decoded from bytes; encoding a string produces bytes.',
      'bytearray': 'bytearray is mutable; encode() returns an immutable bytes object.',
      'memoryview': 'memoryview is a buffer view wrapper, not the direct return type.'
    },
    hint: 'Encoding transforms text (str) into binary data.',
    tags: ['encode', 'bytes', 'encoding'],
    isVerified: true
  },
  // 47. Slicing with step [::-1]
  {
    id: 'str-047',
    topicId: 'string-methods',
    subtopic: 'Slicing',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What does the following slice expression return?',
    codeSnippet: 'word = "python"\nprint(word[::-1])',
    options: ['nohtyp', 'python', 'p', 'IndexError'],
    correctAnswer: 'nohtyp',
    expectedOutput: 'nohtyp',
    explanation: 'The slice syntax `[start:stop:step]` with negative step `-1` and omitted start and stop traverses the string in reverse from end to beginning, yielding `"nohtyp"`.',
    incorrectExplanations: {
      'python': 'Step -1 reverses the order.',
      'p': 'This would be word[0].',
      'IndexError': 'Slicing never raises an IndexError in Python.'
    },
    hint: 'A step of -1 iterates through the sequence backwards.',
    tags: ['slicing', 'reverse'],
    isVerified: true
  },
  // 48. Slicing out of bounds
  {
    id: 'str-048',
    topicId: 'string-methods',
    subtopic: 'Slicing',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is the result of slicing beyond the length of a string?',
    codeSnippet: 's = "hello"\nprint(f"[{s[10:20]}]")',
    options: ['[]', 'IndexError: string index out of range', '[hello]', '[None]'],
    correctAnswer: '[]',
    expectedOutput: '[]',
    explanation: 'In Python, direct indexing (`s[10]`) raises an `IndexError` when out of bounds, but SLICING (`s[10:20]`) is forgiving and clamps gracefully to the bounds of the string, returning an empty string `""`. Inside brackets, it prints `[]`.',
    incorrectExplanations: {
      'IndexError: string index out of range': 'Direct indexing raises IndexError, but slicing gracefully returns an empty string.',
      '[hello]': 'The indices 10 to 20 start well past the end of "hello".',
      '[None]': 'Slicing returns strings, never None.'
    },
    hint: 'Slices in Python never raise IndexError for out-of-range bounds.',
    tags: ['slicing', 'bounds', 'IndexError'],
    isVerified: true
  },
  // 49. Direct Indexing out of bounds
  {
    id: 'str-049',
    topicId: 'string-methods',
    subtopic: 'Indexing',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What occurs when executing the following line of code?',
    codeSnippet: 'text = "cat"\nprint(text[5])',
    options: [
      'IndexError: string index out of range',
      'None',
      '"" (empty string)',
      'AttributeError'
    ],
    correctAnswer: 'IndexError: string index out of range',
    expectedOutput: 'IndexError: string index out of range',
    explanation: 'Unlike slicing, direct indexing (`text[i]`) checks if the index is within the valid range `[-len, len-1]`. For `"cat"` (length 3), index 5 exceeds the maximum index (2), raising an `IndexError`.',
    incorrectExplanations: {
      'None': 'Python does not return None for invalid indices.',
      '"" (empty string)': 'Slicing text[5:6] would return empty string, but indexing text[5] raises an exception.',
      'AttributeError': 'Index errors are IndexErrors.'
    },
    hint: 'Directly indexing past the end of a string raises an exception.',
    tags: ['indexing', 'IndexError'],
    isVerified: true
  },
  // 50. Negative Indexing
  {
    id: 'str-050',
    topicId: 'string-methods',
    subtopic: 'Indexing',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What is the output of this code snippet?',
    codeSnippet: 'word = "PYTHON"\nprint(word[-1], word[-2])',
    options: ['N O', 'P Y', 'O N', 'N P'],
    correctAnswer: 'N O',
    expectedOutput: 'N O',
    explanation: 'Negative indices count backwards from the end of the sequence. `word[-1]` is the last character (\'N\'), and `word[-2]` is the second to last character (\'O\').',
    incorrectExplanations: {
      'P Y': 'P and Y are at indices 0 and 1.',
      'O N': 'word[-1] is printed first (N), followed by word[-2] (O).',
      'N P': 'word[-2] is O, not P.'
    },
    hint: 'Index -1 is always the last character in the sequence.',
    tags: ['indexing', 'negative-indexing'],
    isVerified: true
  },
  // 51. String multiplication / repetition
  {
    id: 'str-051',
    topicId: 'string-methods',
    subtopic: 'Operators',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What is the output of the following string multiplication in Python?',
    codeSnippet: 'print("ha" * 3)',
    options: ['hahaha', 'ha ha ha', 'ha3', 'TypeError: cannot multiply sequence by non-int of type str'],
    correctAnswer: 'hahaha',
    expectedOutput: 'hahaha',
    explanation: 'The `*` operator when used between a string and an integer repeats the string that many times, resulting in `"hahaha"`. No extra spaces are added.',
    incorrectExplanations: {
      'ha ha ha': 'Repetition does not insert spaces between repeated strings.',
      'ha3': 'The number is an operator operand, not appended as text.',
      'TypeError: cannot multiply sequence by non-int of type str': 'Multiplying a string by an integer is valid in Python.'
    },
    hint: 'String * integer repeats the string.',
    tags: ['operators', 'repetition'],
    isVerified: true
  },
  // 52. Membership operator 'in'
  {
    id: 'str-052',
    topicId: 'string-methods',
    subtopic: 'Operators',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What is the output of the following membership test?',
    codeSnippet: 's = "developer"\nprint("lop" in s, "dev" not in s)',
    options: ['True False', 'True True', 'False False', 'False True'],
    correctAnswer: 'True False',
    expectedOutput: 'True False',
    explanation: '"lop" appears consecutively inside "deve[lop]er", so `"lop" in s` is `True`. "dev" is in `s`, so `"dev" not in s` is `False`.',
    incorrectExplanations: {
      'True True': '"dev" is present, so "dev" not in s is False.',
      'False False': '"lop" is present in "developer".',
      'False True': 'Reversed output.'
    },
    hint: 'The in operator checks for substring existence.',
    tags: ['membership', 'operators', 'in'],
    isVerified: true
  },
  // 53. Valid vs Invalid Method: uppercase() vs upper()
  {
    id: 'str-053',
    topicId: 'string-methods',
    subtopic: 'Method Identification',
    difficulty: 'beginner',
    questionType: 'valid_method',
    questionText: 'Which of the following is NOT a valid standard method of Python\'s built-in `str` type?',
    options: ['s.uppercase()', 's.upper()', 's.isupper()', 's.casefold()'],
    correctAnswer: 's.uppercase()',
    explanation: 'Python\'s `str` type defines `.upper()`, `.isupper()`, and `.casefold()`. There is NO `.uppercase()` method on `str`. Attempting to call `"hello".uppercase()` raises an `AttributeError`.',
    incorrectExplanations: {
      's.upper()': 'upper() is a valid standard method that converts text to uppercase.',
      's.isupper()': 'isupper() is a valid method that checks if all letters are uppercase.',
      's.casefold()': 'casefold() is a valid method for aggressive caseless matching.'
    },
    hint: 'Think about whether Python uses upper() or uppercase().',
    tags: ['valid-method', 'upper', 'AttributeError'],
    isVerified: true
  },
  // 54. Valid vs Invalid: contains() vs in operator
  {
    id: 'str-054',
    topicId: 'string-methods',
    subtopic: 'Method Identification',
    difficulty: 'beginner',
    questionType: 'single_choice',
    questionText: 'Which expression correctly checks if the string `"sub"` is inside `"subscription"` in Python?',
    options: ['"sub" in "subscription"', '"subscription".contains("sub")', '"subscription".has("sub")', '"subscription".includes("sub")'],
    correctAnswer: '"sub" in "subscription"',
    explanation: 'Python uses the `in` keyword for substring membership. Python strings do NOT have `.contains()` (Java), `.includes()` (JavaScript), or `.has()`.',
    incorrectExplanations: {
      '"subscription".contains("sub")': 'Python str has no contains() method (though it implements the special __contains__ method called by the in operator).',
      '"subscription".has("sub")': 'has() does not exist on Python str.',
      '"subscription".includes("sub")': 'includes() is a JavaScript method, not Python.'
    },
    hint: 'Python prefers clean keywords like in over method calls for membership.',
    tags: ['in', 'contains', 'idiomatic-python'],
    isVerified: true
  },
  // 55. Multiple-answer: Methods that return a boolean
  {
    id: 'str-055',
    topicId: 'string-methods',
    subtopic: 'Validation Methods',
    difficulty: 'intermediate',
    questionType: 'multiple_choice',
    questionText: 'Which of the following string methods return a boolean (`True` or `False`)? (Select all that apply)',
    options: ['startswith()', 'endswith()', 'find()', 'isdecimal()', 'split()'],
    correctAnswer: ['startswith()', 'endswith()', 'isdecimal()'],
    explanation: '`startswith()`, `endswith()`, and `isdecimal()` return boolean values. In contrast, `find()` returns an integer index (-1 or >= 0), and `split()` returns a list of strings.',
    incorrectExplanations: {
      'find()': 'find() returns an integer index, not a boolean.',
      'split()': 'split() returns a list of strings, not a boolean.'
    },
    hint: 'Look for methods that test conditions or prefixes vs methods that compute locations or lists.',
    tags: ['multiple-choice', 'boolean-methods'],
    isVerified: true
  },
  // 56. Multiple-answer: Methods that alter string casing
  {
    id: 'str-056',
    topicId: 'string-methods',
    subtopic: 'Case Conversion',
    difficulty: 'intermediate',
    questionType: 'multiple_choice',
    questionText: 'Which of the following methods return a new string with transformed letter casing? (Select all that apply)',
    options: ['capitalize()', 'title()', 'swapcase()', 'casefold()', 'center()'],
    correctAnswer: ['capitalize()', 'title()', 'swapcase()', 'casefold()'],
    explanation: '`capitalize()`, `title()`, `swapcase()`, and `casefold()` all transform the letter case of characters in the string. `center()` adjusts padding and alignment, leaving existing casing unchanged.',
    incorrectExplanations: {
      'center()': 'center() changes padding and alignment, not the case of letters.'
    },
    hint: 'All except the alignment method change character casing.',
    tags: ['multiple-choice', 'casing'],
    isVerified: true
  },
  // 57. True/False: String immutability and memory
  {
    id: 'str-057',
    topicId: 'string-methods',
    subtopic: 'Immutability',
    difficulty: 'beginner',
    questionType: 'true_false',
    questionText: 'True or False: In Python, string methods such as `replace()` modify the original string in memory.',
    options: ['True', 'False'],
    correctAnswer: 'False',
    explanation: 'Python strings are strictly immutable objects. No method can modify an existing string in memory. All transformation methods (like replace, strip, upper) return a brand new string object.',
    incorrectExplanations: {
      'True': 'Strings can never be modified in-place in Python.'
    },
    hint: 'Are strings mutable or immutable in Python?',
    tags: ['true-false', 'immutability'],
    isVerified: true
  },
  // 58. True/False: str.split() vs str.split("")
  {
    id: 'str-058',
    topicId: 'string-methods',
    subtopic: 'Splitting and Joining',
    difficulty: 'intermediate',
    questionType: 'true_false',
    questionText: 'True or False: Calling `"abc".split("")` in Python splits the string into individual characters `[\'a\', \'b\', \'c\']`.',
    options: ['True', 'False'],
    correctAnswer: 'False',
    explanation: 'Calling `split("")` with an empty string as delimiter raises `ValueError: empty separator`. To convert a string into a list of characters in Python, use the `list()` constructor: `list("abc")`. (JavaScript permits split(""), but Python forbids it).',
    incorrectExplanations: {
      'True': 'Python raises ValueError: empty separator when given an empty delimiter string.'
    },
    hint: 'Can split() accept an empty string as a delimiter in Python?',
    tags: ['true-false', 'split', 'empty-separator'],
    isVerified: true
  },
  // 59. Triple quotes multiline strings
  {
    id: 'str-059',
    topicId: 'string-methods',
    subtopic: 'Creation',
    difficulty: 'beginner',
    questionType: 'single_choice',
    questionText: 'Which syntax creates a string that spans multiple lines while preserving line breaks and quotes without escaping?',
    options: [
      'Triple quotes: `"""..."""` or `\'\'\'...\'\'\'`',
      'Double quotes with slash: `"line1 / line2"`',
      'Square brackets: `["line1", "line2"]`',
      'Backticks: `` `...` ``'
    ],
    correctAnswer: 'Triple quotes: `"""..."""` or `\'\'\'...\'\'\'`',
    explanation: 'Python uses triple quotes (`"""` or `\'\'\'`) for multi-line strings. Backticks (`) are not used for strings in Python (they were deprecated repr syntax in Python 2 and removed in Python 3).',
    incorrectExplanations: {
      'Double quotes with slash: `"line1 / line2"`': 'A forward slash does not create a multi-line string.',
      'Square brackets: `["line1", "line2"]`': 'Square brackets create a list of strings, not a single multi-line string.',
      'Backticks: `` `...` ``': 'Backticks are invalid syntax for strings in modern Python.'
    },
    hint: 'Python uses three consecutive single or double quotation marks.',
    tags: ['creation', 'quotes', 'triple-quotes'],
    isVerified: true
  },
  // 60. Raw strings
  {
    id: 'str-060',
    topicId: 'string-methods',
    subtopic: 'Creation',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is the output of the following raw string code?',
    codeSnippet: 'raw_path = r"C:\\new_folder\\test"\nprint(len(raw_path) == len("C:\\\\new_folder\\\\test"))',
    options: ['True', 'False', 'SyntaxError', 'TypeError'],
    correctAnswer: 'True',
    expectedOutput: 'True',
    explanation: 'Prefixing a string with `r` creates a raw string literal where backslashes are treated as literal characters rather than escape sequences. `r"C:\\new_folder\\test"` treats `\\n` as two characters (a backslash and an \'n\') rather than a newline escape character, making it identical in content to `"C:\\\\new_folder\\\\test"`.',
    incorrectExplanations: {
      'False': 'Both representations produce strings with exactly 17 characters.',
      'SyntaxError': 'Raw string literals with prefix r are standard Python.',
      'TypeError': 'Both expressions are valid strings.'
    },
    hint: 'Raw strings treat backslashes as literal characters without interpreting escape codes.',
    tags: ['raw-strings', 'escape-characters'],
    isVerified: true
  },
  // 61. F-string expressions
  {
    id: 'str-061',
    topicId: 'string-methods',
    subtopic: 'Formatting and Alignment',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What is the output of the following f-string in Python 3.6+?',
    codeSnippet: 'x = 5\ny = 10\nprint(f"{x} + {y} = {x + y}")',
    options: ['5 + 10 = 15', '{x} + {y} = 15', '5 + 10 = {x + y}', 'SyntaxError'],
    correctAnswer: '5 + 10 = 15',
    expectedOutput: '5 + 10 = 15',
    explanation: 'F-strings (formatted string literals) evaluate any valid Python expression inside `{}` placeholders at runtime. Here, `{x}` evaluates to 5, `{y}` to 10, and `{x + y}` evaluates to 15.',
    incorrectExplanations: {
      '{x} + {y} = 15': 'All braces in an f-string are evaluated unless escaped with double braces {{}}.',
      '5 + 10 = {x + y}': 'The math expression {x + y} is evaluated.',
      'SyntaxError': 'Valid f-string syntax.'
    },
    hint: 'Expressions inside curly brackets in f-strings are evaluated and formatted.',
    tags: ['f-strings', 'formatting'],
    isVerified: true
  },
  // 62. Slice with negative step start/stop
  {
    id: 'str-062',
    topicId: 'string-methods',
    subtopic: 'Slicing',
    difficulty: 'advanced',
    questionType: 'code_output',
    questionText: 'What does this slice output?',
    codeSnippet: 'letters = "ABCDEFGH"\nprint(letters[6:1:-2])',
    options: ['GECA', 'GEC', 'BF', 'HFD'],
    correctAnswer: 'GEC',
    expectedOutput: 'GEC',
    explanation: 'The slice `[6:1:-2]` starts at index 6 (\'G\'), steps backwards by 2, and stops before index 1 (\'B\'). The indices visited are: index 6 (\'G\'), index 4 (\'E\'), and index 2 (\'C\'). Stopping before index 1 means index 0 is not reached. Output is "GEC".',
    incorrectExplanations: {
      'GECA': 'The stop bound is 1, so index 0 (\'A\') is never visited.',
      'BF': 'A negative step moves backwards from high indices to lower indices.',
      'HFD': 'Index 6 is \'G\', not \'H\' (which is at index 7).'
    },
    hint: 'Start at index 6, decrement by 2 each step, stop before index 1.',
    tags: ['slicing', 'negative-step', 'bounds'],
    isVerified: true
  },
  // 63. String formatting with precision
  {
    id: 'str-063',
    topicId: 'string-methods',
    subtopic: 'Formatting and Alignment',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is the output of formatting pi to 2 decimal places with an f-string?',
    codeSnippet: 'pi = 3.14159265\nprint(f"{pi:.2f}")',
    options: ['3.14', '3.141', '3.15', '3.1'],
    correctAnswer: '3.14',
    expectedOutput: '3.14',
    explanation: 'The format specifier `:.2f` formats a floating-point number with fixed 2 decimal places. 3.14159... rounds to `3.14` because the next digit (1) is less than 5.',
    incorrectExplanations: {
      '3.141': 'That would be :.3f.',
      '3.15': 'The third decimal digit is 1, so it does not round up to 3.15.',
      '3.1': 'That would be :.1f.'
    },
    hint: ':.2f rounds to 2 decimal places.',
    tags: ['f-strings', 'formatting', 'floating-point'],
    isVerified: true
  },
  // 64. str.maketrans() with dictionary
  {
    id: 'str-064',
    topicId: 'string-methods',
    subtopic: 'Translation Methods',
    difficulty: 'advanced',
    questionType: 'code_output',
    questionText: 'What does this dictionary-based `maketrans` code produce?',
    codeSnippet: 'table = str.maketrans({"a": "X", "b": None})\nprint("abracadabra".translate(table))',
    options: ['XrcXdXbrX', 'XrcXdXrX', 'XbrXcXdXbrX', 'TypeError: dict not allowed'],
    correctAnswer: 'XrcXdXrX',
    expectedOutput: 'XrcXdXrX',
    explanation: 'In `str.maketrans(mapping)`, mapping a character to `None` marks it for deletion. Here \'a\' becomes \'X\' and \'b\' is deleted (mapped to None). In "abracadabra": a->X, b->deleted, r->r, a->X, c->c, a->X, d->d, a->X, b->deleted, r->r, a->X. Result: "XrcXdXrX".',
    incorrectExplanations: {
      'XrcXdXbrX': 'The second \'b\' must also be deleted.',
      'XbrXcXdXbrX': '\'b\' is mapped to None, which deletes it, not retains it.',
      'TypeError: dict not allowed': 'maketrans accepts a dictionary mapping characters or ordinals.'
    },
    hint: 'Mapping to None in maketrans deletes the character.',
    tags: ['maketrans', 'translate', 'deletion'],
    isVerified: true
  },
  // 65. partition() vs split() with maxsplit=1
  {
    id: 'str-065',
    topicId: 'string-methods',
    subtopic: 'Partitioning',
    difficulty: 'intermediate',
    questionType: 'concept_comparison',
    questionText: 'What is an important semantic difference between `s.partition("=")` and `s.split("=", 1)`?',
    options: [
      'partition always returns a 3-tuple including the separator, while split returns a list of 1 or 2 items and omits the separator',
      'split returns a 3-tuple, while partition returns a list',
      'partition raises ValueError if the separator is absent',
      'There is no difference in structure or return types'
    ],
    correctAnswer: 'partition always returns a 3-tuple including the separator, while split returns a list of 1 or 2 items and omits the separator',
    explanation: '`partition("=")` guarantees a 3-element tuple `(head, sep, tail)` allowing safe unpacking (`key, sep, val = s.partition("=")`). In contrast, `split("=", 1)` returns a list of 1 element if "=" is missing, or 2 elements if "=" is present, discarding the "=" delimiter itself.',
    incorrectExplanations: {
      'split returns a 3-tuple, while partition returns a list': 'split returns a list; partition returns a tuple.',
      'partition raises ValueError if the separator is absent': 'partition never raises ValueError when the separator is absent.',
      'There is no difference in structure or return types': 'They return different types (tuple vs list) and different element counts.'
    },
    hint: 'partition always produces exactly 3 elements and retains the delimiter.',
    tags: ['partition', 'split', 'comparison'],
    isVerified: true
  }
];
