import seedSoulTests from './soulTestsSeed';

async function main() {
  try {
    await seedSoulTests();
    console.log('Soul tests seeding completed.');
  } catch (e) {
    console.error('Soul tests seeding failed:', e);
  }
  process.exit(0);
}

main();
