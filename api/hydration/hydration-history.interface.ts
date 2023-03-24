export interface IHydrationHistory {
    userId?: string;
    createdDate: Date | string;
    todayGoal: number;
    goalReached: number;
    waterUnit: string;
    hour: number;
    time: string;
    drunk: number;
}
