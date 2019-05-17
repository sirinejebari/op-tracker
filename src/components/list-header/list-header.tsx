import React from 'react';
import './list-header.scss'

const ListHeader: React.FC = () => {

  return (
    <div className="header card">
      <div className="reference">Reference</div>
      <div className="operator">Operator</div>
      <div className="status">Status</div>
      <div className="description">Description</div>
      <div className="date-updated">Update date</div>
    </div>
  )
}

export default ListHeader;