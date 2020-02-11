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
  content: string[]
}
export interface IDailyPrompts{
  morning: string[],
  evening: string[]
}