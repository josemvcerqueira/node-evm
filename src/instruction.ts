import { BigNumber, ethers } from 'ethers';

import { NotImplemented } from './errors';
import ExecutionContext from './execution-context';

export class Instruction {
  constructor(public opcode: number, public name: string) {}

  public execute(context: ExecutionContext) {
    throw new NotImplemented('This opcode has not been implemented');
  }
}

export const INSTRUCTIONS: Array<Instruction> = [];

export const INSTRUCTIONS_BY_OPCODE: Record<number, Instruction> = {};

export const registerIntruction = (opcode: number, name: string, execute: (x: ExecutionContext) => unknown) => {
  const instruction = new Instruction(opcode, name);

  instruction.execute = execute;

  INSTRUCTIONS.push(instruction);

  if (!INSTRUCTIONS_BY_OPCODE[opcode]) INSTRUCTIONS_BY_OPCODE[opcode] = instruction;

  return instruction;
};

export const STOP = registerIntruction(0x00, 'STOP', (ctx) => ctx.stop());

export const PUSH1 = registerIntruction(
  0x60,
  'PUSH1',

  (ctx) => ctx.getStack().push(ctx.readCode(1).toString()),
);

export const ADD = registerIntruction(0x01, 'ADD', (ctx) => {
  const fst = BigNumber.from(ctx.getStack().pop());
  const snd = BigNumber.from(ctx.getStack().pop());

  return ctx.getStack().push(BigNumber.from(fst.add(snd).mod(ethers.constants.MaxUint256.add(1))).toString());
});

export const MUL = registerIntruction(0x02, 'MUL', (ctx) => {
  const fst = BigNumber.from(ctx.getStack().pop());
  const snd = BigNumber.from(ctx.getStack().pop());

  return ctx.getStack().push(BigNumber.from(fst.mul(snd).mod(ethers.constants.MaxUint256.add(1))).toString());
});
