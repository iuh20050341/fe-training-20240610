import React from 'react';
import Table from '../../../components/Table/index.tsx';

const ReaderList = ({ isButtonDisabled, readers, onEdit, onDelete, currentPage, onAction, setCurrentPage, heads }) => {
  return (
    <Table isButtonDisabled={isButtonDisabled} columns={heads} data={readers} onEdit={onEdit} onRead ={''} onReturn={''} onAction={onAction} currentPage={currentPage} setCurrentPage={setCurrentPage} onDelete={onDelete} />
);
};

export default ReaderList;
