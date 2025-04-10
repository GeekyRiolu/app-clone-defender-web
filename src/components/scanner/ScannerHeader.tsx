
import React from 'react';

const ScannerHeader = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold">App Scanner</h1>
        <p className="text-muted-foreground">Scan app stores for potential clones</p>
      </div>
    </div>
  );
};

export default ScannerHeader;
