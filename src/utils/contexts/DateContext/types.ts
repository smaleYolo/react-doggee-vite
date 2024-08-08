import { createDate } from '@helpers/*';

export type ISelectedDate = {
  user_birthdate: ReturnType<typeof createDate> | null;
  dog_birthdate: ReturnType<typeof createDate> | null;
}

export type ISelectedMonth = {
  monthShort: string;
  monthIndex: number;
  year: number;
} | null