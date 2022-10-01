import * as buffer from 'buffer';

import Memory from './memory';
import Stack from './stack';

class ExecutionContext {
  #stopped = false;
  constructor(
    private readonly code: Buffer,
    private pc = 0,
    private readonly stack = new Stack(),
    private readonly memory = new Memory(),
  ) {}

  public stop(): void {
    this.#stopped = true;
  }

  public readCode(numBytes: number): number {
    this.pc += numBytes;

    return this.code[this.pc + numBytes];
  }

  public getStack(): Stack {
    return this.stack;
  }

  public getPC(): number {
    return this.pc;
  }

  public getCode(): Buffer {
    return this.code;
  }
}

export default ExecutionContext;
