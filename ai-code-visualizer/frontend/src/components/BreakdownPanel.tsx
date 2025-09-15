// ai-code-visualizer/frontend/src/components/BreakdownPanel.tsx
import React from 'react';

interface BreakdownPanelProps {
    breakdown: string;
}

const BreakdownPanel: React.FC<BreakdownPanelProps> = ({ breakdown }) => {
    return (
        <div className="breakdown-panel">
            <h2>Code Breakdown</h2>
            <pre>{breakdown}</pre>
        </div>
    );
};

export default BreakdownPanel;