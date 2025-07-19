"use client";
import { ConfigProvider, theme } from 'antd';
import { valorantTheme } from '../styles/valorant-theme';

const ValorantThemeProvider = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        ...valorantTheme,
        algorithm: theme.darkAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ValorantThemeProvider;