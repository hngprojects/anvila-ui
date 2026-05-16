/* eslint-disable @typescript-eslint/no-explicit-any */

import { z } from "zod";
import type { Resolver } from "react-hook-form";

export function zodResolver<TSchema extends z.ZodTypeAny>(
  schema: TSchema
): Resolver<any, any, any> {
  return async (values: any) => {
    const result = schema.safeParse(values);
    if (result.success) {
      return { values: result.data, errors: {} };
    }
    const errors: any = {};
    result.error.issues.forEach((issue) => {
      const path = issue.path.join(".");
      errors[path] = { type: "validation", message: issue.message };
    });
    return { values: {}, errors };
  };
}
