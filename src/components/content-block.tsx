import React from 'react';

export default function ContentBlock({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg=[#f7f7fa] shadow-sm roudned-md overflow-hidden">
      {children}
    </div>
  );
}
