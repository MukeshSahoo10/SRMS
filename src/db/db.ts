import Dexie, { Table } from 'dexie';

export interface Student {
  id?: number;
  rollNumber: string;
  name: string;
  class: string;
  subjects: {
    name: string;
    marks: number;
  }[];
  totalMarks: number;
  percentage: number;
  grade: string;
  createdAt: Date;
}

export class StudentDatabase extends Dexie {
  students!: Table<Student>;

  constructor() {
    super('StudentDB');
    this.version(1).stores({
      students: '++id, rollNumber, name, class'
    });
  }
}

export const db = new StudentDatabase();