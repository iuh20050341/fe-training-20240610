import React, { useEffect, useContext, useState } from 'react';
import { Container, Box, Button } from '@mui/material';
import ReaderForm from './ReaderForm/index.tsx';
import ReaderList from './ReaderList/index.tsx';
import { AccountContext, AccountContextType } from '../../contexts/Account/index.tsx';
import SearchInputBase from '../../components/Input/Search/index.tsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Users } from '../../types/user.type';
import userApi from '../../api/userApi.ts';

const ReaderManagement = () => {
  const context = useContext(AccountContext) as AccountContextType;
  if (!context) {
    throw new Error('ReaderManagement must be used within an AccountProvider');
  }
  const { accounts, setAccounts } = context;

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'address', headerName: 'Address' },
  ];

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [readerToEdit, setReaderToEdit] = useState<Users | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredAccounts, setFilteredAccounts] = useState(accounts);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setFilteredAccounts(
        accounts.filter(
          (account) =>
            account.name.toLowerCase().includes(searchQuery.toLowerCase()) && account.role?.id === 3
        )
      );
    }
  }, [accounts, searchQuery]);

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleSaveReader = (reader: Users) => {
    if (readerToEdit && readerToEdit.id) {
      setAccounts(accounts.map((b) => (b.id === readerToEdit.id ? { ...b, ...reader } : b)));
    }
    handleFormClose();
  };

  const handleEditReader = async (id: string | number) => {
    try {
      const response = await userApi.get(id as string);
      setReaderToEdit(response.data.data);
      setIsFormOpen(true);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  const handleDeleteReader = (id: number) => {
    setIsButtonDisabled(true);
    setAccounts(accounts.filter((reader) => reader.id !== id));
    setTimeout(() => {
      setIsButtonDisabled(false);
      toast.success('Delete thành công');
    }, 1500);
  };

  const handleSearch = (searchTerm: string) => {
    setCurrentPage(1); // Reset to the first page when searching
    const results = accounts.filter(
      (account) =>
        account.name.toLowerCase().includes(searchTerm.toLowerCase()) && account.role?.id === 3
    );
    setFilteredAccounts(results);
    setSearchQuery(searchTerm);
  };

  const actionList = ['Delete', 'Edit'];

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
        <SearchInputBase onSearch={handleSearch} placehoder='Search Reader' />
        <Button variant="contained" color="success" onClick={() => setIsFormOpen(true)}>
          Add Reader
        </Button>
      </Box>
      <ReaderList isButtonDisabled={isButtonDisabled} readers={filteredAccounts} onDelete={handleDeleteReader} onAction={actionList} currentPage={currentPage} setCurrentPage={setCurrentPage} onEdit={handleEditReader} heads={columns} />
      <ReaderForm open={isFormOpen} handleClose={handleFormClose} onSave={handleSaveReader} readerToEdit={readerToEdit} />
    </Container>
  );
};

export default ReaderManagement;
