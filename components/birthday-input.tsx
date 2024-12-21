import { useEffect, useState } from "react";
import { monthDays } from "@formkit/tempo";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const monthList = Array.from({ length: 12 }, (_, i) => i + 1);

interface BirthdayInputProps {
  year: number;
  initialMonth: number;
  initialDay: number;
  handleChangeMonth: (m: number) => void;
  handleChangeDay: (d: number) => void;
}

const BirthdayInput = ({
  year,
  initialMonth,
  initialDay,
  handleChangeMonth,
  handleChangeDay,
}: BirthdayInputProps) => {
  const [month, setMonth] = useState(initialMonth);
  const [day, setDay] = useState(initialDay);
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  useEffect(() => {
    const newDays = Array.from(
      { length: monthDays(new Date(year, month - 1)) },
      (_, i) => i + 1,
    );
    setDaysInMonth(newDays);
  }, [month]);

  return (
    <div className="flex justify-between items-center gap-2">
      <Select
        value={month.toString()}
        onValueChange={(v) => {
          setMonth(Number(v));
          handleChangeMonth(Number(v));
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={month.toString()} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Month</SelectLabel>
            {monthList.map((m) => (
              <SelectItem key={m} value={m.toString()}>
                {m}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        value={day.toString()}
        onValueChange={(v) => {
          setDay(Number(v));
          handleChangeDay(Number(v));
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={day.toString()} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Day</SelectLabel>
            {daysInMonth.map((d) => (
              <SelectItem key={d} value={d.toString()}>
                {d}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BirthdayInput;
