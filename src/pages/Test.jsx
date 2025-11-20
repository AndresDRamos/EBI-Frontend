import { useState } from "react";
import { PublicReport } from "@/components/Report";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";

const TestPage = () => {
  const [reportName, setReportName] = useState("Merma");
  const [inputValue, setInputValue] = useState("Merma");

  const handleLoadReport = () => {
    setReportName(inputValue);
  };

  return <PublicReport reportName={reportName} />;
};

export default TestPage;
