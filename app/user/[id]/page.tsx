"use strict";

import { User } from "@/components/User/User";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <User id={id} />;
}
