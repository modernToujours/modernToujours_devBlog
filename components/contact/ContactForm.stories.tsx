import { ComponentStory, ComponentMeta } from "@storybook/react";

import ContactForm from "./ContactForm";

export default {
  component: ContactForm,
} as ComponentMeta<typeof ContactForm>;

const Template: ComponentStory<typeof ContactForm> = () => <ContactForm />;

export const Default = Template.bind({});
