import React from "react";

export default function SuccessMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-green-500 rounded-md mb-4 border-4 border-green-900">
        <p className="text-white text-md text-center py-2">{children}</p>
      </div>
    </>
  );
}
