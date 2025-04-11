import { builder } from "./builder";

// Define the input type
export const FollowInput = builder.inputType('FollowInput', {
  description: 'input type for follow and unfollow',
  fields: (t) => ({
    userId: t.string({ required: true }),
  }),
});

export const OrderType = builder.enumType('OrderType', {
    description: 'Order type for sorting',
    values: ['asc', 'desc'],
})

export const SortInput = builder.inputType('SortInput', {
  fields: (t) => ({
    field: t.string({ required: true,defaultValue: "id" }),
    order: t.field({
        type:OrderType,
        required: true,
    })
  }),
}) 

