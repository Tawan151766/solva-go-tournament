"use client";
import { useState, useEffect } from "react";
import MobileDashboard from "../../components/Mobile/MobileDashboard";

export default function MobileDashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock dashboard data
  const mockData = {
    totalTournaments: 12,
    activeTournaments: 3,
    totalTeams: 156,
    activeTeams: 89,
    totalMatches: 234,
    completedMatches: 187,
    totalUsers: 445,
    activeUsers: 234,
    monthlyGrowth: 15.2,
    weeklyActive: 78.5
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDashboardData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh",
        background: "var(--valorant-dark-bg)"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 40,
            height: 40,
            border: "3px solid var(--valorant-dark-border)",
            borderTop: "3px solid var(--valorant-red)",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 16px"
          }} />
          <span style={{ color: "var(--valorant-text-secondary)" }}>Loading...</span>
        </div>
      </div>
    );
  }

  return <MobileDashboard data={dashboardData} />;
}