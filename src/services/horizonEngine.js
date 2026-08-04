/**
 * GRAYMARK HORIZON Engine Service
 * Analyzes open-ended academic courses & degrees with deep sub-discipline breakdowns,
 * 5-year disruption metrics, certification learning paths, and skill-bridge roadmaps.
 */

const STORAGE_KEY = 'graymark_horizon_gemini_key';

export const getApiKey = () => {
  return import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem(STORAGE_KEY) || '';
};

async function callGeminiAPI(prompt, apiKey) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          responseMimeType: 'application/json'
        }
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || `API error (${response.status})`);
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) throw new Error('Gemini returned empty text');
    return JSON.parse(rawText);
  } catch (error) {
    console.warn('Horizon API call failed, using Smart Horizon Engine:', error.message);
    throw error;
  }
}

const delay = (ms) => new Promise(res => setTimeout(res, ms));

/**
 * Open-Ended Degree Disruption Analyzer with Sub-Discipline Depth
 */
export async function analyzeDegree(courseQuery) {
  if (!courseQuery || !courseQuery.trim()) {
    throw new Error('Please type an academic course, degree, or field of study.');
  }

  const apiKey = getApiKey();

  if (apiKey) {
    try {
      const prompt = `You are GRAYMARK HORIZON Lead Future-of-Work Analyst. 
Analyze the degree/course "${courseQuery}" over the next 5 years (2026-2031) in the age of AI and automation.
Return a valid JSON object with this EXACT structure:
{
  "degreeName": "${courseQuery}",
  "executiveOutlook": "2-sentence punchy summary of how this field is evolving and how students can stay ahead",
  "disruptionScores": {
    "aiImpactIndex": number (0-100),
    "routineTaskAutomation": number (0-100),
    "humanAdvantageIndex": number (0-100)
  },
  "subDisciplineBreakdown": [
    {
      "subField": "Specialization within ${courseQuery}",
      "disruptionLevel": "High Disruption" | "Moderate Evolution" | "High Human Advantage",
      "impactSummary": "How AI impacts this specific sub-field"
    }
  ],
  "whatIsObsolescent": [
    {
      "legacyTask": "Specific traditional task becoming automated",
      "reason": "Why AI/automation is taking this over"
    }
  ],
  "emergingHybridRoles": [
    {
      "title": "Brand-new 2028-2030 Hybrid Job Title",
      "description": "Role overview combining ${courseQuery} + AI/Tech",
      "estimatedDemand": "High" | "Extremely High" | "Emerging"
    }
  ],
  "skillBridgeRoadmap": [
    {
      "phase": "Phase 1: Immediate 90-Day Bridge",
      "targetSkill": "Key technology/tool to master",
      "actionPlan": "Step-by-step action plan",
      "recommendedCertification": "Relevant certification or course",
      "estimatedHours": "20-30 Hours"
    },
    {
      "phase": "Phase 2: 1-Year Master Strategy",
      "targetSkill": "Advanced hybrid capability",
      "actionPlan": "Long-term career evolution strategy",
      "recommendedCertification": "Advanced certification or specialization",
      "estimatedHours": "60-80 Hours"
    }
  ],
  "recommendedTools": [
    {
      "name": "Tool/Framework name",
      "category": "Category",
      "whyItMatters": "Why students in ${courseQuery} must learn this",
      "learnUrl": "https://..."
    }
  ]
}`;

      return await callGeminiAPI(prompt, apiKey);
    } catch (e) {
      // Fallback
    }
  }

  // --- SMART HORIZON FALLBACK ENGINE ---
  await delay(1100);

  const queryLower = courseQuery.toLowerCase();

  let impactScore = 76;
  let autoScore = 70;
  let humanScore = 85;
  let subDisciplines = [];
  let hybridRoles = [];
  let legacyTasks = [];
  let tools = [];

  if (queryLower.includes('law') || queryLower.includes('legal')) {
    impactScore = 78;
    autoScore = 68;
    humanScore = 88;
    subDisciplines = [
      { subField: "Corporate & M&A Law", disruptionLevel: "High Disruption", impactSummary: "Contract review, due diligence, and clause extraction are heavily automated by LLMs." },
      { subField: "Courtroom Litigation & Advocacy", disruptionLevel: "High Human Advantage", impactSummary: "Cross-examination, emotional intelligence, and oral arguments remain uniquely human." },
      { subField: "Regulatory & Data Privacy", disruptionLevel: "Moderate Evolution", impactSummary: "Growing demand to advise companies on AI ethics, GDPR compliance, and copyright." }
    ];
    hybridRoles = [
      { title: "Legal Tech Architect & Prompt Strategist", description: "Designs automated contract analysis workflows using LLMs and compliance rules.", estimatedDemand: "Extremely High" },
      { title: "AI Ethics & Data Privacy Auditor", description: "Ensures enterprise generative AI models comply with global regulatory frameworks.", estimatedDemand: "High" }
    ];
    legacyTasks = [
      { legacyTask: "Manual discovery & document review", reason: "AI vector search parses 10,000 legal pages in seconds." },
      { legacyTask: "Standard boilerplate contract drafting", reason: "Automated clause generators draft NDA/vendor templates instantly." }
    ];
    tools = [
      { name: "CoCounsel by Casetext", category: "Legal AI", whyItMatters: "AI-driven legal research and brief drafting.", learnUrl: "https://casetext.com/cocounsel/" },
      { name: "Harvey AI", category: "Enterprise Legal LLM", whyItMatters: "Standard assistant used by top global law firms.", learnUrl: "https://www.harvey.ai/" }
    ];
  } else if (queryLower.includes('account') || queryLower.includes('financ')) {
    impactScore = 82;
    autoScore = 80;
    humanScore = 80;
    subDisciplines = [
      { subField: "Bookkeeping & Compliance Audit", disruptionLevel: "High Disruption", impactSummary: "Transaction logging, invoice matching, and reconciliation are fully automated." },
      { subField: "FP&A & Strategic Advisory", disruptionLevel: "Moderate Evolution", impactSummary: "Focus shifts from manual spreadsheet modeling to interpreting AI predictive forecasts." }
    ];
    hybridRoles = [
      { title: "Financial AI Systems Auditor", description: "Verifies automated algorithmic bookkeeping and LLM financial forecasts for compliance.", estimatedDemand: "Extremely High" },
      { title: "Strategic FP&A Data Scientist", description: "Combines financial acumen with Python predictive models to guide M&A strategy.", estimatedDemand: "High" }
    ];
    legacyTasks = [
      { legacyTask: "Manual ledger entry & data reconciliation", reason: "OCR and bank API automation process transactions in real time." },
      { legacyTask: "Basic tax return calculations", reason: "Rules-based automated software handles standard tax filings." }
    ];
    tools = [
      { name: "Python (Pandas & SQL)", category: "Financial Analytics", whyItMatters: "Transforms traditional spreadsheets into automated data pipelines.", learnUrl: "https://www.coursera.org/learn/python-for-applied-data-science-ai" },
      { name: "MindBridge AI Audit", category: "Anomaly Detection", whyItMatters: "AI-powered risk analysis for audit firms.", learnUrl: "https://www.mindbridge.ai/" }
    ];
  } else if (queryLower.includes('design') || queryLower.includes('art') || queryLower.includes('graphic')) {
    impactScore = 85;
    autoScore = 72;
    humanScore = 88;
    subDisciplines = [
      { subField: "Production Graphic Design", disruptionLevel: "High Disruption", impactSummary: "Image resizing, background removal, and layout variations generated by GenAI." },
      { subField: "Brand Strategy & Spatial UX", disruptionLevel: "High Human Advantage", impactSummary: "Deep human empathy, physical product interactions, and brand storytelling." }
    ];
    hybridRoles = [
      { title: "Creative AI & GenAI Design Director", description: "Orchestrates AI generative models to rapidly prototype brand systems and UI concepts.", estimatedDemand: "Extremely High" },
      { title: "Spatial Computing & AR UX Designer", description: "Crafts 3D spatial user interfaces for next-generation headsets and AR glasses.", estimatedDemand: "High" }
    ];
    legacyTasks = [
      { legacyTask: "Manual stock photo editing & background removal", reason: "Generative fill tools perform complex edits instantly." },
      { legacyTask: "Basic icon & asset vectorization", reason: "AI vector engines generate customizable icons on demand." }
    ];
    tools = [
      { name: "Midjourney & ComfyUI", category: "Generative Media", whyItMatters: "Industry standard for rapid visual ideation and moodboards.", learnUrl: "https://www.midjourney.com/" },
      { name: "Figma AI & Spline 3D", category: "Product Design", whyItMatters: "Interactive UI/UX design with automated component generation.", learnUrl: "https://www.figma.com/" }
    ];
  } else {
    // Generic sub-disciplines fallback
    subDisciplines = [
      { subField: `Core ${courseQuery} Execution`, disruptionLevel: "Moderate Evolution", impactSummary: "Routine administrative and documentation tasks are automated by AI." },
      { subField: `Strategic ${courseQuery} Oversight`, disruptionLevel: "High Human Advantage", impactSummary: "Client relationships, high-stakes decisions, and creative leadership remain human." }
    ];
    hybridRoles = [
      { title: `${courseQuery} AI Solutions Strategist`, description: `Applies artificial intelligence frameworks and data automation directly to ${courseQuery} workflows.`, estimatedDemand: "Extremely High" },
      { title: `Automated ${courseQuery} Systems Lead`, description: `Leads digital transformation and automated operations within the ${courseQuery} industry.`, estimatedDemand: "High" }
    ];
    legacyTasks = [
      { legacyTask: "Repetitive manual data logging & report writing", reason: "LLMs and automated workflow scripts generate initial draft reports automatically." },
      { legacyTask: "Basic static information retrieval", reason: "Semantic search and RAG knowledge bases provide instant answers." }
    ];
    tools = [
      { name: "Python & SQL Fundamentals", category: "Data Automation", whyItMatters: "Essential for automating data flow in any domain.", learnUrl: "https://www.codecademy.com/" },
      { name: "Google Gemini API & Prompting", category: "AI Orchestration", whyItMatters: "Integrates AI capabilities directly into industry tools.", learnUrl: "https://aistudio.google.com/" }
    ];
  }

  return {
    degreeName: courseQuery,
    executiveOutlook: `The field of ${courseQuery} is transitioning from manual execution to strategic AI oversight. Professionals who combine traditional subject expertise with AI tools will lead the next decade.`,
    disruptionScores: {
      aiImpactIndex: impactScore,
      routineTaskAutomation: autoScore,
      humanAdvantageIndex: humanScore
    },
    subDisciplineBreakdown: subDisciplines,
    whatIsObsolescent: legacyTasks,
    emergingHybridRoles: hybridRoles,
    skillBridgeRoadmap: [
      {
        phase: "Phase 1: Immediate 90-Day Bridge",
        targetSkill: "Prompt Engineering & Domain AI Automation",
        actionPlan: `Master integrating AI assistants into daily ${courseQuery} research and workflow automation.`,
        recommendedCertification: "IBM Applied AI Professional Certificate",
        estimatedHours: "25 Hours"
      },
      {
        phase: "Phase 2: 1-Year Master Strategy",
        targetSkill: "Data Literacy & Hybrid Tool Stack",
        actionPlan: `Learn fundamental data analytics (SQL/Python or low-code automation tools) to build specialized workflows for your domain.`,
        recommendedCertification: "Google Data Analytics Professional Certificate",
        estimatedHours: "60 Hours"
      }
    ],
    recommendedTools: tools
  };
}
