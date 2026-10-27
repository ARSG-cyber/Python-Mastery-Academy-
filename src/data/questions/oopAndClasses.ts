import { RawQuestion } from '../../types/question';

export const OOP_AND_CLASSES_QUESTIONS: RawQuestion[] = [
  // 1. __init__ constructor and self
  {
    id: 'oop-001',
    topicId: 'classes-objects',
    subtopic: '__init__ Constructor',
    difficulty: 'beginner',
    questionType: 'single_choice',
    questionText: 'What is the role of the `self` parameter in a Python class method?',
    options: [
      'It represents the specific instance of the class on which the method is called',
      'It is a special keyword that allocates memory for a new object in the CPython runtime',
      'It refers to the parent class from which the current class inherits',
      'It makes the method a static utility function accessible without instantiation'
    ],
    correctAnswer: 'It represents the specific instance of the class on which the method is called',
    explanation: 'In Python, when an instance method is called like `obj.method()`, Python implicitly passes the object as the first parameter, conventionally named `self`. It binds method operations directly to that specific instance.',
    incorrectExplanations: {
      'It is a special keyword that allocates memory for a new object in the CPython runtime': 'self is not even a reserved keyword—it is a naming convention for the first parameter.',
      'It refers to the parent class from which the current class inherits': 'super() is used to refer to parent classes, not self.',
      'It makes the method a static utility function accessible without instantiation': '@staticmethod is used for static methods that do not receive an instance reference.'
    },
    hint: 'Think about what "self" points to when you say `self.name = "Alice"` on an object.',
    tags: ['oop', 'classes', 'self', 'instance'],
    isVerified: true
  },
  // 2. Class attribute vs instance attribute
  {
    id: 'oop-002',
    topicId: 'classes-objects',
    subtopic: 'Attributes',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What does the following Python script print?',
    codeSnippet: 'class Counter:\n    count = 0\n    def __init__(self):\n        Counter.count += 1\n\na = Counter()\nb = Counter()\nc = Counter()\nprint(Counter.count, a.count)',
    options: ['3 3', '1 1', '3 1', '0 3'],
    correctAnswer: '3 3',
    expectedOutput: '3 3',
    explanation: '`count` is a class attribute shared across all instances of `Counter`. Each time `__init__` executes, `Counter.count` increments by 1. After 3 instantiations, `Counter.count` is 3. Accessing `a.count` finds the class attribute on the type, also returning 3.',
    incorrectExplanations: {
      '1 1': 'count is modified via Counter.count, accumulating across all instances.',
      '3 1': 'a does not have an instance attribute "count", so Python resolves the attribute on the class, yielding 3.',
      '0 3': 'Counter.count was incremented three times.'
    },
    hint: 'Notice that count is defined directly inside the class body, not on self.',
    tags: ['oop', 'class-attributes', 'instance-attributes'],
    isVerified: true
  },
  // 3. Inheritance and super()
  {
    id: 'oop-003',
    topicId: 'inheritance',
    subtopic: 'super()',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is the output of executing this inheritance code?',
    codeSnippet: 'class Animal:\n    def speak(self):\n        return "Sound"\n\nclass Dog(Animal):\n    def speak(self):\n        parent = super().speak()\n        return f"{parent}: Woof"\n\nd = Dog()\nprint(d.speak())',
    options: ['Sound: Woof', 'Woof', 'Sound', 'AttributeError'],
    correctAnswer: 'Sound: Woof',
    expectedOutput: 'Sound: Woof',
    explanation: '`super().speak()` calls the `speak()` implementation in the parent class `Animal`, which returns `"Sound"`. `Dog.speak()` formats that result with `": Woof"`, producing `"Sound: Woof"`.',
    incorrectExplanations: {
      'Woof': 'super().speak() executes and prepends the parent class return value.',
      'Sound': 'The subclass overrides speak() and extends the parent response.',
      'AttributeError': 'Animal defines speak(), so super().speak() is completely valid.'
    },
    hint: 'super().speak() delegates to the parent method before adding the dog noise.',
    tags: ['oop', 'inheritance', 'super'],
    isVerified: true
  },
  // 4. Name Mangling with private double underscore
  {
    id: 'oop-004',
    topicId: 'oop-concepts',
    subtopic: 'Encapsulation & Name Mangling',
    difficulty: 'intermediate',
    questionType: 'single_choice',
    questionText: 'In Python, what happens when an attribute name begins with two leading underscores (like `__secret`) and has at most one trailing underscore inside a class `Account`?',
    options: [
      'Python mangles the attribute name internally to `_Account__secret` to avoid collision in subclasses',
      'The attribute becomes strictly private at the operating system memory level and cannot be accessed under any circumstances',
      'Python raises a SyntaxError unless decorated with `@private`',
      'The attribute is exported as a global module variable'
    ],
    correctAnswer: 'Python mangles the attribute name internally to `_Account__secret` to avoid collision in subclasses',
    explanation: 'Python does not have true access modifiers like Java or C++. Instead, it performs name mangling: any identifier of the form `__spam` is textually replaced with `_classname__spam`. This prevents accidental attribute shadowing in subclasses while remaining accessible via the mangled name.',
    incorrectExplanations: {
      'The attribute becomes strictly private at the operating system memory level': 'Python adheres to the philosophy "we are all consenting adults here"; mangled attributes can still be accessed via _Account__secret.',
      'Python raises a SyntaxError unless decorated with @private': 'Double underscore prefix is built into Python syntax.',
      'The attribute is exported as a global module variable': 'It remains an attribute of the class and its instances.'
    },
    hint: 'Python transforms the name by prefixing an underscore and the class name.',
    tags: ['oop', 'encapsulation', 'name-mangling'],
    isVerified: true
  },
  // 5. Special Methods: __str__ vs __repr__
  {
    id: 'oop-005',
    topicId: 'classes-objects',
    subtopic: 'Special Methods',
    difficulty: 'intermediate',
    questionType: 'single_choice',
    questionText: 'What is the conventional difference between `__str__` and `__repr__` in Python?',
    options: [
      '__str__ provides a readable, user-friendly string; __repr__ provides an unambiguous representation useful for debugging',
      '__str__ is called when converting to float; __repr__ is called when converting to int',
      '__repr__ is for Python 2 compatibility; __str__ is for Python 3 only',
      '__str__ must return HTML, while __repr__ returns JSON'
    ],
    correctAnswer: '__str__ provides a readable, user-friendly string; __repr__ provides an unambiguous representation useful for debugging',
    explanation: 'As a rule of thumb, `__str__` is intended for end users (called by `print()` and `str()`), while `__repr__` is intended for developers (called by `repr()` and the interactive shell), ideally showing valid Python code to recreate the object.',
    incorrectExplanations: {
      '__str__ is called when converting to float; __repr__ is called when converting to int': '__float__ and __int__ handle numeric type conversions.',
      '__repr__ is for Python 2 compatibility; __str__ is for Python 3 only': 'Both __str__ and __repr__ are core protocols in Python 2 and 3.',
      '__str__ must return HTML, while __repr__ returns JSON': 'Both methods must return standard Python str objects.'
    },
    hint: 'Think: "repr" stands for representation (developer debugging), while "str" is for human display.',
    tags: ['oop', 'dunder', 'str', 'repr'],
    isVerified: true
  },
  // 6. Dataclass automatic methods
  {
    id: 'oop-006',
    topicId: 'dataclasses',
    subtopic: '@dataclass Decorator',
    difficulty: 'intermediate',
    questionType: 'code_output',
    questionText: 'What is the output of evaluating equality between these two `@dataclass` instances?',
    codeSnippet: 'from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: int\n    y: int\n\np1 = Point(1, 2)\np2 = Point(1, 2)\nprint(p1 == p2, p1 is p2)',
    options: ['True False', 'True True', 'False False', 'False True'],
    correctAnswer: 'True False',
    expectedOutput: 'True False',
    explanation: 'The `@dataclass` decorator automatically generates an `__eq__` method that compares instances by their field values, so `p1 == p2` is `True`. However, `p1` and `p2` are distinct objects in memory, so `p1 is p2` (object identity) is `False`.',
    incorrectExplanations: {
      'True True': 'They are distinct allocations in memory; p1 is p2 checks reference equality.',
      'False False': 'Dataclasses implement value equality (__eq__) by default based on field values.',
      'False True': 'An object cannot have the same identity while failing equality here.'
    },
    hint: '== checks structural value equality; is checks object identity in memory.',
    tags: ['dataclasses', 'oop', 'equality', 'identity'],
    isVerified: true
  },
  // 7. isinstance vs type check with inheritance
  {
    id: 'oop-007',
    topicId: 'oop-concepts',
    subtopic: 'Polymorphism & isinstance',
    difficulty: 'beginner',
    questionType: 'code_output',
    questionText: 'What does this snippet print regarding inheritance checking?',
    codeSnippet: 'class Base:\n    pass\n\nclass Derived(Base):\n    pass\n\nobj = Derived()\nprint(isinstance(obj, Base), type(obj) is Base)',
    options: ['True False', 'True True', 'False False', 'False True'],
    correctAnswer: 'True False',
    expectedOutput: 'True False',
    explanation: '`isinstance(obj, Base)` returns `True` because `isinstance` respects the inheritance hierarchy. In contrast, `type(obj) is Base` checks for an exact type match without considering subclasses, returning `False`.',
    incorrectExplanations: {
      'True True': 'type(obj) is Derived, which is not the identical class object Base.',
      'False False': 'Derived is a subclass of Base, so isinstance returns True.',
      'False True': 'isinstance is true for subclasses, not false.'
    },
    hint: 'isinstance supports inheritance trees, whereas exact type comparison does not.',
    tags: ['oop', 'isinstance', 'type', 'inheritance'],
    isVerified: true
  },
  // 8. Class method vs static method
  {
    id: 'oop-008',
    topicId: 'classes-objects',
    subtopic: 'Class and Static Methods',
    difficulty: 'intermediate',
    questionType: 'single_choice',
    questionText: 'What distinguishes a method decorated with `@classmethod` from one decorated with `@staticmethod`?',
    options: [
      '@classmethod receives the class object `cls` as its first argument; @staticmethod receives neither `self` nor `cls`',
      '@classmethod can only be called from instances, while @staticmethod can only be called on classes',
      '@staticmethod can modify class variables, while @classmethod cannot',
      '@classmethod cannot be overridden in subclasses'
    ],
    correctAnswer: '@classmethod receives the class object `cls` as its first argument; @staticmethod receives neither `self` nor `cls`',
    explanation: '`@classmethod` passes the calling class as the first parameter (conventionally `cls`), making it ideal for alternative constructors. `@staticmethod` behaves like a plain function placed inside the class namespace, receiving neither `self` nor `cls`.',
    incorrectExplanations: {
      '@classmethod can only be called from instances, while @staticmethod can only be called on classes': 'Both can be invoked on either the class or an instance.',
      '@staticmethod can modify class variables, while @classmethod cannot': 'Class methods directly receive cls, making them better suited to inspect or modify class state.',
      '@classmethod cannot be overridden in subclasses': 'Class methods can be cleanly inherited and overridden.'
    },
    hint: 'Look for which decorator automatically receives the class parameter cls.',
    tags: ['oop', 'classmethod', 'staticmethod'],
    isVerified: true
  }
];
