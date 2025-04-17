
import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { TableHeader as SortableHeader } from './TableHeader';
import { SearchBar } from './SearchBar';
import { User } from '@/hooks/useUsers';
import { motion } from 'framer-motion';

interface UserTableProps {
  users: User[];
}

export const UserTable = ({ users }: UserTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'asc' | 'desc' | null;
  }>({ key: null, direction: null });

  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction:
        current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const filteredAndSortedUsers = useMemo(() => {
    let filteredUsers = users.filter(
      user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig.key && sortConfig.direction) {
      filteredUsers.sort((a: any, b: any) => {
        const aValue = sortConfig.key === 'company' 
          ? a[sortConfig.key].name 
          : a[sortConfig.key];
        const bValue = sortConfig.key === 'company'
          ? b[sortConfig.key].name
          : b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filteredUsers;
  }, [users, searchTerm, sortConfig]);

  return (
    <Card className="w-full overflow-hidden bg-white/70 backdrop-blur-md border-jungle-primary/20">
      <div className="p-4">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>
      <div className="w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <SortableHeader
                  label="Name"
                  sortKey="name"
                  currentSort={sortConfig.key}
                  sortDirection={sortConfig.direction}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead>
                <SortableHeader
                  label="Email"
                  sortKey="email"
                  currentSort={sortConfig.key}
                  sortDirection={sortConfig.direction}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead>
                <SortableHeader
                  label="Company Name"
                  sortKey="company"
                  currentSort={sortConfig.key}
                  sortDirection={sortConfig.direction}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedUsers.map((user) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="hover:bg-jungle-secondary/30 transition-colors"
              >
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.company.name}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.website}</TableCell>
                <TableCell>
                  {`${user.address.street}, ${user.address.suite}, ${user.address.city}`}
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
