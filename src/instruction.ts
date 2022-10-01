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
