import { z } from "zod";

// deno-lint-ignore no-explicit-any
export function parseZodError(errorResponse: z.ZodError<any>) {
  const issues = errorResponse.issues;
  const errors = issues.reduce((acc: Record<string, string>, issue) => {
    acc[issue.path.join(".")] = issue.message;
    return acc;
  }, {});
  return errors;
}

export function returnValidationData(errorResponse: z.ZodError) {
  const issues = errorResponse.issues;
  const errors = issues.reduce(
    (
      acc: Record<string, { code: "validation_failed"; message: string }>,
      issue,
    ) => {
      acc[issue.path.join(".")] = {
        code: "validation_failed",
        message: issue.message,
      };
      return acc;
    },
    {},
  );
  return errors;
}
