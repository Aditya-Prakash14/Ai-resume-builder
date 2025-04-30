'use client';

import { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Building2, MapPin, Clock, DollarSign, Trash2} from "lucide-react";
import { getJobListings, deleteJob } from "@/utils/actions/jobs/actions";
import { createClient } from "@/utils/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";







export function JobListingsCard() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [workLocation, setWorkLocation] = useState();
  const [employmentType, setEmploymentType] = useState();

  // Fetch admin status
  useEffect(() => {
    async function checkAdminStatus() {
      const supabase = createClient();
      const { data= await supabase.auth.getUser();
      
      if (user) {
        const { data= await supabase
          .from('profiles')
          .select('is_admin')
          .eq('user_id', user.id)
          .single();
        
        setIsAdmin(profile?.is_admin ?? false);
      }
    }
    
    checkAdminStatus();
  }, []);

  const fetchJobs = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await getJobListings({
        page,
        pageSize: 6,
        filters);
      setJobs(result.jobs);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, workLocation, employmentType]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  };

  const formatWorkLocation = (workLocation: Job['work_location']) => {
    if (!workLocation) return 'Not specified';
    return workLocation.replace('_', ' ');
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await deleteJob(jobId);
      // Refetch jobs after deletion
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    
      {/* Decorative background elements */}
      
      
      
      
        
        
        
        
          
            
              Job Listings
            
            
            
              
                 setWorkLocation(value)}
                >
                  
                    
                    
                  
                  
                    🌍 Remote
                    🏢 In Person
                    🔄 Hybrid
                  
                
                
              

              
                 setEmploymentType(value)}
                >
                  
                    
                    
                  
                  
                    ⭐ Full Time
                    ⌛ Part Time
                    🤝 Co-op
                    🎓 Internship
                  
                
                
              
            
          

          
            {isLoading ? (
              Array(6).fill(0).map((_, i) => (
                
                  
                    
                    
                    
                  
                
              ))
            ) : jobs.map((job, idx) => (
              
                
                  
                  
                  
                    
                      
                        {job.position_title}
                      
                      
                        
                        
                          {job.company_name}
                        
                      
                    
                    {isAdmin && (
                       handleDeleteJob(job.id)}
                      >
                        
                      
                    )}
                  

                  
                    
                      
                      {job.location || 'Location not specified'}
                    
                    
                      
                      {formatWorkLocation(job.work_location)}
                    
                    
                      
                      {job.salary_range}
                    
                    
                      
                      {formatDate(job.created_at)}
                    
                  

                  
                    {job.keywords?.slice(0, 3).map((keyword, index) => (
                      
                        {keyword}
                      
                    ))}
                    {job.keywords && job.keywords.length > 3 && (
                      
                        +{job.keywords.length - 3} more
                      
                    )}
                  
                
              
            ))}
          

          
             setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1 || isLoading}
              className="bg-white/70 border-white/40 hover:bg-white/80 hover:border-teal-200 transition-all duration-300 disabled:opacity-50 px-6"
            >
              Previous
            
             setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || isLoading}
              className="bg-white/70 border-white/40 hover:bg-white/80 hover:border-purple-200 transition-all duration-300 disabled:opacity-50 px-6"
            >
              Next
            
          
        
      
    
  );
} 