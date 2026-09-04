import { Download, Upload } from 'lucide-react';
import { ProfileData } from '../types';

interface ExportImportProps {
  data: ProfileData;
  onImport: (data: ProfileData) => void;
}

export function ExportImport({ data, onImport }: ExportImportProps) {
  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `profile-${data.contact.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        onImport(json);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleDownloadJSON}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors text-sm font-medium"
      >
        <Download className="w-4 h-4" />
        <span>Export JSON</span>
      </button>

      <label className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg shadow-sm transition-colors text-sm font-medium cursor-pointer">
        <Upload className="w-4 h-4" />
        <span>Import JSON</span>
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>
    </div>
  );
}
