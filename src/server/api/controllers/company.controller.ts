import { db } from "@/server/db";
import { Company } from "@prisma/client";

type CreateCompanyProps = {
  companyNumber: string;
  companyName: string;
};

export async function createCompany({
  companyName,
  companyNumber,
}: CreateCompanyProps): Promise<Company> {
  return await db.company.create({
    data: {
      companyAccountName: companyName,
      companyAccountNumber: companyNumber,
    },
  });
}
