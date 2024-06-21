import React from 'react';
import Table from '../../../components/Table/index.tsx';

const BookList = ({ books, onEdit, onDelete, currentPage, onAction, setCurrentPage, heads }) => {
  return (
    <Table columns={heads} data={books} onReturn={''} onEdit={onEdit} onAction={onAction} currentPage={currentPage} setCurrentPage={setCurrentPage} onDelete={onDelete} />
);
};

export default BookList;
