class StackError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class InvalidStackItem extends StackError {}

export class StackOverFlow extends StackError {}

export class StackUnderFlow extends StackError {}

class MemoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class InvalidMemoryAccess extends MemoryError {}

export class InvalidMemoryValue extends MemoryError {}

class InstructionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotImplemented extends InstructionError {}

export class InvalidCodeOffSet extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class InvalidOpcode extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
