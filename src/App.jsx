import { useState, useEffect } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { format } from 'date-fns';

// Use the imports to ensure they are bundled (for license extraction)
console.log('Lodash version:', _.VERSION);
console.log('Axios version:', axios.VERSION);
console.log('Current date:', format(new Date(), 'yyyy-MM-dd'));

function App() {
    const [licenses, setLicenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const isProd = import.meta.env.PROD;

    useEffect(() => {
        if (!isProd) {
            setLoading(false);
            return;
        }

        fetch('/oss-license.json')
            .then((res) => res.json())
            .then((data) => {
                setLicenses(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [isProd]);

    if (loading) return <div className="app"><p>Loading...</p></div>;

    if (!isProd) {
        return (
            <div className="app">
                <h1>OSS License Information</h1>
                <p><em>License list only available after production build.</em></p>
                <p>Run <code>pnpm build</code> then <code>pnpm preview</code></p>
            </div>
        );
    }

    return (
        <div className="app">
            <h1>OSS License Information</h1>
            <p>Total packages: {licenses.length}</p>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Version</th>
                        <th>Publisher</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {licenses.map((pkg) => (
                        <tr key={pkg.name}>
                            <td>{pkg.name}</td>
                            <td>{pkg.version}</td>
                            <td>{pkg.publisher || 'Unknown'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
