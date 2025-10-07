import React from "react";

export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-red-500 rounded-md mb-4 border-4 border-red-900">
        <p className="text-white text-md text-center py-2">{children}</p>
      </div>
    </>
  );
}
