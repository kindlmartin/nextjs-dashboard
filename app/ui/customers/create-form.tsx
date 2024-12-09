'use client';


import { useActionState } from 'react';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Form } from '@nextui-org/form';
import { Link } from '@nextui-org/link';
import { createCustomer } from '@/app/ui/customers/actions';

export default function CreateCustomerForm() {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useActionState(createCustomer, initialState);

  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <Form onSubmit={(e) => {
        e.preventDefault();
        let data = new FormData(e.currentTarget);

        dispatch(data);
      }}>
        <Input label="Name" type="string" key="name" variant="bordered" size="sm" isRequired
               isInvalid={!!state.errors?.name}
               errorMessage={state.errors?.name?.[0]} />
        <Input label="Email" type="string" key="email" variant="bordered" size="sm" isRequired
               isInvalid={!!state.errors?.email}
               errorMessage={state.errors?.name?.[0]} />
        <div className="mt-6 flex justify-end gap-4">
          <Button
            href="/dashboard/customers"
            as={Link}
            color="primary"
            variant="solid"
          >
            Cancel
          </Button>
          <Button type="submit">Create Customer</Button>
        </div>
      </Form>
    </div>
  );
}
