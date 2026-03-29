import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// List all soul tests with their questions and options
export async function listSoulTests() {
    return prisma.soulTest.findMany({
        include: {
            questions: {
                include: { options: true },
            },
        },
    });
}
// Get a single soul test with its questions and options
export async function getSoulTestWithQuestions(testId) {
    return prisma.soulTest.findUnique({
        where: { id: testId },
        include: {
            questions: {
                orderBy: { id: 'asc' },
                include: { options: true },
            },
        },
    });
}
// Submit answers for a user for a specific test
export async function submitSoulTestAnswers(userId, soulTestId, answers) {
    // Either create or update the existing result for the user/test
    const existing = await prisma.soulTestResult.findFirst({ where: { userId, soulTestId } });
    if (existing) {
        return prisma.soulTestResult.update({
            where: { id: existing.id },
            data: { answers },
        });
    }
    return prisma.soulTestResult.create({ data: { userId, soulTestId, answers } });
}
// Retrieve a user's result for a test
export async function getSoulTestResult(userId, soulTestId) {
    return prisma.soulTestResult.findFirst({ where: { userId, soulTestId } });
}
// Compute compatibility (match) scores between a user and all other users for a given test
export async function computeMatchesForUser(userId, soulTestId) {
    // Load test structure (questions + options) to understand categories and scoring
    const test = await getSoulTestWithQuestions(soulTestId);
    if (!test || !test.questions || test.questions.length === 0)
        return [];
    // Load all results for this test including user info
    const results = await prisma.soulTestResult.findMany({
        where: { soulTestId },
        include: { user: true },
    });
    // Find current user's answers
    const current = results.find((r) => r.userId === userId);
    if (!current)
        return [];
    // Helper to compute per-question similarity
    function perQuestionSimilarity(q, a, b) {
        // If question type is SINGLE
        if (q.type === 'SINGLE' || q.type === 'SINGLE_OPTION') {
            // a and b are option ids
            const optA = q.options.find((o) => o.id === a);
            const optB = q.options.find((o) => o.id === b);
            const sA = optA?.score ?? 0;
            const sB = optB?.score ?? 0;
            // If both options exist, derive similarity from their scores (scale-aware)
            if (sA && sB) {
                // Normalize to 0..1 range
                return 1 - Math.abs(sA - sB) / 4;
            }
            // Fallback: if same option selected, perfect match
            return a === b ? 1 : 0;
        }
        // If question type is MULTIPLE
        if (q.type === 'MULTIPLE') {
            const setA = new Set(a ?? []);
            const setB = new Set(b ?? []);
            const intersection = [...setA].filter((v) => setB.has(v)).length;
            const union = new Set([...setA, ...setB]).size;
            return union > 0 ? intersection / union : 0;
        }
        // Default fallback
        return a === b ? 1 : 0;
    }
    // Category weights (simple MVP): 4 questions per category: personality, interests, values
    const questions = test.questions;
    const perCat = {
        personality: 0,
        interests: 0,
        values: 0,
    };
    const counts = {
        personality: 4,
        interests: 4,
        values: 4,
    };
    // Build index-to-category mapping based on seed ordering
    function categoryOfIndex(index) {
        if (index < counts.personality)
            return 'personality';
        if (index < counts.personality + counts.interests)
            return 'interests';
        return 'values';
    }
    // Build a map from question id to question for quick access
    const qById = new Map();
    questions.forEach((q, idx) => qById.set(q.id, { ...q, index: idx }));
    // Prepare answers mapping by question id for both users
    const ansA = current.answers ?? {};
    const ansBMap = new Map();
    for (const r of results) {
        ansBMap.set(r.userId, r.answers ?? {});
    }
    // Iterate over all other users
    let totalWeighted = 0;
    let totalUsers = 0;
    for (const r of results) {
        if (r.userId === userId)
            continue;
        const a = ansA; // current user's answers
        const b = r.answers ?? {};
        // Compute category-wise similarity
        let personalitySum = 0;
        let interestsSum = 0;
        let valuesSum = 0;
        questions.forEach((qq, idx) => {
            const cat = categoryOfIndex(idx);
            const answerA = a[`${qq.id}`];
            const answerB = b[`${qq.id}`];
            const s = perQuestionSimilarity(qq, answerA, answerB);
            if (cat === 'personality')
                personalitySum += s;
            else if (cat === 'interests')
                interestsSum += s;
            else
                valuesSum += s;
        });
        const personAvg = personalitySum / counts.personality;
        const interAvg = interestsSum / counts.interests;
        const valAvg = valuesSum / counts.values;
        const compatibility = personAvg * 0.5 + interAvg * 0.3 + valAvg * 0.2;
        // Persist or include in results
        totalWeighted += compatibility;
        totalUsers += 1;
    }
    // Build final results: per-user compatibility percentage
    const matches = [];
    for (const r of results) {
        if (r.userId === userId)
            continue;
        // Recompute for exact order when constructing output
    }
    // For simplicity, recompute and push
    for (const r of results) {
        if (r.userId === userId)
            continue;
    }
    // Recompute in a straightforward loop while pushing
    for (const r of results) {
        if (r.userId === userId)
            continue;
        const a = current.answers ?? {};
        const b = r.answers ?? {};
        let personalitySum = 0;
        let interestsSum = 0;
        let valuesSum = 0;
        questions.forEach((qq, idx) => {
            const cat = categoryOfIndex(idx);
            const answerA = a[`${qq.id}`];
            const answerB = b[`${qq.id}`];
            const s = perQuestionSimilarity(qq, answerA, answerB);
            if (cat === 'personality')
                personalitySum += s;
            else if (cat === 'interests')
                interestsSum += s;
            else
                valuesSum += s;
        });
        const personAvg = personalitySum / counts.personality;
        const interAvg = interestsSum / counts.interests;
        const valAvg = valuesSum / counts.values;
        const compatibility = personAvg * 0.5 + interAvg * 0.3 + valAvg * 0.2;
        matches.push({ userId: r.userId, user: r.user, compatibility: Math.round(compatibility * 100) });
    }
    // Sort by highest compatibility
    matches.sort((a, b) => b.compatibility - a.compatibility);
    return matches;
}
