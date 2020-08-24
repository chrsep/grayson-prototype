import { Meta, Story } from "@storybook/react/types-6-0"
import React from "react"
import Chip, { ChipProps } from "./Chip"

export default {
  title: "Example/Chip",
  component: Chip,
} as Meta

const Template: Story<ChipProps> = (args) => <Chip {...args} />

export const Default = Template.bind({})
Default.args = {
  text: "Chip",
}
