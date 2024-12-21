import { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";

import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import TooltipWrapper from "./tooltip-wrapper";
import CharacterSelector from "./character-selector";

import { Character } from "@/types/types";

interface CharacterListProps {
  characters: Character[];
  selectedCharacters: Record<string, boolean>;
  onCharacterSelect: (name: string, checked: boolean) => void;
  onCharacterChange: (updatedCharacter: Character) => void;
  onCharacterAdd: (newCharacter: Character) => void;
  onCharacterDelete: (character: Character) => void;
  year: number;
}

const CharacterList = ({
  characters,
  selectedCharacters,
  onCharacterSelect,
  onCharacterChange,
  onCharacterAdd,
  onCharacterDelete,
  year,
}: CharacterListProps) => {
  const [allSelect, setAllSelect] = useState(false);
  const [newCharacter, setNewCharacter] = useState<Character>({
    name: "",
    birthday: "",
    description: "",
  });

  useEffect(() => {
    if (characters) {
      const allSelected = characters.every(
        (character) => selectedCharacters[character.name],
      );
      setAllSelect(allSelected);
    }
  }, [characters, selectedCharacters]);

  const handleAddCharacter = () => {
    onCharacterAdd({ ...newCharacter });
    setNewCharacter({ name: "", birthday: "", description: "" });
  };

  const handleAllSelectChange = () => {
    if (!characters) return;
    setAllSelect(!allSelect);
    characters.forEach((character) =>
      onCharacterSelect(character.name, !allSelect),
    );
  };

  if (!characters) {
    return null;
  }

  return (
    <>
      <ul>
        <li className="py-1 border-b-2 border-neutral-900">
          <div className="py-2 flex items-center justify-between">
            <TooltipWrapper hint="Toggle all check">
              <Checkbox
                checked={allSelect}
                onCheckedChange={handleAllSelectChange}
                className="mr-2"
              />
            </TooltipWrapper>
            <div className="flex gap-2 items-center w-full">
              <Label className="flex-1 font-bold">Name</Label>
              <Label className="flex-1 font-bold">Birthday</Label>
              <Label className="flex-1 font-bold">Description</Label>
              <div className="w-[100px]" />
            </div>
          </div>
        </li>
        {characters.map((character) => (
          <li key={character.name} className="py-1">
            <CharacterSelector
              character={character}
              checked={selectedCharacters[character.name] || false}
              onChange={(checked) => onCharacterSelect(character.name, checked)}
              onEdit={onCharacterChange}
              onDelete={() => onCharacterDelete(character)}
              year={year}
            />
          </li>
        ))}
        <li className="flex justify-end py-1">
          <Button variant="secondary" onClick={handleAddCharacter}>
            <PlusIcon className="size-4" />
          </Button>
        </li>
      </ul>
    </>
  );
};

export default CharacterList;
