import React, { useState, useEffect } from 'react';
import { analyzeDegree } from '../services/horizonEngine';
import { exportAnalysisToPDF } from '../utils/pdfExport';
import {
  Search, Compass, AlertCircle, RefreshCw, Sparkles, Download,
  ExternalLink, Zap, Shield, Cpu, Layers, BookOpen
} from 'lucide-react';

export default function DegreeAnalyzer({ courseQuery, setCourseQuery, analysisData, setAnalysisData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const samplePresets = [
    'Law & Legal Studies',
    'Accounting & Finance',
    'Civil Engineering',
    'Graphic Design & Media',
    'Computer Science',
    'Nursing & Healthcare'
  ];

  useEffect(() => {
    if (!analysisData && !courseQuery) {
      handleSearch('Law & Legal Studies');
    }
  }, []);

  const handleSearch = async (queryToSearch) => {
    const target = queryToSearch || courseQuery;
    if (!target || !target.trim()) {
      setErrorMessage('Please type a degree, course, or field of study.');
      return;
    }

    setCourseQuery(target);
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const data = await analyzeDegree(target);
      setAnalysisData(data);
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred during evaluation.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(courseQuery);
    }
  };

  const handleExportPDF = () => {
    if (!analysisData) return;
    const htmlContent = `
      <div class="score-box">
        <div class="score-num">${analysisData.disruptionScores.aiImpactIndex}%</div>
        <div><strong>5-Year AI Disruption Index for ${analysisData.degreeName}</strong></div>
      </div>
      <div class="section">
        <h3>Executive 5-Year Outlook</h3>
        <p>${analysisData.executiveOutlook}</p>
      </div>
      <div class="section">
        <h3>Emerging 2028-2030 Hybrid Job Titles</h3>
        <ul>
          ${analysisData.emergingHybridRoles.map(r => `<li><strong>${r.title}:</strong> ${r.description}</li>`).join('')}
        </ul>
      </div>
      <div class="section">
        <h3>Displaced Legacy Tasks</h3>
        <ul>
          ${analysisData.whatIsObsolescent.map(o => `<li><strong>${o.legacyTask}:</strong> ${o.reason}</li>`).join('')}
        </ul>
      </div>
    `;
    exportAnalysisToPDF(`Future Career Blueprint - ${analysisData.degreeName}`, htmlContent);
  };

  const getDisruptionBadgeClass = (level) => {
    if (level === 'High Disruption') return 'badge-danger';
    if (level === 'High Human Advantage') return 'badge-success';
    return 'badge-warning';
  };

  return (
    <div className="animate-fade-in" role="region" aria-label="Degree Disruption Radar">
      {/* Header & Open-Ended Search Input */}
      <div className="card" style={{ marginBottom: '1.25rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Open-Ended Degree Evolution Search</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Type any academic course or degree to discover how AI and automation will transform your field over the next 5 years.
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 260, position: 'relative' }}>
            <input
              type="text"
              className="input"
              placeholder="Type any degree (e.g., Mechanical Engineering, Architecture, Journalism, Finance)..."
              value={courseQuery}
              onChange={(e) => setCourseQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Academic course or degree search input"
              style={{ paddingLeft: '2.25rem' }}
            />
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>

          <button
            onClick={() => handleSearch(courseQuery)}
            disabled={isLoading || !courseQuery.trim()}
            className="btn btn-primary"
            aria-label="Analyze Degree Disruption"
          >
            {isLoading ? (
              <>
                <RefreshCw size={16} className="pulse" />
                Parsing 5-Year Disruption Radar...
              </>
            ) : (
              <>
                <Compass size={16} />
                Analyze Degree Future
              </>
            )}
          </button>
        </div>

        {/* Preset Sample Toggles */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.875rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Quick Search:</span>
          {samplePresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSearch(preset)}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="card" style={{ background: 'var(--bg-danger)', border: '1px solid var(--border-danger)', marginBottom: '1.25rem', padding: '0.875rem 1.25rem' }} role="alert">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-danger)' }}>
            <AlertCircle size={16} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{errorMessage}</span>
          </div>
        </div>
      )}

      {/* Results View */}
      {isLoading && (
        <div className="card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }} role="status">
          <div className="pulse" style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>
            <RefreshCw size={32} style={{ animation: 'spin 1s linear infinite' }} />
          </div>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Analyzing 5-Year Disruption Radar</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Scanning labor market projections, automated task velocity, and sub-discipline impacts...
          </p>
        </div>
      )}

      {analysisData && !isLoading && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Executive Verdict & Export PDF */}
          <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
                <h3 style={{ fontSize: '1.125rem' }}>5-Year Outlook for {analysisData.degreeName}</h3>
                <span className="badge badge-info">2026 – 2031 Radar</span>
              </div>
              <p style={{ fontSize: '0.84375rem', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.45 }}>
                {analysisData.executiveOutlook}
              </p>
            </div>

            <button onClick={handleExportPDF} className="btn btn-secondary btn-sm" aria-label="Export Future Blueprint to PDF">
              <Download size={14} />
              PDF Blueprint
            </button>
          </div>

          {/* 3 Metric Radar Gauges */}
          <div className="grid-3">
            <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                <Zap size={14} color="var(--color-warning)" /> AI Disruption Index
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-warning)' }}>
                {analysisData.disruptionScores.aiImpactIndex}%
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Overall 5-year transformation rate
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                <Cpu size={14} color="var(--color-danger)" /> Routine Automation
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-danger)' }}>
                {analysisData.disruptionScores.routineTaskAutomation}%
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Repetitive tasks taking over by AI
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                <Shield size={14} color="var(--color-success)" /> Human Advantage
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-success)' }}>
                {analysisData.disruptionScores.humanAdvantageIndex}%
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Indispensable human judgment & empathy
              </p>
            </div>
          </div>

          {/* Sub-Discipline Breakdown Card */}
          {analysisData.subDisciplineBreakdown && analysisData.subDisciplineBreakdown.length > 0 && (
            <div className="card">
              <h4 style={{ fontSize: '0.9375rem', marginBottom: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <Layers size={16} color="var(--color-info)" />
                Sub-Discipline Disruption Breakdown
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {analysisData.subDisciplineBreakdown.map((sub, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-subtle)', padding: '0.75rem 0.875rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.84375rem', fontWeight: 700, color: 'var(--text-primary)' }}>{sub.subField}</span>
                      <span className={`badge ${getDisruptionBadgeClass(sub.disruptionLevel)}`} style={{ fontSize: '0.6875rem' }}>
                        {sub.disruptionLevel}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.78125rem', color: 'var(--text-secondary)' }}>
                      {sub.impactSummary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Emerging 2028-2030 Hybrid Job Titles */}
          <div className="card">
            <h4 style={{ fontSize: '0.9375rem', marginBottom: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <Sparkles size={16} color="var(--color-success)" />
              Emerging 2028–2030 Hybrid Job Titles
            </h4>
            <div className="grid-2">
              {analysisData.emergingHybridRoles.map((role, idx) => (
                <div key={idx} style={{ background: 'var(--bg-subtle)', padding: '0.875rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                    <h5 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {role.title}
                    </h5>
                    <span className="badge badge-success" style={{ fontSize: '0.6875rem' }}>
                      {role.estimatedDemand}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    {role.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Displaced Legacy Tasks */}
          <div className="card">
            <h4 style={{ fontSize: '0.9375rem', marginBottom: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <AlertCircle size={16} color="var(--color-warning)" />
              Legacy Tasks Becoming Obsolescent
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {analysisData.whatIsObsolescent.map((obs, idx) => (
                <div key={idx} style={{ background: 'var(--bg-subtle)', padding: '0.75rem 0.875rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <span className="badge badge-warning" style={{ fontSize: '0.6875rem', marginBottom: '0.25rem' }}>
                    Automating Task
                  </span>
                  <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.125rem' }}>
                    {obs.legacyTask}
                  </p>
                  <p style={{ fontSize: '0.78125rem', color: 'var(--text-secondary)' }}>
                    <strong>Why:</strong> {obs.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended AI & Tech Tools Matrix */}
          {analysisData.recommendedTools && analysisData.recommendedTools.length > 0 && (
            <div className="card">
              <h4 style={{ fontSize: '0.9375rem', marginBottom: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <BookOpen size={16} color="var(--color-info)" />
                Recommended Tech & AI Tools to Master Now
              </h4>
              <div className="grid-2">
                {analysisData.recommendedTools.map((tool, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-subtle)', padding: '0.875rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{tool.name}</span>
                      {tool.learnUrl ? (
                        <a
                          href={tool.learnUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="badge badge-neutral"
                          style={{ fontSize: '0.6875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
                        >
                          {tool.category} <ExternalLink size={10} />
                        </a>
                      ) : (
                        <span className="badge badge-neutral" style={{ fontSize: '0.6875rem' }}>{tool.category}</span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.78125rem', color: 'var(--text-secondary)' }}>
                      {tool.whyItMatters}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
