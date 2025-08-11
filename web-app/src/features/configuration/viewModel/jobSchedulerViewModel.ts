import { useState } from "react";
import {
  fetchListSystemConfiguration,
  deleteSystemConfiguration,
  fetchListSchedulerConfiguration,
} from "../api/ConfigurationApi";
import { useNavigate } from "react-router-dom";

const useJobScheduleViewModel = () => {
  const [configurations, setConfigurations] = useState<JobConfiguration[]>([]);
  const [listApprovers, setListApprovers] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  const getListSystemConfiguration = async () => {
    const data = await fetchListSchedulerConfiguration();
    setConfigurations(data);
  };

  const navigate = useNavigate();
//   const handleUpdateConfiguration = async (idParams: string) => {
//     navigate(`/configuration/create-configuration/${idParams}`);
//   };

//   const handleDeleteSystemConfiguration = async (id: string) => {
//     try {
//       await deleteSystemConfiguration(id);
//       setConfigurations((prev) => prev.filter((item) => item.id !== id));
//       alert(`Delete System Configuration with id ${id} successfully!`);
//     } catch (error) {
//       console.error("Delete Failed", error);
//     }
//   };

  return {
    configurations,
    setConfigurations,
    getListSystemConfiguration,
    listApprovers,
    setListApprovers,
    showDialog,
    setShowDialog,
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
