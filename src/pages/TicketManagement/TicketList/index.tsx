import React from "react";
import Table from "../../../components/Table/index.tsx";

const TicketList = ({
  tickets,
  onRead,
  currentPage,
  onAction,
  setCurrentPage,
  heads,
  totalPages,
}) => {
  return (
    <Table
      isButtonDisabled={""}
      columns={heads}
      data={tickets}
      onEdit={""}
      onReturn={""}
      onDelete={""}
      onRead={onRead}
      onAction={onAction}
      totalPages={totalPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
};

export default TicketList;
