'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const CustomerFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Please fill customer name.'),
  email: z.string().email({ message: 'Please fill valid email.' })
});

const CreateCustomer = CustomerFormSchema.omit({ id: true });

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
  };
  message?: string;
};

export async function createCustomer(prevState: State, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = CreateCustomer.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  try {
    const { name, email } = validatedFields.data;

    await sql`
        INSERT INTO customers (name, email, image_url)
        VALUES (${name}, ${email}, '/customers/balazs-orban.png')
    `;

  } catch (e) {
    return {
      message: 'Database Error: Failed to Create Customer.',
    };
  }

  revalidatePath('/dashboard/customer');
  redirect('/dashboard/customers');
}