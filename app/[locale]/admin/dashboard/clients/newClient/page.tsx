import React from "react";
import CreateNewClient from "@/components/clients/createNewClient"
import { addClient } from "@/app/models/db/lib/actions/clients";
async function page() {
  

  return (
   <>
   <CreateNewClient action={addClient}/>
   </>
  );
}

export default page;
