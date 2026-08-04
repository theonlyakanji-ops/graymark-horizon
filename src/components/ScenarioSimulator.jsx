import React, { useState } from 'react';
import { Sliders, Zap, Shield, Cpu, RefreshCw } from 'lucide-react';

export default function ScenarioSimulator({ analysisData }) {
  const [scenario, setScenario] = useState('moderate');

  if (!analysisData) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          background: 'var(--bg-subtle)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem',
          color: 'var(--text-muted)'
        }}>
          <Sliders size={24} />
        </div>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>No Active Degree Loaded</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: 340, margin: '0 auto' }}>
          Analyze a degree in the Degree Disruption Radar tab first to simulate future AI impact scenarios.
        </p>
      </div>
    );
  }

  const baseImpact = analysisData.disruptionScores.aiImpactIndex || 75;

  const scenarios = {
    conservative: {
      title: 'Conservative Shift (Gradual AI Integration)',
      impactModifier: -15,
      automationModifier: -15,
      description: 'Slow corporate adoption and high regulatory safeguards. Traditional skills remain relevant longer, but tech-savvy professionals still gain a distinct edge.'
    },
    moderate: {
      title: 'Moderate Shift (Standard 5-Year Evolution)',
      impactModifier: 0,
      automationModifier: 0,
      description: 'Standard technology adoption cycle. Generative AI tools automate routine drafting, ledger entry, and photo editing while humans manage strategy and ethics.'
    },
    accelerated: {
      title: 'Accelerated AI Shift (Autonomous Agent Deployment)',
      impactModifier: 15,
      automationModifier: 18,
      description: 'Autonomous AI agents handle 80%+ of execution tasks. Career survival requires shifting completely into AI orchestration, system auditing, and high-touch client relationships.'
    }
  };

  const activeScenario = scenarios[scenario];
  const calculatedImpact = Math.min(99, Math.max(30, baseImpact + activeScenario.impactModifier));
  const calculatedAutomation = Math.min(98, Math.max(25, (analysisData.disruptionScores.routineTaskAutomation || 70) + activeScenario.automationModifier));

  return (
    <div className="animate-fade-in" role="region" aria-label="Future Scenario Simulator">
      <div className="card" style={{ marginBottom: '1.25rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>
            Future Automation Scenario Simulator: {analysisData.degreeName}
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Simulate how different industry adoption speeds will impact career demand for {analysisData.degreeName}.
          </p>
        </div>

        {/* Scenario Buttons */}
        <div className="grid-3">
          <button
            onClick={() => setScenario('conservative')}
            className={`btn ${scenario === 'conservative' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.75rem', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}
          >
            <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>Conservative</span>
            <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Gradual Shift</span>
          </button>

          <button
            onClick={() => setScenario('moderate')}
            className={`btn ${scenario === 'moderate' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.75rem', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}
          >
            <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>Moderate</span>
            <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Standard 5-Yr Baseline</span>
          </button>

          <button
            onClick={() => setScenario('accelerated')}
            className={`btn ${scenario === 'accelerated' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.75rem', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}
          >
            <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>Accelerated AI</span>
            <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Autonomous Agents</span>
          </button>
        </div>
      </div>

      {/* Scenario Output Card */}
      <div className="card">
        <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sliders size={18} />
          {activeScenario.title}
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
          {activeScenario.description}
        </p>

        {/* Simulated Metrics */}
        <div className="grid-2">
          <div className="score-box">
            <span className="score-value" style={{ color: 'var(--color-warning)' }}>
              {calculatedImpact}%
            </span>
            <span className="score-label">Simulated Disruption Rating</span>
          </div>

          <div className="score-box">
            <span className="score-value" style={{ color: 'var(--color-danger)' }}>
              {calculatedAutomation}%
            </span>
            <span className="score-label">Routine Task Automation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
