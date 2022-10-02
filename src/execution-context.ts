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
    const code = this.code[this.pc];
    this.pc += +numBytes;
    return code;
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

  public getStopped(): boolean {
    return this.#stopped;
  }

  public getMemory(): Memory {
    return this.memory;
  }
}

export default ExecutionContext;
