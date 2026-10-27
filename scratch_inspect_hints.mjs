import { ALL_QUESTIONS } from './src/data/questions/index.js';

console.log('Total questions:', ALL_QUESTIONS.length);
for (const q of ALL_QUESTIONS) {
  console.log(`${q.id} | ${q.hint}`);
}
