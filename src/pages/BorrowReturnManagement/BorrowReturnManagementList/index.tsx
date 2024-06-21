import React from 'react';
import Table from '../../../components/Table/index.tsx';

const BorrowReturnManagementList = ({ datas, onReturn, currentPage, onAction, setCurrentPage, heads }) => {
  return (
    <Table columns={heads} data={datas} onEdit={''} onDelete={''} onReturn={onReturn} onAction={onAction} currentPage={currentPage} setCurrentPage={setCurrentPage}  />
);
};

export default BorrowReturnManagementList;
