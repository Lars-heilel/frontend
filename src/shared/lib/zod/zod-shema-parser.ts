import type { SafeParseSuccess, ZodSchema } from "zod";

export async function zodSchemaParser<T>(
  schema: ZodSchema<T>,
  data: unknown,
): Promise<SafeParseSuccess<T>> {
  const parseResult = await schema.safeParseAsync(data);
  if (parseResult.success) {
    return parseResult;
  } else {
    throw parseResult.error;
  }
}
