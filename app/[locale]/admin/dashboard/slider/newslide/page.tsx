import React from "react";
import CreateNewSlider from "@/components/slider/createNewSlider"
import { addSlider } from "@/app/models/db/lib/actions/sliders";
async function page() {
  

  return (
   <>
   <CreateNewSlider action={addSlider}/>
   </>
  );
}

export default page;
