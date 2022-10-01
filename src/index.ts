import { InvalidCodeOffSet } from './errors';
import ExecutionContext from './execution-context';
import { Instruction } from './instruction';

const decodeOpcode = (ctx: ExecutionContext): Instruction => {
  const pc = ctx.getPC();

  if (0 > pc || pc >= ctx.getCode().length) throw new InvalidCodeOffSet(`Invalid program counter: ${pc}`);
};
