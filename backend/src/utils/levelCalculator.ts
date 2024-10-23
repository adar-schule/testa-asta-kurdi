export function calculateProficiencyLevel(totalScore: number): string | null {
    if (totalScore >= 95) return 'C2';
    if (totalScore >= 85) return 'C1';
    if (totalScore >= 75) return 'B2.2';
    if (totalScore >= 65) return 'B2.1';
    if (totalScore >= 55) return 'B1.2';
    if (totalScore >= 45) return 'B1.1';
    if (totalScore >= 35) return 'A2.2';
    if (totalScore >= 25) return 'A2.1';
    if (totalScore >= 15) return 'A1.2';
    if (totalScore >= 5) return 'A1.1';
    return '-'; // No valid level when totalScore is less than 5 or if there’s any issue
}