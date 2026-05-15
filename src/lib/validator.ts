import { z } from "zod";
import type { FieldValues, ResolverResult } from "react-hook-form";

export function zodResolver<T extends z.ZodTypeAny>(schema: T) {
  return async (values: FieldValues): Promise<ResolverResult> => {
    const result = schema.safeParse(values);

    if (result.success) {
      // @ts-expect-error
      return { values: result.data, errors: {} };
    }

    const errors: Record<string, { type: string; message: string }> = {};
    result.error.issues.forEach((issue) => {
      const path = issue.path.join(".");
      errors[path] = {
        type: "validation",
        message: issue.message,
      };
    });

    return { values: {}, errors };
  };
}
