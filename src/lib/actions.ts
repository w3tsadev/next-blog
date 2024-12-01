"use server";
import { validateEmailAddress } from "@/app/blog/utils";
import { db } from "@/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const FormSchema = z.object({
  id: z.number(),
  email: z
    .string()
    .email({ message: "A valid Email is required." })
    .refine(validateEmailAddress, {
      message: "Email does not meet custom validation rules",
    }),
  isSubscribed: z.boolean(),
});

const CreateSubscriber = FormSchema.omit({ id: true, isSubscribed: true });

type State = {
  errors?: {
    email?: string[];
  };
  message?: string | null;
};

export async function createSubscriber(prevState: State, formData: FormData) {
  const validatedField = await CreateSubscriber.safeParseAsync({
    email: formData.get("email"),
  });

  if (!validatedField.success) {
    return {
      errors: validatedField.error.flatten().fieldErrors,
      message: "Email is Required",
    };
  }

  const { email } = validatedField.data;

  try {
    await db.subscriber.create({
      data: {
        email: email,
      },
    });
    revalidatePath("/");
    return { message: "Thank you for Subscribing!" };
  } catch (error) {
    if (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return {
            message: "Email already Exist in the DB",
          };
        }
      }
    }

    return { message: "Database Error: Failed to create Subscriber." };
  }
}
