export interface dateObj {
  weekDay?: number,
  day: number,
  month: number
  year: number
}

export interface IJournalEntry {
  [key: string]: any;
}

export interface IJournalPrompts{
  type: string,
  content: string[]
}