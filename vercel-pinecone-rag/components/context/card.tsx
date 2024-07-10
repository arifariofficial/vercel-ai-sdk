import React, { FC } from "react";
import ReactMarkdown from "react-markdown";

export interface ICard {
  pageContent: string;
  metadata: {
    hash: string;
  };
}

interface ICardProps {
  card: ICard;
  selected: string[] | null;
}

export const Card: FC<ICardProps> = ({ card, selected }) => (
  <div
    id={card.metadata.hash}
    className={`card m-2 w-full p-5 text-white ${
      selected && selected.includes(card.metadata.hash)
        ? "bg-gray-600"
        : "bg-gray-800"
    } ${
      selected && selected.includes(card.metadata.hash)
        ? "border-4 border-double border-sky-500"
        : "opacity-60 transition-opacity duration-300 ease-in-out hover:opacity-80"
    }`}
  >
    <ReactMarkdown>{card.pageContent}</ReactMarkdown>
    <b className="text-xs">{card.metadata.hash}</b>
  </div>
);
