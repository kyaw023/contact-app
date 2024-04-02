import React from "react";
import emptyLists from "../../assets/emptyLists.json";
import LoadingComponent from "../Loading/Loading.component";

const EmptyComponent = () => {
  return (
    <div className=" w-[340px] h-[340px] mx-auto ">
      <LoadingComponent data={emptyLists} />
    </div>
  );
};

export default EmptyComponent;
