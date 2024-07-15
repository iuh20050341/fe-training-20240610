import React, { useEffect, useState } from 'react';
import { Container, Box, Button } from '@mui/material';
import ReaderForm from './ReaderForm/index.tsx';
import ReaderList from './ReaderList/index.tsx';
import SearchInputBase from '../../components/Input/Search/index.tsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Users, User } from '../../types/user.type';
import userApi from '../../api/userApi.ts';
import { useMutation, useQuery, QueryClient } from '@tanstack/react-query';

const ReaderManagement = () => {
  const queryClient = new QueryClient()
  const [fetchError, setFetchError] = useState(false);
  const { data: fetchedUsers = [], refetch } = useQuery<Users[], Error>({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const response = await userApi.getAll();
        return response.data.data.result;
      } catch (error) {
        setFetchError(true);
        throw error;
      }
    },
    retry: false,
  });

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
  const [filteredAccounts, setFilteredAccounts] = useState(fetchedUsers);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (fetchError) return;
    if (fetchedUsers && fetchedUsers.length > 0) {
      const results = fetchedUsers.filter(
        (account) =>
          account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          account.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          account.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAccounts(results);
    }
  }, [fetchedUsers, searchQuery, fetchError]);

  const handleFormClose = () => {
    setIsFormOpen(false);
  }; 
  const updateUserMutation = useMutation({
    mutationFn: ({ data }: { data }) => userApi.update(data),
    onSuccess: (updatedData) => {
      console.log(updatedData);
      
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Cập nhật thành công');
      refetch(); 
      // setFilteredAccounts(prevAccounts => prevAccounts.map(account =>
      //   account.id === updatedData.data.id ? { ...account, ...updatedData.data } : account
      // ));
    },
    onError: (error: any) => {
      toast.error(`Cập nhật thất bại: ${error.message}`);
    }
  });
  const handleSaveReader = (reader: Users) => {
    if (readerToEdit && readerToEdit.id) {
      const updatedReader = { ...reader, id: readerToEdit.id };      
      updateUserMutation.mutate({ data: updatedReader });
      
    }
    handleFormClose();
  };

  const handleEditReader = async (id: string | number) => {
    try {
      const response = await userApi.get(id as string);
      setReaderToEdit(response.data.data);
      console.log(response.data.data);
      
      setIsFormOpen(true);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  const mutationDelete = useMutation({
    mutationFn: (id: number | string) => userApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      refetch(); 

    },
    onError: () => {
      toast.error('Delete thất bại');
    }
  });
  const handleDeleteReader = (id: number | string) => {
    setIsButtonDisabled(true);

    mutationDelete.mutate(id, {
      onSuccess: () => {
        setTimeout(() => {
          setIsButtonDisabled(false);
          toast.success('Delete thành công');
          }, 1500);
      },
    });
  };

  const handleSearch = (searchTerm: string) => {
    setCurrentPage(1); // Reset to the first page when searching
    const results = filteredAccounts.filter(
      (account) =>
        (account.name.toLowerCase().includes(searchQuery.toLowerCase()) || account.address.toLowerCase().includes(searchQuery.toLowerCase()) || account.email.toLowerCase().includes(searchQuery.toLowerCase())) && account.role?.id === 3
    );
    setFilteredAccounts(results);
    setSearchQuery(searchTerm);
  };

  const actionList = ['Delete', 'Edit'];

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
        <SearchInputBase onSearch={handleSearch} placehoder='Search Reader' />
        {/* <Button variant="contained" color="success" onClick={() => setIsFormOpen(true)}>
          Add Reader
        </Button> */}
      </Box>
      <ReaderList isButtonDisabled={isButtonDisabled} readers={filteredAccounts} onDelete={handleDeleteReader} onAction={actionList} currentPage={currentPage} setCurrentPage={setCurrentPage} onEdit={handleEditReader} heads={columns} />
      <ReaderForm open={isFormOpen} handleClose={handleFormClose} onSave={handleSaveReader} readerToEdit={readerToEdit} />
    </Container>
  );
};
export default ReaderManagement;
