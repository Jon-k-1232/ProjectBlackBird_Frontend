import React, { useState, useEffect } from 'react';
import Router from './routes';
import ThemeConfig from './Theme';
import GlobalStyles from './Theme/globalStyles';
import { getAllCompanies } from './ApiCalls/ApiCalls';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

export default function App() {
  const [companies, setCompanies] = useState(null);
  const [employees, setEmployees] = useState(null);

  useEffect(async () => {
    const allCompanies = await getAllCompanies();
    setCompanies(allCompanies);

    // Mock Api Call
    // const allEmployees = getEmployees();
    // setEmployees(allEmployees.allEmployees);
  }, []);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <ThemeConfig>
      <GlobalStyles />
      {companies ? (
        <Router allClients={companies} allEmployees={employees} />
      ) : (
        <div className='sweet-loading' style={{ height: '99vh', display: 'flex', alignItems: 'center' }}>
          <ClipLoader sizeUnit={'px'} color={'#ffffff'} loading={true} css={override} size={150} />
        </div>
      )}
    </ThemeConfig>
  );
}
