'use server';

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import { formSchema } from "@/lib/validation";

export const createStartUp = async (state, formData) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category, link, pitch } = Object.fromEntries(
    Array.from(formData)
  );

  const slug = slugify(title, { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
      views: 1,
    };

    console.log("Validating payload:", { title, description, category, link, pitch });
    await formSchema.parseAsync({ title, description, category, link, pitch });

    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    if (error.name === "ZodError") {
      const fieldErrors = error.flatten().fieldErrors;
      const formattedErrors = {};
      for (const key in fieldErrors) {
        formattedErrors[key] = fieldErrors[key][0];
      }
      console.log("Validation errors:", formattedErrors);
      return parseServerActionResponse({
        error: formattedErrors,
        status: "ERROR",
      });
    }

    console.error("SERVER ACTION ERROR:", error);

    return parseServerActionResponse({
      error: { general: error.message || "An unexpected error has occurred" },
      status: "ERROR",
    });
  }
};
