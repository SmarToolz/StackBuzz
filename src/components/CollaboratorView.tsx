import React, { useState } from 'react';
import { ActionableCreator, mockActionableCreators } from '@/lib/mock-data';
import CollaboratorCard from './CollaboratorCard';
import CollaboratorDetailModal from './CollaboratorDetailModal';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { downloadCSV } from '@/lib/export-utils';

// Define the categories based on the mock data structure
type CategoryKey = ActionableCreator['category'];

const categoryMap: Record<CategoryKey, { title: string; description: string }> = {
  'Reach Target': {
    title: 'Reach Targets (10k–100k subs)',
    description: 'High-authority creators for major exposure.',
  },
  'Peer Swap': {
    title: 'Peer Swaps (Similar size)',
    description: 'Mid-tier creators for mutual growth and engagement.',
  },
  'Rising Star': {
    title: 'Rising Stars (High engagement, low subs)',
    description: 'New, highly engaged creators showing rapid velocity.',
  },
};

const CollaboratorView: React.FC = () => {
  const [selectedCreator, setSelectedCreator] = useState<ActionableCreator | null>(null);

  // Group creators by category
  const groupedCreators = mockActionableCreators.reduce((acc, creator) => {
    const key = creator.category;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(creator);
    return acc;
  }, {} as Record<CategoryKey, ActionableCreator[]>);

  const categories: CategoryKey[] = ['Reach Target', 'Peer Swap', 'Rising Star'];

  const handleCardClick = (creator: ActionableCreator) => {
    setSelectedCreator(creator);
  };

  const handleCloseModal = () => {
    setSelectedCreator(null);
  };
  
  const handleExport = () => {
    downloadCSV(mockActionableCreators, 'stackbuzz_collaborators_current_topic.csv');
    toast.success(`Exported ${mockActionableCreators.length} collaborators.`);
  };

  return (
    <div className="space-y-12">
      {/* Export Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleExport} 
          variant="outline" 
          className="bg-gray-900 border-gray-700 text-white hover:bg-gray-800"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Collaborator List ({mockActionableCreators.length})
        </Button>
      </div>
      
      {categories.map((category) => {
        const creators = groupedCreators[category] || [];
        const details = categoryMap[category];

        if (creators.length === 0) return null;

        return (
          <section key={category}>
            <h3 className="text-2xl font-bold text-white mb-2">
              {details.title}
            </h3>
            <p className="text-gray-400 mb-6">{details.description}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {creators.map((creator) => (
                <CollaboratorCard 
                  key={creator.id} 
                  creator={creator} 
                  onClick={handleCardClick}
                />
              ))}
            </div>
          </section>
        );
      })}

      {selectedCreator && (
        <CollaboratorDetailModal
          creator={selectedCreator}
          isOpen={!!selectedCreator}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CollaboratorView;