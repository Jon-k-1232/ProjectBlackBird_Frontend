import React, { useState, useEffect } from 'react';
import Router from './routes';
import ThemeConfig from './Theme';
import GlobalStyles from './Theme/globalStyles';
import { getCompanies } from './ApiCalls/ApiCalls';
import { companyDataAdapter } from './ApiCalls/DataAdapter';
import { css } from '@emotion/react';
import ClockLoader from 'react-spinners/ClipLoader';

export default function App() {
	const [companies, setCompanies] = useState(null);

	useEffect(() => {
		const allCompaniesRaw = getCompanies();
		const allCompanies = companyDataAdapter(allCompaniesRaw);
		setCompanies(allCompanies);
	}, []);

	const override = css`
		display: block;
		margin: 0 auto;
		border-color: red;
	`;

	return (
		<ThemeConfig>
			<GlobalStyles />
			{companies ? <Router allClients={companies} /> : <ClockLoader color={'#ffffff'} loading={true} css={override} size={150} />}
		</ThemeConfig>
	);
}
