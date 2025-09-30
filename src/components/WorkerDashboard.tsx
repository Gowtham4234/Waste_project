import { useState } from "react";
import WasteCollectionDashboard from "./WasteCollectionDashboard";
import TransportationDashboard from "./TransportationDashboard";
import TreatmentProcessingDashboard from "./TreatmentProcessingDashboard";
import MonitoringSupervisionDashboard from "./MonitoringSupervisionDashboard";
import FacilityManagementDashboard from "./FacilityManagementDashboard";
import RecyclingOperationsDashboard from "./RecyclingOperationsDashboard";

interface WorkerDashboardProps {
  workerId: string;
  department: string;
  onLogout: () => void;
}

const WorkerDashboard = ({ workerId, department, onLogout }: WorkerDashboardProps) => {
  // Route to department-specific dashboard
  switch (department) {
    case "Waste Collection":
      return <WasteCollectionDashboard workerId={workerId} onLogout={onLogout} />;
    case "Transportation":
      return <TransportationDashboard workerId={workerId} onLogout={onLogout} />;
    case "Treatment & Processing":
      return <TreatmentProcessingDashboard workerId={workerId} onLogout={onLogout} />;
    case "Monitoring & Supervision":
      return <MonitoringSupervisionDashboard workerId={workerId} onLogout={onLogout} />;
    case "Facility Management":
      return <FacilityManagementDashboard workerId={workerId} onLogout={onLogout} />;
    case "Recycling Operations":
      return <RecyclingOperationsDashboard workerId={workerId} onLogout={onLogout} />;
    default:
      return <WasteCollectionDashboard workerId={workerId} onLogout={onLogout} />;
  }
};

export default WorkerDashboard;