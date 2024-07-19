const { z } = require('zod');
const { Schema } = require('zod');

const signupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  age: z.number().int().positive(),
  gender: z.string(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const chatSchema = z.object({
  specialization: z.string().min(1),
  query: z.string().min(1),
  doctorId: z.string().min(1),
});
module.exports = { signupSchema, loginSchema, chatSchema };