import { UserResponse } from "@/schemas/user-comment-schema";

export const testUserComments: UserResponse[] = [
  {
    companyAccountNumber: 8177590,
    companyName: "3f Frederikshavn",
    rating: 9,
    userComment:
      "Hurtig levering, og da der manglede noget af det bestilte, tog jeg kontakt og fik dejlig betjening.",
    surveySendTime: "3/2/2023",
    weekYear: "09/2023",
    positiveComments: [
      "Kundeservice - God service",
      "Levering - Hurtig leveringstid",
      "",
    ],
    negativeComments: ["", "", ""],
    progress: "default",
  },
  {
    companyAccountNumber: 8162949,
    companyName: "Afdeling For Klinisk Biokemi, Glostrup",
    rating: 10,
    userComment:
      "Det er altid nemt og overskueligt, at finde de varer man søger. Der er altid hurtig levering af varer.",
    surveySendTime: "3/2/2023",
    weekYear: "09/2023",
    positiveComments: [
      "Lomax.dk - God hjemmeside/nem genbestilling/overskuelig",
      "Levering - Hurtig leveringstid",
      "",
    ],
    negativeComments: ["", "", ""],
    progress: "default",
  },
  {
    companyAccountNumber: 37338,
    companyName: "Asger G. Jørgensen A/S",
    rating: 0,
    userComment: "I er sygt dyre med jeres priser",
    surveySendTime: "3/2/2023",
    weekYear: "09/2023",
    positiveComments: ["", "", ""],
    negativeComments: ["Pris - Høje priser/dårlige tilbud", "", ""],
    progress: "default",
  },
  {
    companyAccountNumber: 8155264,
    companyName: "Assens Fjernvarme Produktion A/S",
    rating: 8,
    userComment: "priser priser ",
    surveySendTime: "3/2/2023",
    weekYear: "09/2023",
    positiveComments: ["", "", ""],
    negativeComments: ["Pris - Høje priser/dårlige tilbud", "", ""],
    progress: "default",
  },
  {
    companyAccountNumber: 8190334,
    companyName: "Bedre Bolig ApS",
    rating: 10,
    userComment: "Nemt at bestille og i giver svar på henvendelser",
    surveySendTime: "3/2/2023",
    weekYear: "09/2023",
    positiveComments: [
      "Lomax.dk - God hjemmeside/nem genbestilling/overskuelig",
      "Kundeservice - God service",
      "",
    ],
    negativeComments: ["", "", ""],
    progress: "default",
  },
];
