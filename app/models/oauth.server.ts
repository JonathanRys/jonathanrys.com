import arc from "@architect/functions";
import type { User } from "./user.server";
import type { Auth } from "googleapis";

export type OAuth = {
  id: User["id"];
  access_token: string;
  refresh_token: string;
};

export type OAuthItem = {
  pk: User["id"];
  sk: `oauth#${OAuth["id"]}`;
};

export const getTokensByUserId = async (
  userId: OAuth["id"]
): Promise<OAuth | null> => {
  const db = await arc.tables();
  const result = await db.user.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": userId },
  });

  const [record] = result.Items;
  if (record)
    return {
      id: record.pk,
      access_token: record.access_token,
      refresh_token: record.refresh_token,
    };
  return null;
};

export const upsertToken = async (
  userId: string,
  tokens?: Auth.Credentials
) => {
  const db = await arc.tables();
  const result = await db.user.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": userId },
  });

  // insert new record
  try {
    await db.oauth.put({
      pk: userId,
      ...tokens,
    });
  } catch {
    return { error: `Something went wrong updating record for ${userId}` };
  }
  if (result.Items) {
    // update simply means deleting the old record
    db.appointment.delete({ pk: userId });
  }
};
