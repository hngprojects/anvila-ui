export const SUPPORT_EMAIL = "anvila.dev@gmail.com";

export const SUPPORT_SUBJECTS = {
  timeout:  "Generation Timeout — I need help",
  failed:   "Generation Failed — Error Report",
  agents:   "Agents — I need help getting started",
  search:   "Search — I can't find what I'm looking for",
} as const;

export const SUPPORT_BODIES = {
  timeout: "Hi, I ran into a generation timeout and need some help.",
  failed:  "Hi, my generation failed and I'd like to report the issue. Here are the details:\n\n- Error code: \n- What I was trying to do: \n- Steps to reproduce: ",
  agents:  "Hi, I'm a new user and would like to learn how agents work. Can you help?",
  search:  "Hi, I searched but got no results and need some help finding what I need.",
} as const;