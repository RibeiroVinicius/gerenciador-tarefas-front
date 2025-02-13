export interface ITask {
    id: number;
    title: string;
    description: string;
    status: ETaskStatus;
    createdOn: Date;
    deadline: Date;
    assignedTo: string;
}

export enum ETaskStatus {
    PENDING = 'PENDING',
    IN_PROGRESS= 'IN_PROGRESS',
    COMPLETED = 'COMPLETED'
}