"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CSVLink } from "react-csv";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface ExportToCSVDialogProps<
  TData extends Record<string, string | number>,
> {
  data: TData[];
  disabled?: boolean;
}

export function ExportToCSVDialog<
  TData extends Record<string, string | number>,
>({ data, disabled }: ExportToCSVDialogProps<TData>) {
  const [filename, setFilename] = useState<string>(
    `nps-segment-${new Date().toISOString()}`,
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled}>Eksporter</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h2>Eksporter til CSV</h2>
        </DialogHeader>
        <p>
          Her kan du eksportere data fra segmentet til en CSV-fil. Denne fil kan
          du så importere i Excel eller Google Sheets.
        </p>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Konfigurer</AccordionTrigger>
            <AccordionContent>
              <div>
                <label>Filnavn</label>
                <Input
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Luk</Button>
          </DialogClose>
          <Button variant={"success"}>
            <CSVLink filename={`${filename}.csv`} data={data}>
              Export to CSV
            </CSVLink>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
