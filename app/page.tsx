"use client";

import { useState, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Alert from "@/components/alert";
import CharacterList from "@/components/character-list";
import Loading from "@/components/loading";

import { fetchCharacters } from "@/lib/api";
import { generateIcalData } from "@/lib/ical";
import { saveFileToOPFS } from "@/lib/opfs";
import { Character, IcalFile } from "@/types/types";
import { useIcal } from "@/hooks/useIcal";

const Home = () => {
  const [titleName, setTitleName] = useState("");
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [selectedCharacters, setSelectedCharacters] = useState<
    Record<string, boolean>
  >({});
  const [isLoading, setIsLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState<
    string | undefined
  >();
  const [sourceUrl, setSourceUrl] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());

  const { downloadIcal } = useIcal();

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleFetchCharacters = async () => {
    if (titleName === "") {
      setAlertTitle("Enter Title");
      setAlertOpen(true);
      return;
    }

    setIsLoading(true);
    const data = await fetchCharacters(titleName, sourceUrl);
    if (!data) {
      setAlertTitle("Failed to get characters' data");
      setAlertOpen(true);
      setIsLoading(false);
      return;
    }

    setCharacters(data.characters);
    setIsLoading(false);
    setSelectedCharacters(() =>
      data.characters.reduce(
        (acc, curr) => ({ ...acc, [curr.name]: false }),
        {},
      ),
    );
  };

  const handleCharacterSelect = useCallback(
    (name: string, checked: boolean) => {
      setSelectedCharacters((prev) => ({ ...prev, [name]: checked }));
    },
    [],
  );

  const handleCharacterChange = (updatedCharacter: Character) => {
    if (!characters) return;
    const updatedCharacters = characters.map((character) =>
      character.name === updatedCharacter.name ? updatedCharacter : character,
    );
    setCharacters(updatedCharacters);
  };

  const handleCharacterAdd = (newCharacter: Character) => {
    if (!characters) return;
    setCharacters([...characters, newCharacter]);
    setSelectedCharacters((prev) => ({ ...prev, [newCharacter.name]: false }));
  };

  const handleCharacterDelete = (deleteCharacter: Character) => {
    if (!characters) return;
    const updateCharacters = characters.filter(
      (character) => character.name !== deleteCharacter.name,
    );
    setCharacters(updateCharacters);
    setSelectedCharacters((prev) => {
      const { [deleteCharacter.name]: removed, ...rest } = prev;
      return rest;
    });
  };

  const handleGenerateIcal = async () => {
    if (!characters || characters.length === 0) {
      setAlertTitle("Choose at least one");
      setAlertOpen(true);
      return;
    }

    for (const c of characters) {
      if (new Date(c.birthday) === null) {
        setAlertTitle("Set birthday");
        setAlertOpen(true);
        return;
      }
    }

    const selected = characters.filter(
      (character) => selectedCharacters[character.name],
    );

    if (selected.length === 0) {
      setAlertTitle("Choose at least one");
      setAlertOpen(true);
      return;
    }
    setIsLoading(true);

    const icalData = generateIcalData(selected, year);

    const icalFile: IcalFile = {
      name: `${titleName}_calendar.ical`,
      content: icalData,
    };

    const saveResult = await saveFileToOPFS(icalFile);
    if (!saveResult) {
      setAlertTitle("Failed to save iCal file");
      setAlertOpen(true);
      setIsLoading(false);
      return;
    }

    await downloadIcal(icalFile);
    setIsLoading(false);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) {
      setYear(new Date().getFullYear());
      return;
    }
    setYear(value);
  };

  return (
    <div className="container flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">
        A Tool for generating Character Birthdays Calendar <br />
        <span className="text-sm">
          powered by Gemini 2.0 Flash Experimental
        </span>
      </h1>
      <div>
        <Label htmlFor="title">Title*</Label>
        <Input
          id="title"
          type="text"
          value={titleName}
          onChange={(e) => setTitleName(e.target.value)}
          placeholder="Enter a title"
        />
      </div>
      <div>
        <Label htmlFor="source">Source URL</Label>
        <Input
          type="text"
          id="source"
          placeholder="https://wikipedia.org/~"
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="year">Year</Label>
        <Input
          type="number"
          id="year"
          value={year}
          onChange={handleYearChange}
        />
      </div>

      <Button onClick={handleFetchCharacters} disabled={isLoading}>
        Search Characters by AI
      </Button>
      {isLoading && <Loading />}

      {characters && (
        <CharacterList
          characters={characters}
          selectedCharacters={selectedCharacters}
          onCharacterSelect={handleCharacterSelect}
          onCharacterChange={handleCharacterChange}
          onCharacterAdd={handleCharacterAdd}
          onCharacterDelete={handleCharacterDelete}
          year={year}
        />
      )}
      <Button
        onClick={handleGenerateIcal}
        disabled={isLoading || characters === null || characters?.length === 0}
      >
        Generate iCal Calendar
      </Button>
      <Alert
        open={alertOpen}
        title={alertTitle}
        description={alertDescription}
        onOpenChange={handleCloseAlert}
      />
    </div>
  );
};

export default Home;
