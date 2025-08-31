import React from 'react';

const BreakdownPanel: React.FC<{ breakdown: string }> = ({ breakdown }) => {
    return (
        <div className="breakdown-panel">
            <h2>Code Breakdown</h2>
            <pre>{breakdown}</pre>
        </div>
    );
};

export default BreakdownPanel;