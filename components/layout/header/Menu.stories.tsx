import { ComponentStory, ComponentMeta } from "@storybook/react";
import Menu from "./Menu";

export default {
  component: Menu,
  name: "Menu",
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = () => <Menu />;

export const Default = Template.bind({});

Default.args = {
  name: "menu",
};
