import type { GetServerSidePropsContext, NextApiRequest } from "next";

import { getServerSession } from "@calcom/features/auth/lib/getServerSession";

export async function getLocaleFromRequest(
  req: NextApiRequest | GetServerSidePropsContext["req"]
): Promise<string> {
  const session = await getServerSession({ req });
  if (session?.user?.locale) return session.user.locale;
  // Force Lithuanian as the default locale for the LT fork.
  // Previously this relied on Accept-Language, which falls back to English
  // for most browsers and made the UI appear in English.
  return "lt";
}
