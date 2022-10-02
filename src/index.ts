import prompts from 'prompts';

import { InvalidCodeOffSet, InvalidOpcode } from './errors';
import ExecutionContext from './execution-context';
import { Instruction, INSTRUCTIONS_BY_OPCODE, STOP } from './instruction';

const decodeOpcode = (ctx: ExecutionContext): Instruction => {
  const pc = ctx.getPC();

  if (0 > pc) throw new InvalidCodeOffSet(`Invalid program counter: ${pc}`);

  if (pc >= ctx.getCode().length) return STOP;

  const opcode = ctx.readCode(1);

  const instruction = INSTRUCTIONS_BY_OPCODE[opcode];

  if (!instruction) throw new InvalidOpcode(`Invalid opcode: ${opcode}`);

  return instruction;
};

const run = (code: Buffer) => {
  const executionContext = new ExecutionContext(code);

  while (!executionContext.getStopped()) {
    const pcBefore = executionContext.getPC();
    const instruction = decodeOpcode(executionContext);
    instruction.execute(executionContext);

    console.log(`${instruction.name} at pc=${pcBefore}`);
    console.log('Stack');
    executionContext.getStack().print();
    console.log('Memory');
    executionContext.getMemory().print();
    console.log(executionContext.getReturnedData());
    console.log('\n');
  }
};

async function main() {
  const response = await prompts({ message: 'What code do you want to run', name: 'code', type: 'text' });

  run(Buffer.from(response.code, 'hex'));
}

main();
