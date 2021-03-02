import React from 'react';
import { TVChartContainer } from './components/TVChartContainer/index';
import { useParams } from 'react-router-dom';


const Chart =  () => {
    let { from, to } = useParams();
    return (
        <div className={'Chart'}>
            <TVChartContainer from={from} to={to} />
        </div>
    );

}
export default Chart;
