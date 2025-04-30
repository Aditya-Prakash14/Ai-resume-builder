"use client";

import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { generateResumeScore } from "@/utils/actions/resumes/actions";
import { Resume } from "@/lib/types";
import { ApiKey } from "@/utils/ai-tools";

export ;
  
  completeness: {
    contactInformation: {
      score;
      reason;
    };
    detailLevel: {
      score;
      reason;
    };
  };
  
  impactScore: {
    activeVoiceUsage: {
      score;
      reason;
    };
    quantifiedAchievements: {
      score;
      reason;
    };
  };

  roleMatch: {
    skillsRelevance: {
      score;
      reason;
    };
    experienceAlignment: {
      score;
      reason;
    };
    educationFit: {
      score;
      reason;
    };
  };

  miscellaneous: {
    [key: string]: {
      score;
      reason;
    };
  };

  overallImprovements;
}

// Add props 

const LOCAL_STORAGE_KEY = 'resumelm-resume-scores';
const MAX_SCORES = 10;

function getStoredScores(resumeId){
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stored) return null;
    
    const scores = new Map(JSON.parse(stored));
    return scores.get(resumeId);
  } catch (error) {
    console.error('Error reading stored scores:', error);
    return null;
  }
}

function updateStoredScores(resumeId, score) {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    const scores = stored ? new Map(JSON.parse(stored)) );

    // Maintain only MAX_SCORES entries
    if (scores.size >= MAX_SCORES) {
      const oldestKey = scores.keys().next().value;
      scores.delete(oldestKey);
    }

    scores.set(resumeId, score);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(Array.from(scores)));
  } catch (error) {
    console.error('Error storing score:', error);
  }
}

export default function ResumeScorePanel({ resume }, setIsCalculating] = useState(false);
  const [scoreData, setScoreData] = useState(() => {
    // Initialize with stored score if available
    return getStoredScores(resume.id);
  });

  // Add useEffect for initial load
  useEffect(() => {
    const storedScore = getStoredScores(resume.id);
    if (storedScore) {
      setScoreData(storedScore);
    }
  }, [resume.id]);

  const handleRecalculate = async () => {
    setIsCalculating(true);
    try {
        const MODEL_STORAGE_KEY = 'resumelm-default-model';
        // const LOCAL_STORAGE_KEY = 'resumelm-api-keys';
  
        const selectedModel = localStorage.getItem(MODEL_STORAGE_KEY);
        // const storedKeys = localStorage.getItem(LOCAL_STORAGE_KEY);
        const apiKeys= [];
        
      // Call the generateResumeScore action with current resume
      const newScore = await generateResumeScore({
        ...resume,
        section_configs,
        section_order, {
        model: selectedModel || '',
        apiKeys);

      // Update state and storage
      setScoreData(newScore;
      updateStoredScores(resume.id, newScore;
    } catch (error) {
      console.error("Error generating score:", error);
    } finally {
      setIsCalculating(false);
    }
  };

  // If no score data is available, show the empty state
  if (!scoreData) {
    return (
      
        
          
          
            
              Resume Score Analysis
            
            
              No score analysis available yet. Generate one to see how your resume measures up!
            
            
              
              {isCalculating ? "Analyzing Resume..." : "Generate Score Analysis"}
            
          
        
      
    );
  }

  // When we have score data, show the full analysis
  return (
    
      
        
          
          Recalculate Score
        
      

      {/* Main Score Card */}
      
        
        
          
            
          
          
            
              Resume Score Analysis
            
            {scoreData.overallScore.reason}
          
        
      

      {/* Key Improvements Card */}
      
        Key Improvements
        
          {scoreData.overallImprovements.map((improvement, index) => (
            
              
              {improvement}
            
          ))}
        
      

      {/* Metrics Cards */}
      {Object.entries({
        Completeness: scoreData.completeness,
        "Impact Score": scoreData.impactScore,
        "Role Match": scoreData.roleMatch
      }).map(([title, metrics]) => (
        
      ))}
    
  );
}

function MetricsCard({ title, metrics }: { title; metrics, { score; reason) {
  return (
    
      {title}
      
        {Object.entries(metrics).map(([label, data]) => (
          
        ))}
      
    
  );
}

function ScoreItem({ label, score, reason }: { label; score; reason) {
  const getScoreColor = (score) => {
    if (score >= 90) return "bg-emerald-500";
    if (score >= 70) return "bg-teal-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    
      
        {label}
        = 70 ? "bg-teal-100 text-teal-700" : "bg-yellow-100 text-yellow-700"
        )}>
          {score}/100
        
      
      
        
      
      {reason}
    
  );
}