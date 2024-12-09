import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';


const CustomerFormSchema = z.object({
  id: z.string(),
  name: z.string({
    required_error: 'Please fill customer name.',
    invalid_type_error: 'Please fill customer name.',
  }),
  email: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
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

  const { name, email } = validatedFields.data;

  try {
    await sql`
    INSERT INTO customers (name, email)
    VALUES (${name}, ${email})
  `;
  } catch (e) {
    return {
      message: 'Database Error: Failed to Create Customer.',
    };
  }

  revalidatePath('/dashboard/customer');
  redirect('/dashboard/customers');
}