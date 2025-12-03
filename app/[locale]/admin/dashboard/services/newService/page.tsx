import React from "react";
import CreateNewService from "@/components/services/createNewService"
import { addService } from "@/app/models/db/lib/actions/services";
async function page() {
  

  return (
   <>
   <CreateNewService action={addService}/>
   </>
  );
}

export default page;
