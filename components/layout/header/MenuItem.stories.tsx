import { ComponentStory, ComponentMeta } from "@storybook/react";
import MenuItem, { MenuItemProps } from "./MenuItem";

export default {
  component: MenuItem,
  name: "MenuItem",
} as ComponentMeta<typeof MenuItem>;

const Template: ComponentStory<typeof MenuItem> = (args: MenuItemProps) => (
  <MenuItem {...args} />
);

export const Default = Template.bind({});

Default.args = {
  name: "menu",
};
