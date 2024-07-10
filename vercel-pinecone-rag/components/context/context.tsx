import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { urls } from "./urls";
import UrlButton from "./url-button";
import { Card, ICard } from "./card";
import { clearIndex, crawlDocument } from "./utils";

import { Button } from "./button";
interface ContextProps {
  className: string;
  selected: string[] | null;
}

export const Context: React.FC<ContextProps> = ({ className, selected }) => {
  const [entries, setEntries] = useState(urls);
  const [cards, setCards] = useState<ICard[]>([]);

  const [splittingMethod, setSplittingMethod] = useState("markdown");
  const [chunkSize, setChunkSize] = useState(256);
  const [overlap, setOverlap] = useState(1);

  // Scroll to selected card
  useEffect(() => {
    const element = selected && document.getElementById(selected[0]);
    element?.scrollIntoView({ behavior: "smooth" });
  }, [selected]);

  const DropdownLabel: React.FC<
    React.PropsWithChildren<{ htmlFor: string }>
  > = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className="p-2 font-bold text-white">
      {children}
    </label>
  );

  const buttons = entries.map((entry, key) => (
    <div className="" key={`${key}-${entry.loading}`}>
      <UrlButton
        entry={entry}
        onClick={() =>
          crawlDocument(
            entry.url,
            setEntries,
            setCards,
            splittingMethod,
            chunkSize,
            overlap,
          )
        }
      />
    </div>
  ));

  return (
    <div
      className={`flex w-full flex-col overflow-y-auto rounded-lg border-2 border-gray-500 ${className}`}
    >
      <div className="sticky top-0 flex w-full flex-col items-start">
        <div className="flex w-full flex-col items-start p-2 lg:flex-row lg:flex-wrap">
          {buttons}
        </div>
        <div className="w-full flex-grow px-4">
          <Button
            className="my-2 w-full uppercase transition-transform duration-100 active:scale-[98%]"
            style={{
              backgroundColor: "#4f6574",
              color: "white",
            }}
            onClick={() => clearIndex(setEntries, setCards)}
          >
            Clear Index
          </Button>
        </div>
        <div className="flex p-2"></div>
        <div className="flex w-full flex-col rounded-b-lg bg-gray-600 p-3 text-left subpixel-antialiased">
          <DropdownLabel htmlFor="splittingMethod">
            Splitting Method:
          </DropdownLabel>
          <div className="relative w-full">
            <select
              title="select"
              id="splittingMethod"
              value={splittingMethod}
              className="w-full appearance-none rounded bg-gray-700 p-2 text-white hover:cursor-pointer"
              onChange={(e) => setSplittingMethod(e.target.value)}
            >
              <option value="recursive">Recursive Text Splitting</option>
              <option value="markdown">Markdown Splitting</option>
            </select>
          </div>
          {splittingMethod === "recursive" && (
            <div className="my-4 flex flex-col">
              <div className="flex w-full flex-col">
                <DropdownLabel htmlFor="chunkSize">
                  Chunk Size: {chunkSize}
                </DropdownLabel>
                <input
                  title="chunksize"
                  className="bg-gray-700 p-2"
                  type="range"
                  id="chunkSize"
                  min={1}
                  max={2048}
                  onChange={(e) => setChunkSize(parseInt(e.target.value))}
                />
              </div>
              <div className="flex w-full flex-col">
                <DropdownLabel htmlFor="overlap">
                  Overlap: {overlap}
                </DropdownLabel>
                <input
                  placeholder="Overlap"
                  className="bg-gray-700 p-2"
                  type="range"
                  id="overlap"
                  min={1}
                  max={200}
                  onChange={(e) => setOverlap(parseInt(e.target.value))}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full flex-wrap">
        {cards &&
          cards.map((card, key) => (
            <Card key={key} card={card} selected={selected} />
          ))}
      </div>
    </div>
  );
};
