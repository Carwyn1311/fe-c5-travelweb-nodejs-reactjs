import React from 'react';

import '../css/DomesticToursPage.css';
import FormFilter from './FormFilter';
import FilterBar from './FilterBar';

const DomesticToursPage: React.FC = () => {
  return (
    <div className="domestic-tours-page">
      <div className="content">
        <FilterBar />
        <FormFilter />
      </div>
    </div>
  );
};

export default DomesticToursPage;
