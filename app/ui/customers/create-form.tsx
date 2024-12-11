'use client';

import { useActionState } from 'react';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Form } from '@nextui-org/form';
import { Link } from '@nextui-org/link';
import { createCustomer } from '@/app/ui/customers/actions';

export default function CreateCustomerForm() {
  const initialState = { message: '', errors: {} };
  const [{ errors }, formAction] = useActionState(createCustomer, initialState);

  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <Form action={formAction} validationErrors={errors}>
        <Input label="Name" name="name" variant="bordered" size="sm" />
        <Input label="Email" name="email" variant="bordered" size="sm" />
        <div className="mt-6 flex justify-end gap-4">
          <Button
            href="/dashboard/customers"
            as={Link}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="solid"
          >Create Customer</Button>
        </div>
      </Form>
    </div>
  );
}
