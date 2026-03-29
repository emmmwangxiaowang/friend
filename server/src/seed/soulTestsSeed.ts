import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Seed a sample Soul Test with 12 questions (4 personality, 4 interests, 4 values)
export async function seedSoulTests() {
  // Early exit if test already exists
  const existing = await prisma.soulTest.findFirst({ where: { title: 'Soul Match Test' } });
  if (existing) {
    console.log('Soul Match Test already seeded.');
    return;
  }

  const test = await prisma.soulTest.create({
    data: {
      title: 'Soul Match Test',
      description: 'A MVP soul compatibility quiz across personality, interests, and values.',
      questions: {
        create: [
          // Personality (4)
          { text: 'I enjoy exploring new ideas and concepts.', type: 'SINGLE', options: {
            create: [
              { text: 'Strongly disagree', score: 1 },
              { text: 'Disagree', score: 2 },
              { text: 'Neutral', score: 3 },
              { text: 'Agree', score: 4 },
              { text: 'Strongly agree', score: 5 },
            ] } },
          { text: 'I like solving complex problems.', type: 'SINGLE', options: {
            create: [
              { text: 'Strongly disagree', score: 1 },
              { text: 'Disagree', score: 2 },
              { text: 'Neutral', score: 3 },
              { text: 'Agree', score: 4 },
              { text: 'Strongly agree', score: 5 },
            ] } },
          { text: 'I value routine and predictability in daily life.', type: 'SINGLE', options: {
            create: [
              { text: 'Strongly disagree', score: 1 },
              { text: 'Disagree', score: 2 },
              { text: 'Neutral', score: 3 },
              { text: 'Agree', score: 4 },
              { text: 'Strongly agree', score: 5 },
            ] } },
          { text: 'I am energized by social interactions and gatherings.', type: 'SINGLE', options: {
            create: [
              { text: 'Strongly disagree', score: 1 },
              { text: 'Disagree', score: 2 },
              { text: 'Neutral', score: 3 },
              { text: 'Agree', score: 4 },
              { text: 'Strongly agree', score: 5 },
            ] } },
          // Interests (4)
          { text: 'I enjoy outdoor adventures and physical activities.', type: 'SINGLE', options: {
            create: [
              { text: 'Strongly disagree', score: 1 },
              { text: 'Disagree', score: 2 },
              { text: 'Neutral', score: 3 },
              { text: 'Agree', score: 4 },
              { text: 'Strongly agree', score: 5 },
            ] } },
          { text: 'I prefer reading over watching TV.', type: 'SINGLE', options: {
            create: [
              { text: 'Strongly disagree', score: 1 },
              { text: 'Disagree', score: 2 },
              { text: 'Neutral', score: 3 },
              { text: 'Agree', score: 4 },
              { text: 'Strongly agree', score: 5 },
            ] } },
          { text: 'I enjoy gaming and strategic challenges.', type: 'SINGLE', options: {
            create: [
              { text: 'Strongly disagree', score: 1 },
              { text: 'Disagree', score: 2 },
              { text: 'Neutral', score: 3 },
              { text: 'Agree', score: 4 },
              { text: 'Strongly agree', score: 5 },
            ] } },
          { text: 'I love creating art or music in my free time.', type: 'SINGLE', options: {
            create: [
              { text: 'Strongly disagree', score: 1 },
              { text: 'Disagree', score: 2 },
              { text: 'Neutral', score: 3 },
              { text: 'Agree', score: 4 },
              { text: 'Strongly agree', score: 5 },
            ] } },
          // Values (4)
          { text: 'I value honesty above comfort.', type: 'SINGLE', options: {
            create: [
              { text: 'Strongly disagree', score: 1 },
              { text: 'Disagree', score: 2 },
              { text: 'Neutral', score: 3 },
              { text: 'Agree', score: 4 },
              { text: 'Strongly agree', score: 5 },
            ] } },
          { text: 'I prioritize personal growth over stability.', type: 'SINGLE', options: {
            create: [
              { text: 'Strongly disagree', score: 1 },
              { text: 'Disagree', score: 2 },
              { text: 'Neutral', score: 3 },
              { text: 'Agree', score: 4 },
              { text: 'Strongly agree', score: 5 },
            ] } },
          { text: 'I value teamwork and collaboration.', type: 'SINGLE', options: {
            create: [
              { text: 'Strongly disagree', score: 1 },
              { text: 'Disagree', score: 2 },
              { text: 'Neutral', score: 3 },
              { text: 'Agree', score: 4 },
              { text: 'Strongly agree', score: 5 },
            ] } },
          { text: 'I seek meaningful, long-term relationships.', type: 'SINGLE', options: {
            create: [
              { text: 'Strongly disagree', score: 1 },
              { text: 'Disagree', score: 2 },
              { text: 'Neutral', score: 3 },
              { text: 'Agree', score: 4 },
              { text: 'Strongly agree', score: 5 },
            ] } },
        ],
      },
    },
  });

  console.log(`Seeded Soul Test with id ${test.id}`);
}

export default seedSoulTests;
