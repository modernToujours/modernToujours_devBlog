import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import LogoItem from "./LogoItem";

export default {
  component: LogoItem,
} as ComponentMeta<typeof LogoItem>;

const Template: ComponentStory<typeof LogoItem> = () => <LogoItem />;

export const Default = Template.bind({});
