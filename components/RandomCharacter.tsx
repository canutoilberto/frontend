"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Label } from "./ui/label";

interface Character {
  name: string;
  location: string;
  image: string;
}

export default function RandomCharacter() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomCharacter = async () => {
    setLoading(true);
    try {
      // Gerar um ID aleatório para buscar um personagem
      const randomId = Math.floor(Math.random() * 826) + 1;
      const response = await fetch(
        `http://localhost:5000/character/${randomId}`
      );
      const data = await response.json();

      // Atualizando os dados com base no retorno da API Rick and Morty
      setCharacter({
        name: data.name,
        location: data.location.name, // Nome da localidade
        image: data.image, // Imagem do personagem
      });
    } catch (error) {
      console.error("Erro ao buscar personagem aleatório:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomCharacter();
  }, []);

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Personagem Aleatório
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        {character && (
          <>
            <Image
              width={1000}
              height={1000}
              src={character.image}
              alt={character.name}
              className="w-32 h-32 rounded-full object-cover"
            />
            <div className="w-full">
              <Label className="text-left">Nome</Label>
              <Input
                type="text"
                placeholder="Nome"
                value={character.name}
                readOnly
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label className="text-left">Localidade</Label>
              <Input
                type="text"
                placeholder="Localidade"
                value={character.location}
                readOnly
                className="w-full"
              />
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={fetchRandomCharacter}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Carregando..." : "Aleatório"}
        </Button>
      </CardFooter>
    </Card>
  );
}
