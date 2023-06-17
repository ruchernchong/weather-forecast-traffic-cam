import { PropsWithChildren } from "react";

const Card = ({ children }: PropsWithChildren) => {
  return (
    <div className="prose flex cursor-pointer flex-col rounded-lg border p-4 shadow hover:border-neutral-900 hover:shadow-md">
      {children}
    </div>
  );
};

export default Card;
