import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts"

const AdminChart = ({chartData}) => {
    return (
        <div className="container">
            <div className="mx-auto max-w-4xl p-4">
                <ResponsiveContainer width="95%" height={400}>
                    <BarChart width={1000} height={300} data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="rgba(75, 192, 192, 0.6)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default AdminChart