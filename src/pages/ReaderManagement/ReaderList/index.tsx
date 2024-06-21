import React from 'react';
import Table from '../../../components/Table/index.tsx';

const ReaderList = ({ readers, onEdit, onDelete, currentPage, onAction, setCurrentPage, heads }) => {
  return (
    <Table columns={heads} data={readers} onEdit={onEdit} onReturn={''} onAction={onAction} currentPage={currentPage} setCurrentPage={setCurrentPage} onDelete={onDelete} />
);
};

export default ReaderList;
