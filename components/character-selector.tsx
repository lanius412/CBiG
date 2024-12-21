import { useState } from "react";
import { format } from "@formkit/tempo";
import { FilePenLine, Save, Trash } from "lucide-react";

import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { Character } from "@/types/types";
import BirthdayInput from "./birthday-input";
import TooltipWrapper from "./tooltip-wrapper";

interface CharacterSelectorProps {
  character: Character;
  checked: boolean;
  onChange: (checked: boolean) => void;
  onEdit: (updatedCharacter: Character) => void;
  onDelete: () => void;
  year: number;
}

const CharacterSelector = ({
  character,
  checked,
  onChange,
  onEdit,
  onDelete,
  year,
}: CharacterSelectorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(character.name);

  const [month, setMonth] = useState(
    parseInt(character.birthday.split("/")[0], 10),
  );
  const [day, setDay] = useState(
    parseInt(character.birthday.split("/")[1], 10),
  );

  const [description, setDescription] = useState(character.description || "");

  const handleEdit = () => {
    if (isEditing) {
      console.log(year, month - 1, day);
      const birthday = `${format(new Date(year, month - 1, day), "MM/DD", "JA")}`;
      onEdit({ ...character, name, birthday, description });
    }
    setIsEditing(!isEditing);
  };

  const handleMonthChange = (m: number) => {
    setMonth(m);
  };
  const handleDayChange = (d: number) => {
    setDay(d);
  };

  return (
    <div className="flex items-center justify-between py-2">
      <Checkbox
        id={character.name}
        checked={checked}
        onCheckedChange={onChange}
        className="mr-2"
      />
      <div className="flex gap-2 items-center w-full">
        {isEditing ? (
          <>
            <div className="flex-1">
              <Input
                type="text"
                id={`name-${character.name}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <BirthdayInput
                year={year}
                initialMonth={month}
                initialDay={day}
                handleChangeMonth={handleMonthChange}
                handleChangeDay={handleDayChange}
              />
            </div>
            <div className="flex-1">
              <Input
                type="text"
                id={`description-${character.name}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <Label htmlFor={character.name} className="flex-1 text-sm">
              {character.name}
            </Label>
            <Label htmlFor={character.name} className="flex-1 text-sm">
              {character.birthday}
            </Label>
            <Label htmlFor={character.name} className="flex-1 text-sm">
              {character.description}
            </Label>
          </>
        )}
        <div className="flex justify-between items-center w-[100px]">
          <TooltipWrapper hint={isEditing ? "Save" : "Edit"}>
            <Button variant="secondary" onClick={handleEdit}>
              {isEditing ? <Save /> : <FilePenLine />}
            </Button>
          </TooltipWrapper>
          <TooltipWrapper hint="Remove">
            <Button variant="destructive" onClick={onDelete}>
              <Trash />
            </Button>
          </TooltipWrapper>
        </div>
      </div>
    </div>
  );
};

export default CharacterSelector;
