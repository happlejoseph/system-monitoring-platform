

import { PieChart, Pie, Cell, label } from "recharts";


const MetricChart = ({value, label})=> {

    const data = [

        {name: 'Used', value: value},
        {name: 'Available', value: 100 - value}
    ];

    return (
     <div> 
        <PieChart width={250} height={250}>
        <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
        >
            <Cell />
            <Cell />

            <Label
                value={`${value}%`}
                position="center"
            />
        </Pie>
        </PieChart>

        <p>{label}</p>
    </div>   
    )
}

export default MetricChart;