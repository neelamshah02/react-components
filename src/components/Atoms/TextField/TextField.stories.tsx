import React, { useState } from "react";
import { ComponentMeta } from "@storybook/react";
import TextField from "./TextField";

export default {
  title: "ReactComponentLibrary/TextField",
  component: TextField,
} as ComponentMeta<typeof TextField>;

export const Input: React.FC = () => {
  const [username, setUsername] = useState("");

  return (
    <TextField
      label="Email id"
      id="username"
      type="text"
      maxLength={50}
      helptext="Max 50 characters"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  );
};

export const Password: React.FC = () => (
  <TextField label="Password" id="tf-password" type="password" />
);

export const Number: React.FC = () => (
  <TextField label="Phone Number" id="number" type="number" />
);
