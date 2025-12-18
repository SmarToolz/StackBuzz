import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from 'lucide-react';
import { downloadCSV } from '@/lib/export-utils';
import { toast } from 'sonner';

interface ExportCardProps {
  title: string;
  description: string;
  data: any[];
  filename: string;
  icon: React.ElementType;
}

const ExportCard: React.FC<ExportCardProps> = ({ title, description, data, filename, icon: Icon }) => {
  const handleDownload = () => {
    if (data.length === 0) {
      toast.error(`No data available for ${title} export.`);
      return;
    }
    downloadCSV(data, filename);
    toast.success(`Exported ${data.length} records from ${title}.`);
  };

  return (
    <Card className="bg-gray-900 border-gray-800 text-white flex flex-col justify-between h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-3">
            <Icon className="h-6 w-6 text-brand-primary" />
            <CardTitle className="text-xl font-semibold text-white">
                {title}
            </CardTitle>
        </div>
        <span className="text-sm text-gray-400 tabular-nums">{data.length} records</span>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-gray-400 mb-4">{description}</p>
        <Button 
          onClick={handleDownload}
          className="w-full bg-brand-primary hover:bg-brand-hover"
          disabled={data.length === 0}
        >
          <Download className="h-4 w-4 mr-2" />
          Download CSV
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExportCard;