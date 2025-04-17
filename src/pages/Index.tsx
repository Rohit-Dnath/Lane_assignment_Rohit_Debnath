
import { useUsers } from '@/hooks/useUsers';
import { UserTable } from '@/components/UserDashboard/UserTable';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const { users, loading, error } = useUsers();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-jungle-secondary to-jungle-primary/10">
        <div className="text-center text-red-500">
          <h1 className="text-2xl font-bold mb-2">Error</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-jungle-secondary to-jungle-primary/10">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-jungle-primary mb-2 animate-fade-in">
            User Management Dashboard
          </h1>
          <p className="text-gray-600 animate-fade-in">
            Made by{' '}
            <a
              href="https://www.linkedin.com/in/rohit-debnath/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-jungle-primary underline hover:text-jungle-secondary"
            >
              Rohit Debnath
            </a>{' '}
            with 💖
          </p>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-jungle-primary" />
          </div>
        ) : (
          <UserTable users={users} />
        )}
      </div>
    </div>
  );
};

export default Index;
