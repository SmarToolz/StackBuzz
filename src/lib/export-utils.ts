export function downloadCSV(data: any[], filename: string) {
  if (data.length === 0) return;

  // 1. Get headers (keys of the first object)
  const headers = Object.keys(data[0]);

  // 2. Convert data rows to CSV format
  const csvRows = data.map(row => {
    return headers.map(fieldName => {
      const value = row[fieldName];
      // Handle nested objects/arrays by stringifying them, and escape quotes
      const stringValue = typeof value === 'object' && value !== null
        ? JSON.stringify(value).replace(/"/g, '""')
        : String(value).replace(/"/g, '""');
      
      // Wrap values in quotes if they contain commas or newlines
      return `"${stringValue}"`;
    }).join(',');
  });

  // 3. Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...csvRows
  ].join('\n');

  // 4. Create Blob and download link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}