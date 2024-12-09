import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link'

export function CreateCustomer() {
  return (
    <Button
      href="/dashboard/customers/create"
      as={Link}
      color="primary"
      variant="solid"
    >
      <span className="hidden md:block">Create Customer</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Button>
  );
}