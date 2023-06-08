import React from 'react';
import PDFDownloadButton from './PDFDownloadButton';

const App = () => {
  const fileUrl = 'https://www.google.com/.pdf';
  const fileName = 'google.pdf';

  return (
    <div>
      <h1>PDF Download Example</h1>
      <PDFDownloadButton fileUrl={fileUrl} fileName={fileName} />
    </div>
  );
};

export default App;










