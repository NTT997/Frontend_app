import { useState } from "react";
import {
  fetchListSystemConfiguration,
  deleteSystemConfiguration,
} from "../api/ConfigurationApi";
import { useNavigate } from "react-router-dom";

const useConfigurationViewModel = () => {
  const [configurations, setConfigurations] = useState<Configuration[]>([]);
  const [listApprovers, setListApprovers] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  const getListSystemConfiguration = async () => {
    const data = await fetchListSystemConfiguration();
    setConfigurations(data);
  };

  const navigate = useNavigate();
  const handleUpdateConfiguration = async (idParams: string) => {
    navigate(`/configuration/create-configuration/${idParams}`);
  };

  const handleDeleteSystemConfiguration = async (id: string) => {
    try {
      await deleteSystemConfiguration(id);
      setConfigurations((prev) => prev.filter((item) => item.id !== id));
      alert(`Delete System Configuration with id ${id} successfully!`);
    } catch (error) {
      console.error("Delete Failed", error);
    }
  };

  return {
    configurations,
    setConfigurations,
    getListSystemConfiguration,
    listApprovers,
    setListApprovers,
    showDialog,
    setShowDialog,
    handleUpdateConfiguration,
    handleDeleteSystemConfiguration,
  };
};

export default useConfigurationViewModel;

type Configuration = {
  id: string;
  key: string;
  value: string;
  totalApprovers: number;
  min: number;
  max: number;
  approvers: any[];
};
