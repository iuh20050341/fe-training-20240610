import React from 'react';
import Table from '../../../components/Table/index.tsx';

const BookList = ({ isButtonDisabled, books, onEdit, onDelete, currentPage, onAction, setCurrentPage, heads }) => {
  return (
    <Table isButtonDisabled={isButtonDisabled} columns={heads} data={books} onReturn={''} onRead={''} onEdit={onEdit} onAction={onAction} currentPage={currentPage} setCurrentPage={setCurrentPage} onDelete={onDelete} />
);
};

export default BookList;
