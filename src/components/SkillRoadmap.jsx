import React from 'react';
import { GitCommit, CheckCircle2, ArrowRight, Award, Clock, BookOpen, ExternalLink } from 'lucide-react';

export default function SkillRoadmap({ analysisData }) {
  if (!analysisData) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          background: 'var(--bg-subtle)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem',
          color: 'var(--text-muted)'
        }}>
          <GitCommit size={24} />
        </div>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>No Skill Roadmap Loaded</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: 340, margin: '0 auto' }}>
          Please perform a degree search in the Degree Disruption Radar tab first to view your customized 90-day & 1-year skill bridge roadmap.
        </p>
      </div>
    );
  }

  const roadmap = analysisData.skillBridgeRoadmap || [];

  return (
    <div className="animate-fade-in" role="region" aria-label="Skill Bridge Roadmap">
      <div className="card" style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>
              Skill Bridge Roadmap: {analysisData.degreeName}
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Step-by-step milestones, recommended certifications, and estimated learning hours to future-proof your career.
            </p>
          </div>
          <span className="badge badge-success">Future Proof Strategy</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {roadmap.map((item, idx) => (
          <div key={idx} className="card" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
              <span className="badge badge-neutral" style={{ fontSize: '0.75rem' }}>
                {item.phase}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {item.estimatedHours && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={12} /> {item.estimatedHours}
                  </span>
                )}
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Step {idx + 1} of {roadmap.length}
                </span>
              </div>
            </div>

            <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Target Skill: {item.targetSkill}
            </h3>

            <p style={{ fontSize: '0.84375rem', color: 'var(--text-secondary)', lineHeight: 1.5, background: 'var(--bg-subtle)', padding: '0.875rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: '0.75rem' }}>
              <strong>Action Plan:</strong> {item.actionPlan}
            </p>

            {item.recommendedCertification && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78125rem', color: 'var(--text-primary)', background: 'var(--bg-card)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <Award size={14} color="var(--color-warning)" />
                <span><strong>Recommended Certification Path:</strong> {item.recommendedCertification}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
