import { ICalCalendar, ICalCalendarMethod } from "ical-generator";

import { Character } from "@/types/types";

export const generateIcalData = (
  characters: Character[],
  year: number = new Date().getFullYear(),
): string => {
  const events = characters.map((character) => {
    const date = new Date(`${year}/${character.birthday}`);
    return {
      start: date,
      summary: `${character.name}の誕生日`,
      description: character.description,
      allDay: true,
    };
  });

  const ical = new ICalCalendar();
  ical.method(ICalCalendarMethod.REQUEST);
  ical.prodId({
    company: "lanius412",
    product: "character-birthday-ical-generator",
    language: "JA",
  });

  for (const event of events) {
    ical.createEvent(event);
  }
  return ical.toString();
};
