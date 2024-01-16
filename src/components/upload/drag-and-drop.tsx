import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { z } from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import {
  UserComment,
  UserResponseSegment,
  userResponseSegmentSchema,
} from "@/schemas/user-comment-schema";
import Papa from "papaparse";
import useUserResponseStore from "@/stores/user-reponse-store";
import { headerTranslations } from "@/components/tables/user-ratings-table/columns";
import { User } from "next-auth";

interface DragAndDropProps {
  closeDialogRef?: React.RefObject<HTMLButtonElement>;
}

export function DragAndDrop({ closeDialogRef }: DragAndDropProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const { setUserResponses } = useUserResponseStore();

  const [includeEmptyComments, setincludeEmptyComments] =
    useState<boolean>(false);
  const [headerMappings, setHeaderMappings] = useState<UserComment>({
    companyAccountNumber: "CompanyAccountNo",
    companyName: "CompanyName",
    rating: "Rating",
    userComment: "UserComment",
    surveySendTime: "SurveySendTime",
    weekYear: "CommentTime",
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file: File) => {
        try {
          setUploadedFileName(file.name);
          setIsLoading(true);
          const reader = new FileReader();

          reader.onabort = async () => console.log("file reading was aborted");
          reader.onerror = async () => console.log("file reading has failed");
          reader.onload = async () => {
            const binaryStr = reader.result;
            const parsedInput = z.string().parse(binaryStr);

            Papa.parse(parsedInput, {
              complete: function (result) {
                const data = result.data as any[];

                const keys = data[0] as string[];
                const mappedObject = data.slice(1, data.length).map((line) => {
                  //possible error
                  let mappedObj = {
                    segment: {
                      progress: "not_started",
                      messages: [],
                      shouldSegment: false,
                      segmentTrigger: null,
                    },
                    userResponse: {
                      companyAccountNumber: "",
                      companyName: "",
                      rating: "",
                      userComment: "",
                      surveySendTime: "",
                      weekYear: "",
                      negativeComments: [],
                      positiveComments: [],
                    },
                  };
                  keys.forEach((key, index) => {
                    const mappedKey = Object.keys(headerMappings).find(
                      // @ts-ignore
                      (k) => headerMappings[k] === key,
                    );
                    if (mappedKey) {
                      // @ts-ignore
                      mappedObj.userResponse[mappedKey] = line[index];
                    }
                  });

                  return mappedObj;
                });

                const parsedObject = z
                  .array(userResponseSegmentSchema)
                  .parse(mappedObject);

                if (!includeEmptyComments) {
                  const filtered = parsedObject.filter(
                    (obj) => obj.userResponse.userComment !== "",
                  );
                  setUserResponses(filtered);
                } else {
                  setUserResponses(parsedObject);
                }

                if (closeDialogRef) {
                  closeDialogRef.current?.click();
                }
                setIsLoading(false);
              },
            });
          };

          reader.readAsText(file, "utf-8");
        } catch (ex) {
          console.error(ex);
          setIsLoading(false);
        }
      });
    },
    [headerMappings, includeEmptyComments, setUserResponses, closeDialogRef],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div
        {...getRootProps()}
        className="border-2 border-dashed px-2 py-4 cursor-pointer flex justify-center items-center text-center flex-col space-y-2"
      >
        {isLoading ? (
          <p>Loading</p>
        ) : (
          <>
            <Input {...getInputProps()} />
            {uploadedFileName ? (
              <p>{uploadedFileName}</p>
            ) : (
              <>
                <Upload />
                {isDragActive ? (
                  <p>Drop filen her ...</p>
                ) : (
                  <p>
                    Drag &apos;n&apos; drop filen hertil eller klik inden for
                    stregerne
                  </p>
                )}
              </>
            )}
          </>
        )}
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Konfigurer</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label className="capitalize">
                  Inkluder tomme kommentarer:{" "}
                </label>
                <Checkbox
                  checked={includeEmptyComments}
                  onCheckedChange={(checked) =>
                    setincludeEmptyComments(!includeEmptyComments)
                  }
                />
              </div>
              <p>
                Skriv de værdier der tilsvarer tabel kolonnerne på den fil du
                vil importere.
              </p>
              {Object.keys(headerMappings).map((key) => (
                <div key={key}>
                  <label className="capitalize">
                    {
                      // @ts-ignore
                      headerTranslations[key]
                    }
                    :
                  </label>
                  <Input
                    // @ts-ignore
                    value={headerMappings[key]}
                    onChange={(e) =>
                      setHeaderMappings({
                        ...headerMappings,
                        [key]: e.target.value,
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
