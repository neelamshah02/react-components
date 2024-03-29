import React from "react";
import { ComponentMeta } from "@storybook/react";
import Button from "./Button";

export default {
  title: "ReactComponentLibrary/Button",
  component: Button,
} as ComponentMeta<typeof Button>;


export const Primary: React.FC = () => <Button onClick={() => {}} type="primary" text="Primary" />
export const Ghost: React.FC = () => <Button onClick={() => {}} type="ghost">Ghost</Button>
export const Capgemini: React.FC = () => <Button onClick={() => {}} >Capgemini</Button>
export const Disabled: React.FC = () =><Button disabled type="primary">Disabled</Button>
export const Danger: React.FC = () => <Button onClick={() => {}} type="danger">Danger</Button>
