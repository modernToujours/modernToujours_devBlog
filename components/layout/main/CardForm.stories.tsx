import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardForm, { CardFormProps } from "./CardForm";

export default {
  component: CardForm,
  name: "CardForm",
} as ComponentMeta<typeof CardForm>;

const Template: ComponentStory<typeof CardForm> = (args: CardFormProps) => (
  <CardForm {...args} />
);

export const Default = Template.bind({});
