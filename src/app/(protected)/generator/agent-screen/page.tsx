import React from 'react';
// import AgentScreenContent from './agent-screen';
// Inline fallback component to avoid missing-module errors for './agent-screen'
function AgentScreenContent() {
  return (
    <div>
      <h1>Create Agent Flow</h1>
      <p>Agent creation UI goes here.</p>
    </div>
  );
}

export const metadata = {
  title: 'Create Agent Flow',
  description: 'Multi-step questionnaire wizard layout for creating digital agents.',
};

export default function AgentScreenPage() {
  return <AgentScreenContent />;
}