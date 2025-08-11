import React, { useEffect, useState } from "react";
import { fetchListUser } from "../../../services/UserService";
import {
  createSystemConfiguration,
  fetchSystemConfigurationById,
  updateSystemConfiguration,
} from "../api/ConfigurationApi";
import { useNavigate } from "react-router-dom";

type Approver = {
  approverEmail: string;
  order: number;
};

interface SystemConfiguration {
  id: number;
  key: string;
  value: string;
  totalApprovers: number;
  visible: boolean;
  approvers: Approver[];
  min: number;
  max: number;
}

const useCreateConfigViewModel = () => {
  //get selected system configuration to update
  const config = useState(null);

  const [configKey, setConfigKey] = useState("");
  const [configName, setConfigName] = useState("");
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);

  //filter email
  const [searchEmail, setSearchEmail] = useState("");
  const [filteredEmails, setFilteredEmails] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimeout = React.useRef<number | null>(null);

  //state for updating configuration
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [id, setId] = useState(0);

  const [emails, setEmails] = useState<string[]>([]);

  const [approvers, setApprovers] = useState<Approver[]>([]);

  const handleSelectEmail = (email: string) => {
    // Kiểm tra email đã có trong approvers chưa
    if (approvers.some((a) => a.approverEmail === email)) {
      setSearchEmail("");
      setShowSuggestions(false);
      return;
    }
    // Thêm approver mới
    setApprovers([
      ...approvers,
      { approverEmail: email, order: approvers.length + 1 },
    ]);
    setSearchEmail("");
    setShowSuggestions(false);
  };

  const getListEmailUser = async () => {
    const result = await fetchListUser();
    if (result) {
      const emailList = result.data.map(
        (user: { emailAddress: string }) => user.emailAddress
      );
      setEmails(emailList);
    }
  };

  const navigate = useNavigate();

  const handleSubmitConfiguration = async () => {
    const newConfig: SystemConfiguration = {
      id: id,
      key: configKey,
      value: configName,
      totalApprovers: approvers.length,
      visible: true,
      approvers: approvers,
      min: minValue,
      max: maxValue,
    };
    if (id === 0) {
      await createSystemConfiguration(newConfig);
      alert("Create Configuration Successfully!");
    } else {
      await updateSystemConfiguration(newConfig);
      alert("Update Configuration Successfully!");
    }
    navigate("/configuration");
  };

  const handleRemoveApprover = (index: number) => {
    const newApprovers = approvers.filter((_, i) => i !== index);
    // Cập nhật lại order
    const updated = newApprovers.map((a, i) => ({ ...a, order: i + 1 }));
    setApprovers(updated);
  };

  const getSystemConfigurationById = async (id: string) => {
    const data = await fetchSystemConfigurationById(id);
    if (data) {
      setSelectedConfig(data);
    }
  };

  useEffect(() => {
    if (selectedConfig) {
      setId(selectedConfig.id);
      setConfigKey(selectedConfig.key);
      setConfigName(selectedConfig.value);
      setMinValue(selectedConfig.min);
      setMaxValue(selectedConfig.max);
      setApprovers(selectedConfig.approvers || []);
    }
  }, [selectedConfig]);

  return {
    handleSubmitConfiguration,
    configKey,
    setConfigKey,
    configName,
    setConfigName,
    minValue,
    maxValue,
    setMinValue,
    setMaxValue,
    emails,
    setEmails,
    handleSelectEmail,
    handleRemoveApprover,
    getListEmailUser,
    approvers,
    setApprovers,

    config,
    searchEmail,
    setSearchEmail,
    filteredEmails,
    setFilteredEmails,
    showSuggestions,
    setShowSuggestions,
    debounceTimeout,
    //update config
    selectedConfig,
    getSystemConfigurationById,
    id,
    setId,
  };
};

export default useCreateConfigViewModel;
