"use client";
import { createContext, useContext, useState, useMemo, type ReactNode } from "react";
import { personas, type PersonaId, type PersonaConfig } from "@/data/personas";

export type FormInterest = "leasing" | "sponsorship" | "events" | "other";

interface PersonaContextType {
  persona: PersonaId;
  setPersona: (p: PersonaId) => void;
  personaData: PersonaConfig | null;
  formInterest: FormInterest;
  setFormInterest: (i: FormInterest) => void;
}

const PersonaContext = createContext<PersonaContextType>({
  persona: null,
  setPersona: () => {},
  personaData: null,
  formInterest: "leasing",
  setFormInterest: () => {},
});

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersona] = useState<PersonaId>(null);
  const [formInterest, setFormInterest] = useState<FormInterest>("leasing");

  const personaData = useMemo(
    () => (persona ? personas[persona] ?? null : null),
    [persona]
  );

  return (
    <PersonaContext.Provider value={{ persona, setPersona, personaData, formInterest, setFormInterest }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  return useContext(PersonaContext);
}
