export interface ITask {
    id: number;
    title: string;
    description: string;
    status: ETaskStatus;
    createdAt: Date;
    deadline: Date;
    assignedTo: string;
}

export enum ETaskStatus {
    PENDING,
    IN_PROGRESS,
    COMPLETED
}