import { useState } from "react";
import {
  fetchListSchedulerConfiguration,
  updateEnabledStatusOnlyAPI,
  updateSchedulerAPI,
} from "../api/ConfigurationApi";


const useJobScheduleViewModel = () => {
  const [configurations, setConfigurations] = useState<JobConfiguration[]>([]);
  
  const getListSystemConfiguration = async () => {
    const data = await fetchListSchedulerConfiguration();
    console.log(data);
 
    setConfigurations(data);
  };

  const updateEnabledStatusOnly = async (jobname:string,status:boolean) => {
    try {
      await updateEnabledStatusOnlyAPI(jobname, status);      
    } catch (error) {
      console.error("update status Failed", error);
    }
  };
  const updateScheduler = async (jobname:string,cronExpression:string,status:boolean) => {
    try {
      await updateScheduler(jobname,cronExpression, status);      
    } catch (error) {
      console.error("update status Failed", error);
    }
  };
  return {
    configurations,
    setConfigurations,
    getListSystemConfiguration,
    updateEnabledStatusOnly,
    updateSchedulerAPI
  };
};

export default useJobScheduleViewModel;

type JobConfiguration = {
  id: string;
  jobName: string;
  cronExpression: string;
  enabled:boolean;
  lastUpdated:Date;
  description:string;
  createdDate:string;
  createdBy:string;
  lastExecution:Date;
  executionCount:Int16Array;
  lastExecutionStatus:string;
  executionDurationMs:Int16Array;
  new:boolean;
};
