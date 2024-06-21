import React, { useEffect, useContext, useState } from 'react';
import { Container, Box, TextField, Button } from '@mui/material';
import ReaderForm from './ReaderForm/index.tsx';
import ReaderList from './ReaderList/index.tsx';
import { AccountContext, AccountContextType } from '../../contexts/Account/index.tsx';

const ReaderManagement = () => {
  const context = useContext(AccountContext) as AccountContextType;
  if (!context) {
    throw new Error('Errors');
  }
  const { accounts, setAccounts } = context;
    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'username', headerName: 'Name' },
        { field: 'phone', headerName: 'Phone' },
        { field: 'email', headerName: 'Email' },

      ];
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [readerToEdit, setReaderToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredAccounts, setFilteredAccounts] = useState(accounts);
      console.log(context);
      
  useEffect(() => {
    setFilteredAccounts(accounts.filter(
      (account) =>
        account.username.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  }, [accounts, searchQuery]);
  // const handleFormOpen = () => {
  //   setReaderToEdit(null);
  //   setIsFormOpen(true);
  // };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleSaveReader = (reader) => {
    if (readerToEdit) {
      setAccounts(accounts.map((b) => (b.id === readerToEdit.id ? { ...b, ...reader } : b)));
    } else {
      const newID = accounts.length + 1
      setAccounts([...accounts, { ...reader, id: newID }]);
    }
    handleFormClose();
  };

  const handleEditReader = (reader) => {
    setReaderToEdit(reader);
    setIsFormOpen(true);
  };

  const handleDeleteReader = (id) => {
    setAccounts(accounts.filter((reader) => reader.id !== id));
  };
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to the first page when searching
    setFilteredAccounts(accounts.filter(
      (acc) => acc.username.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  };

  const actionList =[
    'Delete',
    'Edit'
  ]

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
        <TextField
          label="Search by name"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          variant="outlined"
        />
         <Button style={{left:'-805px'}} variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
        {/* <Button variant="contained" color="success" onClick={handleFormOpen}>
          Add Reader
        </Button> */}
      </Box>
      <ReaderList readers={filteredAccounts} onDelete={handleDeleteReader} onAction={actionList} currentPage={currentPage} setCurrentPage={setCurrentPage} onEdit={handleEditReader} heads={columns}/>
      <ReaderForm open={isFormOpen} handleClose={handleFormClose} onSave={handleSaveReader} readerToEdit={readerToEdit} />
    </Container>
  );
};

export default ReaderManagement;
